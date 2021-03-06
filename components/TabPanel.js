// Module imports
import PropTypes from 'prop-types'





// Component imports
import Button from './Button'
import Component from './Component'
import Dropdown from './Dropdown'





const Tab = (props) => {
  const {
    active,
    children,
  } = props

  return (
    <div
      className="tab"
      hidden={!active}>
      {children}
    </div>
  )
}





const TabHeader = (props) => {
  const {
    category,
    children,
    selectTab,
  } = props
  const dropdownOptions = []

  return (
    <header className="tab-header">
      {children.map((tab, index) => {
        if (tab) {
          const {
            active,
            title,
          } = tab.props

          const id = tab.props.id || index

          dropdownOptions.push({
            active,
            id,
            title,
          })

          return (
            <Button
              category={category}
              className={active ? 'active' : null}
              key={id}
              label={title}
              onClick={() => selectTab(id)}>
              {title}
            </Button>
          )
        }

        return null
      })}

      <Dropdown
        className="invert"
        onChange={({ id }) => selectTab(id)}
        options={dropdownOptions}
        renderOption={option => option.title}
        renderValue={option => option.title}
        value={dropdownOptions.find(tab => tab.active)} />
    </header>
  )
}





class TabPanel extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _selectTab (tabId) {
    const { onSelect } = this.props

    this.setState({ currentTab: tabId })

    if (onSelect) {
      onSelect(tabId)
    }
  }

  _setTabActiveStatus (tab, index) {
    if (tab) {
      const id = tab.props.id || index

      return {
        ...tab,
        props: {
          ...tab.props,
          active: id === this.state.currentTab,
        },
      }
    }

    return null
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_selectTab',
      '_setTabActiveStatus',
    ])

    this.state = {
      currentTab: props.defaultTab,
    }
  }

  render () {
    const {
      category,
      children,
      className,
    } = this.props
    const tabsWithActiveStatus = children.map(this._setTabActiveStatus)

    return (
      <div className={['tab-panel', className].join(' ')}>
        <TabHeader
          category={category}
          selectTab={this._selectTab}>
          {tabsWithActiveStatus}
        </TabHeader>

        {tabsWithActiveStatus}
      </div>
    )
  }
}





TabPanel.defaultProps = {
  onSelect: null,
}

TabPanel.propTypes = {
  category: PropTypes.string.isRequired,
  defaultTab: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
}





export {
  Tab,
  TabPanel,
}

export default TabPanel
