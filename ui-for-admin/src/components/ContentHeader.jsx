const ContentHeader = () => {
    return (
        <div className="content-header">
            <ul className="bar-titles">
                <li className="name">
                    <input type="checkbox" />
                    product
                </li>
                <li className="date">create at</li>
                <li className="stock">stock</li>
                <li className="price">price</li>
            </ul>
        </div>
    )
}

export default ContentHeader;