<template>
	<div>
	<div class="header">
		<div class="headercontent">
				<ul class ='oneul'>
				<li ><p><span>k</span>酷猫音乐</p></li>
				<router-link class ='onli' tag ='li' to ='/index/Recommend'><p>发现音乐</p></router-link>
				<router-link class ='onli' tag ='li' to ='/mymusic'><p>我的音乐</p></router-link>
				<router-link class ='onli' tag ='li' to ='/friend'><p>朋友</p></router-link>
			</ul>
			<div class="headerRight">
				<ul>
					<li class ='oneli'>
						<span class ='el-icon-search'></span>
						<input v-model ='search' type="search" placeholder="音乐/视屏/电台/用户">
					</li>
					<li class ='czz'>
						创作者中心
					</li>
					<li @click ='open' v-show ='logintype == 0'>
						手机登录
					</li>
			<li class="user" v-show = 'logintype == 1'>
				<img  :src="user.avatarUrl" >
				<i>{{user.nickname}}</i>
			</li>
				</ul>
			</div>
		</div>
	</div>
		<el-main>
				<router-view></router-view>
		</el-main>
		<div class="login" v-show ='flag'>
		<div class="loginbox">
		<div class="top">
			<h3 >手机号登录</h3>

			<span class ='el-icon-close' @click ='close'></span>
		</div>	
		<div class="content">
			<input v-model ='phone' type="text" placeholder="请输入手机号">
			<input v-model ='password' type="password" placeholder="请输入密码">
			<input @click ='login' class ='btn' type="submit" value="登录">
		</div>
		</div>
		</div>
	</div>
</template>

<script>
import {globalBus} from '../api/globalBus.js'
import {mapGetters,mapMutations} from 'vuex'
	export default {
		data(){
			return {
				flag: false,
				phone :'',
				password: '',
				user :　[],
				search : ''
			}
		},
		computed : {
			...mapGetters(['logintype'])
		},
		methods : {
			close(){
				this.flag = false
			},
			open(){
				this.flag = true
			},
			login(){
				this.$ajax.get('http://140.143.128.100:3000/login/cellphone',{
					params: {
						phone:  this.phone,
						password: this.password
					}
				}).then((res) => {
					console.log(res.data)
					this.user = res.data.profile
					if(res.data.profile){
					this.flag = false
					this.setlogintype({
						number: 1 
					})
					 this.$message({
        		 	 message: '登录成功',
         			 type: 'success'
       				 });
					}else {
						 this.$message.error('账号或密码错误');
					}
				})
			},
			searchwotex(){
				this.$ajax.get('http://140.143.128.100:3000/search',{
					params:{
						keywords : this.search
					}
				}).then((res) => {
					console.log(res)
				})
			},
			...mapMutations({
				setlogintype : "SET_LOGINTYPE"
			})
		},
		created(){
			document.addEventListener('keyup',(e)=>{
				if(e.code == 'NumpadEnter'){
					this.login()
				}
			})
			globalBus.$on('logins',()=>{
				this.open()
			})
		},
		watch:{
			search(){
				this.searchwotex()
			}
		}
	}
</script>
<style lang ='less' scoped>
.user {
	display: flex;
	align-items: center;
	img{
		display:block;
		margin-right:10px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
}
.login{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, .3);
	.loginbox{
		height: 300px;
		width: 513px;
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 11;
		background: #fff;
		transform: translate(-50%,-50%);
		.top{
			height: 50px;
			width: 100%;
			background: #222;
			display: flex;
			color: #fff;
			line-height: 50px;
			justify-content: space-between;
			h3{
				margin-left: 20px;
			}
			span{
				line-height: 50px;
				margin-right: 20px;
			}
		}
		.content{
				margin-top: 50px;
			input{
				width: 220px;
				display: block;
				height: 30px;
				margin: 10px;
				margin-left: 150px;
				border: none;
				border: 1px solid #999;
			}
			.btn {
				margin-top: 40px;
				background: #31c27c;
				border: none;
			}
		}
	}
}
.router-link-active  {
	background: #000000;
	position: relative;
}
.router-link-active:after{
	content: '';
	background: url('https://s2.music.126.net/style/web2/img/frame/topbar.png?91ba2de84ecc10e2c4446cbb28af0958');
	 display: block;
    position: absolute;
    left: 50%;
    top: 64px;
    right: 0;
    width: 12px;
    height: 7px;
    margin-left: -6px;
    overflow: hidden;
    background-position: -226px 0;
}

	.el-main {
		padding: 0;
		overflow: hidden;
	}
	.header {
	position: fixed;
    top: 0;
    z-index: 999;
	height: 70px;
	width: 100%;
	background: #242424;
		.headercontent {
	width: 1100px;
	height: 0px;
	padding-bottom: 104px;
	margin: 0 auto;
		.oneul{
			float: left;
			color: #fff;
			display: flex;
			line-height: 70px;
			li {
			min-width: 40px;
			padding: 0 20px;
			p{
				span{
					height: 40px;
					width: 40px;
					background: #E60026;
					border-radius :  50%;
					line-height: 40px;
					text-align: center;
					color: #fff;
					font-size: 20px;
					display: inline-block;
					margin-right: 10px;
				}
			}
			}
		}
		.headerRight {
			float: right;
			ul {
				font-size: 12px;
				display: flex;
				color: #fff;
				line-height: 70px;
				.oneli {
					position: relative;
				}
				.czz {
					min-width: 50px;
					height: 30px;
					line-height: 30px;
					padding: 0 15px;
					margin-top: 20px;
					border: 1px solid #999;
					margin-left: 10px;
					border-radius: 20px 20px;
				}
				li {

						margin-left: 15px;
						text-align: center;
					span{
						position: absolute;
						line-height: 70px;
						left: 10px;
						color: #000;
						font-size: 15px;
							}
					input {
						width: 160px;
						height: 30px;
						border-radius: 20px 20px;
						border: none;
						padding-left: 30px;
						font-size: 12px;
						color:#999;
					}
				}
			}
		}
		}
	}
	
	.oneul .onli:hover {
	background: #000000;
	}
</style>
