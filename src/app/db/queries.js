
export function mapQuery(queryAlias){
    let queryMap = {
        "GET_ARTICLES":"SELECT id, author, title FROM `articles` where author != '' and title != '' order by 2 asc limit 40 ",
        "GET_ARTICLE_BY_ID" : "SELECT * FROM articles where id=24"
    };
    return queryMap[queryAlias]
}

