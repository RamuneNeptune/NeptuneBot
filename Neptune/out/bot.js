"use strict";
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandBuilder = void 0;
// Import / export modules & variables
exports.SlashCommandBuilder = require('discord.js').SlashCommandBuilder;
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config.json");
const path = require("path");
const fs = require("fs");
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// Create a client for the bot, and set permissions and presence
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.GuildPresences, discord_js_1.GatewayIntentBits.GuildMessageReactions, discord_js_1.GatewayIntentBits.DirectMessages, discord_js_1.GatewayIntentBits.MessageContent],
    presence: { activities: [{ name: 'with logfiles..', type: 0 }], status: 'dnd' } // Set presence
});
module.exports = client; // Export client to be referenced elsewhere 
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// When bot is ready, do the following
client.once(discord_js_1.Events.ClientReady, _ => {
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
client.login(config_json_1.token); // Start bot with token
const yellow = '\x1b[33m'; // Some ANSI color consts for later use
const green = '\x1b[32m'; // Some ANSI color consts for later use
const reset = '\x1b[0m'; // Some ANSI color consts for later use
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// Handle commands
client.commands = new discord_js_1.Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// Listen for log files
client.on('messageCreate', message => {
    if (message.attachments.size > 0) {
        for (const [_, attachment] of message.attachments) {
            if (!attachment.name.startsWith("qmodmanager_log"))
                return; // If the file is not a qmodmanager log, return, else continue
            console.log(yellow + '1/0:' + reset + ' Found valid logfile from ' + green + `"${message.author.username}"` + reset);
            message.react('✅'); // React to logfile message with checkmark (to signify we are processing it)
            console.log(yellow + '2/0:' + reset + ' Reacted to logfile message with' + green + "✅" + reset);
        }
    }
});
// Listen for messages
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.content.startsWith('die'))
        return; // If message starts with "die", continue
    if (!message.member.permissions.has('Administrator')) // If user does has administrator perm, continue
     {
        message.react('❌');
        const msg = yield message.reply("> **Missing Perms for:** `die`"); // Reply to user message
        setTimeout(() => {
            msg.delete();
            message.delete();
        }, 1700); // Delete after 1.7 seconds
        return;
    }
    message.react('✅'); // React to use message
    const msg_ = yield message.reply("> **Executing:** `die`"); // Reply to user message
    setTimeout(() => {
        msg_.delete();
        message.delete();
    }, 1700); // Delete after 1.7 seconds
    setTimeout(() => {
        process.exit();
    }, 3400); // Kill after 3.4 seconds (needs to be delayed quite a bit otherwise it will not delete both messages)
}));
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
