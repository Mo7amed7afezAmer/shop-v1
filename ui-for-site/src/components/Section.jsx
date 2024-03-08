import { useContext, useState } from "react";

import { CategoryItems } from "../pages/category";

// components
import Items from "../components/Items";
import TitleBar from "../components/TitleBar";
import FilterBox from "../components/FilterBox";

const SectionMain = () => {
    // hooks
    const [ switchDisplay, setSwitchDisplay ] = useState("grid");
    const [ openFilter, setOpenFilter ] = useState(false);
    const [ query, setQuery ] = useState("");
    const data = useContext(CategoryItems);
    
    let itemData = data.items;

    let imgLink = `https://shop-v1.onrender.com/`;

    

    

    // methods
    function switchDisplayItem(e) {
        setSwitchDisplay(e.target.id);
    }
    function switchOpenFilter() {
        setOpenFilter(!openFilter);
    }
    function handleSearch(e) {
        let val = document.getElementById(e.target.id).value;
        setQuery(val);
    }
    function filterItems(food, query) {
        query = query.toLowerCase();
        return food.filter(item =>
                item.name.split('-').some(word =>
                word.toLowerCase().startsWith(query)
            )
        );
    }

    if (data.length > 0) {
        data.ok = true;
        let x = filterItems(itemData, query);
        if (x.length > 0) {
            itemData = x;
        } else {
            data.ok = false;
        }
    }

    return (
        <section className="section-main section">
            <div className="container">
                <div className="section-header">
                    <TitleBar 
                        titleName="headphones" 
                        statusDisplayItem= { switchDisplay } 
                        addClick= { switchDisplayItem } 
                        filterClick = { switchOpenFilter } />
                </div>
                <div className="section-content">
                    <div className={`content-filter ${ openFilter ? "open-filter" : null }`}>
                        <FilterBox filterClick = { switchOpenFilter } filterSearch= { handleSearch } />
                    </div>
                    <div className={`content-item row ${ switchDisplay === "grid" ? null : "display-list"}`}>
                        {   data.ok  ?
                                itemData.map((el) => {
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
                            : <h1>not found data</h1>

                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionMain;