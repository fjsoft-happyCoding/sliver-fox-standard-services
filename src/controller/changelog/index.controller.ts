/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-18 15:10:50
 * @LastEditTime: 2021-12-25 21:10:36
 * @LastEditors: RGXMG
 * @Description: 更新日志的控制器
 */

import { Context } from "koa";
import fs from "fs-extra";
import path from "path";
import dayjs from "dayjs";

function getFilePath(prefix: string) {
  return path.join(__dirname, "./md", prefix + "_CHANGELOG.md");
}

/**
 * 追加changelog
 * @param ctx
 */
async function appendChangelog(ctx: Context) {
  try {
    const {
      request: { body },
    } = ctx;
    fs.writeFileSync(
      getFilePath(body.scope),
      `\r\n\r\n${ctx.request.body.content}`,
      {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666,
      }
    );
    ctx.query = ctx.request.query = body;
    getChangelog(ctx);
  } catch (e) {
    ctx.failure("追加changelog失败！");
  }
}

/**
 * 获取changelog
 * @param ctx
 */
async function getChangelog(ctx: Context) {
  try {
    const {
      request: { query },
    } = ctx;
    ctx.success({
      scope: query.scope,
      content: fs.readFileSync(getFilePath(query.scope as string), "utf8"),
    });
  } catch (error) {
    const {
      request: { query },
    } = ctx;
    console.log(error);
    ctx.success({ scope: query.scope, content: null });
  }
}

/**
 * 删除changelog
 * @param ctx
 */
function deleteChangelog(ctx: Context) {
  try {
    const {
      request: { body },
    } = ctx;
    fs.renameSync(
      getFilePath(body.scope),
      getFilePath(`back_${body.scope}_${dayjs().format("YYYY-MM-DD_HH.mm.ss")}`)
    );
  } catch (e) {}
}

export { appendChangelog, getChangelog, deleteChangelog };
