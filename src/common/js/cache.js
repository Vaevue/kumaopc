import {playlist} from './song.js'
export function pushplaylist(song){
	let index = playlist.findIndex((item)=>{
		return item.id === song.id
	})
	playlist.splice(index,1)
	playlist.push(song)
	return playlist
}