import { DataSource } from "typeorm";

export default new DataSource({
  type: "sqlite",
  database: "countries.sqlite",
  entities: ["src/entities/*.ts"],
  synchronize: true,
});