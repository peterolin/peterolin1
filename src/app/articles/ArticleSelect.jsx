"use client";
import React from 'react';
import { runQuery } from "../db/db";
import styles from "./articles.module.css";


const ArticleSelect = ({ articleChanged, selectionMethod, selectionChangeCallback, dbChangeCallback }) => {
    const [loading, setLoading] = React.useState(false);
    const [selectedArticleId, setSelectedArticleId] = React.useState(false);

    const [data, setData] = React.useState([]);


    /* Runs after first render and after every update */
    React.useEffect(() => {
        console.log(">useEffect")
        if (!selectionMethod) return;
        let promiseResult = runQuery("GET_ARTICLES", [200]);
        promiseResult
            .then(resultData => {
                console.log("useEffect: data", resultData)
                setData(resultData);
            })
            .catch(error => {
                console.log("26", error.message)
                
            })
            .finally(() => {
                console.log("26 data", data);
            });
    }, [articleChanged, selectionMethod ]);

    if (!selectionMethod || selectionMethod != "DROPDOWN")
        return (
            <div>
                <fieldset className={styles.fieldset} >
                    <legend className={styles.legend}>Select an article</legend>
                    Method not selected or not implemented.
                </fieldset>
            </div>);

    if (loading) return <p>Loading...</p>;


    { console.log("35 PO Render articles") }

    return (
        <div>
            <fieldset className={styles.fieldset} >
                <legend className={styles.legend}>Select an article</legend>

                <select className={styles.selectStyle} onChange={selectionChangeCallback}>

                    {console.log("42 PO Render articles ", data)}
                    <option className={styles.art} key="none" value="">== Select an article ==</option>

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