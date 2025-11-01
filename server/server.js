import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config({path:"./.env"})
const app = express();
app.use(cors());
app.use(express.json());

app.post("/enviar", async (req,res)=>{
    const {name, lastname, email, content, message} = req.body;

    const tranporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER ,
            pass: process.env.EMAIL_PASS
        }
    });

    try {   
        await tranporter.sendMail({
            from: email,
            to: process.env.EMAIL_USER,
            subject:`sobre ${content}`,
            text: `
                nome: ${name}
                sobrenome:${lastname}
                menssagem:${message}
            `
        });

        res.send({message: "E-mail enviado pelo servidor"})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Erro ao enviar o E-mail pelo servidor!", })
    }
});

const PORT = process.env.PORT
app.listen(PORT, ()=>console.log(`servidor rodando em http://localhost:${PORT}`))