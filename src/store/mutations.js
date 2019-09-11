import * as types from './mutionsType.js'
import state from './state.js'
const mutations = {
		[types.SET_SINGER](state,singer){
			state.singer = singer
		},
		[types.SET_PLAYING](state,boole){
			state.playing = boole
		},
		[types.SET_PLAYLIST](state,list){
			state.playlist = list
		},
		[types.SET_CURRENT](state,index){
			state.current = index
		},
		[types.SET_FULLEEN](state,boole){
			state.fulleen = boole
		},
		[types.SET_MODE](state,index){
			state.mode = index
		},
		[types.SET_OPP](state,index){
			state.opp = index
		},
		[types.SET_SJ_PLAYLIST](state,list){
			state.randomlist = list
		},
		[types.SET_MVID](state,id){
			state.mvId = id
		},
		[types.SET_ALBUM](state,list){
			state.album = list
		},
		[types.SET_GEDAN](state,list){
			state.gedan = list
		},
		[types.SET_LOGINTYPE](state,number){
			state.logintype = number
		}
}

export default mutations