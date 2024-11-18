import { PartialAdWithoutId } from "../types/ads.d"; 
import AdRepository from "../repositories/Ad.repository";
import AdEntity from "../entities/Ad.entity";

export default class AdService {
    db: AdRepository;
    constructor(){
        this.db = new AdRepository();
    }
    async listAds() {
        return await this.db.find({relations: ["category"]})
    }
    async findAdById(id: string){
        const ad = await this.db.findOne({ where: { id }, relations: ["category"], });
        if (!ad) {
            throw new Error("L'annonce n'existe pas");
        }
        return ad;
    }
    async createdAd(ad: Omit<AdEntity, "id" | "created_at" | "updated_at">) {
        const newAd = await this.db.save({...ad,})
        return newAd;
    }
    async deletedAd(id: string) {
        const deletedAd = await this.db.delete({ id });
        if (deletedAd.affected === 0) {
            throw new Error("L'annonce n'existe pas");
        }
        return id;
    }
    async updatedAd(id: string, ad: Partial<Omit<AdEntity, "id">>) {
        const adFound = await this.findAdById(id);
        const adUpdate = this.db.merge(adFound, ad)
        return await this.db.save(adUpdate);
    }
}








