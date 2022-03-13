<template>
  <div class="header">
    <!--search and top background -->
    <div class="top-wrapper">
      <!-- this is the arrow section -->
      <div class="back-wrapper">
        <span class="icon-arrow_lift"></span>
      </div>

      <!-- this is the search section -->
      <form class="search-wrapper">
        <span class="search-icon"></span>
        <input class="search-bar" type="text" placeholder="搜索店内商品" />
      </form>

      <!-- this is the pindan and three dots sections -->
      <div class="more-wrapper">
        <a class="spelling-bt" href="#">拼单</a>
        <div class="more-bt">
          <i class="s-radius"></i>
          <i class="s-radius"></i>
          <i class="s-radius"></i>
        </div>
      </div>
    </div>

    <!-- restauran and favorite collect-->
    <div class="content-wrapper">
      <!-- restaurant logo -->
      <!-- 1.the data is from the webpack.dev.conf.js /api/goods 
            2.but with this location, the data is from the app.vue line 27 loaded for the 
            whole project;
            3.Child component got the data from the parent component: props in the export section
            -->
      <div class="icon" :style="head_bg"></div>
      <!-- <img :src=" poiInfo.pic_url" /> -->

      <!-- restaurant name -->
      <div class="name">
        <h3>{{ poiInfo.name }}</h3>
      </div>

      <!-- favorite collect section -->

      <div class="collect">
        <img src="./star.png" alt="" />
        <span>收藏</span>
      </div>
    </div>

    <!-- announcements-->
    <div class="bulletin-wrapper" v-if="poiInfo.discounts2">
      <!-- annaouncement icon -->
      <img class="icon" :src="poiInfo.discounts2[0].icon_url" alt="" />

      <!-- annaouncement text -->
      <span class="text">{{ poiInfo.discounts2[0].info }}</span>

      <!-- event number and arrow -->
      <div class="details">
        <!-- number of the event -->
        {{ poiInfo.discounts2.length }}个活动

        <!-- annoucement back arrow for more -->
        <span class="icon-keyboard_arrow_right" @click="openDetail"></span>
      </div>
    </div>

    <!-- head background-->

    <!-- use this computed property from the export section -->
    <!--  
      <div class="bg-wrapper" :style="background-image:url(" + this.poiInfo.head_pic_url + ");"></div>
    -->
    <div class="bg-wrapper" :style="content_bg"></div>

    <!-- This section does not display, you can set the paramater from data section v-show value-->
    <!-- vue transation effect, you need to name the transtion content of the display infomation, final display content -->
    <Transition name="detail">
      <!-- annoucement detail -->
      <div class="blutein-detail" v-show="isShow">
        <!-- restaurant wrapper -->
        <div class="detail-wrapper">
          <!-- content area -->
          <div class="content-wrapper" :style="content2_bg">
            <!-- restaurant logo -->
            <div class="icon2" :style="head_bg"></div>

            <!-- restaurant name -->
            <h3 class="name2">{{ poiInfo.name }}</h3>

            <!-- review informaton -->
          <div class="score">
              <Star :score="poiInfo.wm_poi_score"/>
              <span>{{poiInfo.wm_poi_score}}</span>
          </div>
          

            <!-- delivery infomation -->
            <p class="tip">
              <!-- You can give 1 space between the data and i tag to create css attributes -->
                {{ poiInfo.min_price_tip }}   <i>|</i> 

              {{ poiInfo.shipping_fee_tip }}   <i>|</i>

              {{ poiInfo.delivery_time_tip }}
            </p>

            <!-- delivery time -->
            <p class="time">配送时间: {{ poiInfo.shipping_time }}</p>

            <!-- announcement detail -->
            <div class="discounts" v-if="poiInfo.discounts2">
              <p>
                <img
                  class="icon"
                  :src="poiInfo.discounts2[0].icon_url"
                  alt=""
                />

                <!-- annaouncement text -->
                <span class="text">{{ poiInfo.discounts2[0].info }}</span>
              </p>
            </div>
          </div>

          <!-- close this page -->
          <div class="close-wrapper">
            <span class="icon-close" @click="closeDetail"> </span>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import Star from 'component/Star/Star.vue'
