import { Link } from "react-router-dom";

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';

// links
let customerCareData = ["account", "about & contact", "cart"];
let departmentName = ["computer & labtop", "headphones", "Audio Speakers"];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-move">move to top</div>
            <div className="footer-info container">
                <div className="row">
                    <div className="footer-info-item footer-info-customer-care col-md-3">
                        <h3>customer car</h3>
                        <ul>
                            {
                                customerCareData.map((el) => {
                                    return (
                                        <li key={ el }>
                                            <Link to={ el } className="tem-b-m"> 
                                                <FontAwesomeIcon className="icon-item" icon= { faAnglesRight } />
                                                { el } 
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="footer-info-item footer-info-department col-md-3">
                        <h3>department</h3>
                        <ul>
                            {
                                departmentName.map((el) => {
                                    return (
                                        <li key={ el }>
                                            <Link to={ el } className="tem-b-m"> 
                                                <FontAwesomeIcon className="icon-item" icon= { faAnglesRight } />
                                                { el } 
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="footer-info-item footer-info-contact col-md-3">
                        <h3>pages</h3>
                        <ul>
                            {
                                customerCareData.map((el) => {
                                    return (
                                        <li  key={ el }>
                                            <Link to={ el } className="tem-b-m"> 
                                                <FontAwesomeIcon className="icon-item" icon= { faAnglesRight } />
                                                { el } 
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-main">
                <div className="container d-block d-sm-flex">
                    <p>&copy; company - all rights reserved</p>
                    <ul className="footer-main-links d-flex">
                        <li>paypal</li>
                        <li>visa</li>
                        <li>skirll</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;