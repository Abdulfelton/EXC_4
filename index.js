import mysql from 'mysql2/promise';
import express from 'express';
import {config} from 'dotenv';
config()


const pool = mysql.createPool({
    hostname: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });
  
  const app = express();
  
  app.use(express.json());
  app.listen(3030,()=>{
    console.log('http://localhost:3030');
  })  
// a)Create a function/ query that will return all the employee data
const getEmployeeData = async ()=>{
    let [data] = await pool.query('SELECT * FROM pick_n_steal ')
    return data
}
// b)Create a function/ query that will return a single employee
const getSingleEmployee = async (employee_id)=>{
    let [data] = await pool.query('SELECT * FROM pick_n_steal WHERE employee_id = ? ',
        [employee_id])
    return data
}
console.log(await getSingleEmployee(1));
console.log(await getEmployeeData());

// c)Create a function/ query that adds a new employee
const addEmployee = async (first_name,last_name,email, phone_number,department,salary) => {
    await pool.query(
        "INSERT INTO pick_n_steal (first_name,last_name,email, phone_number,department,salary) VALUES ( ?, ?,?,?,?,?)",
        ['Abdul','Felton','abdul@example.com','555-5559','Sales','100000']
    );
    return await getEmployeeData(); 
};console.log(await addEmployee)

// d)Create a function/ query that will remove an employee
const removeEmployee = async () => {
    await pool.query("DELETE FROM pick_n_steal WHERE employee_id = ?", [2]);
    return await getEmployeeData(); 
};console.log(await removeEmployee(2))


// e)Create a function/ query that will be able to update
const updateEmployee = async () => {
    await pool.query(
        "UPDATE pick_n_steal SET phone_number = ?, department = ?, salary = ? WHERE employee_id = 4",
        ['555-4692','Engineering','120000']);
        return await getEmployeeData(); 
    ;}
    console.log(await updateEmployee())

