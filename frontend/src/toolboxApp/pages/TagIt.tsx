import { Footer, Navbar } from '../../ui'
import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'
import { BiImageAdd } from 'react-icons/bi'
import { ACCEPTED_FILE_FORMATS } from '../../constants'

const TagIt: React.FC = () => {
  const [image, setImage] = useState<any[]>([])

  const removeAll = (): void => {
    setImage([])
  }

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log('droped')
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
      'image/png': ACCEPTED_FILE_FORMATS
    }
  })

  return (
    <>
      <Navbar />
      <h3 className="text-[24px] font-[500] text-center mt-[50px]">Tag it!</h3>
      <div className="flex mt-[100px] gap-[25px] flex-col sm:flex-row">
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
          <button
            className="mt-[25px] self-center p-[10px] bg-zinc-300 rounded shadow-xl border border-solid border-neutral-400"
            onClick={removeAll}>
            Remove image
          </button>
        </div>
        <div className="w-full sm:w-1/2">
          <h3 className="text-center text-[24px]">Tags</h3>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TagIt
