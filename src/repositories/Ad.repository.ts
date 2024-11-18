import { Repository } from "typeorm";
import AdEntity from "../entities/Ad.entity";
import datasource from "../lib/datasource";

export default class AdRepository extends Repository<AdEntity> {
    constructor() {
        super(AdEntity, datasource.createEntityManager());
    }
    // async findAdWithCategory() {
    //     return await this.findOne({relations: ["category"]});
    // }
}
