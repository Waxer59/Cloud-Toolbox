import { PuffLoader } from 'react-spinners'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import { BiImageAdd } from 'react-icons/bi'
import { useState, useCallback, useRef } from 'react'
import { useSweetAlert } from '../../hooks/useSweetAlert'
import { ACCEPTED_FILE_FORMATS } from '../../constants'
import { useDropzone } from 'react-dropzone'
import { fetchApi } from '../../api/fetchApi'
import confetti from 'canvas-confetti'
import { RxReset } from 'react-icons/rx'
import { HiOutlineDownload } from 'react-icons/hi'

export const RemoveText = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<any[]>([])
  const [modifiedImage, setModifiedImage] = useState<string | null>(null)
  const { throwToast } = useSweetAlert()
  const linkRef = useRef<any>()

  const removeAll = (): void => {
    setImage([])
    setModifiedImage(null)
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
  const onRemoveTextClick = async () => {
    if (!image[0]) {
      await throwToast('error', 'You have to put a image!')
      return
    }
    const formData = new FormData()
    formData.append('file', image[0])
    setIsLoading(true)
    const response = await fetchApi('/image/removetext', {
      method: 'POST',
      body: formData
    })
    setModifiedImage(response.url)
    setIsLoading(false)
    const imageBlob = await (await fetch(response.url)).blob()
    linkRef.current.href = URL.createObjectURL(imageBlob)
    await confetti()
  }

  return (
    <>
      <div
        className={`mt-[25px] mb-[50px] flex flex-col gap-[25px] ${
          modifiedImage ? 'hidden' : 'block'
        }`}>
        <header className="flex justify-center flex-col gap-[15px]">
          <h3 className="text-[24px] font-[500] text-center mt-[50px]">
            Remove the text
          </h3>
          <p className="max-w-[550px] text-center m-auto text-[20px]">
            Remove text from your images!
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
              onClick={removeAll}
              className="dark:bg-[#1f1f1f] dark:border-0 self-center p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400">
              Remove Image
            </button>
            <button
              onClick={onRemoveTextClick}
              className="flex flex-wrap justify-center items-center gap-[5px] dark:bg-[#1f1f1f] dark:border-0 self-center p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400">
              <RiDeleteBack2Fill />
              Remove text
            </button>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col mt-[150px] gap-[25px] mx-auto ${
          modifiedImage ? 'block' : 'hidden'
        }`}>
        <img className="w-[500px]" src={modifiedImage ?? ''} />
        <div className="flex gap-[15px] justify-center mb-[50px]">
          <a
            ref={linkRef}
            download="removeText"
            className="dark:bg-[#1f1f1f] dark:border-0 self-center p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400 flex items-center gap-[5px]">
            <HiOutlineDownload /> Download
          </a>
          <button
            onClick={removeAll}
            className="dark:bg-[#1f1f1f] dark:border-0 p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400 flex items-center gap-[5px]">
            <RxReset /> Reset
          </button>
        </div>
      </div>
      {isLoading && <PuffLoader className="mt-[150px] m-auto" />}
    </>
  )
}
