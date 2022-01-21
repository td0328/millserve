var util=require('util');
var mysql = require('mysql');
var async = require("async")
const HOST='139.155.91.210';
const USER='mill';
const PASS='jXWYhHxhBih8cFTB';
const DATABASE='mill';
const PORT=3306

const db=mysql.createPool({
    host:HOST,
    user:USER,
    password:PASS,
    database:DATABASE,
    port:PORT
});
let findOne=function (table,where,callback){ //查找一条；
    // whre is arr; [{id:1},{username:admin}];
    let _WHERE='';
    if(util.isObject(where)){
        _WHERE+='WHERE ';
        for(var k in where){
            _WHERE+=k+"='"+where[k]+"' AND ";
        }

        _WHERE=_WHERE.slice(0,-4);
    }else if(typeof where =='string'){
        _WHERE='WHERE '+where;
    }
    var sql="SELECT * FROM "+prefix+table+' '+_WHERE+' LIMIT 1';
    console.log(sql+'-------------------------');
    db.query(sql,function(err,data){
        if(err){
            callback(err,0);
        }else{
            callback(err,data[0]);
        }
    });
}
let findList=function (table,where,sort){ //查找多条条；
    return new Promise(( resolve, reject ) => {
        let res = {}
        let _WHERE='';
        let _sort='';
        if(where!==null){
            if(typeof where=='object'){
                _WHERE+='WHERE ';
                for(let k in where){
                    _WHERE+=k+"='"+where[k]+"' AND ";
                }
                _WHERE=_WHERE.slice(0,-5);
            }
        }
        if(sort!==null){
            if(typeof sort=='object'){
                _sort+='ORDER BY ';
                for(let k in sort){
                    _sort+=k+' '+sort[k]+' , ' ;
                }
                _sort=_sort.slice(0,-3);
            }
        }
        let sql="SELECT * FROM "+table+' '+_WHERE+' '+_sort;
        db.query(sql,function(err,data){
            if ( err ) {
                reject( err )
            } else {
                resolve( data )
            }
            //callback(err,data);
        });
    });
}
var select=function(table,callback){ //查找所有；
    var sql="SELECT * FROM "+prefix+table;
    console.log(sql);
    db.query(sql,callback);
}
var insert =function(table,obj,callback){
    //insert into table() values()
    //{username:'guojikai',age:'55',sex:'1'}
    var fields='';
    var values='';
    for( var k in obj){
        fields+=k+',';
        values=values+"'"+obj[k]+"',"
    }
    fields=fields.slice(0,-1);
    values=values.slice(0,-1);
    var sql="INSERT INTO "+prefix+table+'('+fields+') VALUES('+values+')';
    console.log(sql+'--------------');
    db.query(sql,callback);
}
/**
 sets is object；
 where is object;
 */
var update=function(table,sets,where,callback){
    var _SETS='';
    var _WHERE='';
    var keys='';
    var values='';
    for(var k in sets){
        _SETS+=k+"='"+sets[k]+"',";
    }
    _SETS=_SETS.slice(0,-1);
    for(var k2 in where){
        _WHERE+=k+"='"+where[k2]+"' AND ";
    }
    //update table set username='admin2',age='55'   where id="5";
    var sql="UPDATE "+prefix+table+' SET '+_SETS+' '+_WHERE;
    db.query(sql,callback);
}
var del=function(table,where,callback){
    var _WHERE='';
    for(var k2 in where){
        _WHERE+=k+"='"+where[k2]+"' AND ";
    }
    var sql="DELETE  FROM "+prefix+table+'  '+_WHERE;
}
// var sql_select="SELECT * FROM blog_article";
module.exports={
    db:db,
    insert:insert,
    select:select,
    findList:findList,
    del:del,
    update:update
};