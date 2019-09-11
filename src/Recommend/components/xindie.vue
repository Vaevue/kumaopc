<template>
	<div class ='xindieContainer'>
		<div class="content">
			<div class="navs">
				 <div class ='left'><span class ='icon'></span>
          <h3>新碟上架</h3>
          <span class ='liRight'>更多 <i class ='el-icon-right' style ='color:#C10D0C;'></i></span>
        </div>
        <div class="conteer">
     <el-carousel trigger="click" :autoplay ='false'  :loop="true" height="180px">
      <el-carousel-item>
      	<ul>
      		<li v-for ='lists in list' :key ='lists.id'>
      			<div class="bg"></div>
      			<img :src="lists.picUrl" alt="">
      			<p class ='name'>{{lists.name}}</p>
      			<p class ='text'>{{lists.artists[0].name}}</p>
      			<i class ='el-icon-video-play'></i>
      		</li>
      	</ul>
      </el-carousel-item>
       <el-carousel-item>
      	<ul>
      		<li v-for ='lists in listTwo' :key ='lists.id'>
      			<div class="bg"></div>
      			<img :src="lists.picUrl" alt="">
      			<p class ='name'>{{lists.name}}</p>
      			<p class ='text'>{{lists.artists[0].name}}</p>
      			<i class ='el-icon-video-play'></i>
      		</li>
      	</ul>
      </el-carousel-item>
    </el-carousel>
        </div>
			</div> 
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list : [],
				listTwo :[]
			}
		},
		methods : {
			getlist() {
				this.$ajax.get('https://musicapi.leanapp.cn/top/album?offset=0&limit=12').then((res) => {
					console.log(res.data.albums)
					const arr = res.data.albums
					for(let i =0;i<arr.length;i++){
						if(i <= 5){
							this.list.push(arr[i])
							console.log(arr[i].artists[0].name)
						}else if (i>= 5){
							this.listTwo.push(arr[i])
						}
					}
					
						console.log(this.listTwo)
				})
			}
		},
		created() {
			this.getlist()
		}
	}
</script>

<style lang ='less' scoped>
.xindieContainer {
	margin-bottom: 50px;
}
	.navs {
		margin: 0 20px;
		.conteer {
			width: 100%;
			height: 180px;
			background: #eee;
			border: 1px solid rgb(211, 211, 211);
			margin-top: 40px;
			ul {
				display: flex;
				margin-left: 60px;
				margin-top: 30px;

				li{
					position: relative;
					i{
						top: 80px;
						font-size: 20px;
						position: absolute;
						right: 20px;
						color: #333;
					}
					margin-right: 30px;
					img {
						width: 100px;
						height: 100px;
					}
					.name{
						width: 100px;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 13px;
						height: 15px;
						color: #666;
						padding-top: 5px;
						margin-left: 10px;
					}
					.text {
					    width: 100px;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 13px;
						height: 15px;
						color: #666;
						padding-top: 5px;
						padding-left: 10px;
					}
					.bg {
					    height: 100px;
					    width: 118px;
					    position: absolute;
					    background: url('https://s2.music.126.net/style/web2/img/coverall.png?6e52e5de53f778707429f75ae5bfab18') no-repeat 0 -570px;
					}
				}
			}
		}
		 .left {
   font-weight: 200;
   display: flex;
   font-size: 20px;
	position: relative;
	border-bottom: 2px solid  #C10D0C;
 h3 {
   font-size: 20px;
   font-weight: normal;
   margin-right: 20px;
 }

 .icon {
   height: 30px;
   padding: 0px 10px 0px 34px;
   background-position: 48px -134px;
   background: url('https://s2.music.126.net/style/web2/img/index/index.png?e8481fc5fc3f1661c26df5e76a7d383b') -214px -160px no-repeat;
 }
 .liRight{
  position:absolute;
   right:15px;
   font-size:13px;
   color:#666;
 }
 
 ul {
   display: flex;
   float: left;

 li {
   font-size: 13px;
   color: #666;
   line-height: 32px;

 }

 span {
   color: #666;
   font-size: 13px;
   margin: 0 10px;
   line-height: 32px;
 }

	}
}
}


</style>