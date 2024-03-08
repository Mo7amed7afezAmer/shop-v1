import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faXmark } from '@fortawesome/free-solid-svg-icons';

import { Department } from "../App";

const FilterBox = (props) => {
    // hooks
    const [ isOpen, setOpen ] = useState(false);
    const depData = useContext(Department);

    // methods
    function openMenu() {
        setOpen(!isOpen);
    }

    return (
        <div className="filter-box">
            <div className="filter-header d-sm-none d-block">
                <h4>
                    filter box
                    <FontAwesomeIcon className="icon" icon={ faXmark } onClick={ props.filterClick } />
                </h4>
            </div>
            <div className="filter-search">
                <input type="search" id="filterSearch" placeholder="search" onChange={ props.filterSearch } />
            </div>
            <div className={`filter-cat ${isOpen ? "open-menu" : null}`}>
                <h4>
                    category
                    <FontAwesomeIcon className="icon" icon={ faAngleRight } onClick={ openMenu } />
                </h4>
                <ul>
                    {
                        depData.ok ?
                            depData.content.map((el) => {
                                return (
                                    <li key={ el.id }>
                                        <NavLink to={ `/category/${ el.name }`}> 
                                            <input type="checkbox" />
                                            { el.name }
                                        </NavLink>
                                    </li>
                                )
                            })
                        : <h6>not found data</h6>
                    }
                </ul>
            </div>
        </div>
    )
}

export default FilterBox;