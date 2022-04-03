


<template>
  <div class="shopCart" :class="{ highLight: totalNumber > 0 }">
    <div class="shopCart-wrapper">

          <!-- Shopping Cart Wrapper -->
    <!-- lay out write: -->

    <div class="left_content">
      <!-- logo -->
      <!--  :class="{ highLight: totalCount > 0 }"
className:highlight
totalCount > 0 it is the condition from the computed function totalCount
computed function to decide if the color will turn to yellow
 -->
      <div
        class="logoWrapper"
        :class="{ highLight: totalNumber > 0 }"
        @click="toggleList"
      >
        <span
          class="icon-shopping_cart"
          :class="{ highLight: totalNumber > 0 }"
        >
        </span>
        <!-- total number of the item -->

        <!-- v-show will decide if it will display the total price and total  number  -->
        <i class="total_number" v-show="totalNumber">{{ totalNumber }}</i>
      </div>
      <div class="desWrapper">
        <!-- total price -->
        <p class="total_price" v-show="totalPrice">￥{{ totalPrice }}</p>
        <!-- delivery tips -->
        <p class="tip" :class="{ highLight: totalNumber > 0 }">
          另需{{ poiInfo.shipping_fee_tip }}
        </p>
      </div>
    </div>

    <div class="right_content" :class="{ highLight: totalNumber > 0 }">
      <!-- min delivery fee -->
      {{ payment }}
    </div>

    <!-- 1.html write: shop-cart list section -->

    <!-- Class and Style Bindings -->
    <div  v-show="listShow" class="shopCart_list" :class="{ show: listShow }">
      <!-- first area discount number top -->
      <div v-show="poiInfo.discounts2" class="list_Top">
        {{ poiInfo.discounts2[0].info }}
      </div>

      <!-- second area header -->
      <div class="list_Head">
        <!-- 1)number bags -->
        <h3 class="title">1号口袋</h3>
<!-- Goal: click the clear text, then food number = 0 
1.add a click under the clear text; -->
        <div class="empty" @click="empty">
          <!-- 2)icon -->
          <img src="./ash_bin.png" alt="" />
          <!-- 3)clear the shopping cart -->
          <span>清空购物袋</span>
        </div>
      </div>

      <!-- .third area: content -->

      <div ref="shopCartList"  class="list_content">
        <ul >
          <li v-for="(item, index) in selectFoods" :key="index" class="food">
            <div class="desc-wrapper">
              <div class="desc-left">
                <!-- 1)food name -->
                <p class="name">{{ item.name }}</p>
                <!-- 2)unit -->
                <p v-show="item.unit" class="unit">例</p>
                <!-- description -->
                <p v-show="item.descrption" class="description">
                  {{ item.descrption }}
                </p>
              </div>

              <!-- right side content -->
              <div class="desc-right">
                <!-- 3)food price -->
                <span class="price">￥{{ item.min_price }}</span>
              </div>
            </div>

            <!-- 4)cart Control -->
            <div class="cartControl_wrapper">
              <!-- the item value is from the forloop above "item value" not from the data or props section -->
              <CartControl :food="item" />
            </div>
          </li>
        </ul>
      </div>

      <!-- fourth area:1) gray area bottom -->
      <div class="list_bottom"></div>
    </div>

    </div>
<!-- the mask area -->
<!-- // Goal:
// 1.add the mask area to the shopping cart;
// 2.When you click the mask area, it will go back to normal;
// 3.only show the mask area when there is value in the shoping cart

// I.UI build:
// 1.under the shop cart, add a wrap;
// 2.add the css value to change the layout;
// 3.mask css value
// II.function build:
// 1.v-show manage the display
// 2.click the item to thow the mask -->

<div class="mask" v-show="listShow" @click="hideMask"></div>

  </div>
</template>

<script>
import CartControl from "component/CartControl/CartControl.vue";
// // 1)BScroll AREA INVOLEVE
import BScroll from "better-scroll";

