// Module imports
import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { orderBy } from 'lodash'




// Component imports
import Component from './Component'




// Component constants
const invalidTypeMessages = {
  email: 'Not a valid email address',
  url: 'Not a valid URL',
}





class ValidatedInput extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleBlur (event) {
    const { onBlur } = this.props

    this._handleInteraction()

    if (onBlur) {
      onBlur(event)
    }
  }

  _handleInput (event) {
    const { onInput } = this.props

    this._handleInteraction()

    if (onInput) {
      onInput(event)
    }
  }

  _handleInteraction () {
    const { hasBeenFocused } = this.state

    if (!hasBeenFocused) {
      this.setState({ hasBeenFocused: true })
    }
  }

  _validate (messages = []) {
    const {
      badInput,
      patternMismatch,
      tooLong,
      tooShort,
      typeMismatch,
      valid,
      valueMissing,
    } = this._el.validity

    if (!valid) {
      if (badInput || typeMismatch) {
        const defaultMessage = invalidTypeMessages[this._el.type] || `Doesn't match field type (${this._el.type})`

        messages.push({
          icon: 'exclamation-triangle',
          message: this._el.getAttribute('data-badinput-explainer') || defaultMessage,
        })
      }

      if (patternMismatch) {
        const message = this._el.getAttribute('data-pattern-explainer')

        if (message) {
          messages.push({
            icon: 'exclamation-triangle',
            message,
          })
        }
      }

      if (tooLong) {
        messages.push({
          icon: 'exclamation-triangle',
          message: this._el.getAttribute('data-maxlength-explainer') || `Must be fewer than ${this._el.getAttribute('maxlength')} characters`,
        })
      }

      if (tooShort) {
        messages.push({
          icon: 'exclamation-triangle',
          message: this._el.getAttribute('data-minlength-explainer') || `Must be longer than ${this._el.getAttribute('minlength')} characters`,
        })
      }

      if (valueMissing) {
        messages.push({
          icon: 'exclamation-triangle',
          message: this._el.getAttribute('data-required-explainer') || 'This field is required',
        })
      }
    }

    this.setState({ messages: orderBy(messages, ['priority'], ['desc']) })

    if (this.props.onValidate) {
      this.props.onValidate({
        type: 'validate',
        target: this._el,
      })
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    this._validate()
  }

  componentDidUpdate (prevProps) {
    let comparedProps = [
      'pattern',
      'value',
      'required',
      'type',
      'minLength',
      'maxLength',
    ]

    comparedProps = comparedProps.map(fieldName => this.props[fieldName] === prevProps[fieldName])

    if (comparedProps.includes(false)) {
      this._validate()
    }
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleBlur',
      '_handleInput',
    ])
    this._debounceMethods(['_validate'])

    this.state = {
      hasBeenFocused: false,
      messages: [],
    }
  }

  render () {
    const classNames = [
      'validated-input',
      (this.props.className || ''),
    ]

    return (
      <div className={classNames.join(' ')}>
        <input {...this.renderProps} />

        {this.renderMessages()}
      </div>
    )
  }

  renderMessages () {
    const {
      hasBeenFocused,
      messages,
    } = this.state

    if (hasBeenFocused) {
      return (
        <React.Fragment>
          <FontAwesomeIcon className="validity-indicator" icon="exclamation-triangle" fixedWidth />

          <ul className="messages">
            {messages.map(({ icon, message, type }) => (
              <li key={message} className={`${type || 'error'} message`}>
                <FontAwesomeIcon icon={icon} fixedWidth />
                {message}
              </li>
            ))}
          </ul>
        </React.Fragment>
      )
    }

    return null
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get renderProps () {
    const renderProps = {
      ...this.props,
      onBlur: this._handleBlur,
      onInput: this._handleInput,
      ref: _el => this._el = _el,
    }

    delete renderProps.onValidate
    delete renderProps.className

    return renderProps
  }
}





export default ValidatedInput
