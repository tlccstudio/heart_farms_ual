<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>

        <q-toolbar-title>
          <a href="https://farm.heart-church.org/" style="text-decoration: none;">
            <img class="logo" alt="Heart Farms" style="width: 42px; height: 42px; margin-bottom: -11px; margin-right: 10px;" id="icon_main" src="icons/favicon-128x128.png" />
            <span style="font-family: ZCOOL KuaiLe; color: var(--q-color-accent); font-size: 22pt; margin-bottom: 15px;" id="header_main">Heart Farms</span>
          </a>
        </q-toolbar-title>

        <login-button id="login_button"></login-button>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          id="drawer_button"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />
      </q-toolbar>
    </q-header>

    <q-drawer :id="drawer_menu_1" v-model="rightDrawerOpen" side="right" bordered :width="$q.platform.is.desktop ? '300px' : $q.screen.width">
      <q-list>

        <q-btn round color="white" text-color="black" class="float-right q-my-sm q-mx-sm" icon="close" @click="rightDrawerOpen = !rightDrawerOpen" style="font-size: var(--close_x);" />

      <q-item-label header class="text-grey-8">
      Account:
      </q-item-label>

      <div class="q-px-md" style="" id="act_name">
        Not logged in.
      </div>

      <q-item-label header class="text-grey-8">
          Heart Farms:
      </q-item-label>

      <center>
        <q-btn color="info" v-close-popup @click="onPlayClick()">PLAY NOW</q-btn>
      </center>

      <!--<ExamplePage
          v-for="link in examplePages"
          :key="link.title"
          v-bind="link"
      />-->
        
        <q-item-label header class="text-grey-8">
        Land Selection:
        </q-item-label>

        <center>
        <q-btn-dropdown color="info" :label="selectedLand">
        <q-list>
          <q-item clickable v-close-popup @click="onItemClick('laa11')">
            <q-item-section>
              <q-item-label style="font-size: var(--btndropsize);">The Emerald Coast</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa12')">
            <q-item-section>
              <q-item-label style="font-size: var(--btndropsize);">Sapphire Isle</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa13')">
            <q-item-section>
              <q-item-label style="font-size: var(--btndropsize);">Pelican Harbor</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa21')">
            <q-item-section>
              <q-item-label style="font-size: var(--btndropsize);">Silverton Strait</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa22')">
            <q-item-section>
              <q-item-label style="font-size: var(--btndropsize);">The Topaz River</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa23')">
            <q-item-section>
              <q-item-label style="font-size: var(--btndropsize);">Honey Fields</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa31')">
            <q-item-section>
              <q-item-label style="font-size: var(--btndropsize);">Onyx Valley</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa32')">
            <q-item-section>
              <q-item-label style="font-size: var(--btndropsize);">Chrysolite Mountain</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa42')">
            <q-item-section>
              <q-item-label style="font-size: var(--btndropsize);">Angels Passage</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa52')">
            <q-item-section>
              <q-item-label style="font-size: var(--btndropsize);">White Rock Ranges</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        </q-btn-dropdown>
        </center>


        <q-item-label header class="text-grey-8">
          External Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <center>
        <div width="100%">
        <a href="https://discord.gg/8rXp7XnaTq" target="_blank" style="color: #251e17; font-size: 20pt;"><i class="fab fa-discord q-my-lg q-mx-sm fa-drawer_icons"></i></a>
        <a href="https://t.me/steemchurch_telegram" target="_blank" style="color: #251e17; font-size: 20pt;"><i class="fab fa-telegram q-my-lg q-mx-sm fa-drawer_icons"></i></a>
        <a href="https://steemit.com/trending/hive-108514" target="_blank" style="color: #251e17; font-size: 20pt;"><i class="fas fa-heart q-my-lg q-mx-sm fa-drawer_icons"></i></a>
        </div>
      </center>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import EssentialLink from "components/EssentialLink.vue";
