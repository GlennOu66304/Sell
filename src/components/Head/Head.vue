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
        <div class="more-bt"></div>
      </div>
    </div>

    <!-- body -->
    <div class="content-wrapper"></div>

    <!-- announcement -->
    <div class="bulletin-wrapper"></div>
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
  }
};
</script>

<style>
@import url("../../common/styles/icon.css");
@import url("Header.css");
</style>
