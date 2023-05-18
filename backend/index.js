import 'dotenv/config'
import "./database/connectdb.js"
import express from 'express';
import linkRouter from "./routes/link.route.js"

const app = express();

app.use(express.json())

app.use(express.static('public'))

app.use('/api/v1/links', linkRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("hola", "http://localhost:5000/index.html"));