"use client";
import React, { useEffect, useState } from 'react';
import ArticleDisplay from "./ArticleDisplay";
import MethodSelect from "./MethodSelect";
import ArticleSelect from "./ArticleSelect";


const Articles = () => {

  const [selectionMethod, setSelectionMethod] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [articleChanged, setArticleChanged] = useState(false);
  const [articleDeleted, setArticleDeleted] = useState(false);


  const onMethodRadioChange = (e) => {
    console.log("onMethodRadioChange Was: ", selectionMethod);
    console.log("Event: ", e);
    console.log("Event.target: ", e.target);
    console.log("Event.target: ", e.target.value);

    setSelectionMethod(e.target.value);
    setSelectedArticleId("");
    console.log("Changed to: ", e.target.value)
  };


  const onSelectionChange = (e) => {
    console.log("29 Selection change: ", e);
    
    setSelectedArticleId(e.target.value);
  };


  const dbChangeHandler = () => {
    console.log("PO 36 Data changed on article registered: ", selectedArticleId);
    setArticleChanged(true)
  };

  const dbDeleteHandler = () => {
    console.log("PO 41 Data deleted ", selectedArticleId);
    setArticleChanged(true)
    setSelectedArticleId("");
  };

  return (
    <div>
      <MethodSelect changeCallback={onMethodRadioChange} />

      <ArticleSelect articleChanged={articleChanged} selectionMethod={selectionMethod} selectionChangeCallback={onSelectionChange}  />

      <ArticleDisplay articleDeleted={articleDeleted} articleId={selectedArticleId} dbDeleteCallback={dbDeleteHandler} dbChangeCallback={dbChangeHandler} />


    </div>
  )
}


export default Articles; 