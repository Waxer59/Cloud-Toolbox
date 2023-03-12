import { Link } from 'react-router-dom'
import { TiChevronRight } from 'react-icons/ti'

interface Props {
  name: string
  icon: JSX.Element
  path: string
}

const ToolsElement: React.FC<Props> = ({ name, icon, path }) => {
  return (
    <li className="sm:p-[5px] p-[15px] w-[65%] sm:w-full dark:bg-[#1f1f1f] dark:border-0 bg-[#f2f2f2] border border-solid border-neutral-400 rounded shadow-xl w-full max-w-[800px] flex items-center justify-center flex-col gap-[5px] sm:gap-0 sm:flex-row transition-transform duration-500 ease hover:scale-105">
      <Link
        className="flex items-center gap-[5px] w-[100px] h-[100px] flex items-center justify-center w-full text-[18px] flex-wrap text-center"
        to={path}>
        {icon} {name}
      </Link>
      <TiChevronRight className="w-[24px] h-[24px]" />
    </li>
  )
}

export default ToolsElement
