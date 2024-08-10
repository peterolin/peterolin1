"use client";
import styles from "./articles.module.css";
import { runQuery } from "../db/db";
import React from 'react';


const ArticleSelect = ({ selectionMethod, changeCallback }) => {
    const [error, setError] = React.useState("");
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    
    /* Runs after first render and after every update */
    React.useEffect(() => {
        let promiseResult = runQuery("GET_ARTICLES");
        console.log("16 PO promiseResult", promiseResult);
        promiseResult
            .then(resultData => {
                console.log("data", resultData)
                setData(resultData);
            })
            .catch(error => {
                console.error("24 PO setError", promiseResult)
                setError('Error fetching data: ' + error.message);
            })
            .finally(() => {
                console.log('27 PO Finally: setLoading(false)')
                console.log("26 data", data);

                setLoading(false);
            });
        }, []);

    if (selectionMethod != "DROPDOWN") return (<div>NYI (({selectionMethod}))</div>);

    console.log("33 data", data);
    console.log("error", error);
    console.log("loading", loading);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    { console.log("35 PO Render articles") }

    return (
        <div>
            <h1>Select an article to render using DROPDOWN method</h1>

            <select className={styles.selectStyle} onChange={changeCallback}>
                {console.log("42 PO Render articles ", data)}

                {data.map(item => (
                    <option value={item.id}><b>{item.author}</b> - <i>{item.title}</i></option>
                ))}
                {console.log("47 PO Articles rendered", data)};

            </select>
        </div>
    )
}
export default ArticleSelect