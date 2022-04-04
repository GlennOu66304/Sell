<template>
  <transition name="detail">
    <!-- close foodDetails -->
    <div v-show="showFlag" class="food">
      <div class="food-wrapper">
        <div class="food-content">
          <div class="img-wrapper">
            <img class="food-img" :src="food.picture" alt="" />
            <!--    III,JS
              1.change the click event from the whole page to close icon -->
            <!-- close icon -->
            <span class="close-bt icon-close" @click="closeView"></span>
            <!-- share image -->
            <img src="./share.png" alt="" />
            <!-- more image -->
            <img src="./more.png" alt="" />

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
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
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
    },
    closeView() {
      this.showFlag = false;
    }
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
.food {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 51px;
  background: white;
  z-index: 90;
}

.food .food-wrapper .food-content .img-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}

.food .food-wrapper .food-content .img-wrapper .food-img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
/* From left to right page animation */
.detail-enter-active .detail-leave-active {
  transition: 1s;
}
.detail-enter .detail-leave-to {
  transform: translateX(100%);
  /* transform: rotate(180 deg) */
}
</style>
