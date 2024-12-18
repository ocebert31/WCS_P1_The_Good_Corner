import { DataSource } from "typeorm";
import AdEntity from "../entities/Ad.entity";
import CategoryEntity from "../entities/Category.entity";
import TagEntity from "../entities/Tag.entity";

export default new DataSource({
    type:"sqlite",
    database:"the_good_corner-orm.sqlite",
    entities: [AdEntity, CategoryEntity, TagEntity],
    synchronize: true, // à ne pas utiliser en production
    logging: ["error", "query"] // permet de voir les requetes sql jouées dans le terminal
})