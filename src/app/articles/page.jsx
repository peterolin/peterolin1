"use client";
import styles from "./articles.module.css";
import React, { useEffect, useState } from 'react';
import { runQuery } from "../db/db";


const Articles = () => {

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

  return (
    <div className={styles.container}>Articles contents

      <h1>Data from MariaDB</h1>
      <ul>
      {console.log("42 PO Render articles ")}

        {data.map(item => (
          <li key={item.id}><b>{item.author}</b> - <i>{item.title}</i></li>
        ))}
      {console.log("47 PO Articles rendered")};

      </ul>

      
    </div>
  )
}


export default Articles; 