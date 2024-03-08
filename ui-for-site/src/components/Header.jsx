import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Department } from '../App';

// components
import ProtectedComponent from './ProtectedComponent';
let userToken = localStorage.getItem("userToken");

const Header = () => {
    // hooks
    const [isShow, setShow ] = useState(false);
    const [ showProfileMenu, setShowProfileMenu ] = useState(false);
    const depData = useContext(Department);

    // methods
    function showBox() {
        setShow(!isShow);
    }
    function openProfileMenu() {
        setShowProfileMenu(!showProfileMenu);
    }
    // window.addEventListener("click", () => {
    //     setShow((el) => el = false)
    // })

    function isLogout(e) {
        window.location.pathname = "shop-v1/home";
        localStorage.clear();
    }
    function showSettingsBox(e) {
        e.preventDefault();
        document.getElementById("settingsBox").classList.add("show-settings-box");
    }

    return (
        <>
            <div className="header">
                <div className="nav-top-info navbar d-sm-block d-none">
                    <div className="container">
                        <a href="/" className="langs-btn">egypt</a>
                        
                        {
                            !userToken || userToken === "undefined" ?
                                <Link to="/login" className="login-btn">login<FontAwesomeIcon className="icon-login" icon={ faUser } /></Link>
                            : 
                                <div className="profile-menu">
                                    <div className="img" onClick={ openProfileMenu }></div>
                                    <ul className={ showProfileMenu ? null : "d-none" }>
                                        <li>
                                            <NavLink to="/profile">profile</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/home" onClick = { showSettingsBox }>settings</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/home" onClick={ isLogout }>log-out</NavLink>
                                        </li>
                                    </ul>
                                </div>

                        }

                    </div>
                </div>
                <div className="nav-middle container">
                    <div className="nav-toggler d-sm-none d-flex" onClick={ showBox }>
                        <span></span>
                    </div>
                    <div className="nav-logo">
                        <h1><Link to="/home">shop</Link></h1>
                        {/* <h1>shop</h1> */}
                    </div>
                    <div className="cart-search">
                        <div className="cart-btn">
                            <NavLink to="/cart"><FontAwesomeIcon icon={ faCartShopping } /></NavLink>
                        </div>
                        <div className="search-box">
                            <form>
                                <input type="text" placeholder="search" />
                                <FontAwesomeIcon className="icon-search" icon={ faMagnifyingGlass } />
                            </form>
                        </div>
                    </div>
                </div>
                <div className={`nav-footer ${ isShow ? "show" : null }`}>
                    <ul className="nav-menu container">
                        <li className="nav-item" key={ "01" }>
                            <NavLink to={ `home` }> home </NavLink>
                        </li>
                        {
                            depData.ok ?
                                depData.content.map((el) => {
                                    return (
                                        <li className="nav-item" key={ el.id }>
                                            <NavLink to={ `/category/${ el.name }` }> { el.name } </NavLink>
                                        </li>
                                    )
                                })
                            : <h1>not found data</h1>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Header;