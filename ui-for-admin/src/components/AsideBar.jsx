import { NavLink } from "react-router-dom";

// fontasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBuilding, faList, faPhotoFilm, faCartShopping, faUsers } from "@fortawesome/free-solid-svg-icons";

import langs from "../language";


const AsideBar = () => {
    return (
        <aside className="sidebar">
            <div className="bar-info">
                <div className="img-box">
                    img
                </div>
                <h4 className="info-name">mo7amed7afez 101</h4>
            </div>
            <ul className="bar-links">
                <li>
                    <NavLink to="dashboard">
                        <FontAwesomeIcon className="icons" icon={ faHome } />
                        { langs("dashboard") }
                    </NavLink>
                </li>
                <li>
                    <NavLink to="department">
                        <FontAwesomeIcon className="icons" icon={ faBuilding } />
                        { langs("department") }
                    </NavLink>
                </li>
                <li>
                    <NavLink to="item">
                        <FontAwesomeIcon className="icons" icon={ faList } />
                        { langs("item") }
                    </NavLink>
                </li>
                <li>
                    <NavLink to="media">
                        <FontAwesomeIcon className="icons" icon={ faPhotoFilm } />
                        { langs("media") }
                    </NavLink>
                </li>
                <li>
                    <NavLink to="cart">
                        <FontAwesomeIcon className="icons" icon={ faCartShopping } />
                        { langs("cart") }
                    </NavLink>
                </li>
                <li>
                    <NavLink to="users">
                        <FontAwesomeIcon className="icons" icon={ faUsers } />
                        { langs("users") }
                    </NavLink>
                </li>
                {
                    // links.map((el, i) => {
                    //     return (
                    //         <li>
                    //             <NavLink to = { el }>
                    //                 <FontAwesomeIcon className="icons" icon={ faCartShopping } />
                    //                 { langs(el) }
                    //             </NavLink>
                    //         </li>
                    //     )
                    // })
                }
            </ul>
        </aside>
    )
}

export default AsideBar;