// Module imports
import 'isomorphic-fetch'
import Cookies from 'js-cookie'
import Router from 'next/router'





// Component imports
import actionTypes from '../actionTypes'





export const login = (email, password) => async dispatch => {
  dispatch({ type: actionTypes.LOGIN })

  try {
    const token = Cookies.get('accessToken')

    if (!token) {
      const response = await fetch('/api/login', {
        body: JSON.stringify({
          data: {
            type: 'auth',
            attributes: {
              email,
              password,
            },
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
      })

      const { data } = await response.json()

      await Cookies.set('accessToken', data.attributes.token, { expires: 365 })
    }

    dispatch({
      status: 'success',
      type: actionTypes.LOGIN,
    })

    const searchParams = {}

    /* eslint-disable no-restricted-globals */
    if (location) {
      location.search.replace(/^\?/, '').split('&').forEach(searchParam => {
        const [key, value] = searchParam.split('=')

        searchParams[key] = value
      })
    }
    /* eslint-enable */

    Router.push(searchParams.destination ? searchParams.destination : '/')
  } catch (error) {
    dispatch({
      status: 'error',
      type: actionTypes.LOGIN,
    })
  }
}
