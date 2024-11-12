import express from "express";
import adsRouter from "./routes/ads.routes";

const app = express();

app.use(express.json());

app.use("/ads", adsRouter)

app.listen(4000, async () => {
    console.log("le serveur est lancé sur le port 4000");
})

