import React from 'react'
import App from 'components/App'
import { shallow, mount } from 'enzyme'
import api from 'lib/api'
import state from 'lib/state'
import { CSRF_TOKEN } from 'lib/env'
import { sleep } from '../utils'

describe('App', () => {
  it('renders', () => {
    shallow(<App api={api()} state={state()} />)
  })

  it('can fetch current state', async () => {
    const fixture = {
      user: { token: 'foo', id: 'foo', name: 'foo', avatar: 'foo.png' },
      offers: [
        { id: '123', user: { id: 'foo', name: 'foo', avatar: 'foo.png' }, status: 'created', joined: [], vehicle: 'car', date: '2019-05-05', price: '1' },
        { id: '456', user: { id: 'foo', name: 'foo', avatar: 'foo.png' }, status: 'created', joined: [], vehicle: 'car', date: '2019-05-05', price: '1' }
      ]
    }
    const $ = mount(<App api={api({ user: fixture.user })} state={state({ user: fixture.user })} />)
    const app = $.instance()
    expect(app.state.data.offers).toEqual([])
    expect($.find('.offer-item').length).toEqual(0)
    app.api.mockFetch(fixture)
    await app.state.queries.getState()
    $.update()
    expect(app.state.data.offers).toEqual(fixture.offers)
    expect($.find('.offer-item').length).toEqual(fixture.offers.length)
    $.unmount()
  })
})

describe('header nav', () => {
  let $, app, navIcons

  beforeAll(() => {
    $ = mount(<App api={api()} state={state()} />)
    app = $.instance()
    navIcons = $.find('.header-nav .icon')
  })

  afterAll(() => $.unmount())

  it('should default to "offers"', () => {
    expect(app.state.data.ui.screen).toEqual('offers')
    expect(navIcons.at(0).html()).toContain('active')
    expect(navIcons.at(1).html()).not.toContain('active')
  })

  it('should change to "requests" by mousedown on its icon', async () => {
    navIcons.at(1).simulate('mousedown')
    await sleep(10)
    $.update()
    expect(app.state.data.ui.screen).toEqual('requests')
    expect(navIcons.at(0).html()).not.toContain('active')
    expect(navIcons.at(1).html()).toContain('active')
  })

  it('should change to "offers" by touchstart on its icon', async () => {
    navIcons.at(0).simulate('touchstart')
    await sleep(10)
    $.update()
    expect(app.state.data.ui.screen).toEqual('offers')
    expect(navIcons.at(0).html()).toContain('active')
    expect(navIcons.at(1).html()).not.toContain('active')
  })
})

describe('user menu', () => {
  let $, app, userAvatar

  const fixture = {
    user: {
      token: 'foo',
      id: '123',
      name: 'foo',
      avatar: 'foo.png'
    }
  }

  beforeAll(() => {
    $ = mount(<App api={api()} state={state({ user: fixture.user })} />)
    app = $.instance()
    userAvatar = $.find('span.user-avatar')
  })

  afterAll(() => $.unmount())

  it('should show user menu when clicking on avatar', async () => {
    expect(app.state.data.ui.showUserMenu).toEqual(false)
    await sleep(500)
    userAvatar.simulate('touchstart')
    expect(app.state.data.ui.showUserMenu).toEqual(true)
  })
})

describe('facebook login', () => {
  const fixture = {
    user: {
      token: 'foo',
      id: '123',
      name: 'foo',
      avatar: 'foo.png'
    }
  }

  let $, app

  beforeAll(() => {
    $ = mount(<App api={api({ user: null })} state={state({ user: null })} />)
    app = $.instance()
  })

  afterAll(() => $.unmount())

  let loginButton

  it('user is null', () => {
    expect(app.state.data.user).toEqual(null)
  })

  it('user is presented with a login button', () => {
    loginButton = $.find('.login-button')
    expect(loginButton.length).toEqual(1)
  })

  it('user clicks on login button', async () => {
    window.open = jest.fn()
    loginButton.simulate('click')
    expect(window.open).toHaveBeenCalledTimes(1)
  })

  it('receives login data from redirect page and logs in user', async () => {
    expect($.find('.login-button').length).toEqual(1)
    app.api.mockFetch(fixture.user)
    window.postMessage({
      source: 'login',
      payload: `?state=${CSRF_TOKEN}&code=bar`
    }, '*')
    await sleep(10)
    $.update()
    expect($.find('.login-button').length).toEqual(0)
    expect(app.state.data.user).toEqual(fixture.user)
  })
})

describe('offers', () => {
  const fixture = {
    user: {
      token: 'foo',
      id: '123',
      name: 'foo',
      avatar: 'foo.png'
    },
    offers: [
      {
        user: {
          id: '456',
          name: 'bar',
          avatar: '/bar.png'
        },
        id: '2018-11-11/0930/chania/rethimno/amaxi',
        date: '2018-11-11',
        time: '09:30',
        departure: 'chania',
        arrival: 'rethimno',
        status: 'created',
        joined: [],
        capacity: 3,
        vehicle: 'amaxi',
        price: '2 euro'
      }
    ],
    offerToPost: {
      date: '2018-11-11',
      time: '10:30',
      departure: 'lasithi',
      arrival: 'iraklio',
      capacity: 2,
      vehicle: 'amaxi',
      price: '1 euro'
    }
  }

  let $, app

  beforeAll(() => {
    $ = mount(<App api={api({ user: fixture.user })} state={state({ user: fixture.user })} />)
    app = $.instance()
  })

  afterAll(() => $.unmount())

  it('should populate offers list on init', async () => {
    expect($.find('.offers').length).toEqual(0)
    app.api.mockFetch({ offers: fixture.offers })
    await app.state.queries.getState()
    $.update()
    expect($.find('.offer-item').length).toEqual(1)
  })

  it('should handle input changes', () => {
    expect($.find('form input[name="departure"]').instance().value).toEqual('')
    $.find('form input[name="departure"]').simulate('change', {
      target: {
        name: 'departure',
        value: 'chania'
      }
    })
    expect($.find('form input[name="departure"]').instance().value).toEqual('chania')
  })

  it('submitting a new offer should add it to the list', async () => {
    const mockFetch = {
      id: '123',
      user: fixture.user,
      status: 'created',
      joined: [],
      ...fixture.offerToPost
    }

    const mockOffer = fixture.offerToPost

    app.api.mockFetch((path, req) => {
      expect(JSON.parse(req.body)).toEqual(mockOffer)
      return mockFetch
    })

    for (const key in mockOffer) {
      $.find(`form input[name="${key}"]`).simulate('change', {
        target: {
          name: key,
          value: mockOffer[key]
        }
      })
    }

    $.find('form').simulate('submit')

    await sleep(10)
    $.update()
    const offerItems = $.find('.offer-item')
    expect(offerItems.length).toEqual(2)
    expect(offerItems.at(0).text()).toContain(fixture.offers[0].departure)
    expect(offerItems.at(0).text()).toContain(fixture.offers[0].arrival)
    expect(offerItems.at(1).text()).toContain(mockOffer.departure)
    expect(offerItems.at(1).text()).toContain(mockOffer.arrival)
    expect(app.state.data.offers.length).toEqual(2)
    expect(app.state.data.offers[0]).toEqual(fixture.offers[0])
    expect(app.state.data.offers[1]).toEqual(mockFetch)
    expect(app.state.data.offers[0].user).toEqual(fixture.offers[0].user)
    expect(app.state.data.offers[1].user).toEqual(fixture.user)
  })
})
