<template>
  <div v-show="showFlag" class="food">
    This is the Food Details Page
  </div>
</template>

<script>
export default {
  name: "Food",
  props: {
      food:{
          type:Object,
      }

  },

  data() {
    return {
      showFlag: false
    };
  },
  methods: {
      showView(){
          this.showFlag = true;
      }
  }


};
</script>

<style>
.food{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    bottom:51px;
    background:white;
    z-index: 90;
}

</style>
