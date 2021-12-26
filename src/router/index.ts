/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-18 15:40:33
 * @LastEditTime: 2021-12-18 17:01:02
 * @LastEditors: RGXMG
 * @Description:
 */
import Koa, { DefaultState, Context } from "koa";
import KoaRouter from "koa-router";
import registerRoutes from "./routes.router";

/**
 * 注册路由
 * @param app
 */
function createRouter(app: Koa) {
  const router = new KoaRouter<DefaultState, Context>();
  
  registerRoutes(router);

  app.use(router.routes());
  // 原先当路由存在，请求方式不匹配的时候，会报 404，
  // 加了这个中间件，会报请求方式不被允许
  app.use(router.allowedMethods());
}

export default createRouter;
