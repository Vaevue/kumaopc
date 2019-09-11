<template>
	<keep-alive>
			<div class ='singerContainer'>
		<div class="top"></div>
		<div class="fl">
			<ul class="oneul" v-for ='(item,itemindex) in text'>
				<li ref ='li' @click = 'getlist(texts,index,itemindex)' :class ="[texts.id == current.id ? 'active':'']" v-for ='(texts,index) in item' :key ='index'>{{texts.name}}</li>
			</ul>
			<ul class ='twoul'>
				<li @click ='tosingerinfo(list)' v-for ='(list,index) in list'>
					<img v-if ='index < 10' :src="list.img1v1Url" alt="">
					<p v-html = 'list.name'></p>
				</li>
				<loading v-show ='!this.list.length'></loading>
			</ul>
		</div>
		<router-view></router-view>
		<img v-show = '!list' class ='img' src="https://abgne.tw/wp-content/uploads/2014/01/css3-circle-rotate-loading-spinner-3.gif" alt="">
	</div>
	</keep-alive>
</template>

<script>
import {getSingerList} from '../api/singer.js'
import Singer from '../common/js/singer.js'
import {mapMutations} from 'vuex'
import loading from '../common/vue/loading.vue'
	export default　{
		data() {
			return {
				list : [],
				text: [],
				current : '',
				getname:''
				// index : [],
				// area: [],
				// genre: [],
				// sex :[]
			}
		},
	methods:{
		getsinger() {
				this.$ajax.get('https://musicapi.leanapp.cn/top/artists?offset=0&limit=100').then((res) => {
				res.data.artists.forEach((item,index) => {
					this.list.push(new Singer({
						name : item.name,
						id: item.id,
						mid:item.picId,
						img1v1Url : item.picUrl,
						accountId:item.accountId
					}))
				})
				this.setsinger({
					singer:this.list
				})
			})	

	},
		tosingerinfo(list){
			this.$router.push({
				path: `/index/singer/${list.id}`
			})
			this.setsinger(list)
		},
		...mapMutations({
			setsinger : 'SET_SINGER'
		})
		},

             created() {
             	this.getsinger()
             }
		}
	
</script>

<style lang ='less' scoped>
.img {
	border: 0;

position: absolute;

left: 50%;

top: 65%;

background: #eee;

height: 166px;

transform: translate(-50%,-50%);
}
.singerContainer{
	margin-top: 104px;
	    height: 1500px;
    background: #eee;
	.top {
		width: 100%;
		height: 376px;
	background: url('https://y.gtimg.cn/mediastyle/yqq/img/bg_singer.jpg')
	}
	.fl {
		width: 1000px;
		margin: 0px auto;
		.oneul {
			display: flex;
			margin-top: 15px;
			li{
			
			margin: 0 5px;
			padding: 5px;
			text-align: center;
			color: #000;
			line-height: 25px;
			font-size: 12px;
		}
		.active {
			background: #31c27c;
			color: #fff;
		}
		}
		.twoul{
			display: flex;
			flex-wrap: wrap;
			li {
				width: 20%;
				margin-top:20px ;
				text-align: center;
				img {
					height: 100px;
					width: 100px;
					border-radius: 50%;
					display: block;
					margin: 0 auto;
				}
				p{
					padding-top: 20px;
				}
			}
		}
	}
}
</style>