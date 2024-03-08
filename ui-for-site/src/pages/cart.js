import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../config";

const Cart = () => {
    // hooks
    const [ cartData, setCartData ] = useState("");

    // methods
    useEffect(() => {
        const fetchCartData = async () => {
            const result = await axios({
                method: "get",
                url: `${ BASE_URL }/display/cart`,
                headers: {
                    "x-auth-token": localStorage.getItem("userToken")
                }
            });
            setCartData(result.data);
        }

        fetchCartData();
    }, []);

    return (
        <div className="cart-page pages" style={{paddingBottom: 30 + "px"}}>
            <div className="page-title container breadcrump">
                Breadcrumb  
            </div>
            <div className="page-content container">
                <div className="cart-exist-items">
                    <div className="panel-header d-none d-sm-flex display-table">
                        <span>product</span>
                        <span>price</span>
                        <span>quantity</span>
                        <span>sub total</span>
                    </div>
                    <div className="panel-body">
                        {
                            cartData.ok &&
                                cartData.item.map((el) => {
                                    return (
                                        <div className="body d-flex d-sm-block" key={ el.item_id }>
                                            <div className="title d-flex d-sm-none display-table">
                                                <span>product</span>
                                                <span>price</span>
                                                <span>quantity</span>
                                                <span>sub total</span>
                                            </div>
                                            <div className="data display-table">
                                                <span> { el.name } </span>
                                                <span> { el.price } </span>
                                                <span><input type="number" placeholder="1" value={ el.item_quantity } readOnly /></span>
                                                <span>250</span>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
                {
                    !cartData.ok &&
                    <div className="cart-empty">
                        <h1>your cart is currently empty</h1>
                        <NavLink to="/home">return to shop</NavLink>
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart;