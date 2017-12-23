// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

let environment = {
  api: 'http://api.v3.researchcoder.com',
  disableRouteGuards: true,
  showLog: true,
  production: false
};

if(localStorage.env){
    let custom = JSON.parse(localStorage.env);
    Object.assign(environment, custom);
}

export { environment }