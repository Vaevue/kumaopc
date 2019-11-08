<template>
	<div class ='RankingListContainer'>
		<div class="textcontent">
			<div class="container">
				<ul>
				<li  class = 'list' :class ="[index == 0 ? 'active' : '']" ref ='lists' @click ='list(item,index)' v-for ='(item,index) in toplisttitle' :data-id ='item.id'>
					<img :src="item.coverImgUrl" alt="">
						<div class="content">
							<div class="name">{{item.name}}</div>
						<div class="js">{{item.updateFrequency}}</div>
						</div>
				</li>
			</ul>
			<div class="right">
				<div class="top">
					<img :src="infos.coverImgUrl" alt="">
					<div class="rights">
						<p class ='title'>{{infos.name}}</p>
						<p class ='gx'><i class ='el-icon-time'></i><span class ='time'>最近更新：{{time}}</span><span class ='zt'>(每天更新)</span></p>
						<p class ='gd'>
							<span class ='play' @click ='playqb'><i class =' el-icon-video-play'></i>播放</span>
							<span class ='like'><i class ='el-icon-folder-add'></i>({{infos.subscribedCount}})</span>
						</p>
					</div>
				</div>
				<div class="text">
					<p>
						<span class ='left'>歌曲列表  100首歌</span>
						<span class ='rightA'>播放次数: <i>{{infos.playCount}}</i> 次</span>
					</p>
					<div class="cont">
						<table>
							<tbody>
								<tr>
									<th class ='one'></th>
									<th class ='two'>标题</th>
									<th class ='three'>时长</th>
									<th class ='four'>歌手</th>
								</tr>
								<tr :class ="[index % 2 == 0 ? 'active' : '']" v-for ='(list,index) in playlists'>
									<td class="one">{{index+1}}</td>
									<td class ='two'><img v-if ='index <= 2' :src="list.al.picUrl" alt="">{{list.name}}  <i v-show ='list.mv !== 0' @click ='gomv(list)' class ='mvicon'></i></td>
									<td class ='three'>
										<i @click ='play(list,index)' class ='el-icon-video-play'></i>
										<i @click ='pushs(list,index)' class ='el-icon-folder-add'></i>
									</td>
									<td class ='four'>{{list.ar[0].name}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			</div>
			
		</div>
	</div>
</template>

<script>
import {mapActions,mapMutations,mapGetters} from 'vuex'
import {playgedan} from '../common/js/song.js'
	export default {
		data(){
			return {
				toplisttitle:[],
				info:[],
				infos:[],
				time:'',
				playlists:[],
				gequtiem:'',
				plays:[]
			}
		},
		methods :{
			gomv(list){
				this.$ajax.get('http://140.143.128.100:3000/mv/detail',{
					params:{
						mvid:list.mv
					}
				}).then((res) => {
					const lists = res.data.data
				this.$router.push('/index/mv')
				this.setmvid({
					id:lists
				})
				})
			},
			gettoplistinfo(){
				this.$ajax.get('http://140.143.128.100:3000/playlist/detail',{
					params:{
						id : 19723756
					}
				}).then((res) => {
					this.infos = res.data.playlist
					this.time = this.formatDateTime(this.infos.trackUpdateTime)
					this.playlists = res.data.playlist.tracks
					// this.gequtiem = this.timeout(this.playlist = res.data.playlist.tracks.dt)
				})
			},
			 timeout(result) {	
        var m = Math.floor((result / 60) % 60) < 10 ? '0' + Math.floor((result / 60) % 60) : Math.floor((result / 60) % 60)
        var s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60)
        return `${m}:${s}`
      		},
			gettoplist(){
				this.$ajax.get('http://140.143.128.100:3000/toplist').then((res) => {
					this.toplisttitle = res.data.list
				})

			},

			play(list,index){
				console.log(111)
				var plays = []
				this.playlists.forEach((item) => {
					plays.push(playgedan(item))
				})
				console.log(plays)
				this.selectplay({
					list:plays,
					index
				})
			},
			playqb(){
				var plays = []
				this.playlists.forEach((item) => {
					plays.push(playgedan(item))
				})
				this.selectplay({
					list:plays,
					index:0
				})
			},
			list(item,index){
					console.log(this.playlist)
				let list = this.$refs.lists
				for(var i in list){
				list[i].classList.remove('active')
				list[index].classList.add('active')
				}
				this.infos = item
				console.log(item)
				this.time = this.formatDateTime(this.infos.trackUpdateTime)
				this.$ajax.get('http://140.143.128.100:3000/playlist/detail',{
					params:{
						id:item.id
					}
				}).then((res) => {
					this.infos = res.data.playlist
					this.time = this.formatDateTime(this.infos.trackUpdateTime)
					this.playlists = res.data.playlist.tracks
				})
			},
			formatDateTime(inputTime) { 
				let date = new Date(inputTime)
				let m = date.getMonth() + 1
				m = m < 10 ? ('0' + m) : m 
				let d = date.getDate() 
				d = d < 10 ? ('0' + d) : d 
				return m + '月' + d + '日'
				},
		...mapActions(['selectplay','pushlist']),
		...mapMutations({
			setplay : 'SET_PLAYING',
			setmvid:'SET_MVID'
		})
		},
		computed:{
			...mapGetters(['playlist'])
		},
		created(){
			this.gettoplist()
		},
		mounted(){
			this.gettoplistinfo()
		}
	}
