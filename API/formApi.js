const expressAsyncHandler = require("express-async-handler");
const exp=require("express");

formApp=exp.Router();

formApp.use(exp.json());

formApp.post("/add-data",expressAsyncHandler(async(request,response)=>{
    const dataCollectionObject=request.app.get("dataCollectionObject");
    const data=request.body;
    await dataCollectionObject.insertOne(data);
    response.send({message:"Data submitted successfully"});
}))

module.exports=formApp;