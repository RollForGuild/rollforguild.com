// Module imports
import React from 'react'
import Stepzilla from 'react-stepzilla'





// Component imports
import AbilityScoreEditor from '../components/AbilityScoreEditor'
import ClassChooser from '../components/ClassChooser'
import Component from '../components/Component'
import Page from '../components/Page'
import RaceChooser from '../components/RaceChooser'





// Component constants
const title = 'Character Builder'





class CharacterBuilder extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  static _getBaseAbilityScores (ruleset) {
    if (ruleset) {
      const abilityScores = ruleset['player-characters']['ability-scores']

      /* eslint-disable no-param-reassign */
      return Object.keys(abilityScores).reduce((accumulator, abilityScore) => ({
        ...accumulator,
        [abilityScore]: abilityScores[abilityScore].base,
      }), {})
      /* eslint-enable */
    }

    return null
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidUpdate () {
    console.group('Character updated:')
    console.log(this.state)
    console.groupEnd()
  }

  async componentDidMount () {
    if (!this.props.ruleset) {
      this.setState({ loading: true })
      await this.props.getRuleset('dnd-5e')
      this.setState({ loading: false })
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.ruleset) {
      if (!this.state['ability-scores']) {
        this.setState({ 'ability-scores': CharacterBuilder._getBaseAbilityScores(nextProps.ruleset) })
      }
    }
  }

  constructor (props) {
    super(props)

    this._bindMethods(['_handleChange'])

    this.state = {
      'ability-scores': CharacterBuilder._getBaseAbilityScores(props.ruleset),
      class: null,
      loading: true,
      race: null,
      subrace: null,
    }
  }

  render () {
    const { ruleset } = this.props

    if (!this.state.loading) {
      return (
        <Stepzilla
          steps={[
            {
              name: 'Choose your race...',
              component: <RaceChooser
                onRaceChange={(value) => this.setState({ race: value })}
                onSubraceChange={(value) => this.setState({ subrace: value })}
                race={this.state.race}
                subrace={this.state.subrace} />,
            },
            {
              name: 'Choose your class...',
              component: <ClassChooser
                onChange={(value) => this.setState({ class: value })}
                class={this.state.class} />,
            },
            {
              name: 'Determine your ability scores...',
              component: <AbilityScoreEditor
                abilities={ruleset['player-characters']['ability-scores']}
                onChange={(ability, score) => this.setState({ 'ability-scores': { ...this.state['ability-scores'], [ability]: score } })}
                character={this.state} />,
            },
          ]} />
      )
    }

    return (<div>Loading...</div>)
  }
}





const mapDispatchToProps = ['createCharacter', 'getRuleset']

const mapStateToProps = state => ({ ruleset: state.rulesets['dnd-5e'] || null })





export default Page(CharacterBuilder, title, {
  mapDispatchToProps,
  mapStateToProps,
})
