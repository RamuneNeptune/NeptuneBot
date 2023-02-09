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
// Import / export modules & variables
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config.json");
const typescript = require('typescript');
const vars_1 = require("./vars");
const fs = require("node:fs");
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// Create a client for the bot, and set permissions and presence
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages, discord_js_1.GatewayIntentBits.GuildPresences, discord_js_1.GatewayIntentBits.GuildMessageReactions, discord_js_1.GatewayIntentBits.DirectMessages, discord_js_1.GatewayIntentBits.MessageContent],
    presence: { activities: [{ name: 'with logfiles', type: 0 }], status: 'dnd' } // Set presence
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
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// Listen for log files
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.attachments.size > 0) {
        for (const [_, attachment] of message.attachments) {
            if (!attachment.name.startsWith("qmodmanager_log"))
                return; // If the file is not a qmodmanager log, return, else continue
            const replyEmbed = new discord_js_1.EmbedBuilder();
            replyEmbed.setColor('#ff0000')
                .setTitle('Your logfile is being processed..');
            console.log(vars_1.yellow + '1/7:' + vars_1.reset + ' Found valid logfile from ' + vars_1.green + `"${message.author.username}"` + vars_1.reset); // Log to console 
            const msg = yield message.reply({ embeds: [replyEmbed] }); // Reply to user message with an embed
            console.log(vars_1.yellow + '2/7:' + vars_1.reset + ' Replied to logfile message'); // Log to console 
            download(attachment.url, attachment.id).then(() => {
                console.log(vars_1.yellow + '4/7:' + vars_1.reset + ' Successfully downloaded logfile as ' + vars_1.green + `"` + attachment.id + `"` + vars_1.reset); // Yay it worked, log to console
            });
            setTimeout(() => {
                checkLogfile(attachment.id, msg, message.author.username, message.author.avatarURL({ size: 128, extension: 'png' })); // BREACH THE MAINFRAME
            }, 1000);
        }
    }
}));
// Listen for message
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (!message.content.startsWith('die'))
        return; // If message starts with "die", continue
    if (!message.member.permissions.has('Administrator')) // If user does has administrator perm, continue
     {
        message.react('❌'); // User does not have admin perms, react accordingly
        return;
    }
    message.react('✅'); // User does have admin perms, react accordingly
    setTimeout(() => {
        message.delete();
    }, 500); // Delete after 0.5 seconds
    setTimeout(() => {
        process.exit();
    }, 1000); // Kill after 1.0 seconds 
}));
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// Function to download the logfile using it's attachment.url
const https_1 = require("https");
const fs_1 = require("fs");
function download(url, id) {
    return new Promise((resolve, reject) => {
        if (!(0, fs_1.existsSync)('./logs')) {
            (0, fs_1.mkdirSync)('./logs');
        }
        console.log(vars_1.yellow + '3/7:' + vars_1.reset + ' Downloading logfile as ' + vars_1.green + `"` + id + `"` + vars_1.reset);
        (0, https_1.get)(url, (result) => {
            result.on("error", (err) => {
                console.error(err);
                reject(err);
            });
            const stream = result.pipe((0, fs_1.createWriteStream)("./logs/" + id + ".txt"));
            stream.on('finish', () => {
                resolve(id);
            });
        });
    });
}
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// Function to check the downloaded logfile
function checkLogfile(id, message, username, avatarURL) {
    fs.readFile(`./logs/${id}.txt`, 'utf8', (err, data) => {
        if (err)
            console.log(err);
        let msg = "";
        // Check an array for a match in the logfile
        function checkArray(arrayToSearch, title, description) {
            for (let i = 0; i < arrayToSearch.length; i++) {
                if (data.includes(arrayToSearch[i])) {
                    embed.addFields({ name: title, value: description });
                    break;
                }
            }
        }
        // Checks the pirate array for a match in the logfile
        function checkPirateArray(arrayToSearch) {
            for (let i = 0; i < arrayToSearch.length; i++) {
                if (data.includes(arrayToSearch[i])) {
                    return true;
                }
            }
        }
        // Checks a string for a match in the logfile
        function checkString(stringToSearch, outputIfFound) {
            if (data.includes(stringToSearch)) {
                msg += outputIfFound;
            }
        }
        // Checks a regex string for a match (or matches) in the logfile
        function checkRegex(regex) {
            if (data.match(regex)) {
                return true;
            }
            else {
                return false;
            }
        }
        // General Info Regex
        const SNPath = checkRegex(vars_1.Regex_SNPath) ? data.match(vars_1.Regex_SNPath)[1] : "N/A";
        const BZPath = checkRegex(vars_1.Regex_BZPath) ? data.match(vars_1.Regex_BZPath)[1] : "N/A";
        const Timestamp = checkRegex(vars_1.Regex_Timestamp) ? data.match(vars_1.Regex_Timestamp)[1] : "N/A";
        const GameBuild = checkRegex(vars_1.Regex_GameBuild) ? data.match(vars_1.Regex_GameBuild)[1] : "N/A";
        // QModManager & SMLHelper Regex
        const QMM = checkRegex(vars_1.Regex_QModManager) ? data.match(vars_1.Regex_QModManager)[1] : "N/A";
        const QMMBuiltFor = checkRegex(vars_1.Regex_QModManagerBuiltFor) ? data.match(vars_1.Regex_QModManagerBuiltFor)[1] : "N/A";
        const SML = checkRegex(vars_1.Regex_SMLHelper) ? data.match(vars_1.Regex_SMLHelper)[1] : "N/A";
        const SMLBuiltFor = checkRegex(vars_1.Regex_SMLHelperBuiltFor) ? data.match(vars_1.Regex_SMLHelperBuiltFor)[1] : "N/A";
        // Error Regex
        const ModsLoaded = checkRegex(vars_1.Regex_LoadedMods) ? data.match(vars_1.Regex_LoadedMods)[1] : "N/A";
        const MissingDeps = checkRegex(vars_1.Regex_MissingDependencies) ? data.match(vars_1.Regex_MissingDependencies)[1] : "N/A";
        const FailedMods = checkRegex(vars_1.Regex_FailedMods) ? data.match(vars_1.Regex_FailedMods)[1] : "N/A";
        const DuplicateMods = checkRegex(vars_1.Regex_DuplicateMods) ? data.match(vars_1.Regex_DuplicateMods)[1] : "N/A";
        const SourceMods = checkRegex(vars_1.Regex_SourceCode) ? data.match(vars_1.Regex_SourceCode).filter(mod => mod !== ',' && mod !== ' ' && mod !== '`').join('`\n') : "N/A";
        const MissingJson = checkRegex(vars_1.Regex_MissingModJson) ? data.match(vars_1.Regex_MissingModJson)[1] : "N/A";
        // Write our embeds to send to the user once the logfile is processed
        const embed = new discord_js_1.EmbedBuilder();
        if (checkPirateArray(vars_1.Array_Pirate)) { // Embed to send if the user is a pirate
            embed.setColor('#ff0000')
                .setTitle("🏴‍☠️ Ahoy, matey! Yer game be pirated! 🏴‍☠️")
                .setFooter({ text: `${username}, welcome to the pirate club!`, iconURL: avatarURL ? avatarURL : null })
                .addFields({ name: "", value: " Buy the game if you want support with modding it\nYou can use https://isthereanydeal.com/ to find discounts" });
        }
        else { // Embed to send if the user is seemingly legit
            embed.setColor('#0099ff')
                .setFooter({ text: username, iconURL: avatarURL ? avatarURL : null })
                .addFields({ name: 'QModManager', value: `\`\`\`${QMM} for ${QMMBuiltFor}\`\`\``, inline: true }, { name: 'SMLHelper', value: `\`\`\`${SML} for ${SMLBuiltFor}\`\`\``, inline: true });
            // If a path for Subnautica is found, we append it to the embed description
            if (SNPath != "N/A") {
                embed.setDescription(`\`${SNPath}\``)
                    .addFields({ name: 'Information', value: `\`\`\`${Timestamp}\nSubnautica ${GameBuild}\n${ModsLoaded} mods loaded\`\`\`` });
                // If a path for Below Zero is found, we append it to the embed description
            }
            else if (BZPath != "N/A") {
                embed.setDescription(`\`${BZPath}\``)
                    .addFields({ name: 'Information', value: `\`\`\`${Timestamp}\nBelow Zero ${GameBuild}\n${ModsLoaded} mods loaded\`\`\`` });
                // If no path is found, we append "Path to game N/A" to the embed description
            }
            else {
                embed.setDescription(`Path to game N/A`);
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
            message.edit('⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻');
            message.edit({ embeds: [embed] });
            fs.unlinkSync('./logs/' + id + '.txt');
            console.log(vars_1.yellow + '6/7:' + vars_1.reset + ' Finished processing logfile'); // Log to console 
            console.log(vars_1.yellow + '7/7:' + vars_1.reset + ' All tasks complete' + `\n` + vars_1.green + `⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻` + vars_1.reset + `\n`); // Log to console 
        }, 1400);
    });
}
