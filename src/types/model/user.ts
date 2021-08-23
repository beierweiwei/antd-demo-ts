interface UserItemState {
  username: string
  _id: string
  sex: number
  address: AddressItem[]
  money: number
  avatar: string
  
}

interface UserState {
  user: UserItemState | null 
  isLogin: boolean 
}