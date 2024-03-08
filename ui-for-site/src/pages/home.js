import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
// components
import LandingPage from "../components/LandingPage"
import SectionOffer from "../components/SectionOffer";
import MainSection from "../components/MainSection";
import SectionAnimate from "../components/SectionAnimate";
import TitleBar from "../components/TitleBar";
import Items from "../components/Items";
import SectionMain from "../components/Section";
import { Department } from "../App";

function Home() {
    // hooks
    const deps = useContext(Department);
    const [ allProductsData, setAllProductsData ] = useState("");

    // methods
    function test() {
        return 0
    }

    const imgLink = "${ BASE_URL }/";
    // handle data
    useEffect(() => {

        const fetchData = async (e) => {
            const result = await axios({
                url: `${ BASE_URL }/display/items`,
                method: `get`
            });
            setAllProductsData(result.data);
        }
        fetchData();
    }, []);
    
    

    return (
        <div className="home-page pages">
            <LandingPage />
            <SectionOffer />
            <section className="section-main section">
                <div className="container">
                    <div className="section-header">
                        <TitleBar
                            homePage = "home-page"
                            titleName="all products" 
                            statusDisplayItem= { "switchDisplay" } 
                            addClick= { test } 
                            filterClick = { test } />
                    </div>
                    <div className="section-content">
                        <div className={`content-item row`}>
                            {
                                allProductsData ?
                                    allProductsData.content.map((el) => {
                                        return (
                                            <div className="col col-sm-3 col-6" key={ el.id }>
                                                <Items 
                                                    id = { el.id }
                                                    cat = { el.id }
                                                    name = { el.name }
                                                    img = { imgLink + el.img }
                                                    price = { el.price }
                                                />
                                            </div>
                                        )
                                    })
                                :
                                    <h1> not found any items</h1>

                            }
                        </div>
                    </div>
                </div>
            </section>
            <SectionAnimate />
        </div>
    )
}

export default Home;