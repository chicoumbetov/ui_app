const config = require('./selection');
console.log(config.icons.map((icon) => `"${icon.properties.name}"`).join(' | '))
