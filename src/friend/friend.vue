<template>
	<div class="friendContainer">
		<div class="textcontent">
			<div class="bg" v-show ='logintype.number == 0'>
				<div class="text">
					你可以关注明星和好友品味他们的私房歌单
					通过他们的动态发现更多精彩音乐
				</div>
				<div class="btn" @click ='login'>
					
				</div>
			</div>
			<div class="dt"  v-show ='logintype.number == 1'>
				<img data-v-2dcd0898="" src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1568041398047&amp;di=184a1c10ae888c1387bbb2a356443529&amp;imgtype=0&amp;src=http%3A%2F%2Fimg.58cdn.com.cn%2Fdist%2Fjxedt%2Fpc%2Fproducts%2Fjxregister%2Fimages%2Fno_data.png" alt="">
				<span>暂时没有数据啦</span>
			</div>
		</div>
	</div>
</template>

<script>
import {globalBus} from '../api/globalBus.js'
import {mapGetters} from 'vuex'
	export default{
		computed:{
			...mapGetters(['logintype'])
		},
		methods : {
		login(){
			globalBus.$emit('logins')
		},
		getdongtai(){
			this.$ajax.get('https://musicapi.leanapp.cn/event',{
				params:{
					pagesize:30
				}
			}).then((res) => {
				console.log(res)
			})
		}
	},
	created(){
		this.getdongtai()
	}
	}
</script>

<style lang ='less' scoped>
	.friendContainer{
		margin-top: 70px;
		.textcontent{
			.bg{
				position: relative;
				background: url('https://s2.music.126.net/style/web2/img/notlogin.jpg?361b9318680b3c34b51b1e5b349498e5') no-repeat;
				height: 428px;
			
			.text{
				width: 259px;
			    font-size: 13px;
			    color: #666;
			    position: absolute;
			    right: 187px;
			    bottom: 200px;
			}
			.btn{
				width: 157px;
				height: 48px;
				position: absolute;
				bottom: 120px;
				right: 288px;
			}
		}
		.dt{
			margin: 30px;
			padding-top: 30px;
			text-align: center;
			img{
				width: 200px;
				height: 200px;
				display: block;
				margin: 0 auto;
				margin-bottom: 35px;
			}
			span{
				color: #666;
			}
		}
	}
	}
</style>