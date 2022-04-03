<template>
  <div class="cartControl">
      <!-- 4.v-show decide if it will show decrease and add value -->
    <div v-show="food.count>0" @click="cartDecrease" class="cart_remove icon-remove_circle_outline"></div>
    <div v-show="food.count>0" class="cart_count">{{food.count}}</div>
    <div @click="cartIncrease" class="cart_add icon-add_circle">
        <i class='bg'></i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
name:"CartControl",
// 0.props value setting
props:{
    food:{
        type:Object,
    }
},
methods:{
    // 1.two click function
cartDecrease(){
 this.food.count--
},

cartIncrease(){
    // if there is no count value, then set the global value1 Vue.set
   if(!this.food.count){
    // 2.vue set global value(increase4)
    Vue.set(this.food, "count", 1)
}else{
    // if there is a count value, then increase it.
    this.food.count++
}

}

},
}
</script>

<style>
.cartControl{
    font-size:0;

}

.cartControl .cart_remove{
    display:inline-block;
    width:25px;
    height:25px;
    color:#b4b4b4;
    font-size:26px;


}

.cartControl .cart_count{
    display:inline-block;
    width:25px;
    text-align:center;
    font-size:12px;
    line-height:25px;
    vertical-align:top;

}

.cartControl .cart_add{
    display:inline-block;
    width:25px;
    height:25px;
    font-size:26px;
    color:#ffd161;
    position:relative;

}

.cartControl .cart_add .bg{
    width:20px;
    height:20px;
    border-radius:50%;
    background:black;
    position:absolute;
    left:3px;
    top:3px;
    z-index:-1;
}

</style>