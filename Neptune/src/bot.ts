

//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Import / export modules & variables

import { Client, EmbedBuilder, Message, Events, GatewayIntentBits, TextChannel, Collection } from 'discord.js';
import { token } from './config.json';
const typescript = require('typescript');

import { /*-------------- Colors --------------*/  red, yellow, green, reset,
         /*-------------- General -------------*/  General_DebugMode, General_WrongQMM, General_Crash,
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

import path = require('node:path');
import fs = require('node:fs');


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Create a client for the bot, and set permissions and presence

const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent ], // Set perms
    presence: { activities: [{ name: 'with logfiles',  type: 0 }], status: 'dnd' } // Set presence
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


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Listen for log files

client.on('messageCreate', async (message: any) => {
    if (message.attachments.size > 0) {
        for (const [_, attachment] of message.attachments) {
            if (!attachment.name.startsWith("qmodmanager_log")) return; // If the file is not a qmodmanager log, return, else continue

            const replyEmbed = new EmbedBuilder();
            replyEmbed.setColor('#e5c40f')
            .setTitle('Your logfile is being processed..')

            console.log(yellow + '1/7:' + reset + ' Found valid logfile from ' + green + `"${message.author.username}"` + reset); // Log to console 
            const msg: Message = await message.reply({ embeds: [replyEmbed] }) // Reply to user message with an embed
            console.log(yellow + '2/7:' + reset + ' Replied to logfile message'); // Log to console 

            download(attachment.url, attachment.id).then(() => { // Download the logfile
                console.log(yellow + '4/7:' + reset + ' Successfully downloaded logfile as ' + green + `"` + attachment.id + `"` + reset); // Yay it worked, log to console
            });

            setTimeout(() => { // Wait 1 second then check the downloaded logfile
                checkLogfile(attachment.id, msg, message.author.username, message.author.avatarURL({ size: 128, extension: 'png' })); // BREACH THE MAINFRAME
            }, 1000);
        }
    }
});


// Listen for message

client.on('messageCreate', async (message: any) => {
    if(!message.content.startsWith('die')) return; // If message starts with "die", continue
    if(!message.member.permissions.has('Administrator'))  // If user does has administrator perm, continue
    { 
        message.react('❌');  // User does not have admin perms, react accordingly
        return; 
    } 
    message.react('✅'); // User does have admin perms, react accordingly

    setTimeout(() => {
        message.delete();
    }, 500); // Delete after 0.5 seconds

    setTimeout(() => {
        process.exit();
    }, 1000); // Kill after 1.0 seconds 
});


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Function to download the logfile using it's attachment.url

import { get } from 'https';
import { existsSync, mkdirSync, createWriteStream } from "fs";

function download(url: string, id: string) {
    return new Promise((resolve, reject) => {
        if (!existsSync('./logs')) {
            mkdirSync('./logs');
        }
        console.log(yellow + '3/7:' + reset + ' Downloading logfile as ' + green + `"` + id + `"` + reset);

        get(url, (result) => {
            result.on("error", (err) => {
            console.error(err);
            reject(err);
        });
        const stream = result.pipe(createWriteStream("./logs/" + id + ".txt"));
        stream.on('finish', () => {
            resolve(id);
        });
    });
});
}


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Function to check the downloaded logfile

