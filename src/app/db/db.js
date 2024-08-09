'use server';
import mariadb from 'mariadb';
import { mapQuery } from './queries';




export async function getPool(){
    /*const {
        DB_HOST = 'localhost', // a non-sensitive default value
        DB_USER = 'foobar', // a non-sensitive default value
      } = env*/
    /*console.log("PO connecting with: (DB_HOST, DB_USER, DB_PASS, DB_NAME)\n",
        process.env.DB_HOST,process.env.DB_USER,
        process.env.DB_PASS,process.env.DB_NAME);*/
    const pool = mariadb.createPool({
        host: "localhost", // env.DB_HOST,
        user: "codetest", // env.DB_USER,
        password: "codetest2024-11", //env.DB_PASS,
        database: "codetest", // env.DB_NAME,
        connectionLimit: 1
        });
 /*   const pool = mariadb.createPool({
            host: env.DB_HOST,
            user: env.DB_USER,
            password: env.DB_PASS,
            database:  env.DB_NAME,
            connectionLimit: 1
            });*/
    console.log("PO Connection pool: " + pool);
    console.log("PO Total connections: ", pool.totalConnections());
    console.log("PO Active connections: ", pool.activeConnections());
    console.log("PO Idle connections: ", pool.idleConnections());
    return pool;
}


    

export async function runQuery(queryAlias){
    let query = mapQuery(queryAlias);
    let pool;
    let conn;
    let sqlQuery;
    let result = false;
    let res = false;
    console.log("\n\nPO 30 Calling runQueryPO with " + queryAlias);

    console.log("PO 48 Query: " + query )
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
        result = conn.query(sqlQuery, function (err,results ) {
            if (err) {
                console.error("85 Error ", err);
                throw err;
            }
            console.log("88 Query results: ", results);
        });
/*
        console.log("PO 91", res);
        
        console.log("PO 93 conn.query() success => \n", res.length, " entries.");
*/

        conn.release();
        pool.end();

        console.log("PO 96 conn.query() success => \n", result)
        return result;

    }
    catch(err){
        console.log("PO Error 101 conn.query() error =>",err);    
        throw err;
    }
}