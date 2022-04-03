<template>
  <div id="app">
    <!-- Head for the project -->
    <!-- pass this poiInfo data from export section to the child component Head -->
    <Head :poiInfo="poiInfo1" />
    <!-- left is the props name in the Headchild component:Head 
         right is the value from the data section
    -->

    
<!-- Nav Bar -->
    <Nav />
    <router-view></router-view>
  </div>
</template>

<script>
// realtive path configuare
import Head from "component/Head/Head.vue";
import Nav from "component/Nav/Nav.vue";
export default {
  name: "App",
  data() {
    return {
      poiInfo1: {}
    };
  },

  // axios get the data from the api
  created() {
    this.$axios
      .get("/api/goods")
      .then(res => {
        var dataSource = res.data;
        if (dataSource.code == 0) {
          // assing the data from api to the data section in vue
          this.poiInfo1 = dataSource.data.poi_info;
          // console.log(this.poiInfo1);
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
