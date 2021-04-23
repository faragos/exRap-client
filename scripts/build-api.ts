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
    exec(`npx @rtk-incubator/rtk-query-codegen-openapi --file ./src/gen/timeTrack.api.generated.ts --baseQuery ./src/service/apiBaseQuery.ts:apiBaseQuery --hooks ${hookUrl}/time/swagger/v1/swagger.json --reducerPath timeTrackApi --baseUrl ${baseUrl}/time`);
    console.log('timeTrack-api will be generated');
    cb();
  },
  (cb) => {
    exec(`npx @rtk-incubator/rtk-query-codegen-openapi --file ./src/gen/dashboard.api.generated.ts --baseQuery ./src/service/apiBaseQuery.ts:apiBaseQuery --hooks ${hookUrl}/dash/swagger/v1/swagger.json --reducerPath dashboardApi --baseUrl ${baseUrl}/dash`);
    console.log('dashboard-api will be generated');
    cb();
  },
  (cb) => {
    exec(`npx @rtk-incubator/rtk-query-codegen-openapi --file ./src/gen/auth.api.generated.ts --baseQuery ./src/service/apiBaseQuery.ts:apiBaseQuery --hooks ${hookUrl}/auth/swagger/v1/swagger.json --reducerPath authApi --baseUrl ${baseUrl}/auth`);
    console.log('auth-api will be generated');
    cb();
  },
]);
