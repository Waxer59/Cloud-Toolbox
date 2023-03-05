import { useCallback, useState, useRef, useEffect } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { HiOutlineDownload } from 'react-icons/hi'
import { RxReset } from 'react-icons/rx'
import { useDropzone } from 'react-dropzone'
import { PuffLoader } from 'react-spinners'
import { ACCEPTED_FILE_FORMATS } from '../../constants'
import { useSweetAlert } from '../../hooks/useSweetAlert'
import { fetchApi } from '../../api/fetchApi'
import 'two-up-element'

const BackgroundRemove: React.FC = () => {
  const [image, setImage] = useState<any[]>([])
  const [bgRemovedImage, setBgRemovedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [tries, setTries] = useState(0)
  const linkRef = useRef<any>()
  const { throwToast } = useSweetAlert()
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

  const removeAll = (): void => {
    setImage([])
  }

  const reset = (): void => {
    removeAll()
    setImage([])
    setBgRemovedImage(null)
  }

  useEffect(() => {
    let interval: number
    if (isLoading) {
      interval = setInterval(() => {
        setTries((prevTries) => prevTries + 1) // utilizando la función de actualización del estado
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isLoading, bgRemovedImage, tries])

  const onBackgroundRemoveClick = async () => {
    if (!image[0]) {
      await throwToast(
        'error',
        'You have to put a picture to remove the background!'
      )
      return
    }
    const formData = new FormData()
    formData.append('file', image[0])
    setIsLoading(true)
    const { url } = await fetchApi('/image/bgremove', {
      method: 'POST',
      body: formData
    })
    setBgRemovedImage(url)
  }

  return (
    <div className="mt-[25px] flex flex-col gap-[25px]">
      <header className="flex justify-center flex-col gap-[15px]">
        <h3 className="text-[24px] font-[500] text-center mt-[50px]">
          Background remove
        </h3>
        <p className="max-w-[550px] text-center m-auto text-[20px]">
          Remove the background of your image!
        </p>
      </header>
      <div
        className={`${
          isLoading || bgRemovedImage !== null ? 'hidden' : 'block'
        }`}>
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
            Remove image
          </button>
          <button
            onClick={onBackgroundRemoveClick}
            className="dark:bg-[#1f1f1f] dark:border-0 self-center p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400">
            Remove the background!
          </button>
        </div>
      </div>
      {bgRemovedImage !== null && (
        <div
          className={`flex flex-col gap-[25px] ${
            isLoading ? 'hidden' : 'block'
          }`}>
          <two-up className="w-full">
            <img className="w-full" src={image[0]?.preview} />
            <img
              className="w-full"
              src={`${bgRemovedImage}?t=${tries}`}
              onLoad={async () => {
                setIsLoading(false)
                const imageBlob = await (
                  await fetch(bgRemovedImage ?? '')
                ).blob()
                linkRef.current.href = URL.createObjectURL(imageBlob)
              }}
            />
          </two-up>
          <div className="flex gap-[15px] justify-center mb-[50px]">
            <a
              ref={linkRef}
              download="bgRemove"
              className="dark:bg-[#1f1f1f] dark:border-0 self-center p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400 flex items-center gap-[5px]">
              <HiOutlineDownload /> Download
            </a>
            <button
              onClick={reset}
              className="dark:bg-[#1f1f1f] dark:border-0 p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400 flex items-center gap-[5px]">
              <RxReset /> Reset
            </button>
          </div>
        </div>
      )}
      {isLoading && <PuffLoader className="mt-[150px] m-auto" />}
    </div>
  )
}

export default BackgroundRemove
