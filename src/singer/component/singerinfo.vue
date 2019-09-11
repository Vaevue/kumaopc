<template>
	<div class ='singerinfoCOntainer'>
	<div class="background" :style ='stt'></div>
		<div class="textcontent">
			<div class="top">

				<h1>
					{{singer.name}}
				</h1>
			</div>
			<div class="img">
			<img :src="singer.img1v1Url" alt="">
				<p v-show ='this.singer.accountId' @click ='touser'><i class ='el-icon-user'></i>个人主页</p>
				<ul>
					<li @click ='lists(index)' v-for = '(item,index) in list' :class ="[currents == index ? 'active' : '']">{{item}}</li>
				</ul>
			</div>
			<gequlist :mvs ='mvs' :jianjie ='jianjie' :albums ='albums' :singer = 'this.singer' :currents ='currents'></gequlist>
		</div>
	</div>
</template>


<script>
	import gequlist from './gequlist.vue'
	import {mapGetters,mapMutations} from 'vuex'
	export default {
		data(){
			return {
				list : ['热门作品','所有专辑','相关MV','艺人介绍'],
				currents: 0,
				indexs : '',
				albums : [],
				jianjie : [],
				mvs : []
			}
		},
		components : {gequlist},
		computed : {
			stt(){
				return `background-image:url(${this.singer.img1v1Url})`
			},
			...mapGetters(['singer'])
		},
		methods : {
			touser(){
				this.$router.push('/index/user')
			},
			lists(index){
				this.currents = index
				if(index == 1){
					this.$ajax.get('https://musicapi.leanapp.cn/artist/album',{
						params: {
							id:this.singer.id,
							limit:50
						}
					}).then((res) => {
						this.albums = res.data.hotAlbums
					})
				}
				if(index == 2){
					this.$ajax.get('https://musicapi.leanapp.cn/artist/mv',{
						params:{
							id:this.singer.id,
							limit:50
						}
					}).then((res) => {
						this.mvs = res.data.mvs
					})
				}
				if(index == 3){
					this.$ajax.get('https://musicapi.leanapp.cn/artist/desc',{
						params: {
							id:this.singer.id
						}
					}).then((res) => {
						console.log(this.singer.id)
						this.jianjie = res.data
					})
				}
			},
			...mapMutations({
				setsinger : 'SET_SINGER'
			})
		}
	}
</script>

<style lang ='less' scoped>
.background{
background-repeat: no-repeat;
background-size: 100% 180%;
filter: blur(10px);
background-position: 0 0;
opacity: .6;
position: absolute;
transform: translateZ(0);
width: 100%;
height: 352px;
}
	.singerinfoCOntainer{
		position: absolute;
		top: 104px;
		left: 0;
		right: 0;
		bottom: 0;
		background: #eee;
		height: 1500px;
		.textcontent{
			padding: 20px 20px 0 20px;
		.top{
			h1{
				font-size: 26px;
				font-weight: 200;
				small {
					font-size: 16px;
					color: #666;
				}
			}
		}
		.img {

			position: relative;
			width: 100%;
			
			/* margin: 20px auto; */
			img {
	height: 289px;
    width: 686px;
    display: block;
    margin: 0 auto;
			}
			p{

				position: absolute;
				top: -30px;
				right: 30px;
				height: 30px;
				min-width: 80px;
				padding: 0 10px;
				background-color: #31c27c;
				font-size: 13px;
				color: #fff;
				text-align: center;
				line-height: 30px;
			}
			ul{
				display: flex;
				width: 70%;
				margin-left: 150px;
				background: #eee;
				li{
					width: 25%;
					height: 40px;
					text-align: center;
					line-height: 40px;
				
					border: 1px solid rgb(211, 211, 211);
						border-top: 2px solid transparent;
				}
				li:hover{
					border-top: 2px solid #C20C0C;
				}
				.active {
					background: #fff;
					border-bottom: none;
					border-top: 2px solid #C20C0C;
				}
			}
		}
		}
	}
</style>