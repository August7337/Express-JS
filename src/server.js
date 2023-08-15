import fastify from "fastify"
import fastifyView from "@fastify/view"
import ejs from 'ejs'

const app = fastify()

app.register(fastifyView, {  
     engine: { ejs: ejs }, 
 });

 app.get("/", async function(req, res) {  
    try {  
        const data = { 
            config: config, 
            user: getUser(req.session.get("user")?.id), 
            page: "home"
        }; 
 
        return res.status(200).view("../templates/index.ejs", { data: data }); 
    } catch(err) {  
        console.error(err); 
        return res.status(500).send({"message": "[500] InternalServerError - An error was occured"}); 
    }; 
});