import { series } from 'async';
import { exec } from 'child_process';

let { hookUrl } = process.env;
let { baseUrl } = process.env;

if (!hookUrl) {
  hookUrl = 'https://epj.audifire.ch';
}
if (!baseUrl) {
  baseUrl = '';
}

series([
  (cb) => {
    exec(`npx @rtk-incubator/rtk-query-codegen-openapi --file ./src/gen/timeTrack.api.generated.ts --baseQuery ./src/service/apiBaseQuery.ts:apiBaseQuery --hooks ${hookUrl}/time/swagger/v1/swagger.json --reducerPath timeTrackApi --baseUrl ${baseUrl}/time`,
      (error) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log('\x1b[32m%s\x1b[0m', 'timeTrack-api generated!');
      });
    console.log('\x1b[32m%s\x1b[0m', 'timeTrack-api will be generated...');
    cb();
  },
  (cb) => {
    exec(`npx @rtk-incubator/rtk-query-codegen-openapi --file ./src/gen/dashboard.api.generated.ts --baseQuery ./src/service/apiBaseQuery.ts:apiBaseQuery --hooks ${hookUrl}/dash/swagger/v1/swagger.json --reducerPath dashboardApi --baseUrl ${baseUrl}/dash`,
      (error) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log('\x1b[32m%s\x1b[0m', 'dashboard-api generated!');
      });
    console.log('\x1b[32m%s\x1b[0m', 'dashboard-api will be generated...');
    cb();
  },
  (cb) => {
    exec(`npx @rtk-incubator/rtk-query-codegen-openapi --file ./src/gen/auth.api.generated.ts --baseQuery ./src/service/apiBaseQuery.ts:apiBaseQuery --hooks ${hookUrl}/auth/swagger/v1/swagger.json --reducerPath authApi --baseUrl ${baseUrl}/auth`,
      (error) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log('\x1b[32m%s\x1b[0m', 'auth-api generated!');
      });
    console.log('\x1b[32m%s\x1b[0m', 'auth-api will be generated...');
    cb();
  },
], (err) => {
  if (err) {
    console.log(err);
  }
  console.log('-----------------');
});
