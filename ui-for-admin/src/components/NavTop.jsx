// fontasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faGear, faUser } from "@fortawesome/free-solid-svg-icons";

import langs from "../language";

// components
import UserInfoMenu from "./UserInfoMenu";
import { useState } from "react";

const NavTop = () => {
    // hooks
    const [ userMenuSataus, setUserMenuStatus ] = useState(false);

    //methods
    function showSettingsBox(e) {
        document.getElementById("settingsColorBox").classList.toggle("show-settings-color");
    }
    
    function showUserMenu() {
        setUserMenuStatus(!userMenuSataus);
    }

    return (
        <aside className="nav-top">
            <div className="container-fluid">
                <div className="nav-toggler d-none">
                    <span></span>
                </div>
                <ul className="nav-links">
                    <li className="nav-item">
                        <FontAwesomeIcon className="icons" icon={ faGlobe } />
                    </li>
                    <li className="nav-item">
                        <FontAwesomeIcon className="icons" onClick={showSettingsBox} icon={ faGear } />
                    </li>
                    <li className="user-info nav-item" style={{"position": "relative"}}  onClick={showUserMenu}>
                        <FontAwesomeIcon className="icons" icon={ faUser } />
                        <UserInfoMenu 
                        statusBox = { userMenuSataus } 
                        profile = { langs("profile") }
                        editProfile = { langs("edit") + " " + langs("profile") }
                        logout = { langs("logout") }
                        />
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default NavTop;