declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.webp'
declare module '*.json'
declare module '*.js'

type UserInfo = {
  name: string
  email: string
  age: number
  address: string
  avatar: string
}
type ArticleComment = {
  userName: string
  avatarUrl: string
  message: string
  dateTime: string
  location: string
  favoriteCount: number
  isFavorite: boolean
  children?: ArticleComment[]
}

type Article = {
  id: number
  title: string
  desc: string
  tag: string[]
  dateTime: string
  location: string
  userId: number
  userName: string
  isFollow: boolean
  avatarUrl: string
  images: string[]
  favoriteCount: number
  collectionCount: number
  isFavorite: boolean
  isCollection: boolean
  comments?: ArticleComment[]
}

type ArticleSimple = {
  avatarUrl200: string | undefined
  image400: string
  id: number
  title: string
  userName: string
  avatarUrl: string
  favoriteCount: number
  isFavorite: boolean
  image: string
}

type Category = {
  name: string
  default: boolean
  isAdd: boolean
}

type GoodsSimple = {
  id: number
  title: string
  image: string
  price: number
  originPrice: number | undefined
  promotion: string | undefined
}

type GoodsCategory = {
  id: number
  name: string
  image: string
}

type MessageListItem = {
  id: number
  name: lastMessage
  avatarUrl: string
  lastMessage?: string
  lastMessageTime?: string
}

type UnRead = {
  unreadFavorate: number
  newFollow: number
  comment: number
}
