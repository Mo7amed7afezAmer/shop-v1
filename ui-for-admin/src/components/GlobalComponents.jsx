// fontasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faEye } from "@fortawesome/free-solid-svg-icons";

export const CrudDrowdownMenu = () => {
    return (
        <ul className="crud-dropdown-menu active">
            <li>
                <FontAwesomeIcon className="icon-view" icon={ faEye } />
                <span>view</span>
            </li>
            <li>
                <FontAwesomeIcon className="icon-view" icon={ faEye } />
                <span>view</span>
            </li>
        </ul>
    )
}