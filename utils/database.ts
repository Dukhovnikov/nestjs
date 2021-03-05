require('dotenv').config();
import { Collection, MongoClient } from "mongodb";
import { Action } from "src/types/action";
import { Container } from "../src/types/container";


export interface Database {
  containers: Collection<Container>;
  actions: Collection<Action>
}

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true });
  const db = client.db('containers_test');

  return {
    containers: db.collection<Container>("containers"),
    actions: db.collection<Action>("actions"),
  }
};
