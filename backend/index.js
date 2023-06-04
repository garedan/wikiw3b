import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.router.js";
import cors from "cors";

const app = express();

const whiteList = [process.env.ORIGIN1];


app.use(
    cors({
        origin: function(origin, callback) {
            if (whiteList.includes(origin)) {
                return callback(null, origin);
            }
            return callback("No autorizado por CORS" );
        },
    })
);


app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1/links", linkRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("hola", "http://localhost:5000/index.html"));
