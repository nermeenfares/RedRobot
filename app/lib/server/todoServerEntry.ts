"use server";

import { ServerTodoFactory } from "./serverTodoFactory";

export const getServerTodoApi = () => ServerTodoFactory.getApi();
