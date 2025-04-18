"use client"

import { ITodoApi } from "@/app/ctypes"
import { TodoLocalStorageApi } from "./todoLocalStorageApi"
import { delay } from "../utils"
import { REGULAR_DURATION } from "../constants"

export class ClientTodoFactory {
  private static apiInstance: ITodoApi | null = null

  static async getApi(): Promise<ITodoApi> {
    if (!this.apiInstance) {
      const api = new TodoLocalStorageApi()
      await api.initialize()
      this.apiInstance = this.withDelay(api, REGULAR_DURATION)
    }
    return this.apiInstance
  }

  private static withDelay<T extends ITodoApi>(api: T, delayMs: number): T {
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
