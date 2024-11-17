import { Category, PartialCategoryWithoutId} from "../types/categories.d";
import sqlite3 from "sqlite3";

export default class CategoryService {
    db: sqlite3.Database;
    constructor(){
        this.db = new sqlite3.Database("the_good_corner.sqlite")
    }
    async listCategories() {
        return new Promise<Category[]>((resolve, reject) => {
            this.db.all<Category>("SELECT * FROM categories", (err, rows) => {
                if (err) {
                    reject(err.message);
                }
                resolve(rows);
            }); 
        });
    }
    findCategoryById(id: string) {
        return new Promise<Category>((resolve, reject) => {
          this.db.get<Category>("SELECT * FROM categories WHERE id = ?",[id], (err: any, row) => {
              if (err) {
                reject(err.message);
              }
              resolve(row);
            });
        });
    }
    async createdCategory (category: Category): Promise<Category> {
        return new Promise((resolve, reject) => {
            this.db.run("INSERT INTO categories (title) VALUES (?)",[category.title],
            function (err) {
                if (err) {
                    return reject(err.message);
                }
                resolve({...category});
            });
        })
    }
    async deletedCategory(id: string) {
        return new Promise<string>(async (resolve, reject) => {
            this.db.run("DELETE FROM categories WHERE id = ?", [id], async function (error) {
                if (error) {
                    reject(error);
                } else {
                    if (this.changes === 0) {
                        reject("La catégorie n'existe pas")
                    }
                    resolve(id);
                }
            });
        });
    }
    async updatedCategory(id: string, category: Partial<PartialCategoryWithoutId>) {
        return new Promise<Category>(async (resolve, reject) => {
            try {
                const categoryFound = await this.findCategoryById(id);
                Object.keys(category).forEach((k) => {
                if (category[k]) {
                    categoryFound[k] = category[k]; 
                }
                });
                this.db.run("UPDATE categories SET title = ? WHERE id = ?",
                [categoryFound.title, categoryFound.id],
                function (err) {
                    if (err) {
                        reject("Il y a eu une erreur");
                    }
                    if(this.changes === 0) {
                        reject("La catégorie n'a pas été modifiée")
                    }
                    resolve(categoryFound);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    
}