/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-16 22:26:28
 * @LastEditTime: 2021-12-26 16:39:10
 * @LastEditors: RGXMG
 * @Description:
 */
import bodyParser from 'koa-bodyparser';
import Koa from 'koa';
import logger from '../../logs'
import response from "./response.middleware";

function createMiddlewares(app: Koa) {
  // request body解析
  app.use(bodyParser());
  // 日志
  app.use(logger.middleware());
  // 成功响应 注入ctx.success函数
  app.use(response.success);
  // // 响应失败 注入ctx.failure函数
  app.use(response.failure);
}
export default createMiddlewares;
