<template>
	<div class="AnchorRadioContainer">
		<div class="textcontent">
			<div class="content">
				<div class="top">
					<div class="banner">
						  <el-carousel indicator-position='none'  :interval ="20000" height="200px">
						    <el-carousel-item v-for="item in banner" :key="item">
						     	<ul>
						     		<li class ='lsx' @click ='fl(lists,index) , fystyle(lists,index)'  v-for ='(lists,index) in item' :key ='lists.id'>
						     			<div class ='icon' :style ='bgicon(lists)'></div>
						     			<em>{{lists.name}}</em>
						     		</li>
						     	</ul>
						    </el-carousel-item>
						  </el-carousel>
					</div>
				</div>
				<div class="context" v-show ='flag'>
					<div class="left">
						<p class="title">推荐节目</p>
						<ul class="leftcontent">
							<li v-for ='item in djRadios' :key ='item.id'>
								<img :src="item.picUrl" :title="item.name">
								<div class="conta">
								<p>{{item.name}}</p>
								<p style ='color:#666'>{{item.dj.nickname}}</p>
								</div>
								<p class='fl'>{{item.category}}</p>
							</li>
						</ul>
					</div>
					<div class="right">
						<p class="title">节目排行榜</p>
						<ul class="rightcontent">
							<li v-for ='(list,index) in hot' :key ='list.id'>
								<i>{{index + 1}}</i>
								<img :src="list.picUrl" alt="">
								<div class="conta">
								<p>{{list.name}}</p>
								<p style ='color:#666'>{{list.dj.nickname}}</p>
								</div>
								<p class='fls'></p>
							</li>
						</ul>
					</div>
					
				</div>
				<div class="nulls" v-show ='!flag && programs.length == 0'>
						<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568041398047&di=184a1c10ae888c1387bbb2a356443529&imgtype=0&src=http%3A%2F%2Fimg.58cdn.com.cn%2Fdist%2Fjxedt%2Fpc%2Fproducts%2Fjxregister%2Fimages%2Fno_data.png" alt="">
						<p>暂时没有数据啦</p>
				</div>
				<div class="text" v-show ='!flag && programs.length != 0'>
					<p class ='title'>电台</p>
					<ul>
						<li @click ='gouser(item)' v-for ='item in programs' :key ='item.id'>
							<img :src="item.coverUrl" alt="">
							<div class="right">
								<p class='name'>{{item.name}}</p>
								<p class='by'>{{item.dj.nickname}}</p>
								<p class='bys'>共 {{item.trackCount}} 期 订阅 {{item.listenerCount}}次</p>
							</div>
						</li>
					</ul>
					<div class="fenye">
						<el-pagination
					  background
					  :page-size="25"
					  @current-change ='chanc'
					  layout="prev, pager, next"
					  :total="count">
					</el-pagination>
					</div>
				</div>
			</div>	
		</div>
		<!-- <userdj></userdj> -->
	</div>
</template>

<script>
import userdj from '../user/components/userdj.vue'
	export default{
		components:{userdj},
		data(){
			return {
				banner:[[],[]],
				djRadios:[],
				hot:[],
				flag:true,
				page:1,
				count: 0,
				programs: [],
				listss: []
			}
		},
		methods:{
			gouser(item){
				this.$ajax.get('http://140.143.128.100:3000/dj/program/detail',{
					params:{
						id:item.id
					}
				}).then((res) => {
					console.log(res.data)
				})
				console.log(item)
			},
			chanc(e){
				this.page = e
				console.log(this.page)
				this.fl()
			},
			fystyle(list,index){
				this.flag = false
				this.listss = list
				let lis = document.getElementsByClassName('lsx')
				for(let i =0;i<lis.length;i++){
					lis[i].style.borderColor = 'transparent'
					lis[i].children[1].style.color='#666'
					lis[i].children[0].style.backgroundPosition ='0px 0px'
				}
				lis[index].style.border='2px solid #DB5E5E'
				lis[index].children[1].style.color ='rgba(219,94,94)'
				lis[index].children[0].style.backgroundPosition ='-48px 0px'
			},
			fl(list,index){
				this.$ajax.get('http://140.143.128.100:3000/dj/program',{
					params:{
						rid : this.listss.id,
						limit :25,
						offset:this.page * 25
					}
				}).then((res) => {
					console.log(res.data.count)
					this.count = res.data.count
					console.log(res.data.programs)
					this.programs =res.data.programs
				})
			},
			bgicon(list){
				return `background:url(${list.picWebUrl}) no-repeat`
			},
			getbanner(){
				this.$ajax.get('http://140.143.128.100:3000/dj/catelist').then((res) => {
					console.log(res.data.categories)
					let cons = res.data.categories
					for(var i in cons){
						if(i<=17){
							this.banner[0].push(cons[i])
						}else {
							this.banner[1].push(cons[i])
						}
						console.log(this.banner)
					}
				})
			},
			gettuijian(){
				this.$ajax.get('http://140.143.128.100:3000/dj/recommend').then((res) => {
					this.djRadios = res.data.djRadios
				})
			},
			gethot(){
				this.$ajax.get('http://140.143.128.100:3000/dj/hot',{
					params:{
						limit : 10
					}
				}).then((res) => {
					this.hot = res.data.djRadios
				})
			},
			getfltj(){
				this.$ajax.get('http://140.143.128.100:3000/dj/category/excludehot').then((res) => {
					console.log(res.data)
				})
			}
		},
		created(){
			this.getbanner()
			this.gettuijian()
			this.gethot()
			this.getfltj()
		}
	}
