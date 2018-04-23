// Module imports
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'
import Dropdown from './Dropdown'





class GameInput extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _handleChange (value) {
    this.setState({
      value,
      valid: false,
    })

    const { payload, status } = await this.props.getGames(value)

    if (status === 'success') {
      this.setState({ options: payload.data })
    }
  }

  async _handleSelect (value) {
    const { onChange } = this.props

    this.setState({
      value,
      valid: true,
    })

    onChange(value)
  }

  static _renderValue (value) {
    if (typeof value === 'string') {
      return value
    }

    return value.attributes.name
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleChange',
      '_handleSelect',
    ])
    this._debounceMethods(['_handleChange'])

    this.state = {
      value: props.value || props.defaultValue || '',
      options: [],
      valid: false,
    }
  }

  render () {
    const {
      options,
      value,
    } = this.state

    return (
      <Dropdown
        {...this.props}
        onChange={this._handleChange}
        onSelect={this._handleSelect}
        options={options}
        renderOption={GameInput._renderValue}
        renderValue={GameInput._renderValue}
        searchable
        value={value} />
    )
  }





  get renderProps () {
    const newProps = { ...this.props }

    delete newProps.defaultValue
    delete newProps.value

    return newProps
  }

  get valid () {
    return this.state.valid
  }
}





GameInput.defaultProps = {
  defaultValue: undefined,
  onChange: null,
  placeholder: 'Enter a game...',
  value: undefined,
}

GameInput.propTypes = {
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.any,
}





export default GameInput