export default {
  name: "Head",
  // Data is a function here in the export area
  data() {
    return {
      isShow: false, //control if the announcement details page will open
    };
  },
// register the component
components:{
  Star
},
// props object recieve the value from the parent component App.vue
 //Props object contains the object, then the html section can use it
 props: {
    poiInfo: {
      type: Object,
      default: {},
    },
  },
  computed: {
    //calculate the content_bg value
    content_bg() {
      return "background-image:url(" + this.poiInfo.head_pic_url + ");";
    },
    //calculate the restaurant image
    head_bg() {
      return "background-image:url(" + this.poiInfo.pic_url + ");";
    },

    content2_bg() {
      return "background-image:url(" + this.poiInfo.poi_back_pic_url + ");";
    },
  },
  // two methods to open the deails page and close the pages,methods is a object,
  // This methods object has two functions
  methods: {
    openDetail() {
      this.isShow = true;
    },
    closeDetail() {
      this.isShow = false;
    },
  },

};
</script>

<style>
@import url("../../common/styles/icon.css");
/* @import url("Header.css"); */

.header {
  height: 160px;
  padding-top: 20px;
}
/* header */

.header .top-wrapper {
  position: relative;
}

.header .top-wrapper .back-wrapper {
  width: 50px;
  height: 31px;

  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  line-height: 31px;
}

.header .top-wrapper .back-wrapper span {
  display: inline-block;
  color: #fff;
}

.header .top-wrapper .search-wrapper {
  width: 100%;
  height: 31px;
  /* background: purple; */
  padding: 0 104px 0 50px;
  box-sizing: border-box;
}

.header .top-wrapper .search-wrapper .search-icon {
  margin-left: 10px;
  margin-top: 9px;
  width: 28px;
  height: 31px;
  background: url(./search.png) no-repeat;
  background-size: 13px 13px;
  position: absolute;
}

.header .top-wrapper .search-wrapper .search-bar {
  width: 100%;
  height: 31px;
  border: 0;
  box-sizing: border-box;
  background: #cdcdcc;
  border-radius: 25px;
  padding-left: 28px;
  outline: none;
}

.header .top-wrapper .more-wrapper {
  width: 65px;
  height: 24px;
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px 15px 0 24px;
}
.header .top-wrapper .more-wrapper .spelling-bt {
  width: 30px;
  height: 17px;
  color: white;
  line-height: 17px;
  border: 1px solid white;
  text-align: center;
  float: left;
  text-decoration: none;
  font-size: 10px;
}
.header .top-wrapper .more-wrapper .more-bt {
  float: right;
  width: 30px;
  height: 31px;
  margin-top: 6px;
}
.header .top-wrapper .more-wrapper .more-bt .s-radius {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  border: 1px solid white;
  display: block;
  float: left;
  margin-right: 1px;
}



/* restaurant and collect */

/* restaurant */
.content-wrapper{
  padding:17px 10px 11px ;
  height:50px;
}

/* restaurant logo */
/* wrapper */
.content-wrapper .icon{
  width:50px;
  height:50px;
  background-size:100% 100%;
  background-position:center ;
  border-radius: 5px;
  float:left;
}

/* restaurant name */
.content-wrapper .name{
  float:left;
  padding:18px 0 0 12px;
}
/* restaurant name font */
.content-wrapper .name h3{
  font-size:16px;
  font-weight:bold;
  color:white;

}
/* restaurant image */
/* .content-wrapper .icon img{
 width:50px;
 height:50px;
} */




/* restaurant collect section */
.content-wrapper .collect{
  width:25px;
  height:38px;
  float:right;
  text-align: center;
  padding-top:6px;
 
}

/* collect start */
.content-wrapper .collect img{
  width:20px;
  height:20px;

}

/* collect text */
.content-wrapper .collect span{
  margin-top:7px;
  color:white;
  font-size:11px;

}

/* annoucement part */


/* announcement wrapper */
.bulletin-wrapper{
  height:16px;
  padding:0 1opx;
}