</script>

<style lang ='less'>
.mvicon {
display: inline-block;
width: 16px;
height: 23px;
background-image: url('https://s2.music.126.net/style/web2/img/table.png?788c72d4bab53e8ed006089d2ff8e58b');
background-position: 118px -145px;
float: right;
margin-bottom: 6px;
}
.active{
	background-color: #f7f7f7;
}
	.RankingListContainer{
		margin-top: 104px;
		
		.textcontent{
			.container{
				display: flex;
			ul{
				width: 240px;
				padding-bottom: 30px;
				border: 1px solid #DDDDDD;
				li{
					width: 240px;
				    padding-bottom: 10px;
				    display: flex;
				    padding-left: 20px;
				    padding-top: 10px;
				    box-sizing: border-box;
					img{
						min-height: 40px;
						min-width: 40px;
						max-height: 40px;
						max-width: 40px;
						display: block;
					}
					.content{
						padding-left: 10px;
						justify-items: center;
						.name{
							font-weight: 600;
							font-size: 14px;
						}
						.js{
							padding-top: 5px;
							font-size: 13px;
							color: #666;
						}
					}
				}
			}
			.right{
				width: 100%;
				padding: 20px;
				.top{
					display: flex;
					img{
						width: 150px;
						height: 150px;
					}
					.rights{
						padding: 20px;
						.title{
							padding-bottom: 10px;
							font-size: 17px;
							font-weight: bold;
						}
						.gx{
							font-size: 13px;
							color: #666;
							padding-bottom: 10px;

							.zt{
								padding-left: 10px;
							}
						}
						.gd{
							span{
								display: inline-block;
								min-width: 40px;
								padding: 0 20px;
								line-height: 30px;
								border-radius: 5px;
							}
							.play{
								background-color: #418FD9;
								color: #fff;
							}
							.like{
								i{
									font-size: 15px;
								}
								background-color: #eee;
								border: 1px solid #999;
								font-size: 12px;
							}
						}
					}
				}
				.text{
					width: 100%;
					p{
						width: 100%;
						line-height: 30px;
						display: flex;
						justify-content: space-between;
						i{
							color: red;
						}
					}
					.cont{
						table{
							border-top: 2px solid #C20C0C;
							width: 100%;
							tbody{
						width: 100%;
						margin-top: 30px;
						width: 100%;
						tr{
						
						line-height: 30px;
						font-size: 12px;
							th{
								background-color: #f8f8f8;
								padding-left: 20px;
								border: none;
								text-align: left;

							}
							td{
								overflow: hidden;
							    text-overflow: ellipsis;
								padding-left: 20px;
								img{
									width: 50px;
									height: 50px;
									padding-right: 15px;
								}
							}
							width: 100%;
							.one{
								width: 10%;
							}
							.two{
								width: 100%;
								display: flex;
								align-items: center;
								
							}
							.three{
								width: 20%;
								font-size: 15px;
							}
							.four{
								width: 20%;
							}
						}
					}
				}
			}
		}
	}
		  }
		}
	}
</style>