
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import { isDebug, isWrongGame, hasCrash, shaderError, minimumReqError, qmmError, expError, calendarError, symlinksArray, drmArray, pirateArray, vortexArray, nitroxArray } from './variables';
import { Attachment, Client, EmbedBuilder, Events, GatewayIntentBits, Snowflake, TextChannel } from 'discord.js';
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
    fs.readFile("./logs/" + id + ".txt", 'utf8', (err, data) => {
        if (err) throw err;
        let msg = "";

		function checkArray(arrayToSearch: string[], title: string, description: string) {
			for (var i = 0; i < arrayToSearch.length; i++) {
				if (data.includes(arrayToSearch[i])) {
					embedSN.addFields({ name: title, value: description })
					embedBZ.addFields({ name: title, value: description })
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
		let snPath_bool = checkRegex(/(?:Discovering subsystems at path\s*)(.*)(?:Subnautica_Data\/UnitySubsystems)/);
		if(snPath_bool) { var snPath = (data.match(/(?:Discovering subsystems at path\s*)(.*)(?:Subnautica_Data\/UnitySubsystems)/)[1]); } else { var snPath = "N/A" };

		// BELOW ZERO FILE PATH
		let bzPath_bool = checkRegex(/(?:Discovering subsystems at path\s*)(.*)(?:SubnauticaZero_Data\/UnitySubsystems)/);
		if(bzPath_bool) { var bzPath = (data.match(/(?:Discovering subsystems at path\s*)(.*)(?:SubnauticaZero_Data\/UnitySubsystems)/)[1]); } else { var bzPath = "N/A" };

		// QMODMANAGER VERSION
		let qmm_Bool = checkRegex(/(?:Loading QModManager\s*)(v\d+(?:\.\d+)*)/)
		if(qmm_Bool) { var qmm = (data.match(/(?:Loading QModManager\s*)(v\d+(?:\.\d+)*)/)[1]); } else { var qmm = "N/A" };

		// QMODMANAGER BUILT FOR SUBNAUTICA/BELOWZERO
		let builtFor_bool = checkRegex(/(?:built for\s*)(.*)(?=\sv)/)
		if(builtFor_bool) { var builtFor = (data.match(/(?:built for\s*)(.*)(?=\sv)/)[1]); } else { var builtFor = "N/A" };

		// SMLHELPER VERSION
		let sml_bool = checkRegex(/(?:Loading\s*)(v\d+(?:\.\d+)*)/);
		if(sml_bool) { var sml = (data.match(/(?:Loading\s*)(v\d+(?:\.\d+)*)/)[1]); } else { var sml = "N/A" };

		// SMLHELPER BUILT FOR SUBNAUTICA/BELOWZERO
		let builtForSML_bool = checkRegex(/(?:\sv\d+(?:\.\d+)*)(?:\sfor\s)(.*)/);
		if(builtForSML_bool) { var builtForSML = (data.match(/(?:\sv\d+(?:\.\d+)*)(?:\sfor\s)(.*)/)[1]); } else { var builtForSML = "N/A" };

		// BUILD NUMBER
		let build_bool = checkRegex(/(?:Game Version:\s*)(\d+(?:\.\d+)*)/);
		if(build_bool) { var build = (data.match(/(?:Game Version:\s*)(\d+(?:\.\d+)*)/)[1]); } else { var build = "N/A" };

		// MODS LOADED
		let mods_bool = checkRegex(/(?:Loaded\s)(\d+)(?:\smods)/);
		if(mods_bool) { var mods = (data.match(/(?:Loaded\s)(\d+)(?:\smods)/)[1]); } else { var mods = "N/A" };

		// DATE 
		let date_bool = checkRegex(/(?:Today is\s*)(.*)/);
		if(date_bool) { var date = (data.match(/(?:Today is\s*)(.*)/)[1]); } else { var date = "N/A" };

		// MISSING DEPENDENCIES
		let missingDeps_bool = checkRegex(/(?:is missing these dependencies:\s*)(.*)(?=\n.*:)/g);
		if(missingDeps_bool) { var missingDeps: any = (data.match(/(?:is missing these dependencies:\s*)(.*)(?=\n.*:)/)[1]); missingDeps = [...new Set(missingDeps)]; } else { var missingDeps: any = "N/A" };

		// FAILED MODS
		let failedMods_bool = checkRegex(/(?:g mods failed during patching:\s*)([\s\S]*?)(?=\n(?!\s*-))/);
		if(failedMods_bool) { var failedMods = (data.match(/(?:g mods failed during patching:\s*)([\s\S]*?)(?=\n(?!\s*-))/)[1]); } else { var failedMods = "N/A" };

		// DUPLICATE MODS
		let duplicateMods_bool = checkRegex(/(?:Found the following duplicate mods:\s*)([\s\S]*?)(?=\n(?!\s*-))/);
		if(duplicateMods_bool) { var duplicateMods = (data.match(/(?:Found the following duplicate mods:\s*)([\s\S]*?)(?=\n(?!\s*-))/)[1]); } else { var duplicateMods = "N/A" };

		// MISSING MOD.JSON
		let missinJson_bool = checkRegex(/(?:due to a missing mod.json file:\s*)([\s\S]*?)(?=\n(?!\s*-))/);
		if(missinJson_bool) { var missinJson = (data.match(/(?:due to a missing mod.json file:\s*)([\s\S]*?)(?=\n(?!\s*-))/)[1]); } else { var missinJson = "N/A" };

		// SOURCE CODE
		let sourceCode_bool = checkRegex(/(?:\s*)(.*)(?:\.csproj)/g);
		if(sourceCode_bool) { var sourceCode: any = (data.match(/(?:\s*)(.*)(?:\.csproj)/g)); sourceCode = sourceCode.map(function (x) { return x.replace(/[\|\-\`\.csproj\,]/g, ''); }); } else { var sourceCode: any = "N/A" };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		const embedSN = new EmbedBuilder()
		.setColor('#0099ff')
		.setDescription("`" + snPath + "`")
		.addFields(
			{ name: 'QModManager', value: "```" + qmm + " for " + builtFor + "```", inline: true },
			{ name: 'SMLHelper', value: "```" + sml  + " for " + builtForSML + "```", inline: true },
			{ name: 'Information', value: "```" + date +  `\n` + "Subnautica " + build+ `\n` + mods + " mods loaded" + "```" },
		)
		.setFooter({ text: `${username}`, iconURL: avatarURL ? `${avatarURL}` : null })


		const embedBZ = new EmbedBuilder()
		.setColor('#0099ff')
		.setDescription("`" + bzPath + "`")
		.addFields(
			{ name: 'QModManager', value: "```" + qmm + " for " + builtFor + "```", inline: true },
			{ name: 'SMLHelper', value: "```" + sml  + " for " + builtForSML + "```", inline: true },
			{ name: 'Information', value: "```" + date +  `\n` + "Below Zero " + build+ `\n` + mods + " mods loaded" + "```" },
		)
		.setFooter({ text: `${username}`, iconURL: avatarURL ? `${avatarURL}` : null })

		const embedPR = new EmbedBuilder()
		.setColor('#ff0000')
		.setTitle(`🏴‍☠️ Ahoy, matey! 🏴‍☠️`)
		.setDescription('**Unfortunately helping pirates is against our** <#324207672293326848>!' + `\n` + `\n` + "Buy the game if you'd like support with modding" + `\n` + "You can use https://isthereanydeal.com/ to find discounts")
		.setFooter({ text: `${username}` + ", welcome to the pirate club!", iconURL: avatarURL ? `${avatarURL}` : null })
		

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		checkString(isWrongGame, "Probably using wrong QMM for game\n");
		checkString(qmmError, "Probably using wrong QMM version (or playing exp)\n");
		checkString(isDebug, "Please disable debug logs in Options > Mods > QModManager\n");
		checkString(calendarError, "Calendar error, try changing your system date to a gregorian based date\n");
		checkString(shaderError, "Shader error, desperationfighter didn't explain the fix for this\n");
		checkString(minimumReqError, "Minimum system requirements for the game not met\n");
		checkString(expError, "Loaded a savegame from experimental\n");
		checkString(hasCrash, "Log contains a crash\n");

        if(msg != "") {
			embedSN.addFields({ name: 'Issues Found', value: "```" + msg + "```" })
			embedBZ.addFields({ name: 'Issues Found', value: "```" + msg + "```" })
		}
		if(missingDeps != "N/A") {
			embedSN.addFields({ name: 'Missing Dependencies', value: "```" + missingDeps + ` ` + "```" })
			embedBZ.addFields({ name: 'Missing Dependencies', value: "```" + missingDeps + ` ` + "```" })
		}
		if(missinJson != "N/A") {
			embedSN.addFields({ name: 'Missing mod.json', value: "```" + missinJson + "```" })
			embedBZ.addFields({ name: 'Missing mod.json', value: "```" + missinJson + "```" })
		}
		if(duplicateMods != "N/A") {
			embedSN.addFields({ name: 'Duplicate Mods', value: "```" + duplicateMods + "```" })
			embedBZ.addFields({ name: 'Duplicate Mods', value: "```" + duplicateMods + "```" })
		}
		if(sourceCode != "N/A") {
			embedSN.addFields({ name: 'Source Code', value: "```" + sourceCode + "```" })
			embedBZ.addFields({ name: 'Source Code', value: "```" + sourceCode + "```" })
		}
		if(failedMods != "N/A") {
			embedSN.addFields({ name: 'Failed to load', value: "```" + failedMods + "```" })
			embedBZ.addFields({ name: 'Failed to load', value: "```" + failedMods + "```" })
		}

		checkArray(vortexArray, '❔ Using Vortex', 'This user is using Vortex, or has used it previously');
		checkArray(nitroxArray, '❔ Using Nitrox', 'This user has Nitrox installed, keep in mind this causes most mods to not work as intended');
		checkArray(drmArray, "❗ Couldn't initialize Steamworks", 'Open Steam, at the top left click `Steam`, then click `Exit`');
		checkArray(symlinksArray, "❗ Symlinks error", "Follow the instructions here:" + `\n` + "https://discord.com/channels/324207629784186882/902967502110343198/1035866881862672485");
		// TODO: Not quite sure what was intended here as checkPirateArray only takes 1 argument, think this change is right
		checkArray(pirateArray, "🏴‍☠️ This game is pirated 🏴‍☠️", " Buy the game if you want support with modding the game" + `\n` + "You can use https://isthereanydeal.com/ to find discounts");

		setTimeout(() => {
			const channel = client.channels.cache.get(channelId) as TextChannel;

			if (checkPirateArray(pirateArray)) {
				channel.send({ embeds: [embedPR] });
			} else if (snPath != "N/A") {
				channel.send({ embeds: [embedSN] });
			} else if (bzPath != "N/A") {
				channel.send({ embeds: [embedBZ] });
			}
			
			fs.unlinkSync("./logs/" + id + ".txt");
			console.log("Finished & deleted logfile" + '\n');
		}, 1250);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	}
)};     // The end of the function!
