import { Outlet } from "react-router-dom";

// components
import Header from "../components/Header";
import Footer from "../components/Footer";
import SettingsBox from "../components/SettingsBox";
import SectionCol from "../components/SectionCol";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <SectionCol />
            <Footer />
            <SettingsBox />
        </>
    )
}

export default Layout;