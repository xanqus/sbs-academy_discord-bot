const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('node:fs')
const path = require('node:path')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guildId, token } = require('../config.json')

// command 등록 예시
// const commands = [
//   new SlashCommandBuilder()
//     .setName('pingg')
//     .setDescription('Replies with pong!'),
//   new SlashCommandBuilder()
//     .setName('server')
//     .setDescription('Replies with server info!'),
//   new SlashCommandBuilder()
//     .setName('user')
//     .setDescription('Replies with user info!'),
// ].map(command => command.toJSON())

const commands = []

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)
  commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(token)

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error)
