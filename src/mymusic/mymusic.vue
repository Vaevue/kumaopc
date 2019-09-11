<template>
	<div class="mymusicContainer">
		<div class="textcontent">
			<div class="bg" v-show ='logintype.number == 0'>
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
	export default {
		computed:{
			...mapGetters(['logintype'])
		},
		methods:{
			login(){
				globalBus.$emit('logins')
			}
		}
	}
</script>

<style lang ='less' scoped>
	.mymusicContainer{
		margin-top: 70px;
		.textcontent{
			padding: 50px;
			.bg{
				background: url('https://s2.music.126.net/style/web2/img/mymusic.png?181dd4a5b4aa01360b529981b53dc465') no-repeat;
				height: 278px;
				position: relative;
				.btn{
					position: absolute;
					right: 337px;
					bottom: 30px;
					width: 157px;
					height: 48px;
				}
			}
					.dt{
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