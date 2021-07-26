<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
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
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Heart Farms dApp
        </q-item-label>
        <ExamplePage
          v-for="link in examplePages"
          :key="link.title"
          v-bind="link"
        />
        <q-item-label header class="text-grey-8">
          Essential Links
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
import ExamplePage from "components/ExamplePage.vue";
import LoginButton from "components/LoginButton.vue";

const pagesData = [
  {
    title: "Home",
    caption: "Heart Farms overview data.",
    icon: "home",
    path: "/"
  }//,
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
  components: { EssentialLink, ExamplePage, LoginButton },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      examplePages: pagesData
    };
  },
  updated() {
    //reqIFRAME_SRC();
  }
};
</script>
