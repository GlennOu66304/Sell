<template>
  <!-- basic layout build:
-- get the data
-- clean the data

 -->
  <div class="goods1">
    <!-- 1.left side and right side; -->

    <!-- left side -->
    <div ref="menuScroll" class="menu-wrapper">
      <!-- 1.unorder list; -->
      <ul>
        <!-- 2.single list; -->
        <!-- special tag -->
        <!-- in order to make the right scroll and left scroll match the content, you need to set the
        index = 0 in the special promotion section, so the following the index can start with index +
        -->
        <li
          class="menu-item"
          @click="selectIndex(0)"
          :class="{ current: currentIndex === 0 }"
        >
          <!-- 3. p tag contains the img and text -->
          <p class="text">
            <img
              :src="container.tag_icon"
              alt=""
              v-if="container.tag_icon"
              class="icon"
            />
            {{ container.tag_name }}
          </p>
        </li>

        <!-- normal tags -->
        <!-- 2).currentIndex class html and use the computed value of the currentIndex-->
        <!-- 2. click event apply it to the html -->
        <li
          v-for="(item, index) in goods"
          :key="index"
          @click="selectIndex(index + 1)"
          class="menu-item"
          :class="{ current: currentIndex === index + 1 }"
        >
          <p class="text">
            <img :src="item.icon" v-if="item.icon" alt="" class="icon" />

            {{ item.name }}
          </p>
          <!-- number on the left menu:
1.i tag to put the number 's location -->
<!-- 4.v-show to decide if the number will display; -->
          <i v-show="calculatedCount(item.spus) > 0" class="num">{{ calculatedCount(item.spus) }}</i>
        </li>
      </ul>
    </div>
    
    <!-- right side -->

    <div ref="foodScroll" class="food-wrapper">
      <ul>
        <!-- special promotion: 
       1.Big loop only contains the banner -->
        <li class="container-list food-list-hook">
          <div
            v-for="(item, index) in container.operation_source_list"
            :key="index"
          >
            <img :src="item.pic_url" alt="" />
          </div>
        </li>

        <!-- 1. detailed category for loop; -->
         <!-- @click="showDetails" -->
        <li
          v-for="(item, index) in goods"
          :key="index"
          class="food-list food-list-hook"
        
        >
          <!-- deailed category name -->
          <h3 class="title">{{ item.name }}</h3>
          <!-- 2.small category for loop; -->
        
          <ul>
            <li
              v-for="(food, index) in item.spus"
              :key="index"
              class="food-item"
              @click="showDetails(food)" 
              
            >
              <!-- 3.image methods processing; -->
              <div class="icon" :style="head_bg(food.picture)"></div>

              <!-- food conten details -->
              <div class="content">
                <!-- 4.food name and description processing; -->
                <h3 class="name">{{ food.name }}</h3>
                <p class="desc" v-if="food.descrption">
                  {{ food.description }}
                </p>

                <div class="extra">
                  <!-- 5.selling number and thumbup processing; -->
                  <span class="saled">{{ food.month_saled_content }}</span>
                  <span calss="praise">{{ food.praise_content }}</span>
                </div>

                <!-- recommendtiona -->
                <img class="product" :src="food.product_label_picture" alt="" />

                <!-- sell price -->
                <p class="price">
                  <span class="text">￥{{ food.min_price }}</span>

                  <span class="unit"> /{{ food.unit }}</span>
                </p>
              </div>
              <div class="cartControl_wrapper">
                  <!-- choose the food value from the data-->
                <CartControl :food="food" />
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>


    <ShopCart
      :poiInfo="poiInfo"
      
      :selectFoods="selectFoods2"
    >
    <!-- selectFoods2 is a function in the method -->
    </ShopCart>
  
  <Food :food="selectedFood" ref="foodView"/>
  
  </div>
</template>

<script>
// import the pacakge;
import BScroll from "better-scroll";
import ShopCart from "component/ShopCart/ShopCart.vue";
import CartControl from "component/CartControl/CartControl.vue";
import Food from 'component/Food/Food.vue'

