/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-18 21:14:28
 * @LastEditTime: 2021-12-18 21:30:45
 * @LastEditors: RGXMG
 * @Description: 
 */

const fs = require('fs-extra');
const path = require('path');
const dayjs = require('dayjs');

function getFilePath(prefix) {
  return path.join(__dirname, prefix + "1.md");
}

function clearChangelog(ctx) {
  const {
    request: { body },
  } = ctx;
  fs.renameSync(getFilePath(body.scope), getFilePath(`back_${body.scope}${dayjs().format('YYYY-MM-DD HH.mm.ss')}`));
}
clearChangelog({ request: { body: { scope: '' } } });