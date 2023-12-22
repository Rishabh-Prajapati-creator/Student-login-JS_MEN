const express=require('express');
require('./public/config')
const Product=require('./public/Product');
const app=express();

app.use(express.json());

app.get('/login',async(req,res)=>{
    var userid=req.body.userid;
    var password=req.body.password;
    let data=await db.collection("forms").find(
        {
            "$or":[
                {"userid":{$regex:userid}},
                {"password":{$regex:password}},
            ]
        }
    )
   
    res.send(data);
})

app.get('/',(req,res)=>{
    res.set({
        "Allow-access-ALLow-Origin":'*'
    })
   return res.redirect('login.html')
})


const port=process.env.Port || 4000;


app.listen(port,() => {
    console.log(`server is running at port no. ${port}`);
});