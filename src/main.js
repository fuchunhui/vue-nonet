import Vue from 'vue';
import App from './App.vue';
import './config/veui.config';
import './assets/css/base.less';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
