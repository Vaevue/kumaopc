/*
* @Author: Administrator
* @Date:   2019-08-28 10:04:01
* @Last Modified by:   Administrator
* @Last Modified time: 2019-09-10 20:48:01
*/
import state from './state.js'

export const singer = state => state.singer

export const playlist = state => state.playlist

export const randomlist = state => state.randomlist

export const fulleen = state => state.fulleen

export const currentSong = (state) =>{return state.playlist[state.current] || {}
}

export const mode = state => state.mode

export const current = state => state.current

export const playing = state => state.playing

export const opp = state => state.opp

export const mvid = state => state.mvId

export const album = state => state.album

export const gedan =  state => state.gedan

export const logintype = state => state.logintype