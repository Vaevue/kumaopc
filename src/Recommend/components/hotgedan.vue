<template>
	<div>
		<div class="content">
		<div class="navs">
      <div class="top">
        <div class ='left'><span class ='icon'></span>
          <h3>热门推荐</h3>
          <ul class ='ulbox'>
            <li>华语</li><span>|</span>
            <li>流行</li><span>|</span>
            <li>摇滚</li><span>|</span>
            <li>民谣</li><span>|</span>
            <li>电子</li>
          </ul>
          <span class ='liRight'>更多 <i class ='el-icon-right' style ='color:#C10D0C;'></i></span>
        </div>

    </div>
      <div class="conter">
        <ul>
          <li @click ='gogedan(list)' v-for ='list in hotge' :key ='list.id'>
            <img :src="list.picUrl" alt=""/>
            <p v-html ='list.name'></p>
            	<i class ='el-icon-video-play'></i>
          </li>
        </ul>
      </div>
			</div>
		</div>
	</div>
</template>

<script>
import {mapMutations} from 'vuex'
	export default {
    data() {
    return {
      hotge : []
    }
  },
  methods :{
  
    gogedan(list){
      this.$router.push('/index/songsheet')
     
    },
 	gethopst() {
 	 this.$ajax.get('http://140.143.128.100:3000/personalized?limit=10').then((res) => {
    console.log(res.data.result)
     this.hotge =  res.data.result
    }).catch(() => {
              this.$notify({
          title: '获取失败',
          message: h('i', { style: 'color: teal'}, '获取数据失败')
        })
    }) 
 	},
    ...mapMutations({
      setgedan : "SET_GEDAN"
    }),
  },
  created() {
  	this.gethopst()
  },
	}
</script>

<style lang ='less' scoped>
  .liRight:hover {
    text-decoration:underline;
  }
 .content {
 .navs {
  margin: 0 20px;
 .conter {
   ul {
   padding-top:20px;
   display: flex;
   flex-wrap: wrap;
     li{
       padding: 0 0 30px 50px;
       position: relative;
       img {
         width:140px;
         height:140px;
         display:block;
       }
       p{
       	padding-top: 10px;
       	text-indent: 1em;
         max-height:70px;
         overflow:hidden;
         max-width:140px;
         text-overflow:ellipsis;
         font-size:13px;
         color:#666;
       }
       	i{
    position: absolute;
    top: 111px;
    width: 140px;
    height: 30px;
    background: rgba(0, 0, 0, .4);
    font-size: 20px;
    line-height: 30px;
    text-align: right;
    color: #fff;
       	}
	i:hover {
		color: #999;
	}
     }
     li:hover {
       text-decoration:none;
     }
     li:first-child {
       padding-left:15px;
     }
     li:nth-child(6n){
       padding-left:15px;
     }
   }
 }
 .top {
   display: flex;
   padding-top: 3px;
  position:relative;
 border-bottom:2px solid #C10D0C;
 .left {
   font-weight: 200;
   display: flex;
   font-size: 20px;

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
 }
 li:hover {
   text-decoration:underline;
 }

</style>
