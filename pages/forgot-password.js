// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import activateZenDesk from '../helpers/activateZenDesk'
import Button from '../components/Button'
import Component from '../components/Component'
import connect from '../helpers/connect'
import Form from '../components/Form'
import Link from '../components/Link'
import Main from '../components/Main'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import ValidatedInput from '../components/ValidatedInput'





// Component constants
const title = 'Forgot Password'





class Login extends Component {
  /***************************************************************************\
    Properties
  \***************************************************************************/

  state = {
    email: '',
    requestingReset: false,
    status: null,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleChange = ({ target }) => {
    this.setState({ email: target.value })
  }

  _onSubmit = async event => {
    const { email } = this.state

    event.preventDefault()

    this.setState({ requestingReset: true })

    const result = await this.props.requestPasswordReset(email)

    this.setState({
      requestingReset: false,
      status: result.status,
    })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const {
      email,
      loggingIn,
      requestingReset,
      status,
    } = this.state

    return (
      <React.Fragment>
        <PageTitle>{title}</PageTitle>

        <PageHeader>
          <h1>{title}</h1>
        </PageHeader>

        <Main title={title}>
          {(status === 'success') && (
            <p><span aria-label="Sparkle emoji" role="img">✨</span> Victory is nigh! <span aria-label="Sparkle emoji" role="img">✨</span> Keep an eye on your inbox for a password reset email.</p>
          )}

          {(['error', null].includes(status)) && (
            <Form
              action="reset-password"
              category="Authentication"
              label="Password Reset"
              onSubmit={this._onSubmit}>
              <p><span aria-label="Castle emoji" role="img">🏰</span> Alas, traveller, we've all forgotten the keys to the castle on occasion. Enter your email address and a courier will arrive shortly with the information you need.</p>

              <fieldset>
                <div className="input-group">
                  <label htmlFor="email">
                    <FontAwesomeIcon icon="user" fixedWidth />
                  </label>

                  <ValidatedInput
                    aria-label="Email"
                    disabled={loggingIn}
                    id="email"
                    name="email"
                    onChange={this._handleChange}
                    placeholder="Email"
                    required
                    type="email"
                    value={email} />
                </div>
              </fieldset>

              <menu type="toolbar">
                <div className="primary">
                  <button
                    className="success"
                    disabled={requestingReset}
                    type="submit">
                    Submit
                  </button>
                </div>

                <div className="secondary">
                  <Link
                    action="exit::login"
                    category="Authentication"
                    label="Password Reset"
                    route="/login">
                    <a className="button link">
                      Return to Login
                    </a>
                  </Link>
                </div>
              </menu>

              {(status === 'error') && (
                <React.Fragment>
                  <p>There seems to have been an error when trying to reset your password. Please try again or <Button category="Forgot Password" className="inline link" label="Support" onClick={activateZenDesk}>contact support</Button>.</p>
                </React.Fragment>
              )}
            </Form>
          )}
        </Main>
      </React.Fragment>
    )
  }

  /***************************************************************************\
    Redux Maps
  \***************************************************************************/

  static mapDispatchToProps = ['requestPasswordReset']
}





export default connect(Login)
