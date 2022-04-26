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
    </div>
  </div>
</template>

<script>
import Star from "../Star/Star.vue";
import Split from "../split/split.vue";
export default {
  name: "Ratings",
  data() {
    return {
      ratings: {}
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
  margin-top:3px;
}
.ratings .ratingsWrapper .overview .overviewRight .delivery_score .text {
  font-size: 11px;
  color: #999999;
}
</style>
