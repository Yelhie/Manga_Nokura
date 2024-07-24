export interface DBConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  dialect: "postgres";
  models: string[];
}
