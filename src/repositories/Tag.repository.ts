import { Repository } from "typeorm";
import datasource from "../lib/datasource";
import TagEntity from "../entities/Tag.entity";

export default class TagRepository extends Repository<TagEntity> {
  constructor() {
    super(TagEntity, datasource.createEntityManager());
  }

  /**======================
   *?    On pourra rajouter de nouvelles fonctions à notre catalogue de requêtes
   *========================**/

  
}