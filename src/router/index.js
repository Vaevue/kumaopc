import Vue from 'vue'
import Router from 'vue-router'
import index from '../index/index.vue'
import Recommend from '../Recommend/Recommend.vue'
import RankingList from '../RankingList/RankingList.vue'
import singer from '../singer/singer.vue'
import Singerinfo from '../singer/component/singerinfo.vue'
import mv from '../mv/mv.vue'
import playlist from '../plear/playlist.vue'
import album from '../album/album.vue'
import user from '../user/user.vue'
import songsheet from '../songsheet/songsheet.vue'
import songsheetinfo from '../songsheet/components/songsheetinfo.vue'
import AnchorRadio from '../AnchorRadio/anchorradio.vue'
import Newdisconshelf from '../Newdisconshelf/Newdisconshelf.vue'
import friend from '../friend/friend.vue'
import mymusic from '../mymusic/mymusic.vue'
Vue.use(Router)
const router = new Router({
	routes: [
	{
		path:'/',
		redirect: '/index/Recommend'
	},
		{
			path: '/index',
			component: index,
			children: [
				{
					path: 'Recommend',
					component:Recommend
				},
				{
					path: 'songsheet',
					component:songsheet 	
				},
				{
					path: 'RankingList',
					component:RankingList
				},
				{
					path:'AnchorRadio',
					component:AnchorRadio
				},
				{
					path:'Newdisconshelf',
					component:Newdisconshelf
				},
				{
					path: 'singer',
					component:singer,
					children : [
					{
						path:':id',
						component:Singerinfo
					}
					]
				},
				{
					path:'mv',
					component:mv
				},
				{
					path:'album',
					component:album
				},
				{
					path:'user',
					component:user
				}
			]
		},
		{
			path:'/pla',
			component:playlist
		},
		{
			path:'/songsheetinfo',
			component:songsheetinfo
		},
		{
			path:'/friend',
			component:friend
		},
		{
			path:'/mymusic',
			component:mymusic
		}
	]
})

export default router