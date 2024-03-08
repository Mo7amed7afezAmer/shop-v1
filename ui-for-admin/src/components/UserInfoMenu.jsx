import { Link } from "react-router-dom";

const UserInfoMenu = (props) => {

    // methods
    function isLogout(e) {
        e.preventDefault();
        localStorage.clear();
    }

    return (
        <div className={`user-info-menu ${ props.statusBox ? "show" : null}`}>
            <div className="user-img">img</div>
            <ul className="user-links">
                <li className="menu-item">
                    <Link to="profile"> { props.profile } </Link>
                </li>
                <li className="menu-item">
                    <Link to="profile"> { props.editProfile } </Link>
                </li>
                <li className="menu-item">
                    <Link to="profile" onClick = { isLogout }> { props.logout } </Link>
                </li>
            </ul>
        </div>
    )
}

export default UserInfoMenu;