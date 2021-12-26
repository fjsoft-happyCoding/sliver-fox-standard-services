/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-18 17:30:06
 * @LastEditTime: 2021-12-26 21:16:11
 * @LastEditors: RGXMG
 * @Description:
 */

import { Schema } from "joi";
import { Context, Next } from "koa";
export * from "./schema";

/**
 * 参数验证器
 * @param schema
 * @param ctx
 * @param next
 * @returns
 */
function validator(...schema: Schema[]) {
  return (ctx: Context, next: Next) => {
    let data = ctx.method === "GET" ? ctx.request.query : ctx.request.body;
    if (typeof data !== "object") return next();

    const errorList: Array<Error> = [];
    for (const i of schema) {
      const { error } = i.validate(data, {
        allowUnknown: true,
      });
      error && errorList.push(error);
    }
    if (errorList.length) {
      return ctx.failure(errorList.map((i) => i.message).join());
    }
    return next();
  };
}

export { validator as default };
