import * as types from './mutionsType.js'
import {playmode} from '../api/config.js'
import {shuffle} from '../common/js/ulix.js'
import {pushplaylist} from '../common/js/cache.js'
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id=== song.id
  })
}
export const selectplay = function( {commit, state},{list, index} ){
	let playlist = state.playlist.slice()
  let randomlist = state.randomlist.slice()
   let fdindex = findIndex(playlist,list)
 if(state.mode === playmode.random){
 	let randomlist = shuffle(list)
 	commit(types.SET_PLAYLIST,randomlist)
 	index = findIndex(randomlist,list[index])
 }else {
 	commit(types.SET_PLAYLIST,list)
 }
 commit(types.SET_FULLEEN,true)
 commit(types.SET_CURRENT,index)
 commit(types.SET_PLAYING,true)
}