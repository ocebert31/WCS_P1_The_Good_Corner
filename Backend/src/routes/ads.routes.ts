import { Router } from "express";
import AdService from "../services/ad.service";
import AdEntity from "../entities/Ad.entity";

const router = Router();

router.get("/list", async (req, res) => {
    try {
        const adsList = await new AdService().listAds();
        res.send(adsList);
    } catch (err: any) {
        res.status(500).send({ message: err.message });
    }
});

router.get("/find/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const ad = await new AdService().findAdById(id);
        res.send(ad);
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
});

router.post("/create", async (req, res) => {
    const {title, description, price, picture, location, author, category, tagsIds } : Omit<AdEntity, "id" | "created_at" | "updated_at" | "tags"> & {tagsIds: string[];} = req.body;
    const ad = {title, description, price, picture, location, author, category, tagsIds: tagsIds ?? []};
    try {
        const newAd = await new AdService().createdAd(ad)
        res.send(newAd);
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
})

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const adDelete = await new AdService().deletedAd(id)
        res.status(200).send({ message: "Annonce supprimée avec succès", adDelete });
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
})

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, picture, location, price, author, tagsIds }: Partial<Omit<AdEntity, "id" | "tags">  & {tagsIds: string[];}> = req.body;
    const ad = { title, description, picture, location, price, author, tagsIds };
    try {
        const adUpdate = await new AdService().updatedAd(id, ad);
        res.send(adUpdate);
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
  });

export default router;






















