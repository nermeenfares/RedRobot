import { ITodoApi } from "@/app/ctypes";
import { TodoJsonApi } from "./todoJsonApi";
import { TodoMongoApi } from "./todoMongoApi";

export class TodoFactory {
    static getApi(): ITodoApi {
        if (process.env.DATA_SOURCE_TYPE === "MONGODB") {
            return new TodoMongoApi(); 
        } else {
            return new TodoJsonApi();  
        }
    }
}