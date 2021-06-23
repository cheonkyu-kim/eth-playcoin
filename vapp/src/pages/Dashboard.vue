<template>
  <div>

    <div class="row">
      <div class="col-lg-12 flex">
        <base-alert class="col-2" type="danger" with-icon>
          <span data-notify="icon" class="tim-icons icon-app"></span>
          <span data-notify="message">#Last Block <br/> {{ lastBlock }}</span>
        </base-alert>
        <base-alert class="col-2" type="info" with-icon>
          <span data-notify="icon" class="tim-icons icon-coins"></span>
          <span data-notify="message">#Tokens <br/> {{ totalSupply }}</span>
        </base-alert>
        <base-alert class="col-2" type="success" with-icon>
          <span data-notify="icon" class="tim-icons icon-paper"></span>
          <span data-notify="message">#Transaction <br/> {{ txCount }}</span>
        </base-alert>
        <base-alert class="col-6" type="warning" with-icon>
          <span data-notify="icon" class="tim-icons icon-credit-card"></span>
          <span data-notify="message">#Address <br/> {{ currentAccount }}</span>
        </base-alert>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">트랜젝션 실행 수</h5>
            <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary "></i> 000000</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="purpleLineChart"
                        chart-id="purple-line-chart"
                        :chart-data="purpleLineChart.chartData"
                        :gradient-colors="purpleLineChart.gradientColors"
                        :gradient-stops="purpleLineChart.gradientStops"
                        :extra-options="purpleLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>
      <div class="col-lg-6" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">계정별 보유 토큰 수</h5>
            <h3 class="card-title"><i class="tim-icons icon-coins text-info "></i> {{ totalSupply }}</h3>
          </template>
          <div class="chart-area">
            <bar-chart style="height: 100%"
                       chart-id="blue-bar-chart"
                       :chart-data="blueBarChart.chartData"
                       :gradient-stops="blueBarChart.gradientStops"
                       :extra-options="blueBarChart.extraOptions">
            </bar-chart>
          </div>
        </card>
      </div>
      <!-- <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> 12,100K</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="green-line-chart"
                        :chart-data="greenLineChart.chartData"
                        :gradient-stops="greenLineChart.gradientStops"
                        :extra-options="greenLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div> -->
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">경품 교환</h6>
            <!-- <p class="card-category d-inline">{{$t('dashboard.today')}}</p> -->
            <base-dropdown menu-on-right=""
                           tag="div"
                           title-classes="btn btn-link btn-icon"
                           aria-label="Settings menu"
                           :class="{'float-left': isRTL}">
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>
      <div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">계정</h4>
          <!-- <h4 slot="header" class="card-title">{{$t('dashboard.simpleTable')}}</h4> -->
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
  // import Notification from './Notification.vue';
  import { BaseAlert } from '@/components';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';
  import { mapActions, mapGetters } from 'vuex'

  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable,
      BaseAlert
    },
    data() {
      return {
        bigLineChart: {
          allData: [
            [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
            [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
            [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [{ }],
            labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          },
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        },
        purpleLineChart: {
          extraOptions: { ...chartConfigs.purpleChartOptions, 
          scales: {
              yAxes: [{
                ticks: { // y축 기준 데이터 변경
                  // beginAtZero:true,
                  min: 0, // y축 최소값
                  max: 16, // y축 최대값
                  stepSize: 2, // y축 간격
                  fontSize : 12, // 글자크기
                },
                gridLines: {
                  // display: false, // 차트 안에 가로선 표시 여부
                  drawBorder: false
                }
              }],
            }, // scales 끝
         },
          chartData: {
            labels: ['JU111 L', 'AUG', 'SEP', 'OCT', 'NOV'],
            datasets: [{
              label: "Data",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [0, 0, 0, 0, 0],
              // data: [80, 100, 70, 80, 120, 80],
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },
        greenLineChart: {
          extraOptions: chartConfigs.greenChartOptions,
          chartData: {
            labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
            datasets: [{
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            }]
          },
          gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
          gradientStops: [1, 0.4, 0],
        },
        blueBarChart: {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['계정0', '계정1', '계정2', '계정3', '계정4', '계정5',  '계정6',  '계정7', '계정8', '계정9'],
            // labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
            datasets: [{
              label: "balance",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: this.balances
            }]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
        }
      }
    },
    computed: {
      ...mapGetters('web3',[
        'web3',
        'isMining',
        'node',
        'blocks',
        'lastBlock',
        'currentAccount',
        'txCount'
      ]),
      ...mapGetters('contract',[
        'totalSupply',
        'balances'
      ]),
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      }
    },
    watch: {
      isMining(status) {
        console.log('status')
        console.log(status)
      },
      node(info) {
        console.log('node')
        console.log(info)
      },
      blocks(lists) {
        const labels = lists.map(el=>el.number)
        this.purpleLineChart.chartData.labels = labels;
        this.purpleLineChart.chartData.datasets[0].data = lists.map(el=>el.transactions.length)
        this.purpleLineChart = {
          ...this.purpleLineChart,
          labels: labels
        }
      },
      balances(lists) {
        this.blueBarChart.chartData.datasets[0].data = lists
        this.blueBarChart = {
          ...this.blueBarChart,
        }
      }
    },
    methods: {
      ...mapActions('web3', ['init']),
      ...mapActions('contract', ['fetchTotalSupply', 'fetchAllBalances']),
      initBigChart(index) {
        let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index]
          }],
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        }
        // this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      }
    },
    async mounted() {
      await this.init()
      await this.fetchTotalSupply()
      await this.fetchAllBalances()
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      this.initBigChart(0);
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style scoped>
.flex {
  display: flex
}
.flex > div {
  margin: 6px;
}
</style>
