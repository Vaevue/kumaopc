<template>
	<div class ='songsheetContainer' @click.stop ='close()'>

		<div class="textcontent">
			<div class="content">
				<div class="title">
					<h1>{{tag}}</h1>
					<span class ='fl' @click.stop ='open'>选择分类 <i class ='el-icon-caret-bottom'></i></span>
					<span class ='right' @click ='gorement()'>热门</span>
				</div>
				<div class="container">
					<transition name ='songsheet'>
					<div class="box" v-show ='flag'>
					<i class ='tops'></i>
					<p class ='titles'>全部风格</p>
					<div class="contents">
						<div class="xians"></div>
						<div class ='con' v-for ='(item,index) in categories'>
						<dl>
							<dt>
								<i class ='icon' :class = "['icon'+index]"></i>
								<span>{{item}}</span>
							</dt>
							<div class="cont">
								<dd @click ='fyshuju(list)' v-for = 'list in sub[index]'><span>{{list.name}}</span></dd>
							</div>
						</dl>
					</div>
					</div>
				</div>
					</transition>
					<ul>
						<li v-for ='item in playlists' @click ='goinfo(item)'>
							<div class="img">
								<img :src="item.coverImgUrl" :alt="item.name">
								<p>
									<span><i class ='el-icon-headset'></i>{{userlikes(item.playCount)}}</span>
									<span class ='el-icon-video-play'></span>
								</p>
							</div>
							<p class ='name'>{{item.name}}</p>
							<p class ='singer'>by {{item.creator.nickname
							}} </p>
						</li>
					</ul>
				</div>
				<div class="bottom">
					<el-pagination
						ref ='fy'
					  background
					  layout="prev, pager, next"
					  page-size='30'
					  @current-change ='changec'
					  :total="todal">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import songsheetinfo from './components/songsheetinfo.vue'
