// Database name ==> Employee and Collection name ==> Manager


const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path');

const app=express();

app.use(bodyparser.json());
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/Employee');

var db=mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


app.post('/sign_up', (req,res)=>{

    var name=req.body.name;
    var email=req.body.email;
    var subject=req.body.class;
    var number=req.body.number;
    var userid=req.body.userid;
    var gender=req.body.gender;
    var password=req.body.password;
    var conform_password=req.body.conform_password;

    var data={
        "name": name,
        "email": email,
        "Class":subject,
        "number":number,
        "userid":userid,
        "gender":gender,
        "password":password,
        "conform_password":conform_password,
    }
     db.collection('Manager').insertOne(data,(err,collection)=>
     {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
     })

     return res.redirect("signup_success.html")

})


app.get('/',(req,res)=>{
    res.set({
        "Allow-access-ALLow-Origin":'*'
    })
   return res.redirect('index.html')
})




const port=process.env.Port || 5000;


app.listen(port,() => {
    console.log(`server is running at port no. ${port}`);
});