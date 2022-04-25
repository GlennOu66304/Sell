<template>
  <div class="nav">
    <!-- order -->
    <router-link to="/goods" class="nav-item goods">
      点菜
      <i class="line"></i>
    </router-link>

    <!-- review -->
    <router-link to="/ratings" class="nav-item rating">
      评价({{ commentNum }}) <i class="line"></i
    ></router-link>

    <!-- seller -->
    <router-link to="/seller" class="nav-item seller">
      商家
      <i class="line"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    commentNum: {
      type: Number,
      default: 0
    }
  },
  name: "Nav"
};
</script>

<style scoped>
.nav {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e4e4e4;
}
/* golden line and name of the item */
.nav-item {
  flex: 1;
  text-align: center;
  font-size: 13px;
  text-decoration: none;
  color: #666666;
  /* golden line and name of the item */
  position: relative;
}
.nav .active {
  color: #ffbb22;
}
/* golden line */
.nav .active .line {
  width: 21px;
  height: 2px;
  display: inline-block;
  background: #ffbb22;
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -10px;
}
</style>