import {mapMutations} from 'vuex'
	export default {
		components:{songsheetinfo},
		data(){
			return {
				categories:[],
				sub:[[],[],[],[],[]],
				flag:false,
				playlists:[],
				todal : [],
				page:1,
				clas :'',
				tag:'全部'
			}
		},
		methods:{
			goinfo(item){
				this.$router.push('/songsheetinfo')
				this.setgedan({
					list:item
				})
			},
			fyshuju(list){
				this.$ajax.get('http://140.143.128.100:3000/top/playlist',{
					params:{
						offset:this.page,
						limit:30,
						order:'hot',
						cat : list.name
					}
				}).then((res) => {
					this.todal = res.data.total
					this.playlists = res.data.playlists
				})
				this.tag = list.name
			},
			changec(){
				let li = document.getElementsByClassName('active')
				this.page = li[0].innerText
				this.getgedanlist()
			},
			gorement(){
				this.getgedanlist()
			},
			getgedanfenlei(){
				this.$ajax.get('http://140.143.128.100:3000/playlist/catlist').then((res) => {
					this.categories = res.data.categories
					var arr = res.data.sub
					for(let i =0;i<arr.length;i++){
						console.log(arr[i].category)
						if(arr[i].category == 0){
							this.sub[0].push(arr[i])
						}else if (arr[i].category == 1){
							this.sub[1].push(arr[i])
						}else if (arr[i].category == 2){
							this.sub[2].push(arr[i])
						}else if (arr[i].category == 3){
							this.sub[3].push(arr[i])
						}else if (arr[i].category == 4){
							this.sub[4].push(arr[i])
						}
					}
					console.log(this.sub)
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
			getgedanlist(){
				this.$ajax.get('http://140.143.128.100:3000/top/playlist',{
					params:{
						offset:this.page * 30,
						limit:30,
						order:'hot'
					}
				}).then((res) => {
					this.todal = res.data.total
					this.playlists = res.data.playlists
				})
				this.tag = '全部'
			},
			open(){
				this.flag = true
			},
			close(){
				this.flag = false
			},
			...mapMutations({
				setgedan : "SET_GEDAN"
			})
		},
		created(){
			this.getgedanfenlei()
			this.getgedanlist()
		}
	}
</script>

<style lang ='less' >
.el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
}
.cont{
	display: flex;
	flex-wrap: wrap;
	margin-left: 15px;
}
.xians{
    height: 400px;
    width: 1px;
    position: absolute;
    background: #D3D3D3;
    margin-left: 70px;
}
	.songsheetContainer{
		margin-top: 104px;
		.textcontent{
			.content{
				padding: 30px;
				box-sizing: border-box;
				.title{
					line-height: 30px;
					border-bottom: 2px solid #C20C0C;
					h1{
						font-size: 20px;
						float: left;
						font-weight: 200;
					}
					.fl{
						margin-left: 50px;
						color: #0c73c2;
						font-size: 13px;
						display: inline-block;
						width: 100px;
						text-align: center;
						line-height: 30px;
						background-color: #eee;
						border: 1px solid #D3D3D3;
						border-radius: 5px;
					}
					.right{
						float: right;
						width: 50px;
						line-height: 30px;
						font-size: 13px;
						color: #fff;
						border-radius: 10px;
						text-align: center;
						background-color: #B70A0B;
					}
				}
				.container {
					.box{
						width: 712px;
						border: 1px solid #D3D3D3;
						position: absolute;
						z-index: 666;
						background-color: #fff;
						top: 5px;
						.titles {
							line-height: 50px;
							padding-left: 30px;
							border-bottom: 1px solid #D3D3D3;
						}
						.contents{
							.icon{
								display: inline-block;
								background-image: url('https://s2.music.126.net/style/web2/img/icon.png?abb319d9b708bd11d53a6ff34743c388')
							}
							padding: 20px;
							.con{
								margin-top: 20px;
							dl{
								dd:first-child{
									border-left: none;
								}
								display: flex;
								.icon0{
									width: 29px;
									height: 30px;
									background-position: -17px -734px;
									float: left;
								}
								.icon1{
									    width: 29px;
									    height: 30px;
									    background-position: 3px -58px;
									    float: left;
								}
								.icon2{
									width: 29px;
									height: 30px;
									background-position: 2px -87px;
									float: left;
								}
								.icon3{
									width: 29px;
									height: 30px;
									background-position: 3px -115px;
									float: left;
								}
								.icon4{
									width: 29px;
									height: 20px;
									background-position: 2px -140px;
									float: left;
								}
								span{
									font-size: 13px;
									line-height: 30px;
								}

								dt{
									min-width: 70px;
									text-align: center;
								}
								dd{

									min-width: 50px;
									text-align: center;
									line-height: 30px;
									font-size: 13px;
									span{
										border-right: 1px solid #D3D3D3;
										padding: 0 10px;
									}
								}
								dd:first-child{
									border: none;
								}
							}
						}
					}
						.tops{
						background-image: url('https://s2.music.126.net/style/web2/img/iconall.png?b2e783e5d81499fc348c5ec238a6f3cb');
					    position: absolute;
					    width: 35px;
					    height: 22px;
					    background-position: -40px 0px;
					    left: 120px;
					    top: -11px;
						}
					}
					position: relative;
					ul{
						display: flex;
						flex-wrap: wrap;
					li{
						width: 140px;
						box-sizing: border-box;
						.img{
							position: relative;
							img{
								width: 140px;
								height: 140px;
								display: block;
							}
							p{
								position: absolute;
								bottom: 0;
								width: 140px;
								background-color: rgba(0, 0, 0,.6);
								color: #fff;
								font-size: 13px;
								display: flex;
								justify-content: space-between;
								span{
									margin: 0 10px;
								}
							}
						}
						margin-top: 30px;
						margin-right: 45px;
						p{
							width: 100%;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
						.name{
							font-size: 14px;
							padding-top: 10px;
						}
						.singer{
							color: #666;
							font-size: 12px;
						}
					}
					li:nth-child(5n){
						margin-right: 0;
					}
				}
		      }
			}
		}
	}
	.songsheet-enter{
		transform: translateY(100%)
	}
	.songsheet-leave-to{
		transform: translateX(-100%)
	}
	.songsheet-enter-active,
	.songsheet-leave-active{
		transition: all .5s ease;
		opacity: 0;
	}
</style>