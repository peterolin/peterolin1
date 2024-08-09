
export function mapQuery(queryAlias){
    let queryMap = {
        "GET_ARTICLES":"SELECT * FROM articles LIMIT 4"
    };
    return queryMap[queryAlias]
}

