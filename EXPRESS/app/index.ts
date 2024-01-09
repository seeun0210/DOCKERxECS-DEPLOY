import express from "express"
import * as redis from "redis"
const PORT=4000;
const LIST_KEY="messages";

const createApp=async ()=>{
    const app=express();

const client=redis.createClient({url:"redis://localhost:6379"})
await client.connect();
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).send("hello from express")
})
app.post("/messages",async(req,res)=>{
    const{message}=req.body;
    await client.lPush(LIST_KEY,message);
    res.status(200).send("Message added to list");
})
app.get("/messages",async(req,res)=>{
    const messages=await client.lRange(LIST_KEY,0,-1);
    res.status(200).send(messages);
})
return app;
}
createApp().then((app)=>{
    app.listen(PORT,()=>{
        console.log(`Àpp listening at port ${PORT}`)
    })
})
