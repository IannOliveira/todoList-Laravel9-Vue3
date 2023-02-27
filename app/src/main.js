import { createApp } from 'vue';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';


import '@/plugins/axios';
import '@/assets/css/tailwind.css';



//new VueElement({
//   router,
//  store,
//  render: h => h(App)
// }).$mount('#app');


createApp(App).use(store).use(router).mount('#app');