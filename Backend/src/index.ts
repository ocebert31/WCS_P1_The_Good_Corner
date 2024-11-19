import "reflect-metadata"
import express from "express";
import adsRouter from "./routes/ads.routes";
import categoriesRouter from "./routes/categories.routes";
import tagsRouter from "./routes/tags.routes";
import datasource from "./lib/datasource";
import cors from "cors";

const app = express();

app.use(cors({origin: ["http://localhost:5173"]}))
app.use(express.json());

app.use("/ads", adsRouter)
app.use("/categories", categoriesRouter)
app.use("/tags", tagsRouter)

app.listen(4000, async () => {
    await datasource.initialize();
    console.log("le serveur est lancé sur le port 4000");
})

