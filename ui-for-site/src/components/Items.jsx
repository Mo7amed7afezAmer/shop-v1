import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const Items = (props) => {
    // hooks
    const [ isLogin, setLogin ] = useState(true);

    // methods
    // add items to cart
    function addToCart(e) {
        let itemId = e.target.id;
        let count = 1;
        let userToken = localStorage.getItem("userToken");
        if (!userToken || userToken === "undefined") {
            setTimeout(() => {
                setLogin(true);
            }, 2000);
            setLogin(false);
        } else {
            setLogin(true);

            // send my request
            axios({
                method: "post",
                url: `https://shop-v1.onrender.com/display/add-to-cart`,
                data: {
                    itemId: itemId,
                    itemQuantity: count
                },
                headers: {
                    "x-auth-token": localStorage.getItem("userToken")
                }
            })
            .then(
                (res) => {
                    console.log(res.data);
                },
                (rej) => console.log(rej)
            )
        }
        
    }

    return (
        <div className="item">
            <div className="item-img">
                <Link to={`/product/${ props.name }`}>
                    <img src={ props.img } alt="" />
                </Link>
            </div>
            <div className="item-info">
                <span className="item-cat"><a href="/mo7amed"> { props.cat } </a></span>
                <Link to={`/product/${props.name}`}>
                    <h6 className="item-name"> { props.name } </h6>
                </Link>
                <div className="item-rate">
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                    <span>*</span>
                </div>
                <span className="item-price"> { props.price } </span>
                <button className="item-cart" id={ props.id } onClick={ addToCart }> { isLogin ? "add to cart" : "first login"} </button>
            </div>
        </div>
    )
}

export default Items;