import { ITodoApi } from "@/app/ctypes"
import { TodoJsonApi } from "./todoJsonApi"
import { TodoMongoApi } from "./todoMongoApi"
import { delay } from "../utils"
import { REGULAR_DURATION } from "../constants"
export class ServerTodoFactory {
  private static apiInstance: ITodoApi | null = null

  static async getApi(): Promise<ITodoApi> {

    if (process.env.DATA_SOURCE_TYPE === "MONGODB") {
      this.apiInstance = new TodoMongoApi()
    } else {
      this.apiInstance = new TodoJsonApi("todos.json")
    }

    await this.apiInstance.initialize()
    return this.withDelay(this.apiInstance, REGULAR_DURATION)
 
  }

  private static withDelay<T extends ITodoApi>(api: T, delayMs: number): ITodoApi {
    return new Proxy(api, {
      get(target, prop, receiver) {
        const original = Reflect.get(target, prop, receiver)
        if (typeof original === "function") {
          return async (...args: any[]) => {
            await delay(delayMs)
            return original.apply(target, args)
          }
        }
        return original
      },
    })
  }
}
