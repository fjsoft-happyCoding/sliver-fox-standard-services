/*
 * @Author: RGXMG
 * @Email: rgxmg@foxmail.com
 * @Date: 2021-12-26 14:44:17
 * @LastEditTime: 2021-12-26 21:16:21
 * @LastEditors: RGXMG
 * @Description: 
 */
module.exports = {
  apps : [{
      name: "sf-standard",
      script: "./build/src/app.js",
      instances: 1,
      env: {
          NODE_ENV: "production",
      },
      exec_mode: 'cluster',
      out_file: '/usr/src/feijiuapp/.pm2/logs/'
  }]
}