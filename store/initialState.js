import faker from 'faker'





const characters = []
const classes = [
  'Barbarian',
  'Bard',
  'Cleric',
  'Druid',
  'Fighter',
  'Monk',
  'Paladin',
  'Ranger',
  'Rogue',
  'Sorcerer',
  'Warlock',
  'Wizard',
]
const races = [
  'Dragonborn',
  'Dwarf',
  'Elf',
  'Gnome',
  'Half-Elf',
  'Half-Orc',
  'Halfling',
  'Human',
  'Tiefling',
]
const userId = faker.random.uuid()





const generateCharacter = (id) => {
  id = id || faker.random.uuid()

  return {
    class: classes[Math.ceil(Math.random() * classes.length)],
    level: Math.ceil(Math.random() * 20),
    name: faker.fake('{{name.firstName}} {{name.lastName}}'),
    owner: id,
    race: races[Math.ceil(Math.random() * races.length)],
  }
}





let charactersToGenerate = 20

while (charactersToGenerate-- > 0) {
  characters.push(generateCharacter(charactersToGenerate <= 15 ? userId : null))
}





export default {
  authentication: {
    loggedIn: false,
    loggingIn: false,
    loggingOut: false,
    registering: false,
  },

  characters: {
    characters: characters,
    loaded: false,
    loading: false,
  },

  user: {
    id: userId,
    loaded: false,
    loading: false,
    name: faker.fake('{{name.firstName}} {{name.lastName}}'),
  }
}
