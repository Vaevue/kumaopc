<template>
	<div>
<el-carousel indicator-position="outside">
    <el-carousel-item v-for="(item,index) in img" :key="index" :style ='bg(item)'>
    	<img :src="item.picUrl" alt="">
    </el-carousel-item>
 </el-carousel>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				img : []
			}
		},

		methods : {
			getlblist() {
				this.$ajax.get('https://musicapi.leanapp.cn/banner').then((res) => {
					this.img = res.data.banners
					console.log(res.data.banners)
				}).catch(()=> {
		this.$notify({
          title: '获取失败',
          message: ('i', { style: 'color: teal'}, '获取图片失败')
        });
				})
			}, 
			bg(itme){
				console.log(itme)
				return `background:url(${itme.backgroundUrl})`
			}
		},
		created() {
			this.getlblist()
		},
	}
</script>

<style lang ='less' scoped>
/* 	.el-carousel  {
		width: 730px;
		height: 336px;
		margin: 0 auto;
	} */
	.el-carousel__item {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
   text-align: center
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>