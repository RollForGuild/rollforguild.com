// Module imports
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'
import { pushTrackableEventToDataLayer } from '../helpers'





// Component constants
const gaEventProps = ['action', 'category', 'label', 'value']





class TrackableComponent extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _fireEvent () {
    const eventData = {}

    for (const key of gaEventProps) {
      const value = this.props[key]
      const propName = key.split('').reduce((accumulator, character, index) => `${accumulator}${index === 0 ? character.toUpperCase() : character}`, 'event')

      if (value) {
        eventData[propName] = value
      }
    }

    pushTrackableEventToDataLayer(eventData)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_fireEvent'])
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get renderProps () {
    const renderProps = {}

    for (const [key, value] of Object.entries(this.props)) {
      if (!gaEventProps.includes(key)) {
        renderProps[key] = value
      }
    }

    return renderProps
  }
}





TrackableComponent.defaultProps = { value: null }

// We have to disable react/no-unused-prop-types here because these props are
// used, just not in a way that ESLint can recognize.
/* eslint-disable react/no-unused-prop-types */
TrackableComponent.propTypes = {
  action: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
}
/* eslint-enable */





export default TrackableComponent
