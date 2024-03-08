import { useContext } from "react";
import { UserContext } from "../App";

const SectionCol = () => {
    // hooks
    const data = useContext(UserContext);
    data.length = 5;

    return (
        <div className="col-section">
            <div className="spikes"></div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="inner-box">
                            <div className="box-header tem-b">
                                <h5 className="box-title">feature product</h5>
                            </div>
                            <div className="box-body">
                                {/* dynamic part */}
                                {
                                    data.map((el) => {
                                        return (
                                            <div className="box-item tem-b" key={ el.id }>
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
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="inner-box">
                            <div className="box-header tem-b">
                                <h5 className="box-title">top selling products</h5>
                            </div>
                            <div className="box-body">
                                {/* dynamic part */}
                                {
                                    data.map((el) => {
                                        return (
                                            <div className="box-item tem-b" key={ el.id }>
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
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="inner-box">
                            <div className="box-header tem-b">
                                <h5 className="box-title">on-sale product</h5>
                            </div>
                            <div className="box-body">
                                {/* dynamic part */}
                                {
                                    data.map((el) => {
                                        return (
                                            <div className="box-item tem-b" key={ el.id }>
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
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionCol;