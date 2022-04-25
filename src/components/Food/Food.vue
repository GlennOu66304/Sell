<template>
  <transition name="detail">
    <!-- close foodDetails -->
    <div v-show="showFlag" class="food2" ref="foodView">
      <!-- food area -->
      <div class="food-wrapper">
        <div class="food-content">
          <div class="img-wrapper">
            <img class="food-img" :src="food.picture" alt="" />

            <!--    III,JS
              1.change the click event from the whole page to close icon -->
            <!-- close icon -->
            <span class="close-bt icon-close" @click="closeView"></span>
            <!-- share image -->
            <img class="share-bt" src="./share.png" alt="" />
            <!-- more image -->
            <img class="more-bt" src="./more.png" alt="" />

            <!-- 
              1.Goal:
              I.UI:
              1.food name
              2.sell amount
              3.user recommendtiona
              4.Price unit
              II.CSS fix:
             
              1.close icon, share icon, more icon css fix
             2.above component UI css fix;
             3. content-wrapper in header and float fix
           
            
             -->
          </div>

          <!-- content wrapper -->
          <div class="content-wrapper2">
            <h3 class="name">{{ food.name }}</h3>
            <p class="saled">{{ food.month_saled_content }}</p>
            <!-- recommendtiona -->
            <img class="product" :src="food.product_label_picture" alt="" />

            <!-- sell price -->
            <p class="price">
              <span class="text">￥{{ food.min_price }}</span>

              <span class="unit"> /{{ food.unit }}</span>
            </p>

            <div class="cartControlWrapper">
              <CartControl :food="food" />
            </div>
            <div
              @click="addClick"
              class="buy"
              v-show="!food.count || food.count == 0"
            >
              选择规格
            </div>
          </div>
        </div>
        <Split />
        <!-- rating area -->
        <div class="rating-wrapper">
          <div class="rating-title">
            <!-- ratio and comment -->
            <div class="like-ratio" v-if="food.rating">
              <span class="title">{{ food.rating.title }}</span>
              <span 
                >{{ food.rating.like_ratio_desc }}

                <i class="ratio">{{ food.rating.like_ratio }}</i>
              </span>
            </div>

            <!-- how many review -->
            <div class="snd-title" v-if="food.rating">
              <span>{{ food.rating.snd_title }}</span>
              <span class="icon icon-keyboard_arrow_right"></span>
            </div>
          </div>

          <ul class="rating-content"></ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CartControl from "../CartControl/CartControl.vue";
import BScroll from "better-scroll";
import Split from "../split/split.vue";
import Vue from "vue";
export default {
  name: "Food",
  props: {
    food: {
      type: Object
    }
  },

  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    showView() {
      this.showFlag = true;

      this.$nextTick(() => {
        if (!this.scroll) {
          (this.scroll = new BScroll(this.$refs.foodView)),
            {
              click: true
            };
        } else {
          this.scroll.refresh();
        }
      });
    },
    closeView() {
      this.showFlag = false;
    },
    addClick() {
      // set the initial number as 1
      //then i++ add the number
      Vue.set(this.food, "count", "1");
    }
  },
  components: {
    CartControl,
    Split,
    BScroll
  }
};

// Goal:
// 1.click the food, then show the food details
// git build new branch
// Problem solving:
// I.Food Dtailed Component buid(UI):
// 1.set the thev-show = hide the page
// 2.CSS change
// II.Functions: // 1.refs , use thefunction in the Childe Component(food ), to control open or close the fooddetails tab;
// 2.Props send to the Food details // 1) Good get the data // 2)send it into the food, in the component
</script>

<style>
.food2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 51px;
  background: white;
  z-index: 90;
}

.food2 .food-wrapper .food-content .img-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}

.food2 .food-wrapper .food-content .img-wrapper .food-img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.food2 .food-wrapper .food-content .img-wrapper .close-bt {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 10px;
  top: 10px;
  text-align: center;
  font-size: 30px;
  color: white;
  background: #7f7f7f;
  border-radius: 58%;
}

.food2 .food-wrapper .food-content .img-wrapper .share-bt,
.food2 .food-wrapper .food-content .img-wrapper .more-bt {
  width: 3epx;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 50px;
}

.food2 .food-wrapper .food-content .img-wrapper .share-bt {
  right: 50px;
}
.food2 .food-wrapper .food-content .img-wrapper .more-bt {
  right: 10px;
}

/* From left to right page animation */
.detail-enter-active .detail-leave-active {
  transition: 1s;
}
.detail-enter .detail-leave-to {
  transform: translateX(100%);
  /* transform: rotate(180 deg) */
}
.food2 .food-wrapper .food-content .content-wrapper2 {
  padding: 0 0 16px 16px;
  position: relative;
}

.food2 .food-wrapper .food-content .content-wrapper2 .name {
  font-size: 15px;
  color: #333333;
  line-height: 30px;
  font-weight: bold;
}
.food2 .food-wrapper .food-content .content-wrapper2 .saled {
  font-size: 11px;
  color: #9d9d9d;
  margin-bottom: 6px;
}

.food2 .food-wrapper .food-content .content-wrapper2 .product {
  height: 15px;
  margin-bottom: 16px;
}

.food2 .food-wrapper .food-content .content-wrapper2 .price {
  font-size: 0;
}

.food2 .food-wrapper .food-content .content-wrapper2 .price .text {
  font-size: 17px;
  color: #fb4e44;
}

.food2 .food-wrapper .food-content .content-wrapper2 .price .unit {
  font-size: 11px;
  color: #9d9d9d;
}

.food2 .food-wrapper .food-content .content-wrapper2 .cartControlWrapper {
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.food2 .food-wrapper .food-content .content-wrapper2 .buy {
  width: 64px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  background: #ffd161;
  border-radius: 30px;
  position: absolute;
  right: 12px;
  bottom: 10px;
  padding: 2px;
}

/* 
1.same row
2.float left_conten
3.ratio in red
4.right text in gray color

*/
.food2 .food-wrapper .rating-wrapper {
  padding-left: 16px;
}

.food2 .food-wrapper .rating-wrapper .rating-title{
  padding:16px 16px 16px 0;
}

.food2 .food-wrapper .rating-wrapper .rating-title .title{
  font-size: 13px;
}

.food2 .food-wrapper .rating-wrapper .rating-title .like-ratio {
  float: left;
}

.food2 .food-wrapper .rating-wrapper .rating-title .like-ratio .ratio{
  color:#fb4e44;
  font-size: 11px;

}

.food2 .food-wrapper .rating-wrapper .rating-title .snd-title {
  float: right;
}
</style>
