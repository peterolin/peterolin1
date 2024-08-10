import React from 'react'

const ArticleDisplay = ({articleId}) => {
  console.log("articleId: ", articleId)
  if (articleId =="") 
    return (
    <div>No article selected</div>)
else
  return (
    <>
    <fieldset>
    <legend align="top">Article details for article ({articleId}) </legend>
    <div class="item">
      <label f  or="text_id">
        <code>ID (uneditable)</code>
      </label>
      <input type="text" name="id" id="text_id" value={articleId} size="80" title="Unique database Key " readonly="readonly" />
    </div>

    <div class="item">
      <label htmlFor="text_author">
        <code>AUTHOR</code>
      </label>
      <input type="text" name="author" id="text_author" value="" size="80" title="Author of work" readonly="readonly" />
    </div>
    
    <div class="item">
      <label htmlFor="text_title">
        <code>TITLE</code>
      </label>
      <input type="text" name="title" id="text_title" value="" size="80" title="Title of work" readonly="readonly" />
    </div>
    
    <div class="item">
      <label htmlFor="text_translator">
        <code>TRANSLATOR</code>
      </label>
      <input type="text" name="translator" id="text_translator" value="" size="80" title="Translator of the work" readonly="readonly" />
    </div>
    
    <div class="item">
      <label htmlFor="text_isbn">
        <code>ISBN</code>
      </label>
      <input type="text" name="isbn" id="text_isbn" value="" size="80" title="ISBN for work " readonly="readonly" />
    </div>
    
    <div class="item">
      <label htmlFor="text_createdAt">
        <code>CREATEDAT</code>
      </label>
      <input type="text" name="createdat" id="text_createdat" value="" size="80" title="Creation timestamp " readonly="readonly" />
    </div>
    
    <div class="item">
      <label htmlFor="text_createdAt">
        <code>CREATEDAT</code>
      </label>
      <input type="text" name="updatedat" id="text_updatedat" value="" size="80" title="Timestamp for latest change" readonly="readonly" />
    </div>
    </fieldset>
    </>
    
 ) 
}


export default ArticleDisplay