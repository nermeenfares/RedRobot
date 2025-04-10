import { ITodoApi } from "@/app/ctypes"
import { TodoJsonApi } from "./todoJsonApi"
import { TodoMongoApi } from "./todoMongoApi"

export class TodoFactory {
  static getApi(): ITodoApi {
    let api: ITodoApi | null = null

    if (process.env.DATA_SOURCE_TYPE === "MONGODB") {
      api = new TodoMongoApi()
      api.initialize()
    } else {
      api = new TodoJsonApi('todos.json')
      api.initialize()
    }

 
    return api
  }
}
