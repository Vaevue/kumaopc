<template>
	<div class ='gecilistContainer'>
	<div class="gequ"  v-show = 'this.currents == 0'>
		<ul class ='on'>
			<li @click ='playlist(item,index)' v-for ='(item,index) in list '>
				<span class ='index'>{{index+1}}</span>
				<span class ='name'>{{item.songname}}</span>
				<span class ='singername'>{{item.albumname}} <i @click.stop ='gomv(item)' v-show ='item.mv !== 0'  class ='mvicon'></i></span>
				<span class ='interval'>{{item.interval}}</span>
				<span class ='albname'>{{item.singername}}</span>
				<div class="caozuo">
					<span class ='el-icon-video-play'></span>
					<span class ='el-icon-circle-plus-outline' @click.stop = 'pushplay(item)'></span>
				</div>
			</li>
			<loading v-show ='!this.list.length'></loading>
		</ul>
		</div>
<!-- https://musicapi.leanapp.cn -->
	<div class="zhuanji" v-show ='this.currents == 1'>
		<ul>
			<li @click ='gozhuanji(al)' v-for = 'al in albums'>
					<img v-lazy="al.picUrl" alt="">
				<p>{{al.name}}</p>
			</li>
			<loading v-show ='!this.albums.length'></loading>
		</ul>

	</div>
	<div class="mvs" v-show ='this.currents ==2'>
	<ul>
		<li v-for ='item in mvs' @click ='mvplay(item)'>
		<div class="img">
		<img  class ='i' :src="item.imgurl" alt="">
		<img class ='g' src="https://s2.music.126.net/style/web2/img/ie6/icn_ply5_hvr.png?6535ccf9745f38cd6f9453dae207e23d" alt="">
		</div>
		<p>{{item.name}}</p>
		<p>{{item.publishTime}}</p>
		</li>
		<loading v-show ='!this.mvs.length'></loading>
	</ul>
	</div>
	<div class="jianjie" v-show ='this.currents == 3'>
		<div class="singerjianjie">
			<h3>{{this.singer.name}}简介</h3>
			<span v-html ='jianjie.briefDesc'></span>
		</div>
		<div class="jingli" v-for ='item in jianjie.introduction'>
				<h3>{{item.ti}}</h3>
				<div v-html ='item.txt'></div>
		</div>
		<loading v-show ='!this.jianjie.length'></loading>
	</div>
	</div>
</template>

<script>
	import play from '../../plear/plear.vue'
	import {createSong,playlists} from '../../common/js/song.js'
	import {mapActions,mapGetters,mapMutations} from 'vuex'
	import loading from '../../common/vue/loading.vue'
	export default {
		components:{play,loading},
		props: ['currents','singer','albums','jianjie','mvs'],
		data () {
			return {
				list: [],
				url : [],
				albumslist: [[],[],[]] ,
				jianjies:[this.jianjie]
				}
		},
		computed:{
			...mapGetters(['fulleen','current','singer','mvid'])
		},
		methods : {
			gomv(item){
				this.$ajax.get('https://musicapi.leanapp.cn/mv/detail',{
					params:{
						mvid:item.mv
					}
				}).then((res) => {
					const lists = res.data.data
				this.$router.push('/index/mv')
				this.setmvid({
					id:lists
				})
				})
				
			},
			mvplay(item){
				this.$router.push('/index/mv')
				
				this.setmvid({
					id:item
				})

				console.log(this.mvid)
			},
			gozhuanji(al){
				this.$router.push('/index/album')

				this.setalbum({
					list:al
				})
			},
			playlist(list,index){
				console.log(list)
				this.selectplay({
					list:this.list,
					index
				})
				this.url = list
				this.setplay({
					boole:true
				})
			},
			pushplay(song){
				this.pushlist({
					song : song
				})
			},
			gequ(){	
			this.$ajax.get('https://musicapi.leanapp.cn/artist/album',{
				params:{
					id:this.singer.id
				}
			}).then((resa) => {
				console.log(resa.data)
			})		
				this.$ajax.get('https://musicapi.leanapp.cn/artists',{
					params: {
						id:this.singer.id
					}
				}).then((res) => {
					res.data.hotSongs.forEach((data) => {
						const l =playlists(data)
						this.list.push(l)
					})
				})
				this.setopp(1)
			},
			...mapActions(['selectplay','pushlist']),
			...mapMutations({
				setopp : 'SET_OPP',
				setplay : 'SET_PLAYING',
				setmvid : 'SET_MVID',
				setalbum : 'SET_ALBUM'
			})
		},
		created(){
			this.gequ()
			if(!this.singer.id){
				this.$router.push('/index/singer')
			}
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
}
	.gecilistContainer{
		.on{
			color: #666;
			width: 690px;
			margin: 20px auto;
			/* display: flex; */
			li{
			height: 30px;
			line-height: 30px;
			max-width: 690px;
			overflow: hidden;
			font-size: 12px;
			display: flex;
			position: relative;
			span{
			padding-right: 20px;
			width: 80px;
			text-align: center;
			text-overflow: ellipsis;
			overflow: hidden;
			}
			.caozuo {
				font-size: 20px;
				position: absolute;
				right: 0px;
				span{
					cursor:pointer;
					width: 20px;
				}
			}
			}
		}
		.zhuanji {
			ul{
				width: 690px;
			margin: 20px auto;
			display: flex;
			flex-wrap: wrap;
			li{
				width: 145px;
				height: 160px;
				margin-left: 27px;
				margin-top: 20px;
				img{
				width: 120px;
				height: 130px;
				}
				background: url('https://s2.music.126.net/style/web2/img/coverall.png?84e2978cb0c5bdfe208b0ed84d786943');
				background-position: -9px -845px;
				p{
					margin-top: 10px;
					margin-left: 10px;
					color: #999;
					font-size: 13px;
				}
			}
			}
		}
		.jianjie{
			color: #666;
			h3{
				padding:20px 0;
			}
		}
		.mvs{
			ul{
				display: flex;
				flex-wrap: wrap;
				padding-left: 80px;
				li{
					padding-top: 20px;
					width: 137px;
					height: 140px;
					padding-left: 29px;
					position: relative;
					.img {	
					width: 100%;
					height: 103px;
					.i{
						display: block;
						width: 100%;
						height: 100%;
					}
					.g{
						position: absolute;
						top: 50%;
						left: 60%;
						transform: translate(-50%,-50%);
					}
					}
					p{
						margin: 8px 0 6px;
						font-size: 14px;
						width: 100%;
						vertical-align: middle;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						word-wrap: normal;
					}
				}
			}
		}
	}
</style>