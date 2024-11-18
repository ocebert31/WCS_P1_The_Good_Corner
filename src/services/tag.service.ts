import TagRepository from "../repositories/Tag.repository";
import TagEntity from "../entities/Tag.entity";

export default class TagService {
    db: TagRepository;
    constructor(){
        this.db = new TagRepository();
    }
    async listTags() {
        return await this.db.find()
    }
    async findTagById(id: string){
        const tag = await this.db.findOne({ where: { id } });
        if (!tag) {
            throw new Error("Le tag n'existe pas");
        }
        return tag;
    }
    async createdTag(tag: Omit<TagEntity, "id" | "created_at" | "updated_at">) {
        const newTag = await this.db.save(tag)
        return newTag;
    }
    async deletedTag(id: string) {
        const deletedTag = await this.db.delete({ id });
        if (deletedTag.affected === 0) {
            throw new Error("Le tag n'existe pas");
        }
        return id;
    }
    async updatedTag(id: string, tag: Partial<Omit<TagEntity, "id">>) {
        const tagFound = await this.findTagById(id);
        const tagUpdate = this.db.merge(tagFound, tag)
        return await this.db.save(tagUpdate);
    }
}