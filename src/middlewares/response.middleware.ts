/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-15 22:19:49
 * @LastEditTime: 2021-12-19 15:14:03
 * @LastEditors: RGXMG
 * @Description:
 */
import logger from "../../logs";
import { Context, Next } from "koa";

export interface ISuccessFunc {
  (data: any, code?: Number, errorMsg?: string): void;
}

export interface IFailureFunc {
  (err: Error | string, code?: Number) : void;
}

/**
 * response处理器
 * @param ctx 
 * @param next 
 * @returns 
 */
async function responseHandler(ctx: Context, next: Next) {
  const onSuccess: ISuccessFunc = async (data, Msg) => {
    ctx.status = 200;
    ctx.type = "json";
    ctx.body = {
      code: 200,
      msg: Msg || "成功",
      data: data,
    };
  };
  ctx.success = onSuccess;
  await next();

  // 兜底处理
  if (ctx.status === 404 && !ctx.body) {
    onSuccess(null);
  }
};

/**
 * 错误处理
 * @param ctx 
 * @param next 
 * @returns 
 */
function errorHandler(ctx: Context, next: Next){
  const failure: IFailureFunc = (err, code) => {
    ctx.status = 200;
    // 取出争取的msg
    const errorMsg = err instanceof Error ? process.env.NODE_ENV === 'development' ? err.message.trim() : '服务端错误，请联系管理员！' : err;
    // 日志打印
    logger.error(ctx, (err as Error)?.message || err as string);
    ctx.body = {
      code: code || -1,
      data: null,
      msg: errorMsg || "未知原因失败",
    };
    return Promise.resolve();
  };
  ctx.failure = failure;
  return next().catch((err) => failure(err));
};

const object = {
  success: responseHandler,
  failure: errorHandler,
};
export default object;
