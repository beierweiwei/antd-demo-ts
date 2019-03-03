interface User {
  username: string;
  _id: string;
  sex: number;
}

interface UserState {
  user: User | null 
  isLogin: boolean 
}