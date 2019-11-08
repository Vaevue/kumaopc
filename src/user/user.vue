<template>
	<div class ='userContainer'>
		<div class="textcontent">
			<div class="userinfo">
				<div class="top">
					<div class="left">
					<img :src="info.profile.avatarUrl" alt="">
				</div>
				<div class="right">
					<p class ='op'>
						<span class ='singer'>{{info.profile.artistName}}</span>
						<span class ='it'>
							{{info.level}}
						</span>
						<span :class ='xb(info)'>
							
						</span>
					</p>
					<p class ='tp'>
						<span class="rz"></span>
						<span>
							{{info.profile.description}}
						</span>
					</p>
					<ul class="fs">
						<li>
							<p>{{info.profile.eventCount}}</p>
							<p>动态</p>
						</li>
						<li>
							<p>{{info.profile.allSubscribedCount}}</p>
							<p>关注</p>
						</li>
						<li>
							<p>{{info.profile.followeds}}</p>
							<p>粉丝</p>
						</li>
					</ul>
					<div class="grjs">
						<p>个人介绍:  {{info.profile.signature}}</p>
						<p>所在地区:  北京市</p>
					</div>
				</div>
				</div>
				<div class="dj">
					<p>{{info.profile.artistName}}创建的电台</p>
					<div class="content" @click ='gouserdj'>
						<img :src="dj[0].coverUrl" alt="">
						<span class="nn">{{info.profile.artistName}}电台</span>
						<div class="right">
							<span>订阅{{dj[0].likedCount}}次</span>
							<span class ='rig'>{{dj.length}}期</span>
						</div>
					</div>
				</div>
				<div class="ged">
					<p class='title' @click ='fff'>{{info.profile.artistName}}创建的歌单</p>
					<div class="content">
						<ul>
							<li v-for ='item in userlike' @click ='ope(item)'>
								<div class="img">
									<img :src="item.coverImgUrl" alt="">
									<p class ='bottom'><i class ='el-icon-headset'></i>{{userlikes(item.playCount)}}</p>
								</div>
								<p class ='p'>{{item.name}}</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<userdj v-show ='flag' :dj ='dj'></userdj>
		<userlikeq :userlike ='thislike' :info ='info'   v-show ='userlikeflag'></userlikeq>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import userdj from './components/userdj.vue'
import userlikeq from './components/userlikeq.vue'
	export default {
		data(){
			return {
				info : [],
				dj: [],
				flag : false,
				userlikeflag:false,
				userlike: [],
				thislike : [],
			}
		},
		components:{userdj,userlikeq},
		methods :{
			fff(){
				console.log(this.userlike)
			},
			ope(item){
				this.userlikeflag = true
				this.thislike = item
			},

			getuserinfo(){
				this.$ajax.get('http://140.143.128.100:3000/user/detail',{
					params:{
						uid:this.singer.accountId
					}
				}).then((res) => {
					this.info = res.data
				})
			},

			gouserdj(){
				this.flag = true
			},
			getuserdj(){
				this.$ajax.get('http://140.143.128.100:3000/user/dj',{
					params:{
						uid:this.singer.accountId
					}
				}).then((res) => {
					console.log(res.data.programs)
					if(!res.data.programs.length){
						return 
					}
					this.dj = res.data.programs
				})
			},
			getuserlike(){
				this.$ajax.get('http://140.143.128.100:3000/user/playlist',{
					params:{
						uid:this.singer.accountId
					}
				}).then((res) => {
					if(res.data.playlist){
						this.userlike = res.data.playlist
					}
				})
			},
		
			userlikes(num){
				let res = num
				if((res + '').length> 5){
					return (res / 10000) + '万'
				}else {
					 return res
				}
			},
			xb(info){
				// xb el-icon-male active1
				if(info.profile.gender==1){
					return 'xb el-icon-male active1'
				}else {
					return 'xb el-icon-female active2'
				}
			}
		},
		created () {
			this.getuserinfo()
			this.getuserdj()
			this.getuserlike()
		},
		computed : {
			...mapGetters(['singer'])
		}
	}
</script>

<style lang ='less' scoped>
	.userContainer{
		margin-top: 104px;
		.textcontent{
			.userinfo{
				padding: 30px;
			.top{
				display: flex;
				span{
					display: inline-block;
				}
				p{
					color: #666;
				}
			.left{
					img{
						width: 188px;
						height: 188px;
					}
				}
				.right{
					padding-left: 30px;
					width: 100%;
					.op{
						.singer {
						font-size: 20px;
						font-weight: normal;
						}
						.it{
					width: 60px;
				    height: 30px;
				    line-height: 30px;
				    text-align: center;
				    background-image: url(https://s2.music.126.net/style/web2/img/icon2.png?cfa7ead…);
				    background-position: -134px -185px;
				    color: #e03a24;
				    padding-left: 10px;
				   font-weight: bold;
    			   font-style: italic;
    			   font-size: 13px;
						}
						.xb{
							font-size: 20px;
						}
						.active1{
							color: #26A6E4;
						}
						.active2{
							color: #FFB5D3;
						}
					}
					.tp{
						line-height: 30px;
						width: 100%;
						border-bottom: 1px solid #DDDDDD;
					.rz{
					width: 75px;
				    background-image: url(https://s2.music.126.net/style/web2/img/icon2.png?cfa7ead…);
				    height: 30px;
				    background-position: 0px -470px;
					}
					}
					.fs{
						display: flex;
						margin-top: 10px;
						li{
							min-width: 70px;
							height: 50px;
							text-align: left;
							margin-left: 20px;
							margin-top: 20px;
							border-right: 1px solid #DDDDDD;
						}
						li:last-child{
							border: none;
						}
						li:hover{
							color: #31c27c;
						}
					}
					.grjs{
						font-size: 13px;
						p{
							line-height: 20px;
						}
					}

				}
			}

			.dj{

				font-size: 13px;
				padding-top: 50px;
				p{
					line-height: 20px;
					font-size: 20px;
				}
							.content:hover{
				background-color: #eee;
			}
				.content{
					margin-top: 10px;
					display: flex;
					width: 100%;
					height: 70px;
					align-items: center;
					border: 1px solid #DDDDDD;
					border-top: 2px solid #C20C0C;
					
					color: #666;
					img{
						width: 50px;
						height: 50px;
						margin-left: 20px;
					}
					.nn{
						padding: 0  30px;
					}
					.right{
						margin-left: 300px;
						.rig{
							margin-left:100px; 
						}
					}
				}
			}
			.ged {
				margin-top: 50px;
				.title {
					line-height: 30px;
					border-bottom: 2px solid #C20C0C;
					font-size: 20px;
				}
				.content{
					ul{
						display: flex;
						flex-wrap: wrap;
						li{
							padding-top: 10px;
							padding-right: 55px;
						.p{
						max-width: 140px;
					   	overflow: hidden;
					   	text-overflow: ellipsis;
					   white-space:nowrap;
						}
							.img{
								position: relative;
								max-height: 140px;
								max-width: 140px;
							img{
								max-height: 140px;
								max-width: 140px;
							}
							p{
						position: absolute;
					    bottom: 0;
					    width: 100%;
					    height: 30px;
					    line-height: 30px;
					    background: rgba(0,0,0,0.6);
					    color: #fff;
					    font-size: 12px;
					    padding-left: 20px;
					   	box-sizing: border-box;
					   

					    i{
						padding-right: 10px;
					    }
							
					    }
						}
						}
						li:first-child{
							padding-left: 0;
						}
						li:nth-child(5n){
							padding-right: 0;
						}
					}
				}
			}
			}
		}
	}
</style>