const ProductBox = (props) => {
    return (
        <div className="product-box">
            {/* box header */}
            <div className="box-header">
                <a href="#m">
                    <h1 className="product-name"> {props.name} </h1>
                    <div className="img-box">
                        <img src={ props.image } alt={props.name} />
                    </div>
                </a>
            </div>
            {/* box body */}
            <div className="box-body"></div>
            {/* box-footer */}
            <div className="box-footer">
                <span className="price"> {props.price} </span>
            </div>
        </div>
    );
}


export default ProductBox;