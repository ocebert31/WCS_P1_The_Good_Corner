import { DataSource } from "typeorm";

export default new DataSource({
    type:"sqlite",
    database:"the_good_corner-orm.sqlite",
    entities: [],
    synchronize: true, // à ne pas utiliser en production
    logging: ["error", "query"] // permet de voir les requetes sql jouées dans le terminal
})