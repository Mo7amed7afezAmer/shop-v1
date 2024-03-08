// fontawsome
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Close } from "@material-ui/icons";
import { useEffect, useState } from "react";

const SettingsColorBox = () => {
    // hooks
    const [ isUpdate, setUpdate ] = useState(false);

    // methods
    function showSettingsBox(e) {
        document.getElementById("settingsColorBox").classList.remove("show-settings-color");
    }
    function changeColorTheme() {
        let themeSelected = document.getElementById("selectTheme").value;
        
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
        <div className="control-area" id="settingsColorBox">
            <div className="area-header">
                <Close className="icon-close" onClick={ showSettingsBox } />
            </div>
            <div className="area-body">
                <label htmlFor="selectTheme">theme</label>
                <select id="selectTheme">
                    <option value="select">select theme</option>
                    <option value="light">light theme</option>
                    <option value="dark">dark theme</option>
                </select>
            </div>
            <div className="area-footer">
                <button className="btns save-btn" onClick={ changeColorTheme }>save</button>
            </div>
        </div>
    )
}

export default SettingsColorBox;