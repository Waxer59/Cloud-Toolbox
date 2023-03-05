import { useState, useRef } from 'react'
import { fetchApi } from '../../api/fetchApi'
import { HiOutlineDownload } from 'react-icons/hi'
import { PuffLoader } from 'react-spinners'
import { useSweetAlert } from '../../hooks/useSweetAlert'
import confetti from 'canvas-confetti'

const Webshot = () => {
  const [query, setQuery] = useState('')
  const [imgSrc, setImgSrc] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const linkRef = useRef<any>()
  const { throwToast } = useSweetAlert()

  const onTakeWebshotClick = async () => {
    if (
      !query.match(
        /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
      )
    ) {
      await throwToast('error', 'You have to put a valid url!')
      return
    }

    setIsLoading(true)
    const { secure_url } = await fetchApi(`/image/webshot?url=${query}`)
    const imageBlob = await (await fetch(secure_url)).blob()
    linkRef.current.href = URL.createObjectURL(imageBlob)
    setImgSrc(secure_url)
    setIsLoading(false)
    confetti()
  }
  return (
    <div className="flex flex-col justify-center mt-[50px] gap-[50px]">
      <header className="flex justify-center flex-col gap-[15px]">
        <h3 className="text-[24px] font-[500] text-center mt-[50px]">
          Web shot
        </h3>
        <p className="max-w-[550px] text-center m-auto text-[20px]">
          Take a screenshot of your website!
        </p>
      </header>
      <div className="w-full flex justify-center flex-col gap-[15px]">
        <input
          type="text"
          placeholder="https://yourUrl.com"
          className="p-[15px] rounded dark:bg-[#1f1f1f] outline-0 text-[18px] bg-zinc-300 w-full max-w-[800px] m-auto"
          onChange={(e) => {
            setQuery(e.target.value)
          }}
          value={query}
        />
        <div className="flex-col sm:flex-row flex self-center gap-[10px] sm:gap-[25px]">
          <button
            className="self-middle dark:bg-[#2f2f2f] p-[10px] rounded dark:bg-[#1f1f1f] bg-zinc-300"
            disabled={isLoading}
            onClick={onTakeWebshotClick}>
            Take a webshot!
          </button>
          <a
            ref={linkRef}
            download="webshot"
            className={`dark:bg-[#1f1f1f] bg-zinc-300 flex gap-[5px] items-center dark:bg-[#2f2f2f] p-[10px] rounded cursor-pointer justify-center ${
              imgSrc ? 'block' : 'hidden'
            }`}>
            <HiOutlineDownload /> Download
          </a>
        </div>
      </div>
      <a href={imgSrc} target="_blank" rel="noreferrer">
        <img src={imgSrc} />
      </a>
      {isLoading && <PuffLoader className="mt-[150px] m-auto" />}
    </div>
  )
}

export default Webshot
