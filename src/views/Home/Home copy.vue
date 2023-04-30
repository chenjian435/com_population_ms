<template>
 <div class="home">
      <div class="box" @mouseout="out" @mouseover="over">
        <img
          v-for="(item, index) in list"
          v-show="listIndex === index"
          :key="index"
          :src="item"
          alt=""
        />
        <p class="left" v-show="flag" @click="changePage(prevIndex)">&lt;</p>
        <ul>
          <li
            :class="{ color: index == listIndex }"
            v-for="(item, index) in list"
            @click="changePage(index)"
            :key="index"
          ></li>
        </ul>
        <p class="right"  v-show="flag" @click="changePage(nextIndex)">&gt;</p>
      </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      flag:false,
      list: [
        require("../../assets/image/1.jpg"),
        require("../../assets/image/2.jpg"),
        require("../../assets/image/3.jpg"),
        require("../../assets/image/4.jpg"),
      ],
      listIndex: 0, //默认显示第几张图片
      timer: null, //定时器
    };
  },
  computed: {
    //上一张
    prevIndex() {
      if (this.listIndex == 0) {
        return this.list.length - 1;
      } else {
        return this.listIndex - 1;
      }
    },
    //下一张
    nextIndex() {
      if (this.listIndex == this.list.length - 1) {
        return 0;
      } else {
        return this.listIndex + 1;
      }
    },
  },
  methods: {
    
    changePage(index) {
      this.listIndex = index;
    },
    //移除
    out() {
      this.flag=false;
      this.setTimer();
    },
    //移入
    over() {
      this.flag=true;
      clearInterval(this.timer);
    },
    //3秒切图
    setTimer() {
      this.timer = setInterval(() => {
        this.listIndex++;
        if (this.listIndex == this.list.length) {
          this.listIndex = 0;
        }
      }, 3000);
    },
  },
  created() {
    //定时器
    this.setTimer();
  },
  mounted() {},
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .box {
    position: relative;
    width: 1000px;
    height: 500px;
   
    img {
      width: 100%;
      height: 100%;
      border-radius: 15px;
      z-index: 100;
    }
    p {
      cursor: pointer;
      color: white;
      font-size: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      background: rgba(0, 0, 0, 0.5);
    }
    .left {
      position: absolute;
      top: 50%;
      left: 0;
    }
    .right {
      position: absolute;
      top: 50%;
      right: 0;
    }
    ul {
      list-style: none;
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: absolute;
      width: 150px;
      height: 20px;
      top: 90%;
      right: 35%;
      .color {
        background: red;
        color: red;
      }
      li {
        cursor: pointer;
        width: 10px;
        height: 10px;
        background: white;
        border-radius: 50%;
      }
    }
  }
}
</style>