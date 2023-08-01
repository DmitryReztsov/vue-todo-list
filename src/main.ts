import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'vuetify/styles';

import './main.scss';
import { createPinia } from 'pinia';

import App from '@/components/App/App.vue';
import vFocus from '@/directives/vFocus';


const vuetify = createVuetify({
  components,
  directives,
});

const pinia = createPinia();
const app = createApp(App);

app.directive('focus', vFocus);
app.use(pinia);
app.use(vuetify);
app.mount('#app');
