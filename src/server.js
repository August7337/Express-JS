import fastify from "fastify"
import fastifyView from "@fastify/view"
import ejs from 'ejs'

const app = fastify()

app.register(fastifyView, {  
     engine: { ejs: ejs }, 
 });

app.get("/", (req, res) => {
    return res.view("templates/index.ejs", {title: "truc"});
});

const start = async () => {
    try {
        await app.listen({port: 3000})
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

start()