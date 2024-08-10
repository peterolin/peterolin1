import React, {useEffect} from 'react'
import { runQuery } from "../db/db";

const ArticleDisplay = ({ articleId }) => {
  const [articleData, setArticleData] = React.useState([]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    console.log("10 Calling query");
    let promiseResult = runQuery("GET_ARTICLE_BY_ID");
    console.log("16 PO promiseResult", promiseResult);
    promiseResult
      .then(data => {
        console.log("articleData=", data)
        setArticleData(data);
      })
      .catch(error => {
        console.error("24 PO setError", promiseResult)
        setError('Error fetching data: ' + error.message);
      })
      .finally(() => {
        console.log('27 PO Finally: setLoading(false)')
        console.log("26 articleData", articleData);

        setLoading(false);
      });
  }, [articleId]);

  console.log("articleId: ", articleId);
  if (articleId == "none" || articleId == "")
    return (
      <div>No article selected</div>)
  else

    return (
      <>
        <fieldset>
          <legend align="top">articleData details for articleData ({articleId}) </legend>
          {console.log("40 Artikeldata", articleData)}
          <div className="item">
            <label htmlFor="text_id">
              <code>ID (uneditable)</code>
            </label>
            <input type="text" name="id" id="text_id" defaultValue={articleId} size="80" title="Unique database Key "  />
          </div>

          <div className="item">
            <label htmlFor="text_author">
              <code>AUTHOR</code>
            </label>
            <input type="text" name="author" id="text_author" defaultValue={articleData.author} size="80" title="Author of work"  />
          </div>

          <div className="item">
            <label htmlFor="text_title">
              <code>TITLE</code>
            </label>
            <input type="text" name="title" id="text_title" defaultValue={articleData.title} size="80" title="Title of work"  />
          </div>

          <div className="item">
            <label htmlFor="text_translator">
              <code>TRANSLATOR</code>
            </label>
            <input type="text" name="translator" id="text_translator" defaultValue={articleData.translator} size="80" title="Translator of the work"  />
          </div>

          <div className="item">
            <label htmlFor="text_isbn">
              <code>ISBN</code>
            </label>
            <input type="text" name="isbn" id="text_isbn" defaultValue={articleData.isbn} size="80" title="ISBN for work "  />
          </div>

          <div className="item">
            <label htmlFor="text_createdAt">
              <code>CREATEDAT</code>
            </label>
            <input type="text" name="createdat" id="text_createdat" defaultValue={articleData.createdAt} size="80" title="Creation timestamp "  />
          </div>

          <div className="item">
            <label htmlFor="text_createdAt">
              <code>CREATEDAT</code>
            </label>
            <input type="text" name="updatedat" id="text_updatedat" defaultValue={articleData.updatedAt} size="80" title="Timestamp for latest change"  />
          </div>
        </fieldset>
      </>

    )
}


export default ArticleDisplay