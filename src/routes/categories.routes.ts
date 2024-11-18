import { Router } from "express";
import CategoryService from "../services/category.services";
import CategoryEntity from "../entities/Category.entity";

const router = Router();

router.get("/list", async (req, res) => {
    try {
        const categoriesList = await new CategoryService().listCategories();
        res.send(categoriesList);
    } catch (err: any) {
        res.status(500).send({ message: err.message });
    }
});;

router.get("/find/:id/:limit?", async (req, res) => {
    const { id, limit } = req.params;
    try {
        const category = await new CategoryService().findCategoryById(id, limit);
        res.send(category);
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
});

router.post("/create", async (req, res) => {
    const {title} : Omit<CategoryEntity, "id" | "created_at" | "updated_at"> = req.body
    const category = {title};
    try {
        const newCategory = await new CategoryService().createdCategory(category);
        res.send(newCategory);
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
})

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const categoryDelete = await new CategoryService().deletedCategory(id)
        res.status(200).send({ message: "Categorie supprimée avec succès", categoryDelete });
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
})

router.patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { title}: Omit<CategoryEntity, "id"> = req.body;
    const category = { title };
    try {
        const categoryUpdate = await new CategoryService().updatedCategory(id, category);
        res.send(categoryUpdate);
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
});

export default router;