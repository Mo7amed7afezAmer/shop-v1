// fontawsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const SettingsBox = () => {
    // hooks
    const [ isUpdate, setUpdate ] = useState(false);
    const [ showBox, setShowBox ] = useState(false);

    // methods
    function showSettingsBox(e) {
        // e.preventDefault();
        // setShowBox(!showBox);
        document.getElementById("settingsBox").classList.remove("show-settings-box");
    }
    function changeColorTheme() {
        let themeSelected = document.getElementById("colorTheme").value;
        
        localStorage.setItem("colorTheme", themeSelected);
        setUpdate(!isUpdate);
        
    }

    useEffect(() => {
        if (localStorage.getItem("colorTheme") === "dark") {
            document.querySelector("body").classList.add("dark");
            document.querySelector("body").classList.remove("light");
        } else {
            document.querySelector("body").classList.add("light");
            document.querySelector("body").classList.remove("dark");
        }
    }, [ isUpdate ])

    return (
        <div id = "settingsBox" className = "settings-box">
            <div className="box-header">
                <FontAwesomeIcon className="icon-close" onClick = { showSettingsBox } icon = { faClose } />
            </div>
            <div className="box-body">
                <div className="body-row">
                    <label htmlFor="colorTheme">theme</label>
                    <select id = "colorTheme">
                        <option value = "0"> select theme </option>
                        <option value = "light"> light theme </option>
                        <option value = "dark"> dark theme </option>
                    </select>
                </div>
            </div>
            <div className="box-footer">
                <button className="save-btn" onClick={ changeColorTheme }>save</button>
            </div>
        </div>
    )
}

export default SettingsBox;