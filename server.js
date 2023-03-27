const exp=require("express")

app=exp();

app.use(exp.json());

formApp=require("./API/formApi");

require("dotenv").config();

DBurl=process.env.DBURL;

const mclient=require("mongodb").MongoClient;

const path=require("path");

app.use(exp.static(path.join(__dirname,'./build')));

mclient.connect(DBurl)
.then((client)=>{
    const dbobj=client.db("formData");
    const dataCollectionObject=dbobj.collection("dataCollection");
    app.set("dataCollectionObject",dataCollectionObject);
    console.log("DB connection success");
})
.catch((error)=>{
    console.log("Error in DB connection ",err);
})

app.use("/form-api",formApp);

app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
})

app.use((request,response,next)=>{
    response.send({message:`path ${requsest.url} is invalid`})
})
app.use((error,request,response,next)=>{
    response.send({message:error.message})
})

app.listen(process.env.PORT,()=>{
    console.log("Server listening on port number 4000");
})

