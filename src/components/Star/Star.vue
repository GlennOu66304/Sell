<template>
  <!-- basic laout of the vue -->
  <div class="star">
    <!-- For loop to build the logic(span v-for) -->
    <span v-for="(itemClass,index) in itemClasses" :key="index"  :class="itemClass" class="star-item">
    </span>
    <!-- :class="itemClass" dynamic bind the star css value like: <span class="on" class="star-item"> </span>-->
    <!-- equal <span class="star-item on"></span> -->
    
    <!-- {{score}} -->
  </div>
  <!-- This logic will be, for loop will render the every star's css value which bind with the dynamic binding Class
  Which creats new html and  section in this place.
  -->
</template>

<script>
//  define value
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';


// You will assing the props value into the div section, then the html  v-for value
// will render it
export default {
  name: "Star",
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    itemClasses() {
    let result =[];
    // 1.The score process
      //-initial number process,Math.floor: 4.7 *2 then  to 9, then 9/2
      let score = Math.floor(this.score *2 )/2;
      //-- half star: inntial number remain, zero left, then push to a array:result of above left is 1, then half star
      let hasDecial = score % 1 !==0;
      //-- full start:initail Math.floor;
      let integer = Math.floor(score)
   

// 2. after the number process 

// render the integer into cls on
// for loop is a funtion

for(let i = 0; i < integer; i++){
result.push(CLS_ON)
}
// console.log(result)

//render the decial into cls half tar
// if is a function tool
if(hasDecial){
    result.push(CLS_HALF)
}


// 3 combine above number together lenght management
// while is a function tools
while(result.length < LENGTH ){
    result.push(CLS_OFF)
}

// console.log(result)
// 4. return reuslt array
return result

    }
  }
};
</script>

<style>
/* whold star section */
.star {
  font-size:0;
}
/* every star value */
.star .star-item {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 3px;
  background-size: 10px 10px;
  background-repeat: no-repeat;
}

/* last star value */
.star .star-item:last-child {
  margin-right: 0;
}

/* three star type's css */
.star .on{
    background-image: url(star24_on@2x.png)
}

.star .half{
    background-image: url(star24_half@2x.png)
}

.star .off{
    background-image: url(star24_off@2x.png)
}
</style>
