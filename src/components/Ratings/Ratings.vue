<template>
  <div class="ratings" ref="commentView">
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
          <span
            v-for="(item, index) in ratings.labels"
            :key="index"
            class="item2"
            :class="{ highlight: item.label_star > 0 }"
          >
            {{ item.content }}
            {{ item.label_count }}
          </span>
        </div>

        <!-- comment section -->

        <ul class="rating-list">
          <li
            v-for="(item, index) in selectComponents"
            :key="index"
            class="comment-item"
          >
            <div class="userIcon">
              <!-- display the when there is no image from the back end -->
              <img src="./anonymity.png" alt="" v-if="!item.user_pic_url" />

              <img :src="item.user_pic_url" alt="" v-if="item.user_pic_url" />
            </div>

            <!-- rating content -->
            <div class="commentMain">
              <!-- username -->
              <div class="user">
                {{ item.user_name }}
              </div>

              <!-- time -->
              <div class="time">
                {{ formatDate(item.comment_time) }}
              </div>

              <!-- star section -->
              <div class="starWrapper2">
                <span class="text">评分</span>
                <Star class="star" :scores="item.order_comment_score" />
              </div>

              <!-- text -->
              <div class="c-content" v-html="commentStr(item.comment)">
                <!-- {{ item.comment }} -->
              </div>
              <!-- img -->
              <div class="imgWrapper">
                <img
                  v-for="(img, index) in item.comment_pics"
                  :key="index"
                  src="img.thumbnail_url"
                  alt=""
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "../Star/Star.vue";
import Split from "../split/split.vue";
import BScroll from "better-scroll";

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

    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.commentView, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    });
  },

  computed: {
    selectComponents() {
      // all
      if (this.selectType == All) {
        return this.ratings.comments;
      } else if (this.selectType == PICTURE) {
        let arr = [];
        this.ratings.comments.forEach(item => {
          if (item.comment_pics.length > 0) {
            arr.push(item);
          }
          return arr;
        });
      } else {
        return this.ratings.comment_dp.comments;
      }

      // comment
    }
  },
  components: {
    Star,
    Split,
    BScroll
  },
  methods: {
    selectTypeFn(Type) {
      this.selectType = Type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },

    //
    //   1.convet the string to time

    formatDate(time) {
      // 1.convet the string to time
      let date = new Date(time * 1000);

      //   2.use the rgex to put the time in yy-mm--dd format
      // format
      let fmt = "yyyy.MM.dd";
      // year
      if (/(y+)/.test(fmt)) {
        let year = date.getFullYear().toString();
        // Sat Oct 14 2017 15:07:07 GMT+0800 (China Standard Time)

        fmt = fmt.replace(RegExp.$1, year);
      }
      // console.log(fmt);
      // month
      if (/(M+)/.test(fmt)) {
        let month = date.getMonth() + 1;
        // Sat Oct 14 2017 15:07:07 GMT+0800 (China Standard Time)
        if (month < 10) {
          month = "0" + month;
        }
        fmt = fmt.replace(RegExp.$1, month);
      }

      // day
      if (/(d+)/.test(fmt)) {
        let day = date.getDate();
        // Sat Oct 14 2017 15:07:07 GMT+0800 (China Standard Time)
        if (day < 10) {
          day = "0" + day;
        }
        fmt = fmt.replace(RegExp.$1, day);
      }

      // console.log(fmt);
      return fmt;
    },

    // hash tag add
    // js put the # tage
    // html add the v-html section
    // RegExp apply

    commentStr(content) {
      // console.log(content);
      let rel = /#[^#]+#/g;
      return content.replace(rel, "<i>$&</i>");
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

.ratings .ratingsWrapper .content .labels-view {
  margin-bottom: 14px;
}

.ratings .ratingsWrapper .content .labels-view .item2 {
  display: inline-block;
  height: 27px;
  line-height: 27px;
  padding: 0 10px;
  font-size: 12px;
  background: #f4f4f4;
  border-radius: 3px;
  color: #999999;
  margin-right: 6px;
  margin-bottom: 6px;
}

.ratings .ratingsWrapper .content .labels-view .item2.highlight {
  color: #656565;
}

.ratings .ratingsWrapper .content .rating-list {
}

.ratings .ratingsWrapper .content .rating-list .comment-item {
  padding: 15px 14px 17px 0;
  border-bottom: 1px solid #f4f4f4;
  width: 100%;
  box-sizing: border-box;
  display: flex;
}

.ratings .ratingsWrapper .content .rating-list .comment-item .userIcon {
  flex: 0 0 41px;
  margin-right: 10px;
}

.ratings .ratingsWrapper .content .rating-list .comment-item .userIcon img {
  width: 41px;
  height: 41px;
  border-radius: 50%;
}

.ratings .ratingsWrapper .content .rating-list .comment-item .commentMain {
  flex: 1;
  margin-top: 6px;
}

.ratings
  .ratingsWrapper
  .content
  .rating-list
  .comment-item
  .commentMain
  .user {
  width: 50%;
  float: left;
  font-size: 12px;
  color: #333333;
}
.ratings
  .ratingsWrapper
  .content
  .rating-list
  .comment-item
  .commentMain
  .time {
  width: 50%;
  float: right;
  font-size: 10px;
  text-align: right;
  color: #666666;
}

.ratings
  .ratingsWrapper
  .content
  .rating-list
  .comment-item
  .commentMain
  .starWrapper2 {
  /* float: left; */
  margin-top:12px;
  margin-bottom: 15px;
}

.ratings
  .ratingsWrapper
  .content
  .rating-list
  .comment-item
  .commentMain
  .starWrapper2
  .star {
  float: left;
  margin-left:7px;

}

.ratings
  .ratingsWrapper
  .content
  .rating-list
  .comment-item
  .commentMain
  .starWrapper2
  .text {
  color: #999999;
  font-size: 11px;
  float:left;
}

.ratings
  .ratingsWrapper
  .content
  .rating-list
  .comment-item
  .commentMain
  .c-content {
  margin-top: 30px;
  font-size: 13px;
  line-height: 19px;
}
.ratings
  .ratingsWrapper
  .content
  .rating-list
  .comment-item
  .commentMain
  .c-content
  i {
  color: #576b95;
}

.ratings
  .ratingsWrapper
  .content
  .rating-list
  .comment-item
  .commentMain
  .imgWrapper {
}

.ratings
  .ratingsWrapper
  .content
  .rating-list
  .comment-item
  .commentMain
  .imgWrapper
  img {
}
</style>
