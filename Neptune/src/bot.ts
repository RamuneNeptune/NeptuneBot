

//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Import / export modules & variables
export const { SlashCommandBuilder } = require('discord.js');
import { Client, EmbedBuilder, Message, Events, GatewayIntentBits, TextChannel, Collection } from 'discord.js';
import { token } from './config.json';
import { /*-------------- General -------------*/  General_DebugMode, General_WrongQMM, General_Crash,
         /*-------------- Errors --------------*/  Error_Shader, Error_MinimumReq, Error_Calender, Error_QMM,
         /*-------------- Arrays --------------*/  Array_Symlinks, Array_DRM, Array_Pirate, Array_Vortex, Array_Nitrox, Array_Store_Steam, Array_Store_Epic, Array_Store_Microsoft,

         /*------------- Regex: Game Paths ------------*/  Regex_SNPath, Regex_BZPath,
         /*------------- Regex: QModManager -----------*/  Regex_QModManager, Regex_QModManagerBuiltFor,
         /*------------- Regex: SMLHelper -------------*/  Regex_SMLHelper, Regex_SMLHelperBuiltFor,
         /*------------- Regex: General Info ----------*/  Regex_GameBuild, Regex_Timestamp,
         /*------------- Regex: Mising Dependencies ---*/  Regex_MissingDependencies, Regex_MissingModJson,
         /*------------- Regex: Loaded/Failed Mods ----*/  Regex_LoadedMods, Regex_FailedMods, 
         /*------------- Regex: Duplicates & Source ---*/  Regex_DuplicateMods, Regex_SourceCode, 
        } from './vars';

import path = require('path');
import fs = require('fs');

interface ExtraProperties {
    commands: Collection<unknown, any>
}

declare module 'discord.js' {
    interface Client extends ExtraProperties {}
}


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Create a client for the bot, and set permissions and presence

const client = new Client({
	intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent ], // Set perms
	presence: { activities: [{ name: 'with logfiles..',  type: 0 }], status: 'dnd' } // Set presence
});
module.exports = client; // Export client to be referenced elsewhere 


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// When bot is ready, do the following

client.once(Events.ClientReady, _ => {
	console.clear(); // Clear console
	console.log(`\x1b[32m%s\x1b[0m`, // Log "IM AWAKE" to console
	`  
	 ██╗███╗   ███╗     █████╗ ██╗    ██╗ █████╗ ██╗  ██╗███████╗
	 ██║████╗ ████║    ██╔══██╗██║    ██║██╔══██╗██║ ██╔╝██╔════╝
	 ██║██╔████╔██║    ███████║██║ █╗ ██║███████║█████╔╝ █████╗  
	 ██║██║╚██╔╝██║    ██╔══██║██║███╗██║██╔══██║██╔═██╗ ██╔══╝  
	 ██║██║ ╚═╝ ██║    ██║  ██║╚███╔███╔╝██║  ██║██║  ██╗███████╗
	 ╚═╝╚═╝     ╚═╝    ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝` + `\n`);
console.log(`\x1b[34m%s\x1b[0m`, `▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃` + `\n`);
});
client.login(token); // Start bot with token

const yellow = '\x1b[33m'; // Some ANSI color consts for later use
const green = '\x1b[32m'; // Some ANSI color consts for later use
const reset = '\x1b[0m'; // Some ANSI color consts for later use


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Handle commands

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Listen for log files

client.on('messageCreate', message => {
	if (message.attachments.size > 0) {
		for (const [_, attachment] of message.attachments) {
			if (!attachment.name.startsWith("qmodmanager_log")) return; // If the file is not a qmodmanager log, return, else continue

            console.log(yellow + '1/0:' + reset + ' Found valid logfile from ' + green + `"${message.author.username}"` + reset); 

            message.react('✅'); // React to logfile message with checkmark (to signify we are processing it)

            console.log(yellow + '2/0:' + reset + ' Reacted to logfile message with' + green + "✅" + reset); 
		}
	}
});


// Listen for messages

client.on('messageCreate', async message => {
    if(!message.content.startsWith('die')) return; // If message starts with "die", continue
    if(!message.member.permissions.has('Administrator'))  // If user does has administrator perm, continue
    { 
        message.react('❌'); 
        const msg: Message = await message.reply("> **Missing Perms for:** `die`") // Reply to user message
        setTimeout(() => {
            msg.delete();
            message.delete();
        }, 1700); // Delete after 1.7 seconds
        return; 
    } 

    message.react('✅'); // React to use message
    const msg_: Message = await message.reply("> **Executing:** `die`") // Reply to user message

    setTimeout(() => {
        msg_.delete();
        message.delete();
    }, 1700); // Delete after 1.7 seconds

    setTimeout(() => {
        process.exit();
    }, 3400); // Kill after 3.4 seconds (needs to be delayed quite a bit otherwise it will not delete both messages)
});


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
