"use client";
import styles from "./articles.module.css";
import React, { useEffect, useState } from 'react';
import { runQuery } from "../db/db";
import ArticleDisplay from "./ArticleDisplay";
import MethodSelect from "./MethodSelect";
import ArticleSelectDROPDOWN from "./ArticleSelect";


const Articles = () => {

  const [selectionMethod, setSelectionMethod] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState("");


  
  
    const onMethodRadioChange = (e) => {
      console.log("onMethodRadioChange Was: ", selectionMethod);
      console.log("Event: ", e);
      console.log("Event.target: ", e.target);
      console.log("Event.target: ", e.target.value);
  
      setSelectionMethod(e.target.value);
  
      console.log("Changed to: ", e.target.value)
    };

  const onArticleChange = (e) => {
    console.log("OnArticleChange Was: ", selectedArticleId);
    console.log("Event: ", e);
    console.log("Event.target: ", e.target);
    console.log("Event.target: ", e.target.value);

    setSelectedArticleId(e.target.value);

    console.log("Changed to: ", e.target.value)
  };

  
  return (
    <div>
      <MethodSelect changeCallback={onMethodRadioChange} />
    
      <ArticleSelectDROPDOWN selectionMethod={selectionMethod} changeCallback={onArticleChange}/>

    <ArticleDisplay articleId={selectedArticleId}/>
       

    </div>
  )
}


export default Articles; 