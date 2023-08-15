import fastify from "fastify"
import fastifyView from "@fastify/view"
import ejs from 'ejs'

const app = fastify()

app.register(fastifyView, {  
     engine: { ejs: ejs }, 
 });

 console.log('test');

 app.get("/", async function(req, res) {  
    try {
        return res.status(200).view("../templates/index.ejs", { data: "data" }); 
        console.log('send');
    } catch(err) {  
        console.error(err); 
        return res.status(500).send({"message": "[500] InternalServerError - An error was occured"}); 
    }; 
});