import {SkillzboxDatabaseKnex} from "../database/skillzboxDatabaseKnex";
import {IModelUser} from "./user/iModelUser";

export abstract class AbstractModel {
  protected schemeName: string;
  protected instance = SkillzboxDatabaseKnex.getInstance();

  protected constructor(schemeName: string) {
    this.schemeName = schemeName;
  }

  public select() {
  }

  public insert(user: IModelUser) {
    console.log(user);
    this.instance(this.schemeName).insert(user).then(() => {
      console.log("inserted");
    }).catch((err: any) => {
      console.log(err);
    });
  }

  public multiInsert(users: IModelUser[]) {
    this.instance(this.schemeName).insert([users]);

  }

  public update() {

  }

  public multiUpdate() {

  }

  public delete() {

  }

}
