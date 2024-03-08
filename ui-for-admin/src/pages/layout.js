import { Outlet } from "react-router-dom";

// components
import AsideBar from "../components/AsideBar";
import NavTop from "../components/NavTop";
import SettingsColorBox from "../components/SettingsColorBox";

const Layout = () => {
    // hooks
    
    // methods

    return (
        <>
            <div className="app-sidebar open">
                <AsideBar />
            </div>
            <div className="app-body">
                <NavTop />
                <Outlet />
            </div>
            <SettingsColorBox />
        </>
    )
}

export default Layout;