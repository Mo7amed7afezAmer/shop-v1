// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faGrip } from '@fortawesome/free-solid-svg-icons';

const TitleBar = (props) => {
    return (
        <div className={`title-bar ${ props.homePage }`}>
            <div className="title-name">
                <h2> { props.titleName } </h2>
            </div>
            <div className="bar-control">
                <FontAwesomeIcon className={`icon icon-grip ${ props.statusDisplayItem === "grid" ? "active" : "null"}`} id="grid" icon={ faGrip } onClick={ props.addClick } />
                <FontAwesomeIcon className={`icon icon-list ${ props.statusDisplayItem === "list" ? "active" : "null"}`}  id="list" icon={ faList } onClick={ props.addClick } />
                <button className="filter-btn d-sm-none d-block" onClick={ props.filterClick }>filter</button>
            </div>
        </div>
    )
}

export default TitleBar;