export default {
  name: "ShopCart",
  data() {
    return {
      hide: true
    };
  },

  // created(){
  //   console.log(this.selectFoods)
  // },
  // data load from the parent component Good
  props: {
    // shipping_fee_tip: {
    //   type: String,
    //   default: ""
    // },
    // min_price_tip: {
    //   type: String,
    //   default: ""
    // },
    // 2.change the props value
    poiInfo: {
      type: Object,
      default: {}
    },

    // fake data in the props;First time you can do it one by your self:

    selectFoods: {
      type: Array,
      default() {
        return [
          // 4.comment the default value
          // {
          //   min_price: 10,
          //   count: 3
          // },
          // {
          //   min_price: 10,
          //   count: 3
          // },
          // {
          //   min_price: 60,
          //   count: 7
          // }
        ];
      }
    }
  },

  computed: {
    //   1.number and toal price  change(use the computed) :

    // 1) total number; number of each item's number together
    totalNumber() {
      let num = 0;

      this.selectFoods.forEach(food => {
        //   num = num + count
        num += food.count;
      });

      return num;
    },

    // 2) total price
    // number * price for single item, then push those into a array, finally add together

    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        //   num = num + count
        total += food.count * food.min_price;
      });

      return total;
    },

    // 3,Payment box text change: compute function if and else will check base on the totalNumber big or small than 0
    payment() {
      if (this.totalNumber > 0) {
        return "去结算";
      } else {
        return this.poiInfo.min_price_tip;
      }
    },

    // v-show defalut value is the true, so you will need to assign the trun or value into the v-show
    listShow() {
      if (!this.totalNumber) {
        // when the total number of the shopcart icon is = 0,hide the tab
        this.hide = true;

        return false;
      }

      let show = !this.hide;

// BScroll:1.scroll the shop cart list:

// 2)start to use this feature
      if (show) {
        this.$nextTick(() => {
          if (!this.shopScroll) {
            this.shopScroll = new BScroll(this.$refs.shopCartList, {
              click: true
            });
          } else {
            this.shopScroll.refresh();
          }
        });
      }

// The reason why here does not show the scroll option, becasue:
// 1.it is the BScrll not Bsscroll in the import package section;
// 2.shopCartlist has the same ref in the class shopCart_list option, make sure there is only one in the class list content location section
// 3.at least have 9 items in the list, so it can scroll;

  //  if (show) {
   
  //      if (!this.shopScroll) {
  //           this.shopScroll = new BScroll(this.$refs.shopCartList, {
  //             click: true
  //           });
  //         } else {
  //           this.shopScroll.refresh();
  //         }
  //       };
    
      return show; // false display the shopCartlist tab

      // here the content will not display on the page, but will show in deve tool element
    }

    // 1.show or not the whow this tab(same as Head component ways)
    // 1) default fold:
    // a.global data value;
    // b. a computed value will decide  v-show decide if it will display the page;
    // based on the current totcal value decide if it will display the tab

    // toalnumber = 0 will hide the tab, total number > 0 will show the tab

    // fold true will hide the tab
    // fold false will open the tab

    // it is different with the Head Component tab control
  },

  methods: {
    // 2) click to show the fold

    toggleList() {
      if (!this.totalNumber) {
        // when the total number is 0
        return;
      }
      this.hide = !this.hide;
    },
//     2.add a empty method
// 3.for each loop the this.selecteFoods array
// 3.set the selected food's count = 0
    empty(){
      this.selectFoods.forEach((item)=>{
        item.count = 0;

      });
    },

    hideMask(){
      this.hide=true
    }
  },

  components: {
    CartControl,
   
  }
};
</script>

<style>

/* in order to make sure the css apply, you need to change the shopCart to the
.shopCart-wrapper */
.shopCart-wrapper {
  width: 100%;
  height: 51px;
  background: #514f4f;
  left: 0;
  position: fixed;
  bottom: 0;
  display: flex;
  z-index:99;
}
.shopCart-wrapper heighLine {
  background: #2d2b2a;
}
/* 1)flex mode box left and right */
.shopCart .left_content {
  flex: 1;
}
 .shopCart-wrapper .left_content .logoWrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #666666;
  position: relative;

  top: -14px;
  left: 10px;
  text-align: center;

  float: left;
}
/* highLight Color fix left part */
 .shopCart-wrapper  .left_content .logoWrapper.highLight {
  background: #ffd161;
}

