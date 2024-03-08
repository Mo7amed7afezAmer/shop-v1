import { useContext } from "react";
import { UserContext } from "../App";

const MainSection = (props) => {
    // hooks
    let data = useContext(UserContext);
    data.length = 8;

    return (
        <section className="main-section">
            <div className="container">
                <div className="main-section-header tem-b">
                    <h1 className="header-title">computer & labtop</h1>
                </div>
                <div className="main-section-body with-sidebar">
                    <div className="body-alt d-none">
                        sidebar - image - tabs - cols
                    </div>
                    <div className="body-main row">
                        {
                            data.map((el) => {
                                return (
                                    <div className={`col-sm-${ props.numberOfCols} col-6 tem-b`} key={ el.id }>
                                        <div className="inner-item-box">
                                            <div className="box-header">
                                                <span className="cat-name">{ el.cat }</span>
                                                <a href="/">
                                                    <div className="item-img">
                                                        <img src={ el.img } alt="" />
                                                    </div>
                                                    <div className="item-info">
                                                        <h5 className="item-name"> { el.product_name } </h5>
                                                        <span className="item-price"> { el.price } </span>
                                                    </div>
                                                </a>
                                            </div>
                                            <div className="box-footer">
                                                <button className="add-to-cart">add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainSection;