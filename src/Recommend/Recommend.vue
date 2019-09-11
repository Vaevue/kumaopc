<template>
	<!--推荐页面-->
	<div class ='ttt'>
		<v-banner></v-banner>
		<div class="content">
		<v-hotgedan></v-hotgedan>
		<v-xindie></v-xindie>
		</div>
	</div>
</template>

<script>
import VBanner from './components/banner.vue'
import VHotgedan from './components/hotgedan.vue'
import VXindie from './components/xindie.vue'
	export default {
		components: {VBanner,VHotgedan,VXindie}
	}
</script>

<style lang ='less' scoped>
.ttt{
	margin-top: 104px;
}
	.content{
   border-left: 1px solid rgb(211, 211, 211);
   border-right: 1px solid rgb(211, 211, 211);
   background: #fff;
	}
</style>