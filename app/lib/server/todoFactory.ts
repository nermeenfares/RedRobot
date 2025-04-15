import { ITodoApi } from "@/app/ctypes"
import { TodoJsonApi } from "./todoJsonApi"
import { TodoMongoApi } from "./todoMongoApi"
import { delay } from "../utils"
import { REGULAR_DURATION } from "../constants"
export class ServerTodoFactory {
  static async getApi(): Promise<ITodoApi> {
    let api: ITodoApi | null = null

    if (process.env.DATA_SOURCE_TYPE === "MONGODB") {
      api = new TodoMongoApi()
    } else {
      api = new TodoJsonApi('todos.json')
    }

 await  api.initialize()
return  this.withDelay(api, REGULAR_DURATION)
  }

  private static withDelay<T extends object>(api: T, delayMs: number): T {
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
      }})
    }
       }
     
