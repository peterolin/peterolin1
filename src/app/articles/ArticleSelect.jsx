"use client";
import styles from "./articles.module.css";
import { runQuery } from "../db/db";
import React from 'react';


const ArticleSelect = ({ articleChanged, selectionMethod, selectionChangeCallback, dbChangeCallback }) => {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [data, setData] = React.useState([]);


    /* Runs after first render and after every update */
    React.useEffect(() => {
        let promiseResult = runQuery("GET_ARTICLES", [20]);
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
                console.log("26 data", data);
            });
    }, [articleChanged]);

    if (selectionMethod != "DROPDOWN") return (<div>
        
        <fieldset className={styles.fieldset} >
                <legend className={styles.legend}>Select an article</legend>

        Not yet implemented. (({selectionMethod}))
        
        </fieldset>
        </div>);

    console.log("33 data", data);
    console.log("error", error);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    { console.log("35 PO Render articles") }

    return (
        <div>
            <fieldset className={styles.fieldset} >
                <legend className={styles.legend}>Select an article</legend>

                <select className={styles.selectStyle} onChange={selectionChangeCallback}>

                    {console.log("42 PO Render articles ", data)}
                    <option className={styles.art} key="none" value="none">== Select an article ==</option>

                    {data.map(item => (
                        <option className={styles.art} key={item.id} value={item.id}>{item.author} {item.title}</option>
                    ))}
                    
                    {console.log("47 PO Articles rendered", data)};

                </select>
            </fieldset>
        </div>
    )
}
export default ArticleSelect