type User = {|
  token: string,
  id: string,
  name: string,
  avatar: string
|}

type OfferPost = {|
  date: string,
  time: string,
  departure: string,
  arrival: string,
  vehicle: string,
  capacity: string,
  price: string
|}

type Offer = {|
  id: string,
  user: User,
  ...OfferPost
|}

module.exports = {
  User,
  OfferPost,
  Offer
}
