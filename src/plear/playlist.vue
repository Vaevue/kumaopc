<template>	
	<div class ='playlistContainer'>
		<div class="background"></div>
					<div class="contents">
				<div class="top">
					
				</div>
			</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
	export default {
		methods :{
			getlyric(){
				this.$ajax.get('http://140.143.128.100:3000/lyric',{
					params:{
						id:this.currentSong.id
					}
				}).then((res) => {
					console.log(res)
				})
			},
		},
		created(){
			this.getlyric()
		},
		computed : {
			...mapGetters(['currentSong'])
		}
	}
</script>

<style lang ='less'>
	.playlistContainer{
		position: fixed;
		height: 100%;
		width: 100%;
		background: #222;
		z-index: 10000;
		.background{
	 background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(65px);
    opacity: .6;
    transform: translateZ(0);
    position: fixed;
    top: 0;
	left: 0;
	right: 0;
	bottom: 0;
    background-image: url('https://y.gtimg.cn/music/photo_new/T002R300x300M000002KSDg90IaScI.jpg?max_age=2592000');
    z-index: -1;
    }
      .contents{
    	margin: 70px;
    	.top{
    		ul{
    			display: flex;
    			li{
    				min-width: 50px;
    				padding:  0 20px;
    				border: 1px solid rgba(255,255,255,.2);
    				color: #fff;
    				height: 30px;
    				line-height: 30px;
    				text-align: center;
    				margin-right: 30px;
    				cursor: pointer;
    			}
    			li:hover {
    				border: 1px solid #fff;
    			}
    		}
    	}
		}
	}
</style>