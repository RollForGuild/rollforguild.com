// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Switch from 'rc-switch'





// Component imports
import { Router } from '../../routes'
import AddressInput from '../../components/AddressInput'
import Button from '../../components/Button'
import Component from '../../components/Component'
import connect from '../../helpers/connect'
import convertStringToSlug from '../../helpers/convertStringToSlug'
import EditorHelpDialog from '../../components/EditorHelpDialog'
import Form from '../../components/Form'
import Main from '../../components/Main'
import PageHeader from '../../components/PageHeader'
import PageTitle from '../../components/PageTitle'
import ValidatedInput from '../../components/ValidatedInput'





// Component constants
const title = 'Create a Group'





class CreateGroup extends Component {
  /***************************************************************************\
    Properties
  \***************************************************************************/

  state = {
    address: '',
    description: '',
    discoverable: true,
    displayEditorHelp: false,
    name: '',
    slug: '',
    submitting: false,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  static _filterDropdownOptions = (options, value) => {
    const regex = new RegExp(`${value}.*`, 'gi')

    return options.filter(option => regex.test(option))
  }

  _handleSubmit = async (event) => {
    const { createGroup } = this.props
    const {
      address,
      description,
      discoverable,
      name,
      slug,
    } = this.state

    event.preventDefault()

    this.setState({ submitting: true })

    const { payload } = await createGroup({
      address: address.formatted_address,
      description,
      discoverable,
      name,
      slug: slug || convertStringToSlug(name),
    })
    const {
      id,
    } = payload.data

    if (id) {
      return Router.pushRoute('group profile', { id })
    }

    return this.setState({ submitting: false })
  }

  _isValid = () => {
    const {
      address,
      name,
    } = this.state

    if (!address || !name) {
      return false
    }

    return true
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const {
      address,
      description,
      discoverable,
      displayEditorHelp,
      name,
      slug,
      submitting,
    } = this.state

    return (
      <React.Fragment>
        <PageTitle>{title}</PageTitle>

        <PageHeader>
          <h1>{title}</h1>
        </PageHeader>

        <Main title={title}>
          <Form
            action="create"
            category="Groups"
            label="New Group"
            onSubmit={this._handleSubmit}>
            <fieldset>
              <label htmlFor="group-name">
                Group name
              </label>

              <ValidatedInput
                disabled={submitting}
                id="group-name"
                onChange={({ target }) => this.setState({ name: target.value })}
                pattern="[\w\s_-]+"
                placeholder="Quigley's Tavern"
                required
                type="text"
                value={name} />
            </fieldset>

            <fieldset>
              <label htmlFor="permalink">Permalink</label>

              <div className="input-group">
                <label htmlFor="permalink">
                  https://rollforguild.com/groups/
                </label>

                <ValidatedInput
                  disabled={submitting}
                  id="permalink"
                  onChange={({ target }) => this.setState({ slug: convertStringToSlug(target.value) })}
                  pattern="(\w|-)*"
                  placeholder={convertStringToSlug(name)}
                  type="text"
                  value={slug} />
              </div>
            </fieldset>

            <fieldset>
              <label htmlFor="group-description">
                Group description
              </label>

              <textarea
                aria-describedby="group-description"
                disabled={submitting}
                id="group-description"
                maxLength={1000}
                onChange={({ target }) => this.setState({ description: target.value })}
                placeholder="Tell your members what you'll be playing, or maybe a bit about your GM style."
                value={description} />

              <small>
                <Button
                  category="Groups"
                  className="inline link"
                  label="Markdown Help"
                  onClick={() => this.setState({ displayEditorHelp: true })}>
                  <FontAwesomeIcon fixedWidth icon="pencil-alt" /> Styling with Markdown is supported.
                </Button>
              </small>
            </fieldset>

            <fieldset>
              <label htmlFor="address">
                Where will you be playing?
              </label>

              <AddressInput
                disabled={submitting}
                id="address"
                onChange={value => this.setState({ address: value })}
                required
                value={address} />
            </fieldset>

            <fieldset className="horizontal">
              <label htmlFor="discoverable">
                Should your group show up in searches?
              </label>

              <Switch
                disabled={submitting}
                checked={discoverable}
                id="discoverable"
                onChange={isChecked => this.setState({ discoverable: isChecked })} />
            </fieldset>

            <menu type="toolbar">
              <div className="primary">
                <button
                  className="success"
                  disabled={submitting || !this._isValid()}>
                  Create
                </button>
              </div>
            </menu>
          </Form>
        </Main>

        {displayEditorHelp && (
          <EditorHelpDialog
            data-t="thread-comment-form:editor-help"
            onClose={() => this.setState({ displayEditorHelp: false })} />
        )}
      </React.Fragment>
    )
  }





  /***************************************************************************\
    Redux Maps
  \***************************************************************************/

  static mapDispatchToProps = ['createGroup']
}





export default connect(CreateGroup)
