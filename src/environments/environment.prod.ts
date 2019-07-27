// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

let environment = {
  api: 'https://api.researchcoder.com',
  disableRouteGuards: false,
  production: true,
  callbacks: {
    redeemResearcherInvite: window.location.origin + "/callbacks/redeem-researcher-invite",
    redeemEncoderInvite: window.location.origin + "/callbacks/redeem-encoder-invite"
  },
  pusher: {
    key: '248705977b596a5376e1',
    config: {
      cluster: 'us2',
      encrypted: true
    }
  },
  firebaseConfig: {
    apiKey: "AIzaSyBbQJlFfdN_bLkg-lWRdqR0F4hzWTH0VOY",
    authDomain: "meta-research-data-portal.firebaseapp.com",
    databaseURL: "https://meta-research-data-portal.firebaseio.com",
    projectId: "meta-research-data-portal",
    storageBucket: "",
    messagingSenderId: "596453631490",
    appId: "1:596453631490:web:485fdb333f99eaeb"
  }
};

export { environment }
