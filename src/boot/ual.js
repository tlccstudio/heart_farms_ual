import { UAL } from "universal-authenticator-library";
import { KeycatAuthenticator } from "@telosnetwork/ual-telos-keycat";
import { Scatter } from "ual-scatter";
import { Wombat } from "ual-wombat";
import { Sqrl } from "@smontero/ual-sqrl";
import { Anchor } from "ual-anchor";

export default async ({ Vue, store }) => {
  const chain = {
    chainId: process.env.NETWORK_CHAIN_ID,
    rpcEndpoints: [
      {
        protocol: process.env.NETWORK_PROTOCOL,
        host: process.env.NETWORK_HOST,
        port: process.env.NETWORK_PORT
      }
    ]
  };

  var authenticators = [
    //new KeycatAuthenticator([chain], { appName: process.env.APP_NAME }),
    new Anchor([chain], { appName: process.env.APP_NAME }),
    new Scatter([chain], { appName: process.env.APP_NAME }),
    new Wombat([chain], { appName: process.env.APP_NAME }),
    new Sqrl([chain], { appName: process.env.APP_NAME })
  ];

  //Setup authenticator links
  //authenticators[0].url_link = "https://app.gitbook.com/@keycatdev/s/keycatjs/keycat/how-to-use";
  authenticators[3].url_link = "https://sqrlwallet.io/";

  if(isAndroid()) {
    authenticators[0].url_link = "https://play.google.com/store/apps/details?id=com.greymass.anchor";
  }
  else if(isIOS()) {
    authenticators[0].url_link = "https://apps.apple.com/us/app/anchor-wallet/id1487410877";
  }
  else {
    authenticators[0].url_link = "https://greymass.com/en/anchor/download";
  }

  authenticators[2].url_link = "https://getwombat.io/";
  authenticators[1].url_link = "https://www.get-scatter.com/";


  //Mobile Wallet Filter - Remove those which don't work well on mobile.
  if(isMobile()){
    authenticators.splice(1,3); //removes Scatter, Wombat, Sqrl
  }

  const ual = new UAL([chain], "ual", authenticators);
  store["$ual"] = ual;
  Vue.prototype.$ual = ual;
};
