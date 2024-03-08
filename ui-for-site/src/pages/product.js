import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from "../config";


function Product() {
    // hooks
    const itemName = useParams("itemName");
    const [data, setData ] = useState();
    // let m = useMatches();
    // console.log(m);

    let imgLink = `${ BASE_URL }/`;

     // handle data
     useEffect(() => {

        const fetchData = async (e) => {
            const result = await axios({
                url: `${ BASE_URL }/display/item/${ itemName.itemName }`,
                method: `get`
            });
            setData(result.data);
        }
        fetchData();
        
    }, [ itemName ]);

    return (
        <div className="product-page">
            <div className="breadcrupm container">breadcrupm</div>
            <div className="item-box container">
                {
                    data ?
                        data.item.map((el) => {
                            return (
                                <div className="row" key={ el.id} >
                                    <div className="col-sm-6 col-12">
                                        <div className="img">
                                            <img src={ imgLink + el.img } alt="" />
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <div className="data">
                                            <h4 className="data-name"> { el.name } </h4>
                                            <ul>
                                                <li>the computer is specification 20*30 size</li>
                                                <li>the computer is specification 20*30 size</li>
                                                <li>the computer is specification 20*30 size</li>
                                                <li>the computer is specification 20*30 size</li>
                                            </ul>
                                            <div className="data-rate">
                                                <span>*</span>
                                                <span>*</span>
                                                <span>*</span>
                                                <span>*</span>
                                                <span>*</span>
                                            </div>
                                            <p className="data-price"> { el.price } </p>
                                            <input type="number" min="1" />
                                            <button className="data-cart">add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    : <h1>not found data</h1>
                }
            </div>
        </div>
    );
}

export default Product;