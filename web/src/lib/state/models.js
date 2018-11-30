export type User = {|
  id: string,
  name: string,
  avatar: string
|}

export type UserLoggedIn = {|
  token: string,
  ...User
|}

export type OfferPost = {|
  date: string,
  time: string,
  departure: string,
  arrival: string,
  vehicle: string,
  capacity: string,
  price: string
|}

export type Offer = {|
  id: string,
  user: User,
  status: 'created' | 'ended',
  joined: [],
  ...OfferPost
|}

export type OfferJoinedUser = {|
  status: 'pending' | 'cancelled',
  ...User
|}
