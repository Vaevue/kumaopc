<template>
	<div class ='indexContainer'>
		<ul class ='ulbox'>
			<div class="content">
			<router-link tag='li' to ='/index/Recommend'><em>推荐</em></router-link>
			<router-link tag='li' to ='/index/RankingList'><em>排行榜</em></router-link>
			<router-link tag='li' to ='/index/songsheet'><em>歌单</em></router-link>
			<router-link tag='li' to ='/index/AnchorRadio'><em>主播电台</em></router-link>
			<router-link tag='li' to ='/index/singer'><em>歌手</em></router-link>
			<router-link tag='li' to ='/index/Newdisconshelf'><em>新碟上架</em></router-link>
			</div>
		</ul>
		<router-view></router-view>
	</div>
</template>

<script>
	
	export default {
		
	}
</script>

<style lang ='less' scoped>
.indexContainer {
	width: 100%;
	height: 100%;
	background: #f5f5f5;
}
.router-link-active>em{
	background: #9B0909;
}
	.ulbox {
		width: 100%;
		display: flex;
		position: fixed;
		z-index: 999;
		top: 70px;
		height: 34px;
		background: #C20C0C;
		color: #fff;
		line-height: 34px;
		.content{
			width: 715px;
			li {
			float: left;
			font-size: 12px;
			min-width: 50px;
			padding-right: 10px;
			em {
				display: inline-block;
				min-width: 30px;
				padding: 0 10px;
				height: 22px;
				margin: 0 auto;
				border-radius:10px 10px;
				text-align: center;
				line-height: 22px;
			}
		}
		}
	}
	em:hover {
		    background: #9B0909;
	}
</style>