const debug = require('debug')('api:routes:mutations')
const utils = require('../lib/utils')

exports.resetState = async (req, res) => {
  debug('resetState')
  await req.state.reset()
  await req.state.save()
  res.sendStatus(200)
}

exports.addOffer = async (req, res) => {
  const id = utils.generateOfferId(req.body)
  const offer = {
    id,
    user: req.user,
    status: 'created',
    joined: [],
    ...req.body
  }
  debug('addOffer', offer)
  const state = await req.state.get()
  // TODO: initial shape should be seeded instead of built up
  state.offers = state.offers || []
  state.offers.push(offer)
  await req.state.save()
  res.json(offer)
}

exports.sayHi = async (req, res) => {
  const id = req.body.id
  const state = await req.state.get()
  const offer = state.offers.find(offer => offer.id === id)

  if (req.user.id === offer.user.id) {
    return res.status(409).json({ error: 'sayHi: cannot use on own rides' })
  }

  let joinedUser = offer.joined.find((user) => user.id === req.user.id)

  if (joinedUser) {
    joinedUser.status = 'pending'
  } else {
    joinedUser = {
      id: req.user.id,
      name: req.user.name,
      avatar: req.user.avatar,
      status: 'pending'
    }

    offer.joined.push(joinedUser)
  }
  await req.state.save()
  res.json(offer)
}

exports.cancelHi = async (req, res) => {
  const id = req.body.id
  const state = await req.state.get()
  const offer = state.offers.find(offer => offer.id === id)

  let joinedUser = offer.joined.find((user) => user.id === req.user.id)
  joinedUser.status = 'cancelled'
  await req.state.save()
  res.json(offer)
}

exports.handleJoinRequest = async (req, res) => {
  const offerId = req.body.offerId
  const userId = req.body.userId
  const status = req.body.status
  const state = await req.state.get()
  const offer = state.offers.find(offer => offer.id === offerId)

  if (offer.user.id !== req.user.id) {
    return res.status(403).json({ error: 'handleJoinRequest: can only handle own rides' })
  }

  let joinedUser = offer.joined.find((user) => user.id === userId)
  joinedUser.status = status
  await req.state.save()
  res.json(offer)
}