export default {
  name: "Goods",
  data() {
    return {
      container: {},
      goods: [],
      menu: {},
      food: {},
      poiInfo: {},
      listHeight: [],

      scrollY: 0,
      selectedFood:{}
    };
  },

  created() {
    var that = this;
    // axios get the data from the api
    this.$axios
      .get("/api/goods")
      .then(res => {
        var dataSource = res.data;
        // console.log(dataSource.data);
        if (dataSource.code == 0) {
          // assing the data from api to the data section in vue
          that.container = dataSource.data.container_operation_source;
          that.goods = dataSource.data.food_spu_tags;
          that.poiInfo = dataSource.data.poi_info;

          // console.log(this.container);
          // console.log(this.goods);
          // console.log(that.shoppingCart);
            // console.log(that.poiInfo);
          //  3.after the receiving the data and dom is loaded, then start to use the init scroll function in the methods
          // the $nextTick is a function
          // if you can not see the left side is scorlling, please open it into the resposive option, then choose 100% expand
          // on mac computer it's self withought external keyboard, you need to press the touch pad and scroll the page;
          that.$nextTick(() => {
            that.initScroll();
            that.calculateHeight();
          });
        }
      })

      .catch(err => {
        console.log(err);
      });
  },
  // methods is a object
  methods: {
    initScroll() {
      // refs to load the data;
      // by giving the click attribute to the left menu, you are able to clik it
      // click https://better-scroll.github.io/docs-v1/doc/zh-hans/options.html#click
      this.menu = new BScroll(this.$refs.menuScroll, {
        click: true
      });
      this.food = new BScroll(this.$refs.foodScroll, {
        //  probeType https://better-scroll.github.io/docs-v1/doc/zh-hans/options.html#resizepolling
        probeType: 3,
        // 3.add the click attribute to the food scroll secttion for cart control
        click: true
      });
      //  console.log(this.menu)

      //  monitor the scroll event, bscroll method on
      //on(type, fn, context)
      // https://better-scroll.github.io/docs-v1/doc/zh-hans/api.html#ontype-fn-context
      this.food.on("scroll", pos => {
        // console.log(pos.y)
        // choose the absolute value of the interge
        this.scrollY = Math.abs(Math.round(pos.y));
        // console.log(this.scrollY)
      });
    },

    head_bg(imgName) {
      return "background-image:url(" + imgName + ")";
    },

    // Calculate the right side's height:
    calculateHeight() {
      // refs to get the hood value
      let foodList = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      // b.list height array push;
      let height = 0;
      this.listHeight.push(height);
      // for loop to calculate the array height;
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height = height + item.clientHeight;
        // height += item.clientHeight
        this.listHeight.push(height);
      }
      // console.log(foodList);
      // print the height of the array item
      // console.log(this.listHeight);
    },

    // 2.click the left side content which take the right area of the right side:(left to right)
    selectIndex(index) {
      // 1)first to locate the food sections by ref;
      let foodList = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      // 2)calculate it's index array[index]
      let vm = foodList[index];
      // console.log(vm)

      // 3)scrollToElement function to head to the that area
      this.food.scrollToElement(vm, 250);
    },
// 2.Methods function to calculate the number of the area:
// b.small area's count number forEach:spus:
     calculatedCount(spus) {
      let num = 0;
      spus.forEach(item => {
        if (item.count > 0) {
          //  item+= item++ to get the calculated value
          num += item.count;
        }
      });

      return num;
    },

    showDetails(food){
      this.selectedFood = food
      this.$refs.foodView.showView()

    }
  },

  // computed is a object
  // 1.scroll the right side to certain area which can change the css color of right side page;
  // right to left
  computed: {
    // 1)calculate the index computed;
    currentIndex() {
      // for loop, get the value of the  hegiht of the firtst item in the array and second item
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        // if the height is between two values, then return the bottom index of the value
        //  like the first area's biggest number  of height is the second item's height's start, this number and
        // the second item's top height number is this area' cover;
        //  console.log(this.listHeight)
        //  console.log(this.scrollY)
        if (this.scrollY >= height1 && this.scrollY < height2) {
          // console.log(i);
          return i;
        }
      }

      // none of the situation above, so the bottome index is 0
      return 0;
    },

    //     .logic explain:
    // 1)cartConrol value change
    // 2)compute to the goods component
    // 3)good component send the props to the ShopCart Component
    selectFoods2() {
      let foods = [];
      // 3.Two For each render the count value:
      // 1) big value render the value
      this.goods.forEach(good => {
        // 2) small value render the value
        good.spus.forEach(food => {
          // only generates the array when the count > 0
          if (food.count > 0) {
            foods.push(food);
          }
        });
      });
      // return needs to be put outside of the two for Each, you can clapass the bracket to see the result
      return foods;
    },



  },
  components: {
    ShopCart,
    CartControl,
    Food
  }
};
</script>

