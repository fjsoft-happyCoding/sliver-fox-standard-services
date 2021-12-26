/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-16 21:37:05
 * @LastEditTime: 2021-12-26 21:14:15
 * @LastEditors: RGXMG
 * @Description: 日志创建读取
 */
import dayjs from "dayjs";
import { Context, Next } from "koa";
import fs from "fs-extra";
import path from "path";

type ContextExtra = Context & { request: { body: Object } };

const splitSymbol = "====================================================================================";
/**
 * 创建文件名称
 * @param prefix 前缀
 */
function createFileName(prefix: string) {
  return path.join(
    __dirname,
    `./${prefix}/`,
    `${prefix}-${dayjs().format("YYYY-MM-DD")}.log`
  );
}

/**
 * 创建进入的的log项内容
 * @param req
 */
function createInLogItemContent(ctx: ContextExtra) {
  return `\r\n${splitSymbol}\r\n${dayjs().format("YYYY-MM-DD HH:mm:ss:SSS")}
  -->: ${ctx.method} ${ctx.url} querystring: ${
    ctx.request.querystring
  } requestBody: ${JSON.stringify(ctx.request.body)}
  ------------------------------------------------------------------------------------\r\n`;
}

/**
 * 创建进入的的log项内容
 * @param req
 */
function createOutLogItemContent(ctx: ContextExtra) {
  return `${dayjs().format("YYYY-MM-DD HH:mm:ss:SSS")}
  <--: ${ctx.method} ${ctx.status} ${ctx.url} ${JSON.stringify(ctx.body)}`;
}


/**
 * 错误日志
 * @param e
 */
 function logError(ctx: Context, e: string) {
  const contentItem = `${splitSymbol}\r\n${dayjs().format("YYYY-MM-DD HH:mm:ss:SSS")}
  ${ctx.method} ${ctx.status} ${ctx.url} ${JSON.stringify(ctx.body)} ${e}\r\n`;
  const filepath = createFileName("error");
  fs.ensureDirSync(filepath);
  fs.writeFile(filepath, contentItem, {
    encoding: "utf8",
    flag: "a+",
  });
}

/**
 * request日志
 * @param ctx
 */
function loggerIn(ctx: ContextExtra) {
  const contentItem = createInLogItemContent(ctx);
  const filepath = createFileName("access");
  fs.ensureDirSync(filepath);
  fs.writeFile(createFileName("access"), contentItem, {
    encoding: "utf8",
    flag: "a+",
  });
}

/**
 * response日志
 * @param ctx
 */
function loggerOut(ctx: ContextExtra) {
  const contentItem = createOutLogItemContent(ctx);
  const filepath = createFileName("access");
  fs.ensureDirSync(filepath);
  fs.writeFile(filepath, contentItem, {
    encoding: "utf8",
    flag: "a+",
  });
}

function middleware() {
  return async (ctx: ContextExtra, next: Next) => {
    loggerIn(ctx);
    await next();
    loggerOut(ctx);
  };
}

const object = {
  middleware,
  in: loggerIn,
  error: logError,
  out: loggerOut,
};
export default object;
