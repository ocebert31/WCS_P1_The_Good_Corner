import { Ad, AdCreate, PartialAdWithoutId } from "../types/ads.d";
import sqlite3 from "sqlite3";
import { Category } from "../types/categories"; 

export default class AdService {
    db: sqlite3.Database;
    constructor(){
        this.db = new sqlite3.Database("the_good_corner.sqlite")
    }
    async listAds() {
        return new Promise<Ad[]>((resolve, reject) => {
            this.db.all<Ad & { category: string }>(
                `SELECT ads.id, ads.title, ads.description, ads.price, ads.picture, ads.location, ads.author, JSON_OBJECT('id', categories.id, 'title', categories.title) AS category FROM ads INNER JOIN categories ON ads.category_id = categories.id`,
                (err, rows) => {
                    if (err) {
                        reject(err.message);
                    }
                    const formattedRows = rows.map((row) => ({
                        ...row,
                        category: JSON.parse(row.category),
                    }));
                    resolve(formattedRows);
                }
            );
        });
    }
    findAdById(id: string) {
        return new Promise<Ad & { category: Category }>((resolve, reject) => {
            this.db.get<Ad & { category: string }>(
                `SELECT ads.id, ads.title, ads.description, ads.price, ads.picture, ads.location, ads.author, JSON_OBJECT('id', categories.id, 'title', categories.title) AS category FROM ads INNER JOIN categories ON ads.category_id = categories.id WHERE ads.id = ?`,
                [id],
                function (err: any, row) {
                    if (err) {
                        reject(err.message);
                    }
                    if (!row) {
                        reject("L'annonce n'existe pas");
                    }
                    const formattedRow = {
                        ...row,
                        category: JSON.parse(row.category), 
                    };
                    resolve(formattedRow);
                }
            );
        });
    }
    async createdAd(ad: AdCreate<Ad>) {
        return new Promise((resolve, reject) => {
            this.db.run("INSERT INTO ads (title, description, price, picture, location, author, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)",[ad.title, ad.description, ad.price, ad.picture, ad.location, ad.author, ad.categoryId],
            function (err) {
                if (err) {
                    return reject(err.message);
                }
                resolve({...ad, id: `${this.lastID}`});
            });
        })
    }
    async deletedAd(id: string) {
        return new Promise<string>(async (resolve, reject) => {
            this.db.run("DELETE FROM ads WHERE id = ?", [id], async function (error) {
                if (error) {
                    reject(error);
                } else {
                    if (this.changes === 0) {
                        reject("L'annonce n'existe pas")
                    }
                    resolve(id);
                }
            });
        });
    }
    async updatedAd(id: string, ad: Partial<PartialAdWithoutId>) {
        return new Promise<Ad>(async (resolve, reject) => {
            try {
                const adFound = await this.findAdById(id);
                Object.keys(ad).forEach((k) => {
                if (ad[k]) {
                    adFound[k] = ad[k]; 
                }
                });
                this.db.run("UPDATE ads SET title = ?, description = ?, picture = ?, location = ?, price = ?, author = ?  WHERE id = ?",
                [adFound.title, adFound.description, adFound.picture, adFound.location, adFound.price, adFound.author,id,],
                function (err) {
                    if (err) {
                        reject("Il y a eu une erreur");
                    }
                    if(this.changes === 0) {
                        reject("L'annonce n'existe pas")
                    }
                    resolve(adFound);
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}








