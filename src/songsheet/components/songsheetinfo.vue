<template>
	<div class ='songsheetinfoContainer'>
		<div class="textcontent">
			<div class="songcontent">
				<div class="top">
					<img  class ='topimg' :src="gedan.list.coverImgUrl" alt="">
					<div class="topright">
						<p class ='name'><i></i><span>{{gedan.list.name}}</span></p>
						<p class ='singer'>
							<img :src="gedan.list.creator.avatarUrl" alt="">
							<span class ='nnn'>{{gedan.list.creator.nickname}}</span>
							<span>{{time}} 创建</span>
						</p>
						<p class="caozuo">
							<span>播放</span>
							<span>收藏({{gedan.list.subscribedCount}})</span>
							<span>分享({{gedan.list.commentCount}})</span>
							<a href="#pl">评论</a>
						</p>
						<p class="biaoqian">
						标签:
							<span v-for = 'item in gedan.list.tags'>{{item}}</span>
							
						</p>
						<p class="jieshao">
							介绍: {{gedan.list.description}}
						</p>
					</div>
				</div>
				<div class="gequlist">
					<div class="t">
						<p class ='title'>歌曲列表  <span>共 {{playlist.length}} 首歌曲</span></p>
						<p class ='playcount'>播放<i>{{gedan.list.playCount}}</i>次</p>
					</div>
					<div class="contenta">
						<table border="0" cellpadding="0" cellspacing="0">
							<tbody>
								<tr>
									<th></th>
									<th>歌曲标题</th>
									<th>歌手</th>
									<th>专辑</th>
								</tr>
								<tr @click ='playgequ(list,index)' v-for ='(list,index) in playlist'>
									<td class ='indexleft'>{{index+1}}</td>
									<td>{{list.name}}</td>
									<td>{{fillsingername(list.ar)}}</td>
									<td>{{list.al.name}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div id="pl">
					<pl :hotpl ='hotpl' :pl ='pl' @prev ='prev' @next = 'next'></pl>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters,mapActions,mapMutations} from 'vuex'
import {playgedan} from '../../common/js/song.js'
import pl from '../../common/vue/pl.vue'
	export default {
		components:{pl},
		data(){
			return {
				time: '',
				playlist: [],
				lists:[],
				pl:[],
				page:1
			}
		},
		computed : {
			...mapGetters(['gedan'])
		},
		methods :　{
			playgequ(list,index){
				this.playlist.forEach((item) => {
					this.lists.push(playgedan(item))
				})
				console.log(this.lists)

				this.selectplay({
					list:this.lists,
					index
				})
			},
			
			getpl(){
				this.$ajax.get('http://140.143.128.100:3000/comment/playlist',{
					params:{
						id:this.gedan.list.id,
						offset:this.page * 20
					}
				}).then((res) => {
					this.hotpl = res.data.hotComments
					this.pl = res.data.comments
					console.log(this.hotpl)
					console.log(this.pl)
				})
			},
			fillsingername(singer){
				let ret = []
				if(!singer){
					return 
				}
				singer.forEach((item) => {
					ret.push(item.name)
				})
				return ret.join('/')
			},
			getgedanlist(){
				this.$ajax.get('http://140.143.128.100:3000/playlist/detail',{
					params:{
						id:this.gedan.list.id
					}
				}).then((res) => {
					this.playlist = res.data.playlist.tracks
				})
			},
			prev(page){
				this.page = page
				this.getpl()
			},
			next(page){
				this.page = page
				this.getpl()
			},
					timeset(format,str){
			var oTime = ''
			var oDate = new Date(str), 
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
		getzf(num){  
		     if(parseInt(num) < 10){  
		         num = '0'+num;  
		     }  
		     return num;  
		 },
		 ...mapActions(['selectplay']),
		 ...mapMutations({
		 	setsinger : "SET_SINGER"
		 })
		},
		created(){
			this.time = this.timeset('yyyy-mm-dd',this.gedan.list.createTime)
			this.getgedanlist()
			this.getpl()
		}
	}
</script>

<style lang ='less' scoped>
	.songsheetinfoContainer{
		position: absolute;
		top: 70px;
		right: 0;
		left: 0;
		bottom: 0;
		.textcontent{
			.songcontent{
				padding: 30px;
				box-sizing: border-box;
				.top{
					display: flex;
					.topimg{
						min-width: 200px;
						min-height: 200px;
						max-width: 200px;
						max-height: 200px;
					}
					.topright{
						margin-left: 20px;
						.name{
							i{
					    display: inline-block;
					    width: 54px;
					    height: 30px;
					    float: left;
					    background-image: url(https://s2.music.126.net/style/web2/img/icon.png?abb319d…);
					    background-position: 0px -240px;
							}
							span{
							margin-top: 4px;
   							 margin-left: 4px;
   							 font-size: 20px;
   							 font-weight: normal;
							}
						}
						.singer{
							margin-top: 10px;
							display: flex;
							align-items: center;
							font-size: 13px;
							img{
								min-width: 35px;
								min-height: 35px;
								max-width: 35px;
								max-height: 35px;
								display: block;
								margin-right: 5px;
							}
							.nnn {
								color: #31c27c;
								margin-right: 5px;
							}
						}
						.caozuo{
							margin-top: 10px;
							span{
								display: inline-block;
								min-width: 40px;
								padding: 0 10px;
								line-height: 30px;
								text-align: center;
								background: #323232;
								border-radius: 5px;
								color: #fff;
								font-size: 13px;
							}
							a{
								color: #fff;
								background: #323232;
								border-radius: 5px;
								min-width: 40px;
								padding: 0 10px;
								display: inline-block;
								line-height: 30px;
							}
						}
						.biaoqian{
							margin-top: 10px;
							span{
								display: inline-block;
								font-size: 13px;
								margin: 0 5px;
								line-height: 15px;
								text-align: center;
								min-width: 30px;
								padding: 0 10px;
								background: #eee;
								border: 1px solid #999;
								border-radius: 40% 40%;
							}
						}
						.jieshao{
							color: #666;
							font-size: 13px;
							margin-top: 10px;
						}
					}
				}

				.gequlist{

					margin-top: 20px;
					.t{
						i{
							color: red;
						}
						display: flex;
						line-height: 30px;
						border-bottom: 2px solid #C20C0C;
						justify-content: space-between;
							.title{
						
						span{
							font-size: 13px;
							color: #666;
						}
					}
					.playcount{
						font-size: 13px;
					}
					}
					.contenta{
						table{

							table-layout:fixed;
							color: #666;
							width: 100%;
							border: none;
							tr{
								text-align: left;
								line-height: 30px;
								td{
								width: 20%;
								overflow: hidden;	
								text-overflow: ellipsis;
								white-space: nowrap;
								}

							}
							th:first-child{
									width: 30px;
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
</style>