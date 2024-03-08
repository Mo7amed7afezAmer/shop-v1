// fontasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PageHeader = () => {
    return (
        <>
            <div className="header-top">
                <h3 className="header-title">department</h3>
                <button className="button add-btn"> <FontAwesomeIcon className="icons d-none" icon={faPlus} /> add </button> 
            </div>
            <div className="header-bottom">
                all(10) | published(5)
            </div>
        </>
    )
}

export default PageHeader;