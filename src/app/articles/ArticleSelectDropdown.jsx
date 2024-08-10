"use client";
import styles from "./articles.module.css";
import { runQuery } from "../db/db";


const ArticleSelectDROPDOWN = ({ selectionMethod, changeCallback }) => {
    
    let error, data, loading;

    let promiseResult = runQuery("GET_ARTICLES");
    console.log("16 PO promiseResult", promiseResult);
    promiseResult
        .then(resultData => {
            console.log("19 PO result, should result in update of component", resultData)
            data= resultData;
        })
        .catch(error => {
            console.error("24 PO setError", promiseResult)
            error = 'Error fetching data: ' + error.message;
        })
        .finally(() => {
            console.log('27 PO Finally: setLoading(false)')
            loading = false;

        });
        loading=false;


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
export default ArticleSelectDROPDOWN