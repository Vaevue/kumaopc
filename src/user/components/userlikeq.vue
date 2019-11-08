<template>
	<div class ='userlikeContainer'>
		<div class="textcontent">
		<div class="content">
			<div class="top">
				<img class ='img' :src="userlike.coverImgUrl" alt="">
				<div class="right">
					<p><i class='icon'></i><span>{{userlike.name}}</span></p>
					<p class ='singer' @click='ooo'>
						<img :src="userlike.creator.avatarUrl" alt="">
						<span>{{userlike.creator.nickname}}</span>
						 <i class ='iconfont'></i>
						 <span class ='cleart'>{{time}}</span>
					</p>
					<p class ='fx'>
						<span>收藏({{userlike.subscribedCount}})</span>
						<span>收听({{userlike.playCount}})</span>
					</p>
				</div>
				<div class="rightlike">
					<p>喜欢这个歌单的人</p>
					<ul>
						<li @click ='gouser(item)' v-for ='item in subscribers.subscribers' :key ='item.id'>
							<img :src="item.avatarUrl" alt="" :title ='item.nickname'>
						</li>
					</ul>
				</div>
			</div>
			<div class="cont">
				<p>  <span>歌曲列表 <em>1首歌</em></span>	<span>播放: <i style ='color:red'>1424861</i> 次</span></p>
				<div class="text">
					<table>
						<tbody>
							<tr>
								<th></th>
								<th></th>
								<th>歌曲标题</th>
								<th>歌手</th>
								<th>专辑</th>
							</tr>
							<tr @click ='playgedan(list,index)' v-for ='(list,index) in subscribers.tracks '>
								<td>{{index + 1}}</td>
								<td><span class ='el-icon-video-play'></span></td>
								<td>{{list.name}}</td>
								<td>{{userlike.creator.nickname}}</td>
								<td>{{list.al.name}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>
<script>

import {playgedan} from '../../common/js/song.js'
import {user} from '../../common/js/singer.js'
import {mapActions,mapMutations,mapGetters} from 'vuex'
	export default {
		props : ['userlike','info'],
		data(){
			return {
				time : '',
				subscribers: [],
				lists:[]
			}
		},
		computed:{
			...mapGetters(['playlist','singer'])
		},
		methods :  {

			ooo(){
				console.log(this.playlist)
			},
			playgedan(list,index){
				this.lists.push(playgedan(list))
				this.selectplay({
					list:this.lists,
					index
				})
				this.setplay({
					boole:true
				})
			},
			gouser(item){
				console.log(item.userId)
				console.log(item)
				let users = user(item)
				console.log(this.singer)
				this.setuser({
					singer:users
				})

			},
		timeset(format,str){
			let oTime = ''
			let oDate = new Date(str), 
		    oYear = oDate.getFullYear(),
		    oMonth = oDate.getMonth()+1,
		    oDay = oDate.getDate(),
		    oHour = oDate.getHours(),
		    oMin = oDate.getMinutes(), 
		    oSec = oDate.getSeconds()
		    if(format == 'yyyy-mm-dd'){
		   	    oTime = oYear +'-'+ this.getzf(oMonth) +'-'+ this.getzf(oDay)
		    }else if(format == 'yyyy/mm/dd'){
		    	oTime = oYear +'/'+ this.getzf(oMonth) +'/'+ this.getzf(oDay) 
		    }
		    return oTime
		},
		getgedan(){
				this.$ajax.get('http://140.143.128.100:3000/playlist/detail',{
					params:{
						id:this.userlike.id
					}
				}).then((res) => {
					console.log(res.data.playlist)
					this.subscribers = res.data.playlist
					console.log(playgedan(res.data.playlist.tracks))
				})
			},
	getzf(num){  
     if(parseInt(num) < 10){  
         num = '0'+num;  
     	}  
     return num
 		},
 		...mapActions(['selectplay']),
 		...mapMutations({
 			setplay:'SET_PLAYING',
 			setuser : 'SET_SINGER'
 		})
		},
		watch : {
			userlike(newvalue){
				this.getgedan()
				this.time = this.timeset('yyyy-mm-dd',this.userlike.createTime) + '创建'
			}
		}
	}
</script>
<style lang ='less' scoped>
	.userlikeContainer{
		position: absolute;
		top: 104px;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1900px;
		background-color: #eee;
		.textcontent{
			.content{
				box-sizing: border-box;
				padding: 30px 20px;
				.top{
					.img{
						width: 200px;
						height: 200px;
					}
					display: flex;
					.right{
						margin-left: 30px;
						.icon{
			display: inline-block;
		    width: 54px;
		    height: 24px;
		    background-image: url('https://s2.music.126.net/style/web2/img/icon.png?abb319d…');
		    background-position: 0px -242px;
		    float: left;
					}
						.singer {
								display: flex;
							margin-top: 20px;
							align-items: center;
						.cleart{
								font-size: 13px;
								padding-left: 15px;
								color: #666;
							}
							img{
								width: 35px;
								height: 35px;
								margin-right: 10px;
							}
						
							span{
								color: #31c27c;
								font-size: 14px;
							}
							.iconfont{
					
				display: inline-block;
		    width: 12px;
		    height: 18px;
		    background-image: url(https://s2.music.126.net/style/web2/img/icon.png?abb319d…);
		    background-position: 0px 0px;
		    margin-top: 7px;
					}
						}
						.fx{
							span{
								font-size: 13px;
								color: #fff;
								min-width: 50px;
								padding: 0 20px;
								display: inline-block;
								height: 30px;
								line-height: 30px;
								text-align: center;
								background-color: #222;
								border-radius: 5px;
								margin-top: 20px;
							}
						}
					}
					.rightlike{
						border-left: 1px solid #DDDDDD;
						   margin-left: 233px;
						   p{
						   	margin-left: 20px;
						   	line-height: 30px;
						   	border-bottom: 1px solid #DDDDDD;
						   }
						ul{
							display: flex;
							flex-wrap: wrap;
							margin-left: 20px;
							margin-top: 30px;
							li{
								width: 25%;
								margin-top: 20px;
								img{
									width: 35px;
									height: 35px;
								}
							}
						}
						}

				}
			.cont{
	margin-top: 30px;
		p{
		display: flex;
		justify-content: space-between;
		line-height: 30px;
		border-bottom: 2px solid #C20C0C;
		}
		.text{
		table{
			width: 100%;
			tbody{
				width: 100%;
				tr{
					width: 100%;
					line-height: 60px;
					th{
						width: 100px;
						text-align: center;
					}
					td{
				/* min-width: 200px; */
				max-width: 200px;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    white-space: nowrap;
			    text-align: center;
					}
				}
				tr:hover{
					background-color: #eee;
				}
				tr:first-child:hover{
					background-color: transparent;
				}
			}
		
		}
	}
}
		}

		}
	}
	.active1{
		background-color: #eee;
	}
</style>