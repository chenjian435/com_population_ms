<template>
  <div class="home">
    <!-- 走马灯 -->
    <div>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in  imagebox" :key="item.id">
          <img :src="item.idView" class="image">

        </el-carousel-item>
      </el-carousel>

    </div>
    <hr>
    <h1 style="text-align: center; margin-top: 10px;">社区相关信息</h1>

    <!--2. 访问数据统计 ----------------->
    <div class="content" style="margin-top: 50px; height: 510px; ">
    
      <div class="time-info" id="box13">
        <div class="title"></div>
        <div id="charts" style="width: 45%; height: 300px; float: left;"></div>
      </div>

      <div class="area" id="box1">
        <div class="title"></div>
        <div id="pie" style="width: 25%; height: 300px;  float: right; "></div>
      </div>


      <div class="area" id="box2">
        <div class="title"></div>
        <div id="pie2" style="width: 25%; height: 300px;  float: right; "></div>
      </div>
      
      <div class="area" id="box3">
        <div class="title"></div>
        <div id="charts2" style="width: 75%; height: 200px; float: left;  ">
       
        </div>
      </div>
    </div>



  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'pmd',
  data() {
    return {
      imagebox: [{ id: 0, idView: require('@/assets/image/0.jpg') },
      { id: 1, idView: require('@/assets/image/1.jpg') },
      { id: 2, idView: require('@/assets/image/2.jpg') },
      { id: 3, idView: require('@/assets/image/3.jpg') },
      { id: 4, idView: require('@/assets/image/4.jpg') },
      { id: 5, idView: require('@/assets/image/5.jpg') }
        // imagebox是assets下一个放图片的文件夹
      ]
    }
  },
  created() {
    this.format()
  },


  methods: {

    //获取图表动态数据-----------------
    async format() {

      this.axios.get("http://localhost/oldcounts/").then((res) => {

        let arr = res.data.data;
        let year = [], count = [];
        arr.forEach(ele => {
          year.push(ele.year + '年')
          count.push(ele.count)

        });


        this.line(year, count)


      });

      this.axios.get("http://localhost/peoples/").then((res) => {
        this.axios.get("http://localhost/speoples/").then((res2) => {
       
        let arr1 = res.data.data;
        let arr2 = res2.data.data;
        this.line2(arr1.length,arr2.length)
      });
      
      });


      this.axios.get("http://localhost/peoples/countSex").then((res) => {
        let arr = res.data.data;


        let pieData = [];

        // 饼图--对象数据
        let obj1 = {}
        obj1.name = '女';
        obj1.value = arr[0];
        pieData.push(obj1)
        let obj2 = {}
        obj2.name = '男';
        obj2.value = arr[1];
        pieData.push(obj2)
        this.pie(pieData)

      });

      this.axios.get("http://localhost/speoples/countSex").then((res) => {
        let arr = res.data.data;


        let pieData = [];

        // 饼图--对象数据
        let obj1 = {}
        obj1.name = '女';
        obj1.value = arr[0];
        pieData.push(obj1)
        let obj2 = {}
        obj2.name = '男';
        obj2.value = arr[1];
        pieData.push(obj2)
        this.pie2(pieData)

      });


    },


    //绘制图表--折线------------------
    line(year, count) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('charts'));
      // 绘制图表
      myChart.setOption({

        title: {
          text: '社区老年人口数',
          left: 'center'
        },
        tooltip: {//提示框组件
          trigger: 'axis',
        },
        legend: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {//x轴数据
          data: year
        },
        yAxis: {//y轴会自动创建数据
        },
        series: [//图表内容
          {
            // name: '社区老年人数',
            type: 'line',
            data: count,
            smooth: true,//是否平滑曲线显示
          },


        ]
      });
    },

    line2(people,speople) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('charts2'));
      // 绘制图表
      myChart.setOption({

        title: {
          text: '社区人口数',
          left: 'center'
        },
        tooltip: {//提示框组件
          trigger: 'axis',
        },
        legend: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {//x轴数据
          data:['常住人口','暂住人口']
        },
        yAxis: {//y轴会自动创建数据
        },
        series: [//图表内容
          {
            // name: '社区老年人数',
            type: 'bar',
            data: [people,speople],
            smooth: true,//是否平滑曲线显示
          },


        ]
      });
    },

    //绘制饼图
    pie(pieData) {
      var myChart = echarts.init(document.getElementById('pie'));
      var option;
      option = {
        title: {
          text: '常住人口男女比例',
          // subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '人数',
            type: 'pie',
            radius: '50%',
            data: [
              { value: pieData[0].value, name: pieData[0].name },
              { value: pieData[1].value, name: pieData[1].name },

            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      option && myChart.setOption(option);
    },

    pie2(pieData) {
      var myChart = echarts.init(document.getElementById('pie2'));
      var option;
      option = {
        title: {
          text: '暂住人口男女比例',
          // subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '人数',
            type: 'pie',
            radius: '50%',
            data: [
              { value: pieData[0].value, name: pieData[0].name },
              { value: pieData[1].value, name: pieData[1].name },

            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'

              }
            }
          }
        ]
      };
      option && myChart.setOption(option);
    },


  }

}
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;

}

.el-carousel__item:nth-child(2n) {

  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.image {



  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}
</style>