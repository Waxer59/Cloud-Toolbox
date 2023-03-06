import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { ACCEPTED_FILE_FORMATS } from '../../constants'
import TagItem from './TagItem'
import { fetchApi } from '../../api/fetchApi'
import { PuffLoader } from 'react-spinners'
import { useSweetAlert } from '../../hooks/useSweetAlert'
import confetti from 'canvas-confetti'

const Tag: React.FC = () => {
  const [image, setImage] = useState<any[]>([])
  const [tags, setTags] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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

  const onTagClick = async () => {
    if (!image[0]) {
      await throwToast('error', 'You have to put a picture to tag it!')
      return
    }
    const formData = new FormData()
    formData.append('file', image[0])
    setIsLoading(true)
    const tagsResponse = await fetchApi('/image/tag', {
      method: 'POST',
      body: formData
    })
    setIsLoading(false)
    setTags(tagsResponse.tags)
    await confetti()
  }

  const onCopyClick = async (): Promise<void> => {
    await navigator.clipboard.writeText(tags.join(','))
  }

  return (
    <>
      <header className="flex justify-center flex-col gap-[15px]">
        <h3 className="text-center text-[24px] font-[500] mt-[50px]">
          Tag it!
        </h3>
        <p className="max-w-[550px] text-center m-auto text-[20px]">
          Having trouble tagging your image? Dont worry, artificial intelligence
          will help you put the right tags.
        </p>
      </header>
      <div className="flex mt-[100px] gap-[100px] flex-col sm:flex-row">
        <div className="flex flex-col w-full sm:w-1/2">
          <div
            {...getRootProps()}
            className={`h-[450px] w-full border border-solid ${
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
              onClick={onTagClick}
              disabled={isLoading}
              className="dark:bg-[#1f1f1f] dark:border-0 self-center p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400">
              Tag it!
            </button>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <div className="flex justify-center gap-[10px]">
            <h3 className="text-[24px]">Tags</h3>
            {tags.length > 0 && (
              <button onClick={onCopyClick}>
                <AiOutlinePaperClip className="w-[24px] h-[24px] transition-all hover:opacity-70" />
              </button>
            )}
          </div>
          <ul className="mt-[25px] flex flex-wrap gap-[10px] justify-center max-h-[500px] overflow-auto">
            {tags.length <= 0 ? (
              isLoading ? (
                <PuffLoader className="mt-[150px]" />
              ) : (
                <p className="mt-[25px] text-[18px]">Nothing to show</p>
              )
            ) : (
              tags.map((tag) => <TagItem key={tag} name={tag} />)
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Tag
