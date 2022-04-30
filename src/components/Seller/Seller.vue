<template>
  <div class="seller3">
    <div class="sellerWrapper">
      <!-- basic information -->
      <div class="sellerView">
        <!-- location and phone number -->
        <div class="addressWrapper">
          <!-- left -->
          <div class="left">
            {{ seller.address }}
          </div>

          <!-- right -->

          <div class="right"></div>
        </div>
        <!-- images -->
        <div class="picWrapper" ref="picsView">
          <ul v-if="seller.poi_env" class="picsList" ref="picsList" >
            <li
              v-for="(imgUrl, index) in seller.poi_env.thumbnails_url_list"
              :key="index"
              class="picsItem"
              ref="picsItem"
            >
              <img :src="imgUrl" alt="" />
            </li>
          </ul>
        </div>
        <!-- food safety -->
        <div class="safetyWrapper"></div>
      </div>
      <Split />
      <!-- delivery -->
      <div class="tipView"></div>

      <Split />
      <!-- promotion -->
      <div class="promotionView"></div>
    </div>
  </div>
</template>

<script>
import Split from "../split/split.vue";
import BScroll from "better-scroll";
export default {
  name: "Seller",
  data() {
    return {
      seller: {}
    };
  },
  created() {
    // seller data
    this.$axios
      .get("/api/seller")
      .then(res => {
        var dataSource = res.data;
        // console.log(dataSource);
        if (dataSource.code == 0) {
          // assing the data from api to the data section in vue
          this.seller = dataSource.data;
          console.log(this.seller);
          this.$nextTick(() => {
            //       total width:img width + padding width 1 ref(img ref)
            // Bscroll opton add : second ref(pic area ref)
            if (this.seller.poi_env.thumbnails_url_list) {
              let imgW = this.$refs.picsItem[0].clientWidth;
              let marginR = 11;
              let width =
                (imgW + marginR) *
                this.seller.poi_env.thumbnails_url_list.length;
              console.log(width);
              this.$refs.picsList.style.width = width + "px";

              this.scroll = new BScroll(this.$refs.picsView,{
                scrollX:true,
              })
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    Split,
    BScroll
  }
};
</script>

<style>
.seller3 {
  position: absolute;
  left: 0;
  top: 220px;
  bottom: 0;
  width: 100%;
}

.seller3 .sellerWrapper {
}
.seller3 .sellerWrapper .sellerView {
  padding-left: 15px;
}
.seller3 .sellerWrapper .sellerView .addressWrapper {
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid #f4f4f4;
}
.seller3 .sellerWrapper .sellerView .addressWrapper .left {
  flex: 1;
  background: url(address.png) no-repeat left center;
  padding-left: 26px;
  background-size: 14px 16px;
}
.seller3 .sellerWrapper .sellerView .addressWrapper .right {
  flex: 0 0 50px;
  background: url(phone.png) no-repeat left center;
  background-size: 18px 18px;
}
.seller3 .sellerWrapper .sellerView .picWrapper {
  padding: 10px 0;
  overflow: hidden;
  border-bottom: 1px solid #f4f4f4;
  white-space: nowrap;
}
.seller3 .sellerWrapper .sellerView .picWrapper .picsList {
}

.seller3 .sellerWrapper .sellerView .picWrapper .picsList .picsItem {
  display: inline-block;
  margin-right: 11px;
  width: 93px;
  height: 75px;
}

.seller3 .sellerWrapper .sellerView .picWrapper .picsList .picsItem img {
  width: 100%;
  height: 100%;
}
.seller3 .sellerWrapper .sellerView .safeWrapper {
}
</style>
