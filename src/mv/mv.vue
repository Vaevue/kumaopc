<template>
	<div class ='mvContainer'>
		<div class="textcontent">
			<div class="top">
				<div class="name">
					<span class="nas">{{mv.name}}</span>
					<span class="singer">{{mv.artistName}}</span>
				</div>
				<div class="mv">
					<video controls :src="mvUrl"></video>
					<span class ='el-icon-view'>({{mv.playCount}})</span>
				</div>
			</div>
			<pl @prev ='prev' @next = 'next' :pl ='pl'></pl>
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import pl from '../common/vue/pl.vue'
	export default {
		data(){
			return {
				mv : [],
				mvUrl : '',
				page : 1,
				pl:[]
			}
		},
		components:{pl},
		methods : {
		getmvurl(){
			this.mv = this.mvid.id
			//mv 播放地址
			this.$ajax.get('https://musicapi.leanapp.cn/mv/detail',{
					params:{
						mvid:this.mv.id
					}
				}).then((res) => {
					console.log(res.data)
					this.mvUrl = res.data.data.brs[1080]
				})
				},
		//mv评论
		getpl(){

			this.$ajax.get('https://musicapi.leanapp.cn/comment/mv',{
						params:{
							id:this.mv.id,
							limit:30,
							offset:this.page*30
						}
					}).then((res) => {
						this.pl = res.data.comments
					}).catch((res) => {
						this.$notify({
          title: '获取失败',
          message: h('i', { style: 'color: teal'}, '没有更多数据了')
        })
	})
		},
		prev (page){
			this.page = page
			this.getpl()
		},
		next(page){
			this.page = page
			this.getpl()
		}
		//mv热门评论
		// gethotpl(){
		// 	this.$ajax.get('https://musicapi.leanapp.cn/comment/hot',{
		// 		params:{
		// 			id:this.mv.id,
		// 			tpye:1
		// 		}
		// 	}).then((res) => {
		// 		console.log(res.data)
		// 	})
		// }
		},
		computed : {
			...mapGetters(['mvid'])
		},
		created () {
			this.getmvurl()
			this.getpl()
			if(!this.mv.id){
				this.$router.push('/')
			}
			// this.gethotpl()
		}
		
	}
</script>

<style lang ='less' scoped>
	.mvContainer{
		margin-top: 104px;
		.top{
			padding-top: 30px;
			padding-left: 20px;
			.name{
				padding-left: 30px;
				.nas {
					font-size: 22px;
				}
				.singer {
					font-size: 14px;
					color: #31c27c;
					padding-left: 20px;
				}
			}
			.mv {
				video{
					height: 500px;
					width: 100%;
				}
				span{
					min-width: 40px;
					padding: 0 20px;
					height: 30px;
					display: inline-block;
					line-height: 30px;
					text-align: center;
					img{
						height: 20px;
						width: 20px;
					}
				}
			}

		}

	}
</style>