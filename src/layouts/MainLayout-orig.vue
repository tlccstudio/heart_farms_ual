<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="rightDrawerOpen = !rightDrawerOpen"
        />

        <q-toolbar-title>
          <a href="https://farm.heart-church.org/" style="text-decoration: none;">
            <img class="logo" alt="Heart Farms" style="width: 42px; height: 42px; margin-bottom: -11px; margin-right: 10px;" src="icons/favicon-128x128.png" />
            <span style="font-family: ZCOOL KuaiLe; color: var(--q-color-accent); font-size: 22pt; margin-bottom: 15px;">Heart Farms</span>
          </a>
        </q-toolbar-title>

        <login-button></login-button>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >

      <q-list>
        <q-item-label header class="text-grey-8">
        Land Selection:
        </q-item-label>

        <center>
        <q-btn-dropdown color="info" :label="selectedLand">
        <q-list>
          <q-item clickable v-close-popup @click="onItemClick('laa11')">
            <q-item-section>
              <q-item-label>The Emerald Coast</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa12')">
            <q-item-section>
              <q-item-label>Sapphire Isle</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa13')">
            <q-item-section>
              <q-item-label>Pelican Harbor</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa21')">
            <q-item-section>
              <q-item-label>Silverton Strait</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa22')">
            <q-item-section>
              <q-item-label>The Topaz River</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa23')">
            <q-item-section>
              <q-item-label>Honey Fields</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="onItemClick('laa32')">
            <q-item-section>
              <q-item-label>Chrysolite Mountain</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        </q-btn-dropdown>
        </center>

        <!--<q-item-label header class="text-grey-8">
          System Links
        </q-item-label>
        <ExamplePage
          v-for="link in examplePages"
          :key="link.title"
          v-bind="link"
        />-->

        <q-item-label header class="text-grey-8">
          External Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
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
  /*{
    title: "Dashboard",
    caption: "Home",
    icon: "computer",
    path: "/"
  }*/
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
    icon: "favorite",
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
      selectedLand: "HEART LANDS"
    };
  },
  updated() {
    //reqIFRAME_SRC();
  },
  methods: {
    onItemClick(land) {
      //var sURL = window.location.href;
      //sURL = sURL.split("?")[0] + "?l="+land;
      //window.location.href = sURL;

      if(land === "laa11"){
        this.selectedLand = "The Emerald Coast";
      } else if( land === "laa12" ) {
        this.selectedLand = "Sapphire Isle";
      } else if( land === "laa13" ) {
        this.selectedLand = "Pelican Harbor";
      } else if (land === "laa21" ) {
        this.selectedLand = "Silverton Strait";
      } else if (land === "laa22" ) {
        this.selectedLand = "The Topaz River"; 
      } else if (land === "laa23" ) {
        this.selectedLand = "Honey Fields"; 
      } else if (land === "laa32") {
        this.selectedLand = "Chrysolite Mountain";
      } else {
        this.selectedLand = "HEART LANDS";
      }

      reqIFRAME_SRC(land);
    }
  }
};
</script>