//import ExamplePage from "components/ExamplePage.vue";
import LoginButton from "components/LoginButton.vue";

const pagesData = [
  {
    title: "Play Heart Farms",
    caption: "Game world login",
    icon: "computer",
    path: "/play"
  }
];

const linksData = [
  {
    title: "Create Telos Account",
    caption: "A free blockchain account",
    icon: "fas fa-rocket",
    link: "https://telos.net/Create-Account/"
  },{
    title: "Tutorial: Land Auction",
    caption: "What is a virtual land auction?",
    icon: "menu_book",
    link: "https://farm.heart-church.org/virtual-land-auction-tutorial/"
  },{
    title: "Tutorial: Wallet Signing",
    caption: "Telos wallet operation",
    icon: "menu_book",
    link: "https://farm.heart-church.org/wallet-signing/"
  },
  {
    title: "Claiming a .jc Account",
    caption: "After you have acquired a land plot",
    icon: "menu_book",
    link: "https://steemit.com/hive-108514/@marcelo182/creating-a-jc-account-using-heart-farms-heartfarmsio/"
  },
  {
    title: "Heart Farms: FAQ",
    caption: "Questions answered here",
    icon: "menu_book",
    link: "https://farm.heart-church.org/faq/"
  },
  {
    title: "Heart Church Organization",
    caption: "heart-church.org",
    icon: "fas fa-globe",
    link: "https://heart-church.org/"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink, /*ExamplePage,*/ LoginButton },
  data() {
    return {
      rightDrawerOpen: false,
      essentialLinks: linksData,
      examplePages: pagesData,
      selectedLand: "HEART LANDS",
      mobileResize: false,
      elementFontSize: "100pt"
    };
  },
  mounted() {
    var land = getUrlParameter("l");

    if((typeof land === 'undefined') || (land === "")){
        land = DEFAULT_LAND;
    }

    //resizing of fonts and elements for mobile
    if(this.mobileResize === false) {

      setTimeout(function() {
        //resizing of fonts and elements for mobile
        formatForDevice(GLOBAL_IS_DESKTOP);
      }, 750);

      this.mobileResize = true;
    }

    this.selectedLand = this.getLandName(land);
  },
  updated() {
    
    /*  Disabled because resizing causes the canvas to flash which looks bad
    if((this.rightDrawerOpen) && ($(window).width() > 800)){
      $('#content_iframe').css("width", ($(window).width()-300) + "px");
    } else{
      $('#content_iframe').css("width", "100%");
    }*/
  },
  methods: {
    onItemClick(land) {
      //var sURL = window.location.href;
      //sURL = sURL.split("?")[0] + "?l="+land;
      //window.location.href = sURL;

      new_selected_land = land;
      this.selectedLand = this.getLandName(land);

      this.toggleOpen();

      if (this.$router.currentRoute.path !== "/") {
          this.$router.push({ path: "/" });
      } else {
        reqIFRAME_SRC(land);
      }
    },
    onPlayClick() {
      this.toggleOpen();

      this.$router.push({ path: "/play" });
    },
    toggleOpen(){
      this.rightDrawerOpen = !this.rightDrawerOpen;
    },
    getLandName(land) {

        if(land === "laa11"){
          return "The Emerald Coast";
        } else if( land === "laa12" ) {
          return "Sapphire Isle";
        } else if( land === "laa13" ) {
          return "Pelican Harbor";
        } else if (land === "laa21" ) {
          return "Silverton Strait";
        } else if (land === "laa22" ) {
          return "The Topaz River"; 
        } else if (land === "laa23" ) {
          return "Honey Fields"; 
        } else if (land === "laa32") {
          return "Chrysolite Mountain";
        } else if (land === "laa31") {
          return "Onyx Valley";
        } else if (land === "laa42") {
          return "Angels Passage";
        } else if (land === "laa52") {
          return "White Rock Ranges";
        } else {
          return "HEART LANDS";
        }

      return sLandName;
    }
  }
};
</script>