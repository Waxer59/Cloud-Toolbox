import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ACCEPTED_FILE_FORMATS } from '../../constants'
import { useSweetAlert } from '../../hooks/useSweetAlert'
import { PuffLoader } from 'react-spinners'
import { AiFillSecurityScan } from 'react-icons/ai'
import { BiImageAdd } from 'react-icons/bi'
import { fetchApi } from '../../api/fetchApi'
import confetti from 'canvas-confetti'

const IsVirus: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>()
  const [image, setImage] = useState<any[]>([])
  const { throwToast } = useSweetAlert()
  let checkScanStatus: number

  const removeAll = (): void => {
    setImage([])
  }

  const onDrop = useCallback((acceptedFiles: any) => {
    setImage(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    )
  }, [])

  const reset = () => {
    setImage([])
    setResult(null)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/*': ACCEPTED_FILE_FORMATS
    }
  })

  const onScanFileClick = async () => {
    if (!image[0]) {
      await throwToast('error', 'You have to put a file to scan!')
      return
    }
    const formData = new FormData()
    formData.append('file', image[0])
    setIsLoading(true)
    const { public_id } = await fetchApi('/image/filescan', {
      method: 'POST',
      body: formData
    })

    checkScanStatus = setInterval(async () => {
      const response = await fetchApi(`/image/filescan/${public_id}`)
      setIsLoading(response?.status === 'pending')
      if (response?.status !== 'pending') {
        setResult(response.moderation_status)
        await confetti()
        clearInterval(checkScanStatus)
      }
    }, 3000)
  }

  return (
    <>
      <div
        className={`mt-[25px] mb-[50px] flex flex-col gap-[25px] ${
          result ? 'hidden' : 'block'
        }`}>
        <header className="flex justify-center flex-col gap-[15px]">
          <h3 className="text-[24px] font-[500] text-center mt-[50px]">
            Scan the file
          </h3>
          <p className="max-w-[550px] text-center m-auto text-[20px]">
            Scan your file if youre not sure whether its a virus.
          </p>
        </header>
        <div className={`${isLoading ? 'hidden' : 'block'}`}>
          <div
            {...getRootProps()}
            className={`h-[550px] border-dashed w-full max-w-[950px] m-auto border border-solid ${
              isDragActive ? 'border-green-600' : 'border-neutral-400'
            } duration-500 ease rounded shadow-xl cursor-pointer flex items-center justify-center bg-no-repeat bg-contain bg-center transition-all`}
            style={{
              backgroundImage: `${
                image[0]?.preview !== undefined
                  ? `url('${image[0].preview}')`
                  : ''
              }`
            }}>
            <input {...getInputProps()} />
            {image[0]?.preview === undefined && (
              <div className="flex items-center gap-[15px]">
                <BiImageAdd className="w-[24px] h-[24px]" />
                <p className="max-w-[15ch] text-center">
                  Drag and drop some files here, or click to select files
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center mt-[25px] gap-[20px]">
            <button
              className="dark:bg-[#1f1f1f] dark:border-0 self-center p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400"
              onClick={removeAll}>
              Remove file
            </button>
            <button
              onClick={onScanFileClick}
              className="flex flex-wrap justify-center items-center gap-[5px] dark:bg-[#1f1f1f] dark:border-0 self-center p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400">
              <AiFillSecurityScan />
              Scan the file
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          result ? 'block' : 'hidden'
        } flex flex-col justify-center items-center align-center gap-[15px] h-[500px]`}>
        <h3 className="text-[28px] font-[500] text-center mt-[50px]">
          File Results:{' '}
          {result && result.charAt(0).toUpperCase() + result.slice(1)}
        </h3>
        <button
          onClick={reset}
          className="flex items-center gap-[5px] dark:bg-[#1f1f1f] dark:border-0 self-center p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400">
          Try again!
        </button>
      </div>
      {isLoading && <PuffLoader className="mt-[150px] m-auto" />}
    </>
  )
}

export default IsVirus
