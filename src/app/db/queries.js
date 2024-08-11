
export function mapQuery(queryAlias){
    let queryMap = {
        "GET_ARTICLES":"SELECT id, author, title FROM `articles` where author != '' and title != '' order by 2 asc limit ?; ",
        "GET_ARTICLE_BY_ID" : "SELECT * FROM articles where id=?;",
        "DELETE_ARTICLE_BY_ID" : "DELETE FROM articles where id=?;",
        "UPDATE_ARTICLE_BY_ID" : "UPDATE articles SET author = ?, title = ?, translator=?, content=?, isbn=? WHERE id=?"
    };

    return queryMap[queryAlias]
}

