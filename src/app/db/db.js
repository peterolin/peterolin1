'use server';
import mariadb from 'mariadb';
import { mapQuery } from './queries';


export async function getPool(){
    
    
    console.log("PO connecting with: (DB_HOST, DB_USER, DB_PASS, DB_NAME)\n",
        process.env.REACT_APP_DB_HOST, process.env.REACT_APP_DB_USER,
        process.env.REACT_APP_DB_PASS, process.env.REACT_APP_DB_NAME);

    const pool = mariadb.createPool({
        host: process.env.REACT_APP_DB_HOST,
        user:  process.env.REACT_APP_DB_USER,
        password: process.env.REACT_APP_DB_PASS,
        database:  process.env.REACT_APP_DB_NAME,
        connectionLimit: 1
        });

        
    console.log("PO Connection pool: " + pool);
    console.log("PO Total connections: ", pool.totalConnections());
    console.log("PO Active connections: ", pool.activeConnections());
    console.log("PO Idle connections: ", pool.idleConnections());
    return pool;
}


    

export async function runQuery(queryAlias, sqlParams){
    let query = mapQuery(queryAlias);
    let pool;
    let conn;
    let sqlQuery;
    let result = false;
    let res = false;
    console.log("\n\nPO 30 Calling runQueryPO with " + queryAlias);

    console.log("PO 48 Query: " + query )
    console.log("PO 51 params: " + sqlParams )

    try{
        console.log("PO 50 => getPool() "  );
        pool = await getPool();
        console.log("PO 52 getPool success => " ,  res);

    }
    catch(err){
        console.log("PO 53 getPool() error =>  \n" ,  err);
        return res;
    }

    try{
        console.log("PO 59 => getConnection() try ");
        conn = await pool.getConnection();
        console.log("PO 61 getConnection() success => ",  conn);
        console.log("PO 62 Connection pool: " , pool);
        console.log("PO 63 Total connections: ", pool.totalConnections());
        console.log("PO 64 Active connections: ", pool.activeConnections());
        console.log("PO 65 Idle connections: ", pool.idleConnections());
    }
    catch(err){
        console.log("PO 68 getConnection() error => \n", err);
        try{
            console.log("PO 70 => pool.end() try.");
            pool.end();
        }
        catch(err2){
            console.error("PO 75 pool.end() error => \n ", err);
            console.error("Error=" + err2);

        }
        return res;
    }

            let tic = Date.now();
        sqlQuery = mapQuery(queryAlias);
        console.log("PO 82 Trying conn.query(sqlQuery) ",sqlQuery,"in",Date.now()-tic,"ms.");

    try{
        result = conn.query(sqlQuery, sqlParams, function (err,results ) {
            if (err) {
                console.error("85 Error ", err);
                throw err;
            }
            console.log("88 Query results: ", results);
        });

        console.log("PO 91", res);
    
        console.log("PO 93 conn.query() success => \n", res.length, " entries.");


        conn.release();
        pool.end();

        console.log("PO 108 conn.query() success")
        
        return result;

    }
    catch(err){
        console.log("PO Error 101 conn.query() error =>",err);    
        throw err;
    }



  
}

export async function deleteArticleQuery(articleId) {
    let promiseResult = runQuery("DELETE_ARTICLE_BY_ID", [articleId]);
    console.log("49 delete article");
    promiseResult
      .then(resultData => {
        console.log("128 deleted article", articleId);
        articleId = "";
        setId(null);
        setAuthor(null);
        setTitle(null);
        setTranslator(null);
        setISBN(null);
        setContents(null);
        setCreatedAt(null);
        setUpdatedAt(null);

        setEdited(false);
        console.log("138 deleted");

      })
      .catch(error => {
        console.error("142 failed to delete ", articleId, error.message)
      })
      .finally(() => {
        console.log('66 finally')

      });
  }

