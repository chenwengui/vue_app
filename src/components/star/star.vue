<template>
  <div class="star" :class="starType">
    <span class="star-item" :class="itemClass" v-for="itemClass in itemClasses" :key="itemClass.index"></span>
  </div>
</template>

<script>

const LENGTH = 5;// 表示5颗星
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
  name: 'Star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star_' + this.size;
    },
    itemClasses() {
      let result = [];// 存放星星数组
      // 0.5表示半颗星，计算分数是0.5的几倍，再乘2，就是几颗星
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;// 判断是否有小数，即判断是不是有半颗星
      let integer = Math.floor(score);// 整数部分，完整的星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);// 数组中放入整颗星
      }
      if (hasDecimal) {
        result.push(CLS_HALF);// 数组中放入半颗星，且半颗星只出现一次
      }
      // 剩余补齐
      while (result.length < LENGTH) {
        result.push(CLS_OFF);// 放入灰色星
      }
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
  .star{font-size:0;
  	.star-item{display:inline-block;vertical-align: middle;background-repeat:no-repeat;width:10px;height:10px;margin-right:3px;background-size:10px 10px;
        &:last-child{margin-right:0} 
        &.on{background-image: url('star24_on@2x.png');}
        &.half{background-image: url('star24_half@2x.png');}
        &.off{background-image: url('star24_off@2x.png');}
  	}
  }
</style>