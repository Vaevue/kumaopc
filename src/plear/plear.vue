<template>
	<transition>
	<div class ='plearContainer' v-show = 'fulleen' ref ='container'>
		<div>
			<div class="content">
				<div class="leftcaozuo">
					<span class ='el-icon-caret-left' @click ='prev'></span>
					<span :class ='playicon' @click ='toggleplaying'></span>
					<span class ='el-icon-caret-right' @click ='next'></span>
				</div>
				<div class="play">
					<img :src="currSong.img" alt="" @click.stop ='openplaylist'>
					<div class="nav">
						<p>{{currSong.albumname}}  <span>   -   {{singer.name}}</span></p>
						<div class="xian"  @click ='offset'>
							<div class="newxian" ref= 'newxian'></div>
							<div class="btn" ref ='btn'></div>
							<div class="oldxian" ref = 'oldxian'></div>
						</div>
						<div class="interval">
								<span class ='now'>{{newtime}}</span>/
								<span class ='old'>{{times}}</span>
							</div>
						<div class="playlist">
							<span class ='el-icon-folder'></span>
							{{playlist.length}}
						</div>
					</div>
				</div>
			</div>
		</div>
		<audio ref ='audio' :src="currSong.url" @ended ='end'  @timeupdate = 'uppdata' autoplay></audio>
	</div>
	</transition>
</template>
<script>
import {playlist} from '../common/js/song.js'
import {mapGetters,mapMutations} from 'vuex'
	export default{
		props: ['url'],
		data(){
			return {
				times: '',
				newtime:'',
				n1time : '',
				ol1time : '',
				currSong: []
			}
		},
		created(){
			this.touch  = []
		},
		methods : {
			openplaylist(){
				this.$refs.container.style.bottom = '-50px'
				this.$router.push('/pla')
			},
			loop(){
				this.$refs.audio.currentTime = 0
				this.toggleplaying()
			},
			offset(e){
				this.newbar(e.offsetX)	
				this.tooglepreve()
			},
			prev(){
				if(this.current == 0){return}
				this.setcurrent(this.current-1)
			if(this.playlist.length ==1 ){
					this.loop()
				}
			},
			next(){
				console.log(this.currSong)
				if(this.current == this.playlist.length){
					return 
					this.setcurrent(1)
				}
				this.setcurrent(this.current+1)
				if(!this.playing){
					this.toggleplaying()
				}
				if(this.playlist.length ==1 ){
					this.loop()
				}
				

			},
			 onchanche(preve) {
        const currenttime = this.ol1time * preve
        this.$refs.audio.currentTime = currenttime
    },
			toggleplaying(){
				this.setplay(!this.playing)
				if(this.playing){
					this.$refs.audio.play()
				}else {
					this.$refs.audio.pause()
				}
			},
			end(){
				this.next()
			},
			 tooglepreve() {
        const barwidth = this.$refs.oldxian.clientWidth - this.$refs.btn.clientWidth
        const preve = this.$refs.newxian.clientWidth / barwidth
        this.onchanche(preve)
        if (!this.playing) {
          this.toggleplaying()
        }
      },
			time(){
				const interval = this.$refs.audio.duration
				this.ol1time = interval
				this.times = this.timeout(interval)
			},
			newbar(offsetWidth) {
				this.$refs.newxian.style.width = `${offsetWidth}px`
				this.$refs.btn.style.transform = `translate(${offsetWidth}px,-50%)`
			},
				uppdata(e){
				const newinterval = e.target.currentTime
				this.n1time = newinterval
				this.newtime = this.timeout(newinterval)
				},
			 timeout(result) {	
        var m = Math.floor((result / 60) % 60) < 10 ? '0' + Math.floor((result / 60) % 60) : Math.floor((result / 60) % 60)
        var s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60)
        return `${m}:${s}`
      },
			...mapMutations({
				setcurrent : 'SET_CURRENT',
				setplay : 'SET_PLAYING'
			})
		},
		computed:  {
			playicon(){
				if(this.playing){
					return 'el-icon-video-pause'
				}else {
					return 'el-icon-video-play'
				}
			},
			tapnewtime(){
				return this.n1time / this.ol1time
			},
			...mapGetters(['fulleen','playing','currentSong','current','playlist','singer'])
		},
		watch: {
			currentSong(newsong,oldsong){
				this.currSong = newsong
			},
			newtime(newt){
				this.time()
			},
			tapnewtime(newtime){
				const width = this.$refs.oldxian.clientWidth - this.$refs.btn.clientWidth
				const offsetWidth = (newtime * width) + 3
				this.newbar(offsetWidth)
			}
		}
	}
</script>

<style lang ='less'>
.v-enter,
.v-leave-to {
	transform: translateY(70px);
}
.v-enter-active,
.v-leave-active{
	transition: all .5s ease;
}
	.plearContainer {
		color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #222;
		z-index: 9999999;
		height: 50px;
		.content {
			position: relative;
			display: flex;
			.leftcaozuo{
					line-height: 50px;
				font-size: 25px;
			}
			.play{
				display: flex;
				img {
					height: 50px;
					width: 50px;
				}
				.nav{
				padding-left: 20px;
				p{
					font-size: 12px;
					span {
						color: #eee;
					}
				}
				.xian{
					position: relative;
					margin-top: 20px;
				.newxian {
					width: 0px;
					height: 10px;
					border-radius: 5px 5px;
					background: #31c27c;
					position: absolute;
					 top: 50%;
    				transform: translateY(-50%);
    				z-index: 10;
    			}
				.btn {
					height: 20px;
					width: 20px;
					background: #31c27c;
					border-radius: 50%;
					position: absolute;
					top: 50%;
					left: 0;
					z-index: 10;
					transform: translateY(-50%);
				}
				.oldxian {
					width: 400px;
					height: 10px;
					border-radius: 5px 5px;
					background: #fff;
					 position: absolute;
   					 top: 50%;
    				transform: translateY(-50%);	
				}

			}
			.interval{
					position: absolute;
					 top: 49%;
					left: 560px;
					font-size: 13px;
				}
				.playlist{
					position: absolute;
					right: 50px;
					background: #323232;
					top: 50%;
					transform: translateY(-50%);
				}
		}
			}
		}
	}
</style>