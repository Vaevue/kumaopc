<template>
	<div class="userdjContainer">
		<div class="textcontent">
			<div class="top">
				<img :src="dj[0].coverUrl" alt="">
				<div class="con">
					<p class ='singer'><i></i>{{dj[0].dj.nickname}}电台</p>
					<div class="singerlink">
						<img :src="dj[0].dj.avatarUrl" alt="">
						<span>{{dj[0].dj.nickname}}</span> <i></i>
					</div>
					<div class="dy">
						<span>订阅({{dj[0].likedCount}})</span>
						<span>分享({{dj[0].subscribedCount}})</span>
					</div>
					<div class="js">
						<span v-html ='dj[0].description'></span>
					</div>
				</div>
			</div>
			<div class="content">
				<p>节目列表 共{{dj.length}}期</p>
				<div class="list">
					<ul>
						<li v-for ='(item,index) in dj' @click ='play(item,index)'>
							<span>{{index+1}}</span>
							<span class ='el-icon-video-play'></span>
							<span>{{item.mainSong.name}}</span>
							<span>赞{{item.likedCount}}</span>
							<span>{{time(item)}}</span>
							<span>{{timeout(item.mainSong.duration)}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {playdj} from '../../common/js/song.js'
import {mapMutations,mapActions} from 'vuex'
	export default{
		name:'userdj',
		props:['dj'],
		data(){
			return {
			lists :[]
			}
		},
		methods:{
			play(item,index){
				console.log(item)
			this.lists.push(playdj(item))
			console.log(this.lists)
			this.selectplay({
				list:this.lists,
				index
			})
			this.setplay({
				boole:true
			})
			},
			 timeout(result) {
			
          var m = parseInt((result % (1000 * 60 * 60)) / (1000 * 60));
  		  var s = (result % (1000 * 60)) / 1000;
        return `${m}:${s}`
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
getzf(num){  
     if(parseInt(num) < 10){  
         num = '0'+num;  
     }  
     return num;  
 },
 time(item){
 	return this.timeset('yyyy-mm-dd',item.createTime)
 },
 ...mapMutations({
 	setplay: 'SET_PLAYING'
 }),
 ...mapActions(['selectplay'])
		},
		created(){
			this.time()
		}
	}
</script>
<style lang = 'less' scoped>
	.userdjContainer{
		position: absolute;
		top: 104px;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1900px;
		background-color: #eee;
		.textcontent{

			.top{
				display: flex;
				padding: 30px;
				img{
					width: 208px;
					height: 208px;
				}
			.con{
				margin-left: 20px;
			.singer{
				line-height: 40px;
				font-size: 20px;
				i{
		background-image: url(https://s2.music.126.net/style/web2/img/icon.png?abb319d…);
	    display: inline-block;
	    width: 55px;
	    height: 28px;
	    background-position: 1px -1008px;
	    padding-right: 12px;
	    margin-top: 4px;
	    float: left;
				}
				}
				.singerlink{
					display: flex;
					align-items: center;
					img{
						width: 35px;
						height: 35px;
					}
					span{
						line-height: 35px;
						color: #31c27c;
						padding-left: 10px;
						
					}
					i{
		background-image: url(https://s2.music.126.net/style/web2/img/icon.png?abb319d…);
	    display: inline-block;
	    width: 3px;
	    height: 22px;
	    background-position: 1px 4px;
	    padding-right: 12px;
	    margin-top: 4px;
	    float: left;
						}
				}
				.dy{
					padding-top: 15px;
					span{
						min-width: 60px;
						padding: 0 15px;
						background-color: #222;
						height: 30px;
						line-height: 30px;
						display: inline-block;
						text-align: center;
						color: #fff;
						border-radius: 5px;
						font-size: 13px;
					}
				}
				.js{
					font-size: 13px;
					color: #666;
					padding-top: 15px;
				}
			}
			}
			.content{
				padding: 0 30px;
				width: 100%;
				box-sizing: border-box;
			.list{
				display: flex;
				padding-bottom: 50px;
				ul{
					border: 1px solid #DDDDDD;
					border-top: 2px solid #a40011;
					li{
						height: 70px;
						line-height: 70px;
						border-bottom: #eee;
						box-sizing: border-box;
						width: 100%;
						span{
							padding: 0 30px;
							font-size: 12px;
							color: #666;
						}
					}
					li:hover{
						background-color: #eee;
					}
				}
			}
		}
		}
	}
</style>