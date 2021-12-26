/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-18 15:35:41
 * @LastEditTime: 2021-12-18 17:56:53
 * @LastEditors: RGXMG
 * @Description:
 */
import Router from "koa-router";
import { DefaultState, Context } from "koa";
import {
  appendChangelog,
  getChangelog,
  deleteChangelog,
} from "../controller/changelog/index.controller";
import validator, {
  appendChangelogSchema,
  deleteChangelogSchema,
  getChangelogSchema,
} from "../validator";

/** 
 * 注册
 * @param router
 */
function registerChangelogRouter(router: Router<DefaultState, Context>) {
  router.get("/changelog", validator(getChangelogSchema), async (ctx, next) => {
    await getChangelog(ctx);
    await next();
  });

  router.patch(
    "/changelog",
    validator(appendChangelogSchema),
    async (ctx, next) => {
      await appendChangelog(ctx);
      await next();
    }
  );

  router.delete(
    "/changelog",
    validator(deleteChangelogSchema),
    async (ctx, next) => {
      await deleteChangelog(ctx);
      await next();
    } 
  );
}

export default registerChangelogRouter;
