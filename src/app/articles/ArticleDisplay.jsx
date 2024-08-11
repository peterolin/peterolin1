import { useEffect, useState } from 'react';
import { deleteArticleQuery, runQuery } from "../db/db";
import styles from "./articles.module.css";


const ArticleDisplay = ({ articleDeleted, articleId, dbChangeCallback, dbDeleteCallback }) => {

  
  const [author, setAuthor] = useState("unset");
  const [title, setTitle] = useState("");
  const [translator, setTranslator] = useState("");
  const [isbn, setISBN] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const [unsavedEdit, setUnsavedEdit] = useState(false);
  //const [deleted, setDeleted] = useState(false);

  // This is the worker for deleting an article 
  // Not sure yet if this would fit better in page.jsx
  // To manage the re-rendering of the ArticleSelect and itself
  // it passes control to the "controller" via the dbDeleteCallback 
  const deleteArticle = (e) => {
    console.log("28 Delete article code goes here")
    deleteArticleQuery(articleId);
    console.log("29 call parent/friend")
    dbDeleteCallback();
  }

  // This is the worker for saving and editedd article 
  // Not sure yet if this would fit better in page.jsx
  // To manage the re-rendering of the ArticleSelect and itself
  // it passes control to the "controller" via the dbChangeCallback 

  const saveArticle = (e) => {
    console.log("34 Save article code goes here")
    updateArticle(author, title, translator, content, isbn, articleId);
    setUnsavedEdit(false);
    dbChangeCallback(articleId);

  }

  const cancelEdit = (e) => {
    console.log("39 Editing cancelled, restore code goes here. ")

    setUnsavedEdit(false);
  }


  const onChange = (e) => {
    console.log("32 Edit detected")
    setUnsavedEdit(true);
  }

  function updateArticle(author, title, translator, contents, isbn, id) {
    let promiseResult = runQuery("UPDATE_ARTICLE_BY_ID", [author, title, translator, contents, isbn, id]);
    console.log("49 updateArticle", promiseResult);
    promiseResult
      .then(resultData => {
        console.log("updated", resultData);
        setUnsavedEdit(false)
      })
      .catch(error => {
        console.error("41 updateArticle.catch PO setError", promiseResult)
        setError('Error fetching data: ' + error.message);
      })
      .finally(() => {
        console.log('45 updateArticle')

      });
  }


  function getArticle(articleId) {
    let promiseResult = runQuery("GET_ARTICLE_BY_ID", [articleId]);
    console.log("27 PO promiseResult", promiseResult);
    promiseResult
      .then(resultData => {
        console.log("38 getArticle.then : resultData=", resultData);
        console.log("39                resultData[0]=", resultData[0]);
        let rd0 = resultData[0];
        console.log("25 in useEffect.then : rd0=", rd0)
        setAuthor(rd0.author);
        setTitle(rd0.title);
        setTranslator(rd0.translator);
        setISBN(rd0.isbn);
        setCreatedAt(rd0.createdAt);
        setUpdatedAt(rd0.updatedAt);
        //setArticleData(rd0);
        console.log("40 click author", author);
      })
      .catch(error => {
        console.error("41 useEffect.catch PO setError", promiseResult)
        setError('Error fetching data: ' + error.message);
      })
      .finally(() => {
        console.log('45 useEffect.finally PO Finally:')

      });
  }

  useEffect(() => {
    console.log("97 useEffect articleId: ", articleId);
    console.log("99 unsavedEdit: ", unsavedEdit);

    if (!articleDeleted && articleId != "")
      getArticle(articleId);
    
  }, [articleId, articleDeleted]);

  console.log("120 inline render articleId=", articleId);

  if (articleDeleted || articleId == "") {
    return (
      <div>
        <fieldset className={styles.fieldset} onChange={onChange}>
          <legend className={styles.legend}>Article details</legend>
          <div>{articleDeleted ? "Article deleted" : "No article selected"}</div>
        </fieldset>
      </div>
    )
  } else {
    return (
      <>
        <fieldset className={styles.fieldset} onChange={onChange}>
          <legend className={styles.legend}>Article details</legend>
          <div className={styles.readonlyitem}>
            <label className={styles.label} htmlFor="text_id">
              <code>ID</code> (uneditable)
            </label>
            <input type="text" name="id" id="text_id" value={articleId} size="60" title="Unique database Key " onChange={e => {return(false)}} readOnly="readOnly" />
          </div>

          <div className={styles.item}>
            <label className={styles.label} htmlFor="text_author">
              <code>AUTHOR</code>
            </label>
            <input type="text" name="author" id="text_author" value={author} size="60" title="Author of work" onChange={e => setAuthor(e.target.value)} />
          </div>

          <div className={styles.item}>
            <label className={styles.label} htmlFor="text_title">
              <code>TITLE</code>
            </label>
            <input type="text" name="title" id="text_title" value={title} size="60" title="Title of work" onChange={e => setTitle(e.target.value)} />
          </div>

          <div className={styles.item}>
            <label className={styles.label} htmlFor="text_translator">
              <code>TRANSLATOR</code>
            </label>
            <input type="text" name="translator" id="text_translator" value={translator} size="60" title="Translator of the work" onChange={e => setTranslator(e.target.value)} />
          </div>

          <div className={styles.item}>
            <label className={styles.label} htmlFor="text_isbn">
              <code>ISBN</code>
            </label>
            <input type="text" name="isbn" id="text_isbn" value={isbn} size="60" title="ISBN for work " onChange={e => setISBN(e.target.value)} />
          </div>

          <div className={styles.item}>
            <label className={styles.label} htmlFor="text_contents">
              <code>CONTENTS</code>
            </label>
            <input type="text" name="contents" id="text_contents" value={isbn} size="60" title="Contents " onChange={e => setContents(e.target.value)} />
          </div>

          <div className={styles.item}>
            <label className={styles.label} htmlFor="text_createdAt">
              <code>CREATEDAT</code> (uneditable)
            </label>
            <input readOnly="readOnly" type="text" name="createdat" id="text_createdat" value={createdAt} size="60" title="Creation timestamp " onChange={e => setCreatedAt(e.target.value)} />
          </div>

          <div className={styles.item}>
            <label className={styles.label} htmlFor="text_updatedAt">
              <code>UPDATEDAT</code> (uneditable)
            </label>
            <input readOnly="readOnly" type="text" name="updatedat" id="text_updatedat" value={updatedAt} size="60" title="Timestamp for latest change" onChange={e => setUpdatedAt(e.target.value)} />
          </div>
          <div className={styles.buttonRow}>
            <button disabled={!unsavedEdit} onClick={saveArticle}>Update</button>
            <button disabled={!unsavedEdit} onClick={cancelEdit}>Cancel</button>
            <button disabled={!Number.isInteger(articleId)} onClick={deleteArticle}>Delete</button></div>

        </fieldset>
      </>

    )
  }
}



  export default ArticleDisplay