<style>
/*2. css to locate four sides value;  */
.goods1 {
  display: flex;
  position: absolute;
  top: 221px;
  bottom: 51px;

  overflow: hidden;
  width: 100%;
}
/* 3.flex box value adding; */

/* 
Three values: flex-grow | flex-shrink | flex-basis
flex: 2 2 10%;
flex-grow :size expand
flex-shrink:size narrow
flex-basis:width and height
*/

/* 4.color high light */

/* css for the menu left side */
.goods1 .menu-wrapper {
  flex: 0 0 85px;
  background-color: #f4f4f4;
}

.goods1 .menu-wrapper .menu-item {
  padding: 18px 23px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
  position:relative;
}

/* 3)apply css to the current index; */
/* need to make sure the current and .menu-item glue together or you will not see the css effect */
.goods1 .menu-wrapper .menu-item.current {
  background: white;
  font-weight: bold;
  margin-top: -1px;
}

.goods1 .menu-wrapper .menu-item .text {
  font-size: 13px;
  color: #333333;
  line-height: 17px;
  vertical-align: middle;

  /* webkit for the css three dots */
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods1 .menu-wrapper .menu-item .icon {
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
/* 3.CSS:layout of the i tag'; */
.goods1 .menu-wrapper .menu-item .num{
width:13px;
height:13px;
border-radius:50%;
position:absolute;
top:5px;
right:5px;
color:white;
background:red;
text-align:center;
font-size:10px;
line-height:13px;
}
/* Right Food section CSS */
.goods1 .food-wrapper {
  flex: 1;
  /* background-color: blue; */
}

/* banner image css */
.goods1 .food-wrapper .container-list {
  padding: 11px 11px 0 11px;
  border: 1px solid #e4e4e4;
}

.goods1 .food-wrapper .container-list img {
  width: 100%;
  margin-bottom: 11px;
  border-radius: 5px;
}

/* food list css */
.goods1 .food-wrapper .food-list {
  padding: 11px;
}

.goods1 .food-wrapper .food-list .title {
  font-size: 13px;
  height: 13px;
  background: url(btn_yellow_highlighted@2x.png) no-repeat left center;
  background-size: 2px, 10px;
  padding-left: 7px;
  margin-bottom: 12px;
}

.goods1 .food-wrapper .food-list .food-item {
  display: flex;
  margin-bottom: 26px;
  position: relative;
}

.goods1 .food-wrapper .food-list .food-item .icon {
  flex: 0 0 63px;
  height: 75px;
  background-position: center;
  background-size: 120% 100%;
  background-repeat: no-repeat;
  margin-right: 11px;
}

.goods1 .food-wrapper .food-list .food-item .content {
  flex: 1;
}

.goods1 .food-wrapper .food-list .food-item .content .name {
  font-size: 16px;
  line-height: 21px;
  color: #333333;
  margin-bottom: 10px;
  padding-right: 27px;
}

.goods1 .food-wrapper .food-list .food-item .content,
desc {
  font-size: 10px;
  line-height: 19px;
  color: #bfbfbf;

  /* webkit for the css three dots */
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods1 .food-wrapper .food-list .food-item .content .extra {
  font-size: 10px;
  color: #bfbfbf;
  margin-bottom: 6px;
}

.goods1 .food-wrapper .food-list .food-item .content .extra .saled {
  margin-right: 14px;
}

.goods1 .food-wrapper .food-list .food-item .content .product {
  height: 15px;
  margin-bottom: 6px;
}

.goods1 .food-wrapper .food-list .food-item .content .price {
  font-size: 0;
}

.goods1 .food-wrapper .food-list .food-item .content .price .text {
  font-size: 14px;
  color: #fb4e44;
}

.goods1 .food-wrapper .food-list .food-item .content .price .unit {
  font-size: 12px;
  color: #bfbfbf;
}

.goods1 .food-wrapper .food-list .food-item .cartControl_wrapper {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
