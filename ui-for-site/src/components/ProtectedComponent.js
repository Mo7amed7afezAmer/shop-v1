import { useEffect, useState } from "react";

const ProtectedComponent = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        const userToken = localStorage.getItem("userToken");
        if (!userToken || userToken === "undefined") {
            setIsLoggedIn(false);
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return isLoggedIn ? props.children : <h1>45</h1>;
}

export default ProtectedComponent;