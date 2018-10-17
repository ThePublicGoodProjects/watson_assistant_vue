/* eslint-disable no-unused-vars, no-console */

import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.component('chatbox', require('./components/Chat.vue'));

let vm = new Vue({
    render: h => h(App)
}).$mount('#chat-app');


