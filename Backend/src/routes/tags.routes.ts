import { Router } from "express";
import TagService from "../services/tag.service";
import TagEntity from "../entities/Tag.entity";

const router = Router();

router.get("/list", async (req, res) => {
    try {
        const tagsList = await new TagService().listTags();
        res.send(tagsList);
    } catch (err: any) {
        res.status(500).send({ message: err.message });
    }
});

router.get("/find/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const tag = await new TagService().findTagById(id);
        res.send(tag);
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
});

router.post("/create", async (req, res) => {
    const {label} : Omit<TagEntity, "id" | "created_at" | "updated_at"> = req.body
    const tag = {label};
    try {
        const newTag = await new TagService().createdTag(tag)
        res.send(newTag);
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
})

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const tagDelete = await new TagService().deletedTag(id)
        res.status(200).send({ message: "Tag supprimé avec succès", tagDelete });
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
})

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { label }: Partial<Omit<TagEntity, "id">> = req.body;
    const tag = { label };
    try {
        const tagUpdate = await new TagService().updatedTag(id, tag);
        res.send(tagUpdate);
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
  });

export default router;