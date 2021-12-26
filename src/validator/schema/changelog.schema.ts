/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-18 17:29:47
 * @LastEditTime: 2021-12-18 22:20:52
 * @LastEditors: RGXMG
 * @Description: changelog的描述schema
 */
import Joi from "joi";

// scope
const scope = Joi.string().min(2).required();

// 访问密匙
const secretKey = Joi.string().required().valid('123456').error(new Error('非法访问！'))

const appendChangelogSchema = Joi.object({
  scope,
  secretKey,
  content: Joi.string().required(),
});

const getChangelogSchema = Joi.object({
  scope,
  secretKey,
});

const deleteChangelogSchema = Joi.object({
  scope,
  secretKey,
});

export { appendChangelogSchema, getChangelogSchema, deleteChangelogSchema };
