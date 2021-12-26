/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-18 13:49:22
 * @LastEditTime: 2021-12-18 15:02:39
 * @LastEditors: RGXMG
 * @Description: koa声明垫片
 */
import { DefaultContext } from 'koa';
import { IFailureFunc, ISuccessFunc } from '@/middlewares/response.middleware';

declare module koa {
  interface DefaultContext {
    success: IFailureFunc;
    failure: IFailureFunc;
  }
}