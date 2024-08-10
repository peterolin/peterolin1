"use client";
import styles from "./articles.module.css";
import React, { useEffect, useState } from 'react';
import { runQuery } from "../db/db";
import ArticleDisplay from "./ArticleDisplay";
import SelectFruit from "../components/select/SelectFruit";


const Articles = () => {

  const [selectionMethod, setSelectionMethod] = useState("");
  const [selectedArticle, setSelectedArticle] = useState("");

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  let promiseResult; 

  useEffect(() => {
    promiseResult = runQuery("GET_ARTICLES");
    console.log("16 PO promiseResult", promiseResult);
    promiseResult

      .then(resultData => {
        console.log("19 PO result, should result in update of component", resultData)
        setData(resultData);
      })

      .catch(error => {
        console.error("24 PO setError", promiseResult)
        setError('Error fetching data: ' + error.message)
      })

      .finally(() => {
        console.log('27 PO Finally: setLoading(false)')
      })
    setLoading(false);
  },
    []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  {console.log("35 PO Render articles")}

  const onMethodRadioChange = (e) => {
    console.log("onMethodRadioChange Was: ",selectionMethod);
    console.log("Event: ",e);
    console.log("Event.target: ",e.target);
    console.log("Event.target: ",e.target.value);


    setSelectionMethod(e.target.value);

    console.log("Changed to: ", e.target.value)
  };

  const onArticleChange = (e) => {
    console.log("OnArticleChange Was: ",selectedArticle);
    console.log("Event: ",e);
    console.log("Event.target: ",e.target);
    console.log("Event.target: ",e.target.value);

    setSelectedArticle(e.target.value);

    console.log("Changed to: ", e.target.value)
  };


  return (

    <div className={styles.container} >
      <h1>Test</h1>
      <fieldset >
        <legend>Articles search/selection method</legend>
        <div className="item">
          <input type="radio" name="select_method" id="select_method_DROPDOWN" value="DROPDOWN" title="Dropdown"
            onChange={onMethodRadioChange} />
          <label for="select_method_DROPDOWN">
            HTML <code>SELECT / OPTION</code>
          </label>
        </div>
        <div className="item">
          <input type="radio" name="select_method" id="select_method_FILTERDROPDOWN" value="FILTERDROPDOWN" title="Filtered dropdown"
            onChange={onMethodRadioChange} />
          <label for="ssl_type_NONE">
            <code>INPUT / SELECT / OPTION</code>
          </label>
        </div>
        <div className="item">
          <input type="radio" name="select_method" id="select_method_DYNAMICMENU" value="DYNAMICMENU" title="Filtered dynamic menu"
            onChange={onMethodRadioChange} />
          <label for="ssl_type_NONE">
            <code>MENU - UNKNOWN</code>
          </label>
        </div>
      </fieldset>


      <h1>Select an article to render (({selectionMethod}))</h1>


      <select className={styles.selectStyle} onChange={onArticleChange}>
      {console.log("42 PO Render articles ", data)}

        {data.map(item => (
          <option  value={item.id}><b>{item.author}</b> - <i>{item.title}</i></option>
        ))}
      {console.log("47 PO Articles rendered", data)};

      </select>

      <ArticleDisplay id={selectedArticle}/>

    </div>
  )
}


export default Articles; 