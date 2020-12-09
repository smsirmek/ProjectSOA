const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'postgres',
    user: 'postgres',
    password: '021041',
    port: '5432',

})

async function getdata(){
    const sql = `select "Country/Region" as country,"lat" as lat,"long" as long, "3/23/20" as m_death
    from covid19_death_csv 
    where "3/23/20" > 0
    order by "3/23/20" desc `
    const data = await pool.query(sql);
    //console.log(data);
    return data;

}

async function getworld(){
    const sql = `select sum(covid19_confirmed_csv."3/23/20") as date_confirmed,sum(covid19_death_csv."3/23/20") as date_death,sum(covid19_recovered_csv."3/23/20") as date_recover
    from covid19_confirmed_csv , covid19_death_csv , covid19_recovered_csv
    where covid19_confirmed_csv."Country/Region"= covid19_death_csv."Country/Region" and covid19_confirmed_csv."Province/State" = covid19_death_csv."Province/State" 
    and covid19_confirmed_csv."Country/Region"= covid19_recovered_csv."Country/Region" and covid19_confirmed_csv."Province/State" = covid19_recovered_csv."Province/State" `
    const data = await pool.query(sql);
    //console.log(data);
    return data;

}
async function getTotal(){
    const sql =`select covid19_confirmed_csv."Country/Region" as country, covid19_confirmed_csv."Province/State" as province, covid19_confirmed_csv."3/23/20" as date_confirmed,covid19_death_csv."3/23/20" as date_death,covid19_recovered_csv."3/23/20" as date_recover
    from covid19_confirmed_csv , covid19_death_csv , covid19_recovered_csv
    where covid19_confirmed_csv."Country/Region"= covid19_death_csv."Country/Region" and covid19_confirmed_csv."Province/State" = covid19_death_csv."Province/State" 
    and covid19_confirmed_csv."Country/Region"= covid19_recovered_csv."Country/Region" and covid19_confirmed_csv."Province/State" = covid19_recovered_csv."Province/State"`
    const data = await pool.query(sql);
    return data;
}

async function gettopdeath(){
    const sql = `select  "Country/Region" as country ,"3/23/20" as death
    from covid19_death_csv 
    where "3/23/20" > 0
    order by "3/23/20" desc
    limit 5
    `
    const data = await pool.query(sql);
    //console.log(data);
    return data;

}
async function getgraph(){
 const sql = `select sum(covid19_confirmed_csv."3/23/20") as date_confirmed,sum(covid19_death_csv."3/23/20") as date_death,sum(covid19_recovered_csv."3/23/20") as date_recover
 from covid19_confirmed_csv , covid19_death_csv , covid19_recovered_csv
 where covid19_confirmed_csv."Country/Region"= covid19_death_csv."Country/Region" and covid19_confirmed_csv."Province/State" = covid19_death_csv."Province/State" 
 and covid19_confirmed_csv."Country/Region"= covid19_recovered_csv."Country/Region" and covid19_confirmed_csv."Province/State" = covid19_recovered_csv."Province/State" `
 const data = await pool.query(sql);
    //console.log(data);
    return data;
}


module.exports={
    getdata,
    getTotal,
    gettopdeath,
    getworld,
    getgraph,
}