function checkLogfile(id: any, message: Message, username: string, avatarURL: string) {  
    fs.readFile(`./logs/${id}.txt`, 'utf8', (err, data) => {
        if (err) console.log(err);
        let msg = "";

        // Check an array for a match in the logfile
		function checkArray(arrayToSearch: string[], title: string, description: string) {
			for (let i = 0; i < arrayToSearch.length; i++) {
				if (data.includes(arrayToSearch[i])) {
					embed.addFields({ name: title, value: description })
					break;
				}
			}
		}

        // Checks the pirate array for a match in the logfile
		function checkPirateArray(arrayToSearch: string[]) {
			for (let i = 0; i < arrayToSearch.length; i++) {
				if (data.includes(arrayToSearch[i])) {
					return true;
				}
			}
		}

        // Checks a string for a match in the logfile
		function checkString(stringToSearch: string, outputIfFound: string) {
			if (data.includes(stringToSearch)) {
				msg += outputIfFound;
			}
		}

        // Checks a regex string for a match (or matches) in the logfile
		function checkRegex(regex: RegExp) {
			if (data.match(regex)) {
				return true;
			} else {
				return false;
			}
		}

        // General Info Regex
        const SNPath = checkRegex(Regex_SNPath) ? data.match(Regex_SNPath)[1] : "N/A";
        const BZPath = checkRegex(Regex_BZPath) ? data.match(Regex_BZPath)[1] : "N/A";
        const Timestamp = checkRegex(Regex_Timestamp) ? data.match(Regex_Timestamp)[1] : "N/A";
        const GameBuild = checkRegex(Regex_GameBuild) ? data.match(Regex_GameBuild)[1] : "N/A";

        // QModManager & SMLHelper Regex
        const QMM = checkRegex(Regex_QModManager) ? data.match(Regex_QModManager)[1] : "N/A";
        const QMMBuiltFor = checkRegex(Regex_QModManagerBuiltFor) ? data.match(Regex_QModManagerBuiltFor)[1] : "N/A";
        const SML = checkRegex(Regex_SMLHelper) ? data.match(Regex_SMLHelper)[1] : "N/A";
        const SMLBuiltFor = checkRegex(Regex_SMLHelperBuiltFor) ? data.match(Regex_SMLHelperBuiltFor)[1] : "N/A";

        // Error Regex
        const ModsLoaded = checkRegex(Regex_LoadedMods) ? data.match(Regex_LoadedMods)[1] : "N/A";
        const MissingDeps = checkRegex(Regex_MissingDependencies) ? data.match(Regex_MissingDependencies)[1] : "N/A";
        const FailedMods = checkRegex(Regex_FailedMods) ? data.match(Regex_FailedMods)[1] : "N/A";
        const DuplicateMods = checkRegex(Regex_DuplicateMods) ? data.match(Regex_DuplicateMods)[1] : "N/A";
        const SourceMods = checkRegex(Regex_SourceCode) ? data.match(Regex_SourceCode).filter(mod => mod !== ',' && mod !== ' ' && mod !== '`').join('`\n') : "N/A";
        const MissingJson = checkRegex(Regex_MissingModJson) ? data.match(Regex_MissingModJson)[1] : "N/A";

        
        // Write our embeds to send to the user once the logfile is processed
		const embed = new EmbedBuilder();
		if (checkPirateArray(Array_Pirate)) { // Embed to send if the user is a pirate
			embed.setColor('#ff0000')
				.setTitle("🏴‍☠️ Ahoy, matey! Yer game be pirated! 🏴‍☠️")
				.setFooter({ text: `${username}, welcome to the pirate club!`, iconURL: avatarURL ? avatarURL : null })
				.addFields({name: "", value: " Buy the game if you want support with modding it\nYou can use https://isthereanydeal.com/ to find discounts"});

		} else { // Embed to send if the user is seemingly legit
			embed.setColor('#0099ff')
				.setFooter({ text: username, iconURL: avatarURL ? avatarURL : null })
				.addFields(
					{ name: 'QModManager', value: `\`\`\`${QMM} for ${QMMBuiltFor}\`\`\``, inline: true },
					{ name: 'SMLHelper', value: `\`\`\`${SML} for ${SMLBuiltFor}\`\`\``, inline: true }
				);


            // If a path for Subnautica is found, we append it to the embed description
			if (SNPath != "N/A") {
				embed.setDescription(`\`${SNPath}\``)
					.addFields({ name: 'Information', value: `\`\`\`${Timestamp}\nSubnautica ${GameBuild}\n${ModsLoaded} mods loaded\`\`\`` });

            // If a path for Below Zero is found, we append it to the embed description
			} else if (BZPath != "N/A") { 
				embed.setDescription(`\`${BZPath}\``)
					.addFields({ name: 'Information', value: `\`\`\`${Timestamp}\nBelow Zero ${GameBuild}\n${ModsLoaded} mods loaded\`\`\`` });

            // If no path is found, we append "Path to game N/A" to the embed description
			}else {
                embed.setDescription(`Path to game N/A`)
            }


            if (MissingDeps != "N/A") { // If missing dependencies are found, we add them in a list as a field to the embed
				embed.addFields({ name: 'Missing Dependencies', value: `\`\`\`${MissingDeps}\`\`\`` });
			}
			if (MissingJson != "N/A") { // If missing mod.json's are found, we add them in a list as a field to the embed
				embed.addFields({ name: 'Missing mod.json', value: `\`\`\`${MissingJson}\`\`\`` });
			}
			if (DuplicateMods != "N/A") { // If duplicate mods are found, we add them in a list as a field to the embed
				embed.addFields({ name: 'Duplicate Mods', value: `\`\`\`${DuplicateMods}\`\`\`` });
			}
			if (SourceMods != "N/A") { // If source code files are found, we add them in a list as a field to the embed
				embed.addFields({ name: 'Source Code', value: `\`\`\`${SourceMods}\`\`\`` });
			}
			if (FailedMods != "N/A") { // If mods that failed to load are found, we add them in a list as a field to the embed
				embed.addFields({ name: 'Failed to load', value: `\`\`\`${FailedMods}\`\`\`` });
			}
        }


        setTimeout(() => {
			message.edit({ embeds: [embed] });
			fs.unlinkSync('./logs/' + id + '.txt');
            console.log(yellow + '6/7:' + reset + ' Finished processing logfile'); // Log to console 
            console.log(yellow + '7/7:' + reset + ' All tasks complete' + `\n` + green + `⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻` + reset + `\n`); // Log to console 
		}, 1400);
    });
}