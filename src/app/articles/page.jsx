"use client";
import { useState, useEffect } from 'react';
import ArticleDisplay from "./ArticleDisplay";
import ArticleSelect from "./ArticleSelect";
import MethodSelect from "./MethodSelect";
import { runQuery } from '../db/db';
import { render } from 'react-dom';


const Articles = () => {
  
  const [selectionMethod, setSelectionMethod] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [dbArticleChanged, setDbArticleChanged] = useState(false);
  const [articleDeleted, setArticleDeleted] = useState(false);
  const [reRenderingTrigger, setReRenderingTrigger] = useState(0); // (Hack) Increase this to trigger re-render of child


  // When the selection method is changed, tell the dependencies to 
  // assume no article is selected.
  const onMethodRadioChange = (e) => {
    console.log("onMethodRadioChange Event.target.value: ", e.target.value, "was", selectionMethod);

    setSelectionMethod(e.target.value);
    setSelectedArticleId("");
    console.log("Changed to: ", e.target.value)
  };

  // Callback to change state when the selected article changes
  // This is to trigger (re-)rendering of the aricle panel
  const onArticleSelectionChange = (e) => {
    console.log("29 Selection change: ", e);
    setReRenderingTrigger(0);
    setSelectedArticleId(e.target.value);
  };


  // Callback to change state when the selected article
  // has undergone some change in the database, and the list/menu
  // needs to be re-rendered. This should keep the article displayed. 
  const onDbChange = () => {
    console.log("PO 36 Data changed on article registered: ", selectedArticleId);
    setReRenderingTrigger(reRenderingTrigger+1);
  };

  // Callback to change state when the selected article
  // hase been deleted from the database. This should trigger blank-rendering.
  const onDbDeleted = () => {
    console.log("PO 41 Data deleted ", selectedArticleId);
    setReRenderingTrigger(reRenderingTrigger+1);
    setSelectedArticleId("deleted");
  };





  return (
    <div>
          
      <title>Codetest: Article</title>
      <meta name="description" content="Code test article view" />

      {console.log("Render page.jsx")}
      
      {console.log("MethodSelect")}
      <MethodSelect changeMethodCallback={onMethodRadioChange} />

      {console.log("ArticleSelect")}
      <ArticleSelect reRenderingTrigger={reRenderingTrigger} selectionMethod={selectionMethod} selectionChangeCallback={onArticleSelectionChange}  />

      {console.log("ArticleDisplay")}
      <ArticleDisplay articleId={selectedArticleId} dbDeleteCallback={onDbDeleted} dbChangeCallback={onDbChange} />


    </div>
  )
}

export default Articles; 