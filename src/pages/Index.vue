<template>
  <q-page class="column justify-center items-center">
    <h6 class="description">
    </h6>
      
      <center>
        <iframe src='' id='content_iframe' style='width: 100%; height: 100%; z-index: 1; position: fixed; left: 0px; top: 45px; border: 0px solid black;'>
        </iframe>
      </center>
    
  </q-page>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Index",
  data() {
    return {
      tObject: null,
      transaction: null,
      showTransaction: null
    };
  },
  mounted() {
    reqIFRAME_SRC(null);
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions("account", ["accountExists"]),
    aFunction() {
    }
  }
};
</script>

<style lang="sass" scoped>
.logo
  max-width: 400px

.description
  max-width: 800px
</style>
