
export function mapQuery(queryAlias){
    let queryMap = {
        "GET_ARTICLES":"SELECT * FROM `articles` where author != '' and title != '' order by 2 asc limit 40 ",
        "GET_ARTICLE_BY_ID" : "SELECT * FROM articles where id=2"
    };
    return queryMap[queryAlias]
}

