import AdRepository from "../repositories/Ad.repository";
import AdEntity from "../entities/Ad.entity";
import TagEntity from "../entities/Tag.entity";
import TagService from "./tag.service";

export default class AdService {
    db: AdRepository;
    constructor(){
        this.db = new AdRepository();
    }
    async listAds() {
        return await this.db.find({relations: ["category", "tags"]})
    }
    async findAdById(id: string){
        const ad = await this.db.findOne({ where: { id }, relations: ["category", "tags"], });
        if (!ad) {
            throw new Error("L'annonce n'existe pas");
        }
        return ad;
    }
    async createdAd({tagsIds,...ad}: Omit<AdEntity, "id" | "created_at" | "updated_at" | "tags"> & {tagsIds: string[];}) {
        let tags: TagEntity[] = [];
        if (tagsIds.length > 0) {
            tags = await new TagService().findMultipleTagsByIds(tagsIds);
            console.log("%c⧭", "color: #917399", tags);
        }
        const newAd = await this.db.save({...ad, tags,});
        return newAd;
    }
    async deletedAd(id: string) {
        const deletedAd = await this.db.delete({ id });
        if (deletedAd.affected === 0) {
            throw new Error("L'annonce n'existe pas");
        }
        return id;
    }
    async updatedAd(id: string,{tagsIds,...ad}: Partial<Omit<AdEntity, "id" | "tags"> & {tagsIds: string[];}>) {
        let tags: TagEntity[] = [];
        if (tagsIds && tagsIds.length > 0) {
          tags = await new TagService().findMultipleTagsByIds(tagsIds);
        }
        const adFound = await this.findAdById(id);
        const adUpdate = this.db.merge(adFound, { ...ad, tags }); 
        return await this.db.save(adUpdate);
      }
}