.shopCart-wrapper  .left_content .logoWrapper span {
  font-size: 28px;
  color: #c4c4c4;
  line-height: 50px;
}
.shopCart-wrapper .left_content .logoWrapper span.highLight {
  color: #202b2a;
}

 .shopCart-wrapper  .left_content .logoWrapper .total_number {
  width: 15px;
  height: 15px;
  line-height: 15px;
  border-radius: 50%;
  background: red;
  color: white;
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 0;
}

.shopCart-wrapper  .left_content .desWrapper {
  float: left;
  margin-left: 13px;
}

.shopCart-wrapper  .left_content .desWrapper .total_price {
  color: white;
  height: 19px;
  line-height: 33px;
}

 .shopCart-wrapper .left_content .desWrapper .tip {
  font-size: 12px;
  color: #bab9b9;
  font-weight: bold;
  line-height: 50px;
}
 .shopCart-wrapper  .left_content .desWrapper .tip.highLight {
  line-height: 12px;
  margin-top: 10px;
}

.shopCart-wrapper .right_content {
  flex: 0 0 110px;
  font-size: 15px;
  color: #bab9b9;
  line-height: 50px;
  text-align: center;
  font-weight: bold;
}

/* highLight Color fix  right payment box*/
 .shopCart-wrapper .right_content.highLight {
  background: #ffd161;
  color: #202b2a;
}

/* CSS for the shop-cart Lsit tab */
.shopCart-wrapper .shopCart_list {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
}

 .shopCart-wrapper .shopCart_list.show {
  transform: translateY(-100%);
}
/* 1)list top */
 .shopCart_list .list_Top {
  color: #646158;
  background: #f3e6c6;
  height: 30px;
  width: 100%;
  font-size: 11px;
  text-align: center;
  line-height: 30px;
}

/* 2)list head */

.shopCart-wrapper  .shopCart_list .list_Head {
  background: #f4f4f4;
  height: 30px;
}

.shopCart-wrapper .shopCart_list .list_Head .title {
  float: left;
  border-left: 1px solid #53c123;
  padding-left: 6px;
  line-height: 30px;
  font-size: 12px;
}

.shopCart-wrapper .shopCart_list .list_Head .empty {
  float: right;
  margin-right: 10px;
  line-height: 30px;
  font-size: 0;
}

.shopCart-wrapper .shopCart_list .list_Head .empty img {
  margin-right: 9px;
  height: 14px;
  vertical-align: middle;
}

.shopCart-wrapper .shopCart_list .list_Head .empty span {
  font-size: 12px;
  vertical-align: middle;
}

/* 3)list content: */
.shopCart-wrapper .shopCart_list .list_content {
  max-height: 360px;
  background: white;
  overflow: hidden;
}

 .shopCart-wrapper .shopCart_list .list_content .food {
  height: 38px;
  border: 1px solid #f4f4f4;
  padding: 12px 18px 12px 12px;
}

.shopCart-wrapper .shopCart_list .list_content .food .desc-wrapper {
  float: left;
  width: 248px;
}

.shopCart-wrapper  .shopCart_list .list_content .food .desc-wrapper .desc-left {
  float: left;
  width: 170px;
}

.shopCart-wrapper .shopCart_list .list_content .food .desc-wrapper .desc-left .name {
  font-size: 16px;
  margin-bottom: 8px;

  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.shopCart .shopCart-wrapper  .shopCart_list .list_content .food .desc-wrapper .desc-left .unit {
  color: #b4b4b4;
  font-size: 12px;
}


 .shopCart-wrapper 
  .shopCart_list
  .list_content
  .food
  .desc-wrapper
  .desc-left
  .description {
  color: #b4b4b4;
  font-size: 12px;
}
/* desc-right */

.shopCart-wrapper .shopCart_list .list_content .food .desc-wrapper .desc-right {
  float: right;
  width: 70px;
  text-align: right;
}

 .shopCart-wrapper .shopCart_list .list_content .food .desc-wrapper .desc-right .price {
  font-size: 12px;
}
/* cartControl */
.shopCart-wrapper .shopCart_list .list_content .food .cartControl_wrapper {
  float: right;
}
/* 4)list bottom  */

.shopCart  .mask{
  position: fixed;
  top:0;
  right:0;
  width:100%;
  height:100%;
  z-index: 98px;
  background:rgba(7,17,27,0.6)

}
</style>
