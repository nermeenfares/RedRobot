'use server';

import { ServerTodoFactory } from "./todoFactory";

export const getServerTodoApi = () => ServerTodoFactory.getApi();