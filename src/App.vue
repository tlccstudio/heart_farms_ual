<template>
  <div id="q-app">
    <router-view />
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
      moment
    };
  },
  mounted() {
    //reqIFRAME_SRC();
    if (window.addEventListener) {
      window.addEventListener('message', this.listenWindowMessage, false)
    } else {
      window.attachEvent('onmessage', this.listenWindowMessage)
    }
  },
  beforeDestroy () {
    if (window.addEventListener) {
      window.removeEventListener('message', this.listenWindowMessage, false)
    } else {
      window.detachEvent('onmessage', this.listenWindowMessage)
    }
  },
  methods: {
    ...mapActions("oracles", ["updatePriceFeeds", "loadLeaderboards", "updateRNGFeeds"]),
    ...mapActions("account", ["accountExists"]),

    onAction(data) {
      if (data.content.act.name == "write") {
        this.updatePriceFeeds(data.content);
      } else if (data.content.act.name == "randreceipt") {
        this.updateRNGFeeds(data.content);
      }
    },

    onDelta(data) {
    },

    async loadTableData() {
      await this.loadLeaderboards();
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
                this.tObject = {};
                this.tObject.data = JSON.parse(data.data)[0];
                console.log("Msg Type -- MSG_ISSUE Received from Child window.");
                console.log(this.tObject.data);

                this.send();
              break;
              case MSG_TYPE_SIGNIN:
                console.log("signin notice received...");
              break;
              default:
              break;
        } 
      }
    }
  }
};
</script>
