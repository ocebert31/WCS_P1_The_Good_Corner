import "reflect-metadata"
import express from "express";
import adsRouter from "./routes/ads.routes";
import categoriesRouter from "./routes/categories.routes";
import datasource from "./lib/datasource";

const app = express();

app.use(express.json());

app.use("/ads", adsRouter)
app.use("/categories", categoriesRouter)

app.listen(4000, async () => {
    await datasource.initialize();
    console.log("le serveur est lancé sur le port 4000");
})

