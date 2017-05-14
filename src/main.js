import Vue from 'vue'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
import App from './app'
import Resourse from 'vue-resource'

Vue.use(Framework7Vue)
Vue.use(Resourse)

new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app'
  },
  // Register App Component
  components: {
    app: App
  }
});
