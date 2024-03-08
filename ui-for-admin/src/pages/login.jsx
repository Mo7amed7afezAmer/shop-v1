import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../config";

const Login = () => {
    // methods
    function isLogin(e) {
        e.preventDefault();
        // get data from ui
        let uname = document.getElementById("userName").value;
        let upassword = document.getElementById("userPassword").value;

        // send my request to server
        axios({
            method: "post",
            url: `${ BASE_URL }/auth`,
            data: {
                name: uname,
                password: upassword
            }
        })
        .then(
            (res) => {
                res = res.data;
                if (res.ok) {
                    localStorage.setItem("userToken", res.token);
                    // navigate("/home");
                    window.location.pathname = "admin-v1/dashboard";
                } else {
                    console.log(res);
                }
            },
            (rej) => console.log(rej)
        )
    }

    return (
        <div className="app-body">
            <div className="login-box">
                <div className="box-border">
                    <form data-aos="zoom-in">
                        <h1>LOGIN</h1>
                        <input type="text" placeholder="username"id="userName" required=""  />
                        <input type="password" placeholder="password" id="userPassword" required=""  />
                        <button className="form-btn" disabled="" onClick={ isLogin }>Login</button>
                        <span className="d-none">New account? <Link to="/register" >Register</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;