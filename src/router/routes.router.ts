/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-18 15:44:55
 * @LastEditTime: 2021-12-18 16:03:42
 * @LastEditors: RGXMG
 * @Description: 
 */

import { DefaultState, Context } from "koa";
import Router from "koa-router";
import registerChangelogRouter from "./changelog.router";


export default (router: Router<DefaultState, Context>) =>  {
  registerChangelogRouter(router);
}