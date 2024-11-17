import { Router } from "express";
import CategoryService from "../services/category.services";
import { Category, PartialCategoryWithoutId } from "../types/categories";

const router = Router();

router.get("/list", async (req, res) => {
    try {
        const categoriesList = await new CategoryService().listCategories();
        res.send(categoriesList);
    } catch (err: any) {
        res.status(500).send({ message: err.message });
    }
  });;

router.get("/find/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const category = await new CategoryService().findCategoryById(id);
        res.send(category);
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
});

router.post("/create", async (req, res) => {
    const {id, title} : Category = req.body
    const category = {id, title};
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
    const { title}: PartialCategoryWithoutId = req.body;
    const category = { title };
    try {
        const categoryUpdate = await new CategoryService().updatedCategory(id, category);
        res.send(categoryUpdate);
    } catch (err: any) {
        res.status(500).send({ message: err.message});
    }
});

export default router;