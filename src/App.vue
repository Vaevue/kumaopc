<template>
  <div id="app">
  	<v-header></v-header>
  	<v-plear></v-plear>
  </div>
</template>

<script>
import VHeader from './header/header.vue'
import VPlear from './plear/plear.vue'
export default {
  name: 'app',
  components: {VHeader,VPlear},
    methods:{
    _isMobile() {
   let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
   
	 return flag;
}
  },
  created() {

    if (this._isMobile()) {
          console.log(111)
    console.log(this._isMobile())
      location.href = 'https://vaevue.github.io/kumaoyd/dist/index.html'
    } else {
          console.log(111)
    console.log(this._isMobile())
   window.location.href = 'https://vaevue.github.io/kumaoPC/dist/index.html'
    }
  }
}
</script>

<style>

</style>
