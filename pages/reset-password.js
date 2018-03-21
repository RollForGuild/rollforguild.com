// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import Component from '../components/Component'
import Form from '../components/Form'
import Link from '../components/Link'
import Page from '../components/Page'
import PasswordInput from '../components/PasswordInput'
import ValidatedInput from '../components/ValidatedInput'





// Component constants
const title = 'Reset Password'





class Login extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleChange ({ target }) {
    this.setState({ [target.name]: target.value })
  }

  async _onSubmit (event) {
    const {
      password,
      token,
    } = this.state

    event.preventDefault()

    this.setState({ resetting: true })

    const result = await this.props.resetPassword(password, token)

    this.setState({
      resetting: false,
      status: result.status,
    })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleChange',
      '_onSubmit',
    ])

    this.state = {
      password: '',
      resetting: false,
      status: null,
      token: props.query.token || '',
    }
  }

  render () {
    const {
      password,
      resetting,
      status,
      token,
    } = this.state

    return (
      <React.Fragment>
        <header>
          <h1>Reset Password</h1>
        </header>

        {(status === 'success') && (
          <p><span aria-label="Key emoji" role="img">🗝</span> Your password has been reset! Now take your newly minted key and go <Link action="exit::login" category="Authentication" label="Reset Password" route="/login"><a>login</a></Link>!</p>
        )}

        {['error', null].includes(status) && (
          <Form
            category="Authentication"
            label="Reset Password"
            onSubmit={this._onSubmit}>
            {!this.props.query.token && (
              <fieldset>
                <div className="input-group">
                  <label htmlFor="token">
                    <FontAwesomeIcon icon="key" fixedWidth />
                  </label>

                  <ValidatedInput
                    aria-label="Reset token"
                    disabled={resetting}
                    id="token"
                    name="token"
                    onChange={this._handleChange}
                    placeholder="Reset Token"
                    type="token"
                    value={token} />
                </div>
              </fieldset>
            )}

            <fieldset>
              <div className="input-group">
                <label htmlFor="password">
                  <FontAwesomeIcon icon="user" fixedWidth />
                </label>

                <PasswordInput
                  aria-label="Password"
                  disabled={resetting}
                  id="password"
                  name="password"
                  onChange={this._handleChange}
                  placeholder="New Password"
                  showWarnings
                  showSuggestions
                  showStrength
                  value={password} />
              </div>
            </fieldset>

            <menu type="toolbar">
              <div className="primary">
                <button
                  className="success"
                  disabled={resetting}
                  type="submit">
                  {resetting ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              <div className="secondary">
                <Link
                  action="exit::login"
                  category="Authentication"
                  label="Reset Password"
                  route="/login">
                  <a className="button link">
                    Return to Login
                  </a>
                </Link>
              </div>
            </menu>

            {(status === 'error') && (
              <React.Fragment>
                <p>There seems to have been an error while trying to reset your password. Please try again or <a href="mailto:support@rollforguild.com">contact support</a>.</p>
              </React.Fragment>
            )}
          </Form>
        )}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['resetPassword']

const mapStateToProps = state => ({ ...state.authentication })





export default Page(Login, title, {
  mapStateToProps,
  mapDispatchToProps,
})