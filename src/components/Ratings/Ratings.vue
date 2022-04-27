<template>
  <div class="ratings">
    <div class="ratingsWrapper">
      <!-- overview -->

      <div class="overview">
        <!-- left section -->
        <div class="overviewLeft">
          <div class="comment_score">
            <!-- seller score -->
            <p class="score">{{ ratings.food_score }}</p>
            <p class="text">商家评分</p>
          </div>

          <!-- star section -->
          <div class="star_score">
            <!-- taste -->

            <div class="quality_score item">
              <span class="text">口味</span>
              <Star class="star" :score="ratings.quality_score" />
              <span class="score">{{ ratings.quality_score }}</span>
            </div>
            <!-- package -->
            <div class="pack_score item">
              <span class="text">包装</span>
              <Star class="star" :score="ratings.pack_score" />
              <span class="score">{{ ratings.pack_score }}</span>
            </div>
          </div>
        </div>

        <!-- right section -->
        <div class="overviewRight">
          <!-- delivery section -->
          <div class="delivery_score">
            <p class="score">{{ ratings.delivery_score }}</p>
            <p class="text">配送评分</p>
          </div>
        </div>
      </div>
      <Split />
      <!-- bottom content -->
      <div class="content">
        <!-- box area -->
        <div class="rating-select" v-if="ratings.tab">
          <!-- all -->
          <span
            class="item"
            @click="selectTypeFn(2)"
            :class="{ active: selectType == 2 }"
          >
            {{ ratings.tab[0].comment_score_title }}
          </span>
          <!-- has image -->
          <span
            class="item"
            @click="selectTypeFn(1)"
            :class="{ active: selectType == 1 }"
          >
            {{ ratings.tab[1].comment_score_title }}
          </span>
          <!-- comment -->
          <span
            class="item"
            @click="selectTypeFn(0)"
            :class="{ active: selectType == 0 }"
          >
            <img
              src="../../../resource/img/icon_sub_tab_dp_highlighted@2x.png"
              alt=""
              v-show="selectType == 0"
            />

            <img
              src="../../../resource/img/icon_sub_tab_dp_normal@2x.png"
              alt=""
              v-show="selectType != 0"
            />
            {{ ratings.tab[2].comment_score_title }}
          </span>
        </div>
        <!-- tag area -->
        <div class="labels-view">
          this is the tag area
        </div>
        <!-- comment section -->
      </div>
      <div class="rating-list">
        this is the comment area
      </div>
    </div>
  </div>
</template>

<script>
import Star from "../Star/Star.vue";
import Split from "../split/split.vue";
const All = 2;
const PICTURE = 1;
const COMMENT = 0;
export default {
  name: "Ratings",
  data() {
    return {
      ratings: {},
      selectType: All
    };
  },
  created() {
    // review data
    this.$axios
      .get("/api/ratings")
      .then(res => {
        var dataSource = res.data;
        // console.log(dataSource);
        if (dataSource.code == 0) {
          // assing the data from api to the data section in vue
          this.ratings = dataSource.data;
          console.log(this.ratings);
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  components: {
    Star,
    Split
  },
  methods: {
    selectTypeFn(Type) {
      this.selectType = Type;
    }
  }
};
</script>

<style>
.ratings {
  position: absolute;
  left: 0;
  top: 210px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

.ratings .ratingsWrapper .overview {
  padding: 20px 0 18px 0;
  display: flex;
}
.ratings .ratingsWrapper .overview .overviewLeft {
  flex: 1;
  padding-left: 26px;
}

.ratings .ratingsWrapper .overview .overviewLeft .comment_score {
  float: left;
  width: 58px;
  text-align: center;
  margin-right: 26px;
}

.ratings .ratingsWrapper .overview .overviewLeft .comment_score .score {
  font-size: 23px;
  font-weight: 800;
  color: #ffb000;
  margin-bottom: 9px;
}

.ratings .ratingsWrapper .overview .overviewLeft .comment_score .text {
  font-size: 11px;
  color: #666666;
}

.ratings .ratingsWrapper .overview .overviewLeft .star_score {
  float: left;
  margin-top: 3px;
}

.ratings .ratingsWrapper .overview .overviewLeft .star_score .item {
  height: 11px;
}

.ratings .ratingsWrapper .overview .overviewLeft .star_score .item .text {
  font-size: 11px;
  color: #666666;
  margin-right: 11px;
  float: left;
}

.ratings .ratingsWrapper .overview .overviewLeft .star_score .item .star {
  float: left;
  margin-right: 11px;
}

.ratings .ratingsWrapper .overview .overviewLeft .star_score .item .score {
  font-size: 11px;
  color: #ffb000;
  float: left;
}

.ratings .ratingsWrapper .overview .overviewLeft .star_score .quality_score {
  margin-bottom: 14px;
}
.ratings .ratingsWrapper .overview .overviewRight {
  flex: 0 0 100px;
  text-align: center;
  border-left: 1px solid #9d9d9d;
}

/* 
1.score:color, font size
2.text:color font size

*/
.ratings .ratingsWrapper .overview .overviewRight .delivery_score .score {
  font-size: 19px;
  font-weight: 500;
  color: #999999;
  margin-bottom: 10px;
  margin-top: 3px;
}
.ratings .ratingsWrapper .overview .overviewRight .delivery_score .text {
  font-size: 11px;
  color: #999999;
}

.ratings .ratingsWrapper .content {
  padding: 16px;
}
/* 
1.godlden border for the box
2.every item cover the 33% content
*/
.ratings .ratingsWrapper .content .rating-select {
  width: 100%;
  box-sizing: border-box;
  font-size: 0;
  border: 1px solid #ffb000;
  margin-bottom: 11px;
  border-radius: 3px;
}

.ratings .ratingsWrapper .content .rating-select .item {
  width: 33.3%;
  display: inline-block;
  height: 33px;
  line-height: 33px;
  font-size: 14px;
  text-align: center;
  border-right: 1px solid #ffb000;
  box-sizing: border-box;
  color: #ffb000;
}

.ratings .ratingsWrapper .content .rating-select .item:last-child {
  border-right: 0;
}

.ratings .ratingsWrapper .content .rating-select .item:last-child img {
  height: 14px;
}

.ratings .ratingsWrapper .content .rating-select .item.active {
  background: #ffb000;
  color: black;
}

.ratings
  .ratingsWrapper
  .content
  .rating-select
  .item
  .ratings
  .ratingsWrapper
  .content
  .labels-view {
}
.ratings .ratingsWrapper .content .rating-list {
}
</style>
