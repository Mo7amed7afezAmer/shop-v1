const SectionOffer = () => {
    const offerImg = "https://shop-v1.onrender.com/offer/offer-1.png";
    return (
        <section className="offer-section container">
            <div className="parent">
                <div className="item">
                    <img src={ offerImg } alt="offer image" />
                </div>
                <div className="item">
                    <img src={ offerImg } alt="offer image" />
                </div>
            </div>
        </section>
    )
}

export default SectionOffer;