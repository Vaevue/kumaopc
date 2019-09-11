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
  components: {VHeader,VPlear}
}
</script>

<style>

</style>
