export default class Singer {
	constructor({id,name,mid,img1v1Url,accountId}){
		this.id = id
		this.name = name
		this.mid = mid
		this.img1v1Url = img1v1Url,
		this.accountId = accountId
	}
}

export const user = function(user){
	return new Singer({
		id:user.userId,
		name:user.nickname,
		img1v1Url:user.avatarUrl,
		accountId:user.userId
	})

	}
