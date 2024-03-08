import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

const Register = () => {
    const navigate = useNavigate();
    // methods
    function isRegister(e) {
        e.preventDefault();
        // get data from ui
        let uname = document.getElementById("userName").value;
        let uemail = document.getElementById("userEmail").value;
        let upassword = document.getElementById("userPassword").value;

        console.log(uname, " ", uemail, " ", upassword)

        // send my request to server
        axios({
            method: "post",
            url: `${ BASE_URL }/auth/user-register`,
            data: {
                name: uname,
                password: upassword,
                email: uemail
            }
        })
        .then(
            (res) => {
                res = res.data;
                if (res.ok) {
                    localStorage.setItem("userToken", res.token);
                    // navigate("/home");
                    window.location.pathname = "shop-v1/home";
                    console.log(res);
                } else {
                    console.log(res);
                }
            },
            (rej) => console.log(rej)
        )
    }

    return (
        <div className="login-page">
            <div className="login-nav navbar">
                <div className="container">
                    <h1>
                        <Link to="/home">shop</Link>
                    </h1>
                </div>
            </div>
            <div className="login-box">
                <div className="box-border">
                    <form data-aos="zoom-in">
                        <h1>REGISTER</h1>
                        <input type="text" placeholder="username"id="userName" required=""  />
                        <input type="email" placeholder="email"id="userEmail" required=""  />
                        <input type="password" placeholder="password" id="userPassword" required=""  />
                        <button className="form-btn" disabled="" onClick={ isRegister }>Login</button>
                        <span>already an account? <Link to="/login" >login</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;