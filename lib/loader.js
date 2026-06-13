const fs = require('fs');
const path = require('path');

function loadCommands() {
  const commands = new Map();
  const base = path.join(__dirname, '..', 'commands');

  function walk(dir) {
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (item.endsWith('.js')) {
        delete require.cache[require.resolve(full)];
        const cmd = require(full);
        if (cmd?.name && typeof cmd.run === 'function') commands.set(cmd.name, cmd);
      }
    }
  }

  walk(base);
  return commands;
}

module.exports = { loadCommands };
