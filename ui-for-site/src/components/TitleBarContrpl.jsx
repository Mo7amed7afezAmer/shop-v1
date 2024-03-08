// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faGrip } from '@fortawesome/free-solid-svg-icons';

export const ControlBar = () => {
    return (
        <div className="control-bar">
            control bars
        </div>
    )
}

export const SwitchDisplayButtons = (props) => {
    return (
        <div className="switch-display-buttons">
            <FontAwesomeIcon className={ `icons ${ props.isActive === "grip" ? "active" : null }`} id = "grip" icon = { faGrip } />
            <FontAwesomeIcon className={ `icons ${ props.isActive === "list" ? "active" : null }`} id = "list" icon = { faList } />
        </div>
    )
}


const TitleBarControl = () => {
    return (
        <div className="title-bar-control">
            <div className="bar-container container">
                <h1 className="title-name">headphones</h1>
            </div>
        </div>
    )
}


export default TitleBarControl;