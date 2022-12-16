



//  ██╗   ██╗ █████╗ ██████╗ ███████╗
//  ██║   ██║██╔══██╗██╔══██╗██╔════╝
//  ██║   ██║███████║██████╔╝███████╗
//  ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║
//   ╚████╔╝ ██║  ██║██║  ██║███████║
//    ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝                                                                                                                                                                                                                                                       

//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// General

var isDebug = "[QModManager:DEBUG]";
var isWrongGame = "A fatal error has occurred. An invalid game version was detected!";
var hasCrash = "Crash!!!";


// Errors

var shaderError = "Desired shader compiler platform 15 is not available in shader blob";
var minimumReqError = "BC7' is not supported on this platform. Decompressing texture. Use 'SystemInfo.SupportsTextureFormat' C# API to check format support";
var qmmError = "An exception occurred while attempting to generate BepInEx PluginInfos: Could not resolve type with token";
var expError = "Savegame from the future!";
var calendarError = "Specified time is not supported in this calendar";


// Arrays

const symlinksArray = ["Unable to open archive file", "System.IO.IOException: Win32 IO returned 409"];
const drmArray = ["Steam DRM Error", "Missing Steam DRM", "Couldn't initialize Steamworks", "Steamworks is not initialized", "InvalidOperationException: Steamworks is not initialized"];
const pirateArray = ["QModManager:INFO] Ahoy, matey! Ye be a pirate!", "steam_api64.cdx", "steam_api64.ini", "steam_emu.ini", "valve.ini", "chuj.cdx", "SteamUserID.cfg", "Achievements.Bin", "steam_settings", "user_steam_id.txt", "account_name.txt", "steam_appid.txt", "STEAMUNLOCKED"];
const vortexArray = ["__folder_managed_by_vortex", "vortex.deployment.json", "vortex.deployment.dinput.json"]
const nitroxArray = ["NitroxLauncher.exe", "NitroxPatcher.dl"]

const steamArray = ["steam_api64", "steam_api64.dll", "Store: Steam"]
const epicArray = [".egstore", "EpicGames", "Epic Games", "Store: Epic"]
const msArray = ["MicrosoftGame.config", "Logo.png", "appxmanifest.xml", "StoreLogo.png"]


// Other

var n = `\n`;
var div = "━━━━━━━━━━━━━━━━━━━━━━━━━━━";


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

module.exports = {

    // General
    isDebug,
    isWrongGame,
    hasCrash,

    // Errors
    shaderError,
    minimumReqError,
    qmmError,
    expError,
    calendarError,

    // Arrays
    symlinksArray,
    drmArray,
    pirateArray,
    vortexArray,
    nitroxArray,

    steamArray,
    epicArray,
    msArray,

    // Other
    n,
    div
}