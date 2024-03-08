import axios from "axios";
import { useEffect, useState } from "react";

// components
import PageHeader from "../components/PageHeader";
import BarControl from "../components/BarControl";
import ContentHeader from "../components/ContentHeader";
import BarItem from "../components/BarItem";
import { CrudDrowdownMenu } from "../components/GlobalComponents";
import { BASE_URL } from "../src/config";

const Department = () => {
    // hooks
    const [ data, setData ] = useState("");

    const apisUrl = `${ BASE_URL }`;
    // ============== crud operation [get - create - update - delete]
    // 1. get
    useEffect(() => {
        const getData = async () => {
            const result = await axios({
                method: "get",
                url: `${ apisUrl }/item`,
                headers: {
                    "x-auth-token": localStorage.getItem("userToken")
                }
            });
            setData(result.data);
            console.log(result.data);
        }

        getData();
    }, []);

    window.addEventListener("click", (e) => {
        let boxData = document.querySelector(".crud-dropdown-menu.active");
        boxData.setAttribute("style", `top: ${ e.pageY }px; left: ${ e.pageX }px`)
        console.log(e.pageX, " ", e.pageY);

        console.log(boxData)
    })

    return (
        <div className="pages container-fluid">
            <div className="page-header">
                <PageHeader />
            </div>
            <div className="page-content">
                <BarControl />
                <ContentHeader />
                <div className="items">
                    {
                        data.ok ?
                            data.content.map((el) => {
                                return (
                                    <BarItem
                                    key = { el.id }
                                    idItem = { el.id }
                                    nameItem = { el.name }
                                    desItem = { el.des }
                                    imgItem = { el.img }
                                    priceItem = { el.price }
                                    dateItem = { el.register_date }
                                    baseUrl = { apisUrl }
                                    />
                                )
                            })
                        :
                            <h1>loading ....</h1>
                    }
                </div>
            </div>
            <CrudDrowdownMenu />
        </div>
    )
}

export default Department;