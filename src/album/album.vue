<template>
	<div class ='albumContainer'>
		<div class="textcontent">
			<div class="contents">
				<div class="top">
					<div class="img">
						<img :src="item.picUrl" alt="">
					</div>
					<div class="js">
						<div class="name">
						<i></i>
							{{item.name}}
						</div>
						<div class="xq">
							<p>歌手: <span>{{item.artists[0].name}}</span></p>
							<p>发行时间: <span>{{time}}</span></p>
							<p>发行公司: <span>{{item.company}}</span></p>
						</div>
						<div class="psh">
							<span>播放</span>
							<span>收藏</span>
							<span>添加到播放队列</span>
						</div>
					</div>
				</div>
				<div class="content">
					<div class="jianjie">
						<h3>专辑介绍:</h3>
						<p v-for ='item in text'>
							{{item}}
						</p>
					</div>
					<div class="list">
						<div class="title">
							<p>包含歌曲列表 <span>{{gequlist.length}}首歌</span></p>
						</div>
						<div class="contentsa">
							<table>
								<tr>
									<th>歌曲标题</th>
									<th>   </th>
									<th>歌手</th>
								</tr>
								<tr @click ='play(item,index)' :class ="[index % 2 == 0 ? 'active2' : 'active1']" v-for ='(item,index) in gequlist'>
									<td>{{item.name}}</td>
									<td>{{album.list.name}}</td>
									<td>{{singer.name}}</td>
								</tr>
							</table>
						</div>
					</div>
					<div class="pl">
						<pl @prev ='prev' @next ='next' :pl ='pl' :hotpl = 'hotpl'></pl>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {playlists} from '../common/js/song.js'
import pl from '../common/vue/pl.vue'
export default　{
			data(){
			return {
				item : [],
				time: '',
				albuminfo:[],
				text: [],
				gequlist:[],
				hotpl : [],
				pl: [],
				page : 1,
				items: []
			}
		},
		components:{pl},
	methods:{
		prev(page){
			this.page = page
			this.getzhuanjipl()
		},
		next(page){
			this.page = page
			this.getzhuanjipl()
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
 getzhuanjidanqu(){
 	this.$ajax.get('http://140.143.128.100:3000/album',{
 		params:{
 			id:this.item.id
 		}
 	}).then((res) => {
 		this.gequlist = res.data.songs
 		console.log(res.data.songs)
 	})
 	console.log(this.album)
 },
  getzhuanjixq(){
 	this.$ajax.get('http://140.143.128.100:3000/album/detail/dynamic',{
 		params:{
 			id:this.item.id
 		}
 	}).then((ress) => {
 		this.albuminfo = ress.data.album
 		this.text = ress.data.album.description.match(/.{1,1000}/g)
 	})
 },
 getzhuanjipl(){
 	console.log(this.album.list.id)
 	this.$ajax.get('http://140.143.128.100:3000/comment/album',{
 		params:{
 			id:this.album.list.id,
 			offset:this.page*20
 		}
 	}).then((res) => {
 		if(res.data.hotComments){
 		this.hotpl = res.data.hotComments
 	}
 		this.pl = res.data.comments
 	})
 },
 play(item,index){
 	this.items.push(playlists(item))
 	console.log(this.items)
 	console.log(index)

 	this.selectplay({
 		list:this.items,
 		index
 	})
 
 },
 ...mapActions(['selectplay','pushlist'])
	},

	computed:{
		...mapGetters(['album','singer','playlist'])
	},
	created(){
		console.log(this.album.list)
		this.item = this.album.list
		this.time = this.timeset('yyyy-mm-dd',this.album.list.publishTime)
		this.getzhuanjidanqu()
		this.getzhuanjixq()
		this.getzhuanjipl()
	}
}
</script>

<style lang ='less' scoped>
.albumContainer{
	margin-top: 104px;
	.textcontent{
		padding-top: 15px;
		.contents{
			margin: 0 15px;

			.top{
				display: flex;
				.img {
					width: 200px;
					background: url('https://s2.music.126.net/style/web2/img/coverall.png?84e2978cb0c5bdfe208b0ed84d786943');
					background-position: 0 -980px;
					img{
						width: 177px;
						height: 177px;
					}
				}
				.js{
					margin-left: 100px;
					.name{
						font-size: 20px;
						margin-top: 15px;
						i{
						background: url('https://s2.music.126.net/style/web2/img/icon.png?abb319d9b708bd11d53a6ff34743c388') no-repeat;
						background-position: 0px -186px;
						display: inline-block;
						width: 60px;
						height: 25px;
						}
					}
					p{
						padding: 10px 0;
						font-size: 12px;
					}
				}
				.psh{
					font-size: 15px;
					span{
						height: 30px;
						min-width: 50px;
						text-align: center;
						line-height: 30px;
						background: #323232;
						margin-left: 20px;
						display: inline-block;
						padding: 0 10px;
						color: #fff;
						border-radius: 5px;
					}
				}
			}
		}
		.content{
			width: 95%;
			.jianjie {
				p{
	font-size: 14px;
    color: #666;
    padding: 5px 20px;
    text-indent: 2em;
				}
			}
			.list {
				.title {
					line-height: 30px;
					border-bottom: 2px solid #C20C0C;
					p{
						font-size: 20px;
						font-weight: 200;
						span{
							font-size: 12px;
							padding-left: 20px;
						}
					}
				}
				.contentsa{
					width: 100%;
					table{
						width: 100%;
						tr{
							th,td{
								width: 30%;
								text-align: center;
								height: 30px;
								line-height: 30px;
							}
						}
					}
				}
			}
		}
	}
}
.active1 {
	background: #eee;
}
.active2 {
	background-color: #f5f5f5;
}
</style>