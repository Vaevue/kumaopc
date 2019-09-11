<template>
	<div class="NewdisconshelfContainer">
		<div class="textcontent">
			<div class="hotredie">
				<p  class ='title'>全部新碟</p>
				<div class="contents">
					<ul>
						<li @click ='tt(item)' v-for ='item in albums' :key ='item.id'>
							<img :src="item.picUrl" :title="item.name">
							<p>{{item.name}}</p>
							<p>{{item.artists[0].name}}</p>
						</li>
					</ul>
				<div class="fy">
						<el-pagination
					  background
					  layout="prev, pager, next"
					  page-size='30'
					  @current-change ='changec'
					  :total="total">
					</el-pagination>
				</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
	export default {
		data(){
			return {
				total: 0 ,
				albums: [],
				page:1
			}
		},
		computed:{
			...mapGetters(['album'])
		},
		methods:{
			tt(item){
				this.setalbums({
					list:item
				})
				this.$router.push('/index/album')
			},
			getlist(){
				this.$ajax.get('https://musicapi.leanapp.cn/top/album',{
					params:{
						limit:30,
						offset : this.page * 30 
					}
				}).then((res) =>{
					this.albums = res.data.albums
					this.total  = res.data.total
				})
			},
			changec(e){
				this.page = e 
				this.getlist()
			},
			...mapMutations({
				setalbums : 'SET_ALBUM'
			})
		},
		created(){
			this.getlist()
		}
	}
</script>

<style lang ='less' scoped>
	.fy{
text-align: center;
margin: 20px 0 auto;
	}
	.NewdisconshelfContainer{
		margin-top: 104px;
		.textcontent{
			.hotredie{
				margin: 40px 30px 30px 30px;
				padding-top: 40px;
				.title {
					line-height: 40px;
					font-size: 17px;
					border-bottom: 2px solid #C20C0C;
				}
				.contents{
					ul{
						margin-top: 30px;
						display: flex;
						flex-wrap: wrap;
						li{
							width: 153px;
							height: 178px;
							background-image: url('https://s2.music.126.net/style/web2/img/coverall.png?84e2978cb0c5bdfe208b0ed84d786943');
							background-position: 1px -844px;
							margin-left: 20px;
							margin-top: 20px;
							img{
								width: 130px;
								height: 130px;
							}
							p{
								font-size: 15px;
								padding-top: 5px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								background-color: #fff;
							}
							p:last-child{
								color: #666;
								font-size: 13px;
							}
						}
					}
				}
			}
		}
	}
</style>