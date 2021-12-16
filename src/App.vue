<template>
  <div id="app">
    <Head :poiInfo="poiInfo" />

    <Nav />
    <router-view></router-view>
  </div>
</template>

<script>
import Head from "./components/Head/Head.vue";
import Nav from "./components/Nav/Nav.vue";
export default {
  name: "App",
  data() {
    return {
      poiInfo: {}
    };
  },
  created() {
    this.$axios
      .get("/api/goods")
      .then(res => {
        var dataSource = res.data;
        if (dataSource.code == 0) {
          this.poiInfo = dataSource.data.poi_info;
          console.log(this.poiInfo);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    Head,
    Nav
  }
};
</script>

<style></style>
