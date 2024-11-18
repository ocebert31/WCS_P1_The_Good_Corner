import CategoryRepository from "../repositories/Category.repository";
import CategoryEntity from "../entities/Category.entity";

export default class CategoryService {
    db: CategoryRepository;
    constructor(){
        this.db = new CategoryRepository();
    }
    async listCategories() {
        return await this.db.find();
    }
    async findCategoryById(id: string, limit?: string) {
        let category: CategoryEntity | null;
        if (limit) { 
            category = await this.db.findCategoryByIdWithLimitAds(id, limit);
        } else {
            category = await this.db.findOne({ where: { id } });
        }
        if (!category) {
            throw new Error("La catégorie n'existe pas");
        }
        return category;
    }
    async createdCategory (category: Omit<CategoryEntity, "id" | "created_at" | "updated_at" | "ads">) {
        const newCategory = await this.db.save(category)
        return newCategory
    }
    async deletedCategory(id: string) {
        const deletedCategory = await this.db.delete({ id });
        if (deletedCategory.affected === 0) {
            throw new Error("La catégorie n'existe pas");
        }
        return id;
    }
    async updatedCategory(id: string, category: Partial<Omit<CategoryEntity, "id">>) {
        const categoryFound = await this.findCategoryById(id);
        const categoryUpdate = this.db.merge(categoryFound, category)
        return await this.db.save(categoryUpdate);
    }
}