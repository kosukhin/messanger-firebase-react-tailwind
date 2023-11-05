import {useSelector} from "react-redux";
import {Group} from "../modules/group/Group";

function Navbar() {
  const groups: Group[] = useSelector((state: any) => state.groups.groups)

  return (<nav className="p-4 bg-navbar w-full max-w-[200px]">
    {groups ? groups.map(group => (<div key={group.id}>{group.name}</div>)) : ''}
  </nav>)
}

export default Navbar
