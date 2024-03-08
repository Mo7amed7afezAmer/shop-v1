import { useState } from 'react';

let links = ["home", "product", "category", "about"];

function NavbarTop(props) {
    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    }

    return (
        <nav className="navbar-top navbar">
            <div className="container">
                <div className="nav-logo">
                    <a href="/">{ props.name }</a>
                </div>
                <div className="nav-toggler" data-toggle="toggleNavLinks" onClick = { handleToggle }>
                    <span></span>
                </div>
                <ul className={ `nav-links ${isActive ? "open" : null }`}>
                    <div className="link-title"></div>
                    {links.map(link => {
                        return (
                            <li className="link-item" key={link}>
                                <a href={`/${link}`}>{link}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="welcome"></div>
        </nav>
    );
}


export {NavbarTop};