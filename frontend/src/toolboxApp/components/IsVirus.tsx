import { useDropzone } from 'react-dropzone'
import { ACCEPTED_FILE_FORMATS } from '../../constants'
import { useState, useCallback } from 'react'
import { useSweetAlert } from '../../hooks/useSweetAlert'
import { PuffLoader } from 'react-spinners'
import { AiFillSecurityScan } from 'react-icons/ai'
import { BiImageAdd } from 'react-icons/bi'

const IsVirus: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')
  const [image, setImage] = useState<any[]>([])
  const { throwToast } = useSweetAlert()

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
  }
  return (
    <>
      {/* <div className="mt-[25px] flex flex-col gap-[25px]">
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
            className={`h-[550px] w-full max-w-[950px] m-auto border border-solid ${
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
              className="flex items-center gap-[5px] dark:bg-[#1f1f1f] dark:border-0 self-center p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400">
              <AiFillSecurityScan />
              Scan the file
            </button>
          </div>
        </div>
      </div> */}
      {isLoading && <PuffLoader className="mt-[150px] m-auto" />}
    </>
  )
}

export default IsVirus