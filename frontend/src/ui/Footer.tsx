import { FaGithub } from 'react-icons/fa'
import { CloudinaryIcon } from '../components/Icons'

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center gap-[5px] justify-center mt-auto p-[20px]">
      Made by
      <a
        href="https://github.com/Waxer59"
        title="Github"
        className="hover:opacity-75 transition-all ease duratin-500"
        target="_blank"
        rel="noreferrer">
        <FaGithub />
      </a>
      with
      <a
        href="https://cloudinary.com/"
        className="hover:opacity-75 transition-all ease duratin-500"
        target="_blank"
        rel="noreferrer">
        <CloudinaryIcon />
      </a>
    </footer>
  )
}

export default Footer
