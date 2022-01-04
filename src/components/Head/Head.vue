<template>
  <div class="header">
    <!-- header -->
    <div class="top-wrapper">
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>

      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input class="search-bar" type="text" placeholder="搜索店内商品" />
      </form>

      <div class="more-wrapper">
        <a class="spelling-bt" href="#">拼单</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
    </div>

    <!-- body -->
    <div class="content-wrapper"></div>

    <!-- announcement -->
    <div class="bulletin-wrapper"></div>

    <!-- background -->
    <div class="bg-wrapper" :style="content_bg"></div>
  </div>
</template>

<script>
export default {
  name: "Head",
  props: {
    poiInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    content_bg() {
      return "background-image:url(" + this.poiInfo.head_pic_url + ");";
    }
  }
};
</script>

<style>
@import url("../../common/styles/icon.css");
@import url("Header.css");
</style>
