/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-15 22:00:47
 * @LastEditTime: 2021-12-26 21:15:41
 * @LastEditors: RGXMG
 * @Description: 项目主入口
 */

import Koa from 'koa';
import logger from 'koa-logger';
import dayjs from 'dayjs';
import createRouter from './router';
import createMiddlewares from './middlewares';

const app = new Koa()

// 开发环境下的打印
if (process.env.NODE_ENV === 'development') {
  app.use(logger((str) => {
    console.log(str, dayjs().format('YYYY-MM-DD HH:mm:ss'));
  }));
}


// 创建中间件
createMiddlewares(app);

// 创建路由
createRouter(app);

// 监听错误
app.on('error', (error, ctx) => {
  console.log('服务器响应失败：', error);
  ctx.failure('服务器响应失败', '500');
});
app.listen(3000, () => {
  console.log('服务已启动！');
});