/* anouncement icon */
.bulletin-wrapper .icon{
  width:16px;
  height:16px;
  float:left;
  margin-right:6px;
}
/* annoucement text */
.bulletin-wrapper .text{
  font-size:11px;
  line-height: 16px;
  color:white;
  float:left;

}
/* event number and arrow */
.bulletin-wrapper .details{
  font-size:11px;
  line-height: 16px;
  color:white;
  float:right;
}

/* numbert of the event */

/* arrow for more */
.bulletin-wrapper .details span{
  font-size:11px;
  line-height: 16px;
  color:white;
  float:right;
}

/* annoucement details cover */
.header .blutein-detail{
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  background:rgb(98,98,98,0.8);

}

.header .blutein-detail .detail-wrapper{
  width:100%;
  height:100%;
  padding:43px 20px 125px;
  box-sizing: border-box;
}

/* content-wrapper */
.header .blutein-detail .detail-wrapper .content-wrapper{
  height:100%;
  background-size:100% 100%;
  border-radius: 10px;
  text-align: center;

}
.header .blutein-detail .detail-wrapper .content-wrapper .icon2{
  width:60px;
  height:60px;
  background-size:135% 100%;
  background-position:center ;
  border-radius: 5px;
  display: inline-block;
  margin-top:40px;


}

.header .blutein-detail .detail-wrapper .content-wrapper .name2{
  font-size: 15px;
  margin-top:13px;
  color:white;
  font-weight:bold;
}

/* star review section  */

.header .blutein-detail .detail-wrapper .content-wrapper .score{
 
height:10px;
text-align: center;
font-size:0;
margin-top:6px;
}
/* star section location fix */
/* You can find this star item from the dev tool or from the Star.vue html section */
.header .blutein-detail .detail-wrapper .content-wrapper .star{
  display:inline-block;
  margin-right:7px;
}

/* score number  */
.header .blutein-detail .detail-wrapper .content-wrapper .score span{
  display:inline-block;
  font-size:11px;
  color:white;
}
.header .blutein-detail .detail-wrapper .content-wrapper .tip{
  font-size:11px;
  color:#bababc;
  margin-top:8px;
}
/* delivery infomation left and right space choose */
.header .blutein-detail .detail-wrapper .content-wrapper .tip{
  margin:8px 0 7px;
}


.header .blutein-detail .detail-wrapper .content-wrapper .time{
  font-size:11px;
  color:#bababc;
  margin-top:13px;

}

/* layout of the announcement details */
.header .blutein-detail .detail-wrapper .content-wrapper .discounts{
  margin-top:20px;
  padding:0 20px;
}

/* borderline of the announcement details */
.header .blutein-detail .detail-wrapper .content-wrapper .discounts{
   padding-top: 20px;
   border-top:1px solid #bababc;

}

/* image icon and font issue of the announcement deails */

.header .blutein-detail .detail-wrapper .content-wrapper img{
  width:16px;
  height:16px;
  /* margin-right:10px; */
}

.header .blutein-detail .detail-wrapper .content-wrapper span{
  font-size:11px;
  line-height: 16px;
  color:white;
}


/* Close area */


.header .blutein-detail .detail-wrapper .close-wrapper{
  padding-top:20px;
  height:40px;
  text-align:center;
  /* border-radius: 50%;
  color:rgb(140,140,140,0.9) */

}

/* cricle and Xsign build */
.header .blutein-detail .detail-wrapper .close-wrapper span{
  width:40px;
  height:40px;
  border-radius:50%;
  line-height:40px;
  display:inline-block;
  color:white;
  /* xsign background */
  background:rgb(118,118,118,0.7);
  /* circle */
  border: 1px solid rgb(140,140,140,0.9);


}

/* Transition effect */

/* come in and leave the page */
.detail-enter-active, .detail-leave-active{
  transition: 1s all;
}

/* effect to come in */

.detail-enter, .detail-leave-to{
  opacity: 0;
}
/* effect to left the page*/

.detail-enter-to, .detail-leave{
  opacity: 1;
}

/* top wrapper */
.header .bg-wrapper {
  width: 100%;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  background-size: 100% 135%;
  background-position: center -12px;
}
</style>
