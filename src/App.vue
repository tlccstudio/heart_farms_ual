<template>
  <div id="q-app">
    <router-view />
    
    <q-dialog v-model="showTransaction" confirm>
        <q-card >
          <q-card-section class="row">
            <q-avatar icon="arrow_forward" color="primary" text-color="white" />
            <span class="q-ml-sm">
              Transaction sent, click to view in block explorer.
            </span>
            <q-item
              clickable
              tag="a"
              target="_blank"
              :href="`${explorerUrl}/transaction/${transaction}`"
              class="q-ml-sm"
              >{{ transaction }}</q-item
            >
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Ok" color="primary" v-close-popup></q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

//import store from './vuex/store'

const moment = require("moment");
const HyperionSocketClient = require("@eosrio/hyperion-stream-client").default;
const fetch = require("node-fetch");

export default {
  name: "App",
  data() {
    return {
      client: null,
      startFrom: 0,
      moment,
      loopSwitch: false,
      cAccountName: null,
      to: null,
      amount: null,
      memo: null,
      showTransaction: null,
      transaction: null,
      explorerUrl: process.env.NETWORK_EXPLORER
    };
  },
  computed: {
    ...mapGetters("account", ["isAuthenticated", "accountName"])
  },
  mounted() {
    //reqIFRAME_SRC();
    if (window.addEventListener) {
      window.addEventListener('message', this.listenWindowMessage, false)
    } else {
      window.attachEvent('onmessage', this.listenWindowMessage)
    }

    this.loopSwitch = true;
    var aHeartbeat = this.appHeartbeat;
    setTimeout(function() {
      aHeartbeat();
    }, 2000);
  },
  beforeDestroy () {
    if (window.addEventListener) {
      window.removeEventListener('message', this.listenWindowMessage, false)
    } else {
      window.detachEvent('onmessage', this.listenWindowMessage)
    }
    this.loopSwitch = false;
  },
  methods: {
    ...mapActions("oracles", ["updatePriceFeeds", "updateRNGFeeds"]),
    ...mapActions("account", ["accountExists"]),

    appHeartbeat() {

      if(this.$store.state.account.accountName !== this.cAccountName){

        this.cAccountName = this.$store.state.account.accountName;

        if(typeof this.cAccountName !== 'undefined')
        { this.$store.$msg.issueLoginNoticeToChild(this.cAccountName); }
        else
        { this.$store.$msg.issueLogoutNoticeToChild(); }
      }

      if(this.loopSwitch) {
        var aHeartbeat = this.appHeartbeat;

        setTimeout(function() { aHeartbeat(); }, 500);
      }
    },

    onAction(data) {
      if (data.content.act.name == "write") {
        this.updatePriceFeeds(data.content);
      } else if (data.content.act.name == "randreceipt") {
        this.updateRNGFeeds(data.content);
      }
    },

    onDelta(data) {
    },

    setupStreamClient() {
      if (this.client) return;

      this.client = new HyperionSocketClient(process.env.HYPERION_ENDPOINT, {
        async: true,
        fetch: fetch
      });

      
      this.client.onConnect = () => {
        this.client.streamActions({
          contract: "revelation21",
          action: "transfer",
          account: "revelation21",
          start_from: moment
            .utc()
            .subtract(24, "hours")
            .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          read_until: 0,
          filters: []
        });

        /*this.client.streamActions({
          contract: process.env.ORACLE_CONSUMER,
          action: "randreceipt",
          account: process.env.ORACLE_CONSUMER,
          start_from: moment
            .utc()
            .subtract(24, "hours")
            .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
          read_until: 0,
          filters: []
        });*/

        /*this.client.streamDeltas({
          code: "rng.oracle",
          table: "oracles",
          scope: "rng.oracle",
          start_from: 0,
          read_until: 0,
          filters: []
        });*/

        /*this.client.streamDeltas({
          code: "delphioracle",
          table: "stats",
          scope: "delphioracle",
          start_from: 0,
          read_until: 0,
          filters: []
        });*/
      };

      this.client.onData = async (data, ack) => {
        let dataType = data.type;
        if (dataType == "action") {
          this.onAction(data);
        } else if (dataType == "delta") {
          this.onDelta(data);
        }

        ack();
      };

      this.client.connect(() => {
        console.log("Connected to Hyperion Stream!");
      });
    },
    listenWindowMessage(oEvent) {  
      var xtype = "";

      if('type' in oEvent)
      { xtype = oEvent.type; }
      else if ('data' in oEvent) {
        if('type' in oEvent.data) {
          xtype = oEvent.data.type;
        } else {
          try {
            xtype = JSON.parse(oEvent.data).type;
          } catch(err) {
            console.log("Failed to parse JSON.parse(oEvent.data");
          }
        }
      }

      if(xtype === "message"){
        var data = null;

        if('data' in oEvent) {
          if(this.$store.$basic.IsJsonString(oEvent.data)) {
            data = JSON.parse(oEvent.data);
          } else {
            data = oEvent.data;
            //console.log("Not json data: ");
            //console.log(data);
              if('type' in data){
                  data.message = data.type;
              }
          }
        } else {
          console.log("data not found!");
          consle.log(oEvent);
          return;
        }

        if(data.message.length == 0) {
          console.log("no data.message.length, aborting...");
          console.log("data output...");
          console.log(data);
          return;
        }
      
        //if (oEvent.origin != location.origin) { console.log('Bad origin: ' + oEvent.origin); return; }
        
        switch(data.message)
        {   
              case MSG_TYPE_TEST:  
                  console.log("Msg Type -- MSG_TYPE_TEST 'TEST' Received from Child window.");
                  console.log(data);
              break;
              case MSG_TYPE_ISSUE_BID:
                console.log("Msg Type -- MSG_TYPE_ISSUE_BID Received from Child window.");
                var oData = JSON.parse(data.data.replace('\\',''));

                this.to = oData.receiver;
                this.amount = oData.amount;
                this.memo = oData.memo;

                this.send();
              break;
              case MSG_TYPE_SIGNIN:
                console.log("signin notice received...");
                console.log(data);
              break;
              case MSG_TYPE_PUBLISH_ACTION:
                console.log("Msg Type -- MSG_TYPE_PUBLISH_ACTION Received from Child window.");
                console.log(data);
                var oData = JSON.parse(data.data.replace('\\',''));
                console.log(oData);

                this.publishActions(oData.aActions);
              break;
              default:
              break;
        } 
      }
    },
    async send() {
      if (!(await this.accountExists(this.to))) {
        this.$q.notify({
          type: "negative",
          message: `Account ${this.to} does not exist`
        });
        return;
      }

      const actions = [
        {
          account: "revelation21",
          name: "transfer",
          data: {
            from: this.accountName.toLowerCase(),
            to: this.to,
            quantity: `${parseFloat(this.amount).toFixed(4)} HEART`,
            memo: this.memo
          }
        }
      ];
      const transaction = await this.$store.$api.signTransaction(actions);
      if (transaction) {
        this.showTransaction = true;
        this.transaction = transaction.transactionId;

        //push a refresh back down to child
        var iFrame = document.getElementById('content_iframe');

        setTimeout(function(){
          iFrame.contentWindow.postMessage(JSON.stringify({
            message: MSG_TYPE_REFRESH_MAP,
            data: 'parent to child data here...'
          }), location.origin);
        }, 200);
        
      }
    },
    async publishActions(actions) {

      const transaction = await this.$store.$api.signTransaction(actions);
      if (transaction) {
        this.showTransaction = true;
        this.transaction = transaction.transactionId;

        //push a refresh back down to child
        var iFrame = document.getElementById('content_iframe');

        setTimeout(function(){
          iFrame.contentWindow.postMessage(JSON.stringify({
            message: MSG_TYPE_REFRESH_MAP,
            data: 'parent to child data here...'
          }), location.origin);
        }, 200);
        
      }
    }
  }
};
</script>
