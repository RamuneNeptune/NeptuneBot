
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { isDebug, isWrongGame, hasCrash, shaderError, minimumReqError, qmmError, expError, calendarError, symlinksArray, drmArray, pirateArray, vortexArray, nitroxArray } from './variables';
import { Client, EmbedBuilder, Events, GatewayIntentBits, Snowflake, TextChannel } from 'discord.js';
import { download } from './functions';
import { token } from './config.json';

import * as fs from 'fs';

const client = new Client({
	intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent ],
	presence: { activities: [{ name: "Doing stuff..",  type: 0 }], status: 'dnd' } 
});

module.exports = client;

//  Log to console on startup
client.once(Events.ClientReady, _ => {
	 console.clear(); 
	 console.log(`\x1b[32m%s\x1b[0m`, 
	 `  
	 ██╗███╗   ███╗     █████╗ ██╗    ██╗ █████╗ ██╗  ██╗███████╗
	 ██║████╗ ████║    ██╔══██╗██║    ██║██╔══██╗██║ ██╔╝██╔════╝
	 ██║██╔████╔██║    ███████║██║ █╗ ██║███████║█████╔╝ █████╗  
	 ██║██║╚██╔╝██║    ██╔══██║██║███╗██║██╔══██║██╔═██╗ ██╔══╝  
	 ██║██║ ╚═╝ ██║    ██║  ██║╚███╔███╔╝██║  ██║██║  ██╗███████╗
	 ╚═╝╚═╝     ╚═╝    ╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝` + `\n`);
console.log(`\x1b[34m%s\x1b[0m`, `▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃` + `\n`);
});
client.login(token);




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Listen for log files
client.on('messageCreate', message => {
	if (message.attachments.size > 0) {
		for (let [_, attachment] of message.attachments) {
			if (attachment.name.startsWith("qmodmanager_log") || attachment.name.startsWith("LogOutput")) {

				download(attachment.url, attachment.id);

				setTimeout(() => {
					checkLog(attachment.id, message.channelId, message.author.username, message.author.avatarURL({ size: 128, extension: 'png' }));
				}, 1000);

			} else {
				return;
			}
		}
	}
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////









//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// KEEP IN MIND THIS IS THE START OF THE FUNCTION, EVERYTHING AFTER THIS IS INSIDE THE FUNCTION
function checkLog(id: Snowflake, channelId: Snowflake, username: string, avatarURL: string) {
    fs.readFile(`./logs/${id}.txt`, 'utf8', (err, data) => {
        if (err) throw err;
        let msg = "";

		function checkArray(arrayToSearch: string[], title: string, description: string) {
			for (var i = 0; i < arrayToSearch.length; i++) {
				if (data.includes(arrayToSearch[i])) {
					embed.addFields({ name: title, value: description })
					break;
				}
			}
		}

		function checkPirateArray(arrayToSearch: string[]) {
			for (var i = 0; i < arrayToSearch.length; i++) {
				if (data.includes(arrayToSearch[i])) {
					return true;
				}
			}
		}

		function checkString(stringToSearch: string, outputIfFound: string) {
			if (data.includes(stringToSearch)) {
				msg += outputIfFound;
			}
		}

		function checkRegex(regex: RegExp) {
			if (data.match(regex)) {
				return true;
			} else {
				return false;
			}
		}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// SUBNAUTICA FILE PATH
		const snPath_bool = checkRegex(/(?:Discovering subsystems at path\s*)(.*)(?:Subnautica_Data\/UnitySubsystems)/);
		const snPath = snPath_bool ? data.match(/(?:Discovering subsystems at path\s*)(.*)(?:Subnautica_Data\/UnitySubsystems)/)[1] : "N/A";

		// BELOW ZERO FILE PATH
		const bzPath_bool = checkRegex(/(?:Discovering subsystems at path\s*)(.*)(?:SubnauticaZero_Data\/UnitySubsystems)/);
		const bzPath = bzPath_bool ? data.match(/(?:Discovering subsystems at path\s*)(.*)(?:SubnauticaZero_Data\/UnitySubsystems)/)[1] : "N/A"

		// QMODMANAGER VERSION
		const qmm_Bool = checkRegex(/(?:Loading QModManager\s*)(v\d+(?:\.\d+)*)/)
		const qmm = qmm_Bool ? data.match(/(?:Loading QModManager\s*)(v\d+(?:\.\d+)*)/)[1] : "N/A";

		// QMODMANAGER BUILT FOR SUBNAUTICA/BELOWZERO
		const builtFor_bool = checkRegex(/(?:built for\s*)(.*)(?=\sv)/)
		const builtFor = builtFor_bool ? data.match(/(?:built for\s*)(.*)(?=\sv)/)[1] : "N/A";

		// SMLHELPER VERSION
		const sml_bool = checkRegex(/(?:Loading\s*)(v\d+(?:\.\d+)*)/);
		const sml = sml_bool ? data.match(/(?:Loading\s*)(v\d+(?:\.\d+)*)/)[1] : "N/A";

		// SMLHELPER BUILT FOR SUBNAUTICA/BELOWZERO
		const builtForSML_bool = checkRegex(/(?:\sv\d+(?:\.\d+)*)(?:\sfor\s)(.*)/);
		const builtForSML = builtForSML_bool ? data.match(/(?:\sv\d+(?:\.\d+)*)(?:\sfor\s)(.*)/)[1] : "N/A";

		// BUILD NUMBER
		const build_bool = checkRegex(/(?:Game Version:\s*)(\d+(?:\.\d+)*)/);
		const build = build_bool ? data.match(/(?:Game Version:\s*)(\d+(?:\.\d+)*)/)[1] : "N/A";

		// MODS LOADED
		const mods_bool = checkRegex(/(?:Loaded\s)(\d+)(?:\smods)/);
		const mods = mods_bool ? data.match(/(?:Loaded\s)(\d+)(?:\smods)/)[1] : "N/A";

		// DATE
		const date_bool = checkRegex(/(?:Today is\s*)(.*)/);
		const date = date_bool ? data.match(/(?:Today is\s*)(.*)/)[1] : "N/A";

		// MISSING DEPENDENCIES
		const missingDeps_bool = checkRegex(/(?:is missing these dependencies:\s*)(.*)(?=\n.*:)/g);
		const missingDeps = missingDeps_bool ? [...new Set(data.match(/(?:is missing these dependencies:\s*)(.*)(?=\n.*:)/)[1])] : "N/A";

		// FAILED MODS
		const failedMods_bool = checkRegex(/(?:g mods failed during patching:\s*)([\s\S]*?)(?=\n(?!\s*-))/);
		const failedMods = failedMods_bool ? data.match(/(?:g mods failed during patching:\s*)([\s\S]*?)(?=\n(?!\s*-))/)[1] : "N/A";

		// DUPLICATE MODS
		const duplicateMods_bool = checkRegex(/(?:Found the following duplicate mods:\s*)([\s\S]*?)(?=\n(?!\s*-))/);
		const duplicateMods = duplicateMods_bool ? data.match(/(?:Found the following duplicate mods:\s*)([\s\S]*?)(?=\n(?!\s*-))/)[1] : "N/A";

		// MISSING MOD.JSON
		const missinJson_bool = checkRegex(/(?:due to a missing mod.json file:\s*)([\s\S]*?)(?=\n(?!\s*-))/);
		const missinJson = missinJson_bool ? data.match(/(?:due to a missing mod.json file:\s*)([\s\S]*?)(?=\n(?!\s*-))/)[1] : "N/A";

		// SOURCE CODE
		const sourceCode_bool = checkRegex(/(?:\s*)(.*)(?:\.csproj)/g);
		const sourceCode = sourceCode_bool ? data.match(/(?:\s*)(.*)(?:\.csproj)/g).map((x) => x.replace(/[\|\-\`\.csproj\,]/g, '')) : "N/A";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		const embed = new EmbedBuilder();
		if (checkPirateArray(pirateArray)) {
			embed.setColor('#ff0000')
				.setTitle("🏴‍☠️ Ahoy, matey! 🏴‍☠️")
				.setDescription("**Unfortunately helping pirates is against our** <#324207672293326848>!\n\nBuy the game if you'd like support with modding\nYou can use https://isthereanydeal.com/ to find discounts")
				.setFooter({ text: `${username}, welcome to the pirate club!`, iconURL: avatarURL ? avatarURL : null })
				.addFields({name: "🏴‍☠️ This game is pirated 🏴‍☠️", value: " Buy the game if you want support with modding the game\nYou can use https://isthereanydeal.com/ to find discounts"});
		} else { // Non-pirate embed info
			embed.setColor('#0099ff')
				.setFooter({ text: username, iconURL: avatarURL ? avatarURL : null })
				.addFields(
					{ name: 'QModManager', value: `\`\`\`${qmm} for ${builtFor}\`\`\``, inline: true },
					{ name: 'SMLHelper', value: `\`\`\`${sml} for ${builtForSML}\`\`\``, inline: true }
				);

			if (snPath != "N/A") {
				embed.setDescription(`\`${snPath}\``)
					.addFields({ name: 'Information', value: `\`\`\`${date}\nSubnautica ${build}\n${mods} mods loaded\`\`\`` });
			} else if (bzPath != "N/A") {
				embed.setDescription(`\`${bzPath}\``)
					.addFields({ name: 'Information', value: `\`\`\`${date}\nBelow Zero ${build}\n${mods} mods loaded\`\`\`` });
			}

			checkString(isWrongGame, "Probably using wrong QMM for game\n");
			checkString(qmmError, "Probably using wrong QMM version (or playing exp)\n");
			checkString(isDebug, "Please disable debug logs in Options > Mods > QModManager\n");
			checkString(calendarError, "Calendar error, try changing your system date to a gregorian based date\n");
			checkString(shaderError, "Shader error, desperationfighter didn't explain the fix for this\n");
			checkString(minimumReqError, "Minimum system requirements for the game not met\n");
			checkString(expError, "Loaded a savegame from experimental\n");
			checkString(hasCrash, "Log contains a crash\n");
	
			if (msg != "") {
				embed.addFields({ name: 'Issues Found', value: `\`\`\`${msg}\`\`\`` });
			}
			if (missingDeps != "N/A") {
				embed.addFields({ name: 'Missing Dependencies', value: `\`\`\`${missingDeps}\`\`\`` });
			}
			if (missinJson != "N/A") {
				embed.addFields({ name: 'Missing mod.json', value: `\`\`\`${missinJson}\`\`\`` });
			}
			if (duplicateMods != "N/A") {
				embed.addFields({ name: 'Duplicate Mods', value: `\`\`\`${duplicateMods}\`\`\`` });
			}
			if (sourceCode != "N/A") {
				embed.addFields({ name: 'Source Code', value: `\`\`\`${sourceCode}\`\`\`` });
			}
			if (failedMods != "N/A") {
				embed.addFields({ name: 'Failed to load', value: `\`\`\`${failedMods}\`\`\`` });
			}
	
			checkArray(vortexArray, '❔ Using Vortex', 'This user is using Vortex, or has used it previously');
			checkArray(nitroxArray, '❔ Using Nitrox', 'This user has Nitrox installed, keep in mind this causes most mods to not work as intended');
			checkArray(drmArray, "❗ Couldn't initialize Steamworks", 'Open Steam, at the top left click `Steam`, then click `Exit`');
			checkArray(symlinksArray, "❗ Symlinks error", "Follow the instructions here:\nhttps://discord.com/channels/324207629784186882/902967502110343198/1035866881862672485");
		} // End of non-pirate embed

		setTimeout(() => {
			const channel = client.channels.cache.get(channelId) as TextChannel;
			channel.send({ embeds: [embed] });
			
			fs.unlinkSync("./logs/" + id + ".txt");
			console.log("Finished & deleted logfile" + '\n');
		}, 1250);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	}
)};     // The end of the function!
