import { ITodoApi } from "@/app/ctypes";

import { getClientTodoApi } from "./client/todoClientEntry";
import { getServerTodoApi } from "./server/todoServerEntry";

export async function getTodoApi(): Promise<ITodoApi> {
  if (typeof window === "undefined") {
    return getServerTodoApi();
  } else {
    return getClientTodoApi();
  }
}
