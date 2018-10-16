/* eslint-disable no-unused-vars, no-console */

import Vue from 'vue';
import App from './App.vue';
import Moment from 'vue-moment';
import Api from './watson-api.js';
// import Api from './stub-api.js';

Vue.config.productionTip = false;
Vue.component('chatbox', require('./components/Chat.vue'));
Vue.use(Moment);

let vm = new Vue({
    render: h => h(App),
    data  : {
        api: Api
    }
}).$mount('#chat-app');



