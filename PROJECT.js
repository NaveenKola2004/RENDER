const mysql =require("mysql2")
const express=require("express")
const cors=require("cors");
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"naveen@123",
    database:"test1"
})

connection.connect((error)=>{
    if(error) throw error;
    console.log("database connected")
})

const app=express();
app.use(express.json())
app.use(cors())


app.get("/data",(req,res)=>{
    connection.query("select * from student",(error,result)=>{
        if (error){
            return res.status(404).json("faild to get the data")
        }
        res.status(200).json(result)
    })
})


app.post("/data/add",(req,res)=>{
    const{id,name}=req.body;

    if(!id||!name){
        res.status(500).json("fill the all the data")
    }
    connection.query("insert into student values(?,?)",[id,name],(error,result)=>{
        if(error){
            return res.status(404).json("Faild to insert the data")
        }
        res.status(200).json("Sucessfully inserted the data")
    })
})
app.listen(5000,()=>{
    console.log("Server is running")
});