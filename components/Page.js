// Module imports
import { bindActionCreators } from 'redux'
import Cookies from 'next-cookies'
import LocalForage from 'localforage'
import React from 'react'
import withRedux from 'next-redux-wrapper'
import fontawesome from '@fortawesome/fontawesome'
import {
  faBars,
  faCheck,
  faCopy,
  faEnvelope,
  faEye,
  faEyeSlash,
  faTimes,
  faExclamationCircle,
  faExclamationTriangle,
  faLock,
  faMapMarker,
  faSpinner,
  faSearch,
  faUser,
} from '@fortawesome/fontawesome-free-solid'
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/fontawesome-free-brands'





// Component imports
import {
  actions,
  initStore,
} from '../store'
import { Router } from '../routes'
import apiService from '../services/api'
import Banner from './Banner'
import Head from './Head'

/* eslint-disable no-unused-expressions */
preval`if (process.env.NODE_ENV === 'production') require('../workers/offline')`
/* eslint-enable */





// Component constants
initStore()





export default (Component, title = 'Untitled', reduxOptions = {}, authenticationRequired = false) => {
  class Page extends React.Component {
    componentWillMount () {
      const {
        accessToken,
        asPath,
      } = this.props

      if (authenticationRequired && !accessToken) {
        return Router.replace(`/login?destination=${encodeURIComponent(asPath)}`)
      }

      if (Component.componentWillMount) {
        Component.componentWillMount()
      }

      return true
    }

    constructor (props) {
      super(props)

      fontawesome.library.add(
        // Solids
        faBars,
        faCheck,
        faCopy,
        faEnvelope,
        faEye,
        faEyeSlash,
        faTimes,
        faExclamationCircle,
        faExclamationTriangle,
        faLock,
        faMapMarker,
        faSpinner,
        faSearch,
        faUser,

        // Brands
        faFacebook,
        faInstagram,
        faTwitter,
      )

      LocalForage.config({
        name: 'Roll for Guild',
        storeName: 'webStore',
      })

      if (props.accessToken) {
        apiService.defaults.headers.common.Authorization = `Bearer ${props.accessToken}`
      }
    }

    static async getInitialProps(ctx) {
      const {
        asPath,
        isServer,
        query,
      } = ctx
      const {
        accessToken,
        userId,
      } = Cookies(ctx)
      let props = {}

      if (accessToken) {
        apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`
      }

      if (typeof Component.getInitialProps === 'function') {
        props = await Component.getInitialProps(ctx)
      }

      return {
        accessToken,
        asPath,
        isServer,
        query,
        userId,
        ...props,
      }
    }

    render () {
      const mainClasses = ['fade-in', 'page', title.toLowerCase().replace(/\s/g, '-')].join(' ')

      return (
        <div role="application">
          <Head title={title} />

          <Banner path={this.props.asPath} />

          <main className={mainClasses}>
            <Component {...this.props} />
          </main>
        </div>
      )
    }
  }

  const { mapStateToProps } = reduxOptions || {}
  let { mapDispatchToProps } = reduxOptions || {}

  if (Array.isArray(mapDispatchToProps)) {
    mapDispatchToProps = dispatch => {
      const actionMap = {}

      for (const actionName of (reduxOptions || {}).mapDispatchToProps) {
        actionMap[actionName] = bindActionCreators(actions[actionName], dispatch)
      }

      return actionMap
    }
  }

  return withRedux(initStore, mapStateToProps, mapDispatchToProps)(Page)
}
