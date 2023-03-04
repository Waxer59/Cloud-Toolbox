import { ImPriceTags } from 'react-icons/im'
import { RiScreenshot2Fill } from 'react-icons/ri'
import { CiSquareRemove } from 'react-icons/ci'
import ToolsElement from './ToolsElement'

const TOOLS = [
  {
    name: 'Tag it!',
    icon: <ImPriceTags />,
    path: '/tagit'
  },
  {
    name: 'Web shot',
    icon: <RiScreenshot2Fill />,
    path: '/webshot'
  },
  {
    name: 'Background remove',
    icon: <CiSquareRemove />,
    path: '/backgroundremove'
  }
]

const Tools: React.FC = () => {
  return (
    <>
      <h2 className="text-[24px] font-[500] text-center mt-[50px]">Tools</h2>
      <ul className="flex justify-center mt-[50px] gap-[20px] flex-wrap">
        {TOOLS.map(({ name, icon, path }) => (
          <ToolsElement name={name} icon={icon} path={path} key={name} />
        ))}
      </ul>
    </>
  )
}

export default Tools
