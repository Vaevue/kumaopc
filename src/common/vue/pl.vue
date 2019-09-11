<template>
	<div>
	<div class="pinglun">
				<h3>评论</h3>
				<div class="pl">
					<img src="http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50" alt="">
					<textarea maxlength="140" cols="30" rows="10"></textarea>
					
				</div>
				<button>评论</button>
		<div class="hotpl" v-show ='hotpl'>
			<p>精彩评论</p>
			<div class="content">
		<ul>
			<li v-for ='item in hotpl'>
				<img :src="item.user.avatarUrl" alt="">
				<div class="text">
					<span style="color:#31c27c;">{{item.user.nickname}}:</span>
				<span v-html ='item.content' class ='cont'></span>
				</div>
			</li>
		</ul>
	</div>
		</div>
				<div class="zjpl">
	<p>最新评论</p>
	<div class="content">
		<ul>
			<li v-for ='item in pl'>
				<img :src="item.user.avatarUrl" alt="">
				<div class="text">
					<span style="color:#31c27c;">{{item.user.nickname}}:</span>
				<span v-html ='item.content'></span>
				</div>
			</li>
			<p>
				<span @click ='prev'>上一页</span>
				<span @click ='next'>下一页</span>
			</p>
		</ul>
	</div>
</div>
			</div>
	</div>
</template>

<script>
	export default {
		props:['pl','hotpl'],
		data(){
			return {
				page : 1
			}
		},
		methods :{
		prev(){
			if(this.page == 1){
				return 
			}
			this.page --
			this.$emit('prev',this.page)
		},
		next(){
			this.page++
			this.$emit('next',this.page)
		},
		}
	}
</script>

<style lang ='less' scoped>
.cont{
	padding-right: 50px;
	}
			.pinglun{
						.hotpl{
				margin: 0 20px;
					p{
					padding-top: 20px;
					line-height: 30px;
					padding-left:20px;
					border-bottom: 1px solid #999;						
					}
					.content{
						ul{
								flex-wrap: wrap;
							display: flex;
							width: 100%;
							li{
								width: 100%;
								display: flex;
								padding: 10px 0;
								margin-right: 20px;
								box-sizing: border-box;
    							padding-right: 30px;
								img{
									min-width: 50px;
									min-height: 50px;
									max-width: 50px;
									max-height: 50px;
								}
								.text{
									margin-left: 10px;
									margin-right: 20px;
								}
							}
							p{
								text-align: center;
								width: 100%;
								span{
									padding: 0 10px;
								}

							}
						}
					}
				}
				h3{
					line-height: 30px;
					padding-left:20px;
					border-bottom: 2px solid #c20c0c;
				}
				.pl{
					display: flex;
					margin: 0 20px;
					margin-top: 10px;
					img{
						height: 50px;
						width: 7%;
						margin-top: 25px;
						margin-right: 3%;
					}
					textarea{
						width: 90%;
						height: 100px;
					}
				}
				button{
					float: right;
					margin-right: 20px;
					margin-top: 10px;
					border: none;
					background-color: #31c27c;
					color: #fff;
					height: 30px;
					width: 50px;
					text-align: center;
					line-height: 30px;
				}
				.zjpl{
				margin: 0 20px;
					p{
					padding-top: 20px;
					line-height: 30px;
					padding-left:20px;
					border-bottom: 1px solid #999;						
					}
					.content{
						ul{
								flex-wrap: wrap;
							display: flex;
							width: 100%;
							li{
								width: 100%;
								display: flex;
								padding: 10px 0;
								margin-right: 20px;
								img{
									min-width: 50px;
									min-height: 50px;
									max-width: 50px;
									max-height: 50px;
								}
								.text{
									margin-left: 10px;
									margin-right: 20px;
								}
							}
							p{
								text-align: center;
								width: 100%;
								span{
									padding: 0 10px;
								}
							}
						}
					}
				}
			}
</style>