export default class Song{
	constructor({albumname,singername,img,url,id,mv}){
		this.albumname = albumname
		this.singername = singername
		this.img = img
		this.url = url
		this.id = id
		this.mv = mv
	}
}

export function playlists(hotSongs) {
	return new Song({
	albumname : hotSongs.name,
	singername : fillsingername(hotSongs.ar),
	img : hotSongs.al.picUrl,
	url : `https://music.163.com/song/media/outer/url?id=${hotSongs.id}.mp3`,
	id:hotSongs.id,
	mv : hotSongs.mv
	})
}
export function playdj(dada){
	return new Song({
	albumname:dada.name,
	singername : dada.dj.nickname,
	img:dada.coverUrl,
	url: `https://music.163.com/song/media/outer/url?id=${dada.mainSong.id}.mp3`,
	id:dada.mainSong.id,
	mv : dada.mv
})
}

export function playgedan (ged){
	return new Song({
		albumname:ged.name,
		singername:ged.al.name,
		img:ged.al.picUrl,
		url:`https://music.163.com/song/media/outer/url?id=${ged.id}.mp3`,
		id:ged.id,
		mv : ged.mv
	})
}
function fillsingername(singer){
	let ret = []
	if(!singer){
		return 
	}
	singer.forEach((item) => {
		ret.push(item.name)
	})
	return ret.join('/')
}
 function timeout(result) {
        var m = Math.floor((result / 60) % 60) < 10 ? '0' + Math.floor((result / 60) % 60) : Math.floor((result / 60) % 60)
        var s = Math.floor(result % 60) < 10 ? '0' + Math.floor(result % 60) : Math.floor(result % 60)
        return `${m}:${s}`
  }