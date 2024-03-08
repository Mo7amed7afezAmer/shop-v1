// fontasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faEye } from "@fortawesome/free-solid-svg-icons";

const BarItem = (props) => {

    // methods
    function showDropdown(e) {
        let x = e.target.id;
        console.log(document.getElementById(e.target.id).getAttribute("data-active"));
        // document.querySelector(`.${x}`).classList.toggle("active-dropdown");
    }

    return (
        <div className="bar-item" id = { props.idItem }>
            <ul className="bar-titles">
                <li className="name">
                    <input type="checkbox" />
                    <div className="img-name">
                        <div className="img-box">
                            <img src = { `${ props.baseUrl }/${ props.imgItem }` } alt = { props.nameItem } />
                        </div>
                        <div className="name-box">
                            <h5 className="item-name"> { props.nameItem } </h5>
                            <span> { props.desItem } </span>
                        </div>
                    </div>
                </li>
                <li> { props.dateItem } </li>
                <li className="stock">
                    <div className="progress-bar">
                        <span width="20px"></span>
                    </div>
                    10
                </li>
                <li className="price active-dropdowns" style={{"position": "relative"}}>
                    <span> { props.priceItem } </span>
                    <FontAwesomeIcon id="show1" data-active="one********" className="icons" icon={faEllipsisVertical} onClick={ showDropdown }/>
                    <ul className="crud-dropdown-menu">
                        <li>
                            <FontAwesomeIcon className="icon-view" icon={ faEye } />
                            <span>view</span>
                        </li>
                        <li>
                            <FontAwesomeIcon className="icon-view" icon={ faEye } />
                            <span>view</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default BarItem;