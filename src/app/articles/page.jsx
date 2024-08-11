"use client";
import { useState } from 'react';
import ArticleDisplay from "./ArticleDisplay";
import ArticleSelect from "./ArticleSelect";
import MethodSelect from "./MethodSelect";


const Articles = () => {

  const [selectionMethod, setSelectionMethod] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [dbArticleChanged, setDbArticleChanged] = useState(false);
  const [articleDeleted, setArticleDeleted] = useState(false);


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
    
    setSelectedArticleId(e.target.value);
  };


  // Callback to change state when the selected article
  // has undergone some change in the database, and the list/menu
  // needs to be re-rendered. This should keep the article displayed. 
  const onDbChange = () => {
    console.log("PO 36 Data changed on article registered: ", selectedArticleId);
    setDbArticleChanged(true)
  };

  // Callback to change state when the selected article
  // hase been deleted from the database. This should trigger blank-rendering.
  const onDbDeleted = () => {
    console.log("PO 41 Data deleted ", selectedArticleId);
    setDbArticleChanged(true)
    setSelectedArticleId("");
  };

  return (
    <div>
      {console.log("Render page.jsx")}
      
      {console.log("MethodSelect")}
      <MethodSelect changeMethodCallback={onMethodRadioChange} />

      {console.log("ArticleSelect")}
      <ArticleSelect articleChanged={dbArticleChanged} selectionMethod={selectionMethod} selectionChangeCallback={onArticleSelectionChange}  />

      {console.log("ArticleDisplay")}
      <ArticleDisplay articleDeleted={articleDeleted} articleId={selectedArticleId} dbDeleteCallback={onDbDeleted} dbChangeCallback={onDbChange} />


    </div>
  )
}

export default Articles; 