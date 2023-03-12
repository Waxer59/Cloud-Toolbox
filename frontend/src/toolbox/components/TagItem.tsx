interface Props {
  name: string
}

const TagItem: React.FC<Props> = ({ name }) => {
  return (
    <li className="dark:bg-[#1f1f1f] bg-zinc-300 p-[10px] rounded-full">
      # {name}
    </li>
  )
}

export default TagItem