</script>

<style lang ='less' scoped>
.fenye{
	width: 100%;
    text-align: center;
    margin: 20px 0;
}
.text{
	.title{
		line-height: 40px;
		border-bottom: 2px solid #C20C0C;
		font-size: 20px;
		font-weight: 600;
	}
	ul{
		margin: 20px;
		display: flex;
		flex-wrap: wrap;
		li{
			display: flex;
			width: 50%;
			border-bottom: 1px solid #D3D3D3;
			margin-top:20px; 
			img{
			width: 120px;
			height: 120px;
			display: block;
				}
			.right{
				margin: 20px 0 20px 20px;
				.name{
					font-size: 19px;
				    font-weight: 600;
				    margin-bottom: 20px;
				    overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				    width: 236px;
				}
				.by{
					color: #666;
					font-size: 13px;
				}
				.bys{
					color: #666;
					margin-top: 10px;
					font-size: 13px;
				}
			}
		}
	}
}
	.nulls{
		img{
	height: 200px;
    display: block;
    margin: 30px auto;
		}
		p{
	text-align: center;
    color: #666
		}
	}
	.AnchorRadioContainer{
		margin-top: 104px;
		.textcontent{
			.content{
				padding: 30px;
				box-sizing: border-box;
				.top{
					.banner{
						ul{
							display: flex;
							flex-wrap: wrap;
							li{
								width: 70px;
								height: 70px;
								margin-top: 20px;
								margin-right: 31px;
   								 border: 2px solid transparent;
   								 cursor: pointer;
   								 border-radius: 5px;
								.icon{
									width: 48px;
									height: 48px;
									display: block;
									margin: 0 auto;
								}
								em{
									font-size: 12px;
								    color: #666;
								    margin-bottom: 10px;
								    display: block;
								    max-width: 70px;
								    overflow: hidden;
								    text-overflow: ellipsis;
								    white-space: nowrap;
								    text-align: center;
								}
							}
							li:nth-child(9n){
								margin-right: 0;
							}
							li:hover{
								background-color: #eee;
							}
						}
					}
				}
				.context{
					display: flex;

					ul{
						width: 430px;
						border: 1px solid #D3D3D3;
						border-top: 2px solid #C20C0C;
						li{
								height: 70px;
								display: flex;
								width: 100%;
								align-items: center;
								padding: 0 20px;
								position: relative;
								box-sizing: border-box;
								
								img{
									height: 40px;
									width: 40px;
									display: block;
									margin:  0 10px;
								}
								p{
									font-size: 14px;
								}
								.fl{
							position: absolute;
							right: 20px;
						    font-size: 12px;
						    min-width: 50px;
						    padding: 0 20px;
						    background: #eee;
						    border: 1px solid #D3D3D3;
								}
							}
					}
					.title{
						line-height: 30px;
						font-size: 21px;
					}
					.left{

						.leftcontent{

						}
					}
					.right{
						margin-left: 50px;
						.rightcontent{}
					}
				}
			}
		}
	}
</style>