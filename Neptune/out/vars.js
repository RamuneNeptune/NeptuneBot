"use strict";
//  ██╗   ██╗ █████╗ ██████╗ ███████╗
//  ██║   ██║██╔══██╗██╔══██╗██╔════╝
//  ██║   ██║███████║██████╔╝███████╗
//  ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║
//   ╚████╔╝ ██║  ██║██║  ██║███████║
//    ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝       
Object.defineProperty(exports, "__esModule", { value: true });
exports.Regex_SourceCode = exports.Regex_MissingModJson = exports.Regex_FailedMods = exports.Regex_LoadedMods = exports.Regex_DuplicateMods = exports.Regex_MissingDependencies = exports.Regex_Timestamp = exports.Regex_GameBuild = exports.Regex_SMLHelperBuiltFor = exports.Regex_SMLHelper = exports.Regex_QModManagerBuiltFor = exports.Regex_QModManager = exports.Regex_BZPath = exports.Regex_SNPath = exports.Array_Store_Microsoft = exports.Array_Store_Epic = exports.Array_Store_Steam = exports.Array_Nitrox = exports.Array_Vortex = exports.Array_Pirate = exports.Array_DRM = exports.Array_Symlinks = exports.Error_QMM = exports.Error_Calender = exports.Error_MinimumReq = exports.Error_Shader = exports.General_Crash = exports.General_WrongQMM = exports.General_DebugMode = exports.reset = exports.green = exports.yellow = exports.red = void 0;
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// Colors
exports.red = '\x1b[31m'; // Some ANSI color consts for later use
exports.yellow = '\x1b[33m'; // Some ANSI color consts for later use
exports.green = '\x1b[32m'; // Some ANSI color consts for later use
exports.reset = '\x1b[0m'; // Some ANSI color consts for later use
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// General
exports.General_DebugMode = "[QModManager:DEBUG]"; // Debug mode enabled, causes unnecessary logfile bloat
exports.General_WrongQMM = "A fatal error has occurred. An invalid game version was detected!"; // Likely using SN QMM for BZ (Wrong QMM for game) and vice versa
exports.General_Crash = "Crash!!!"; // The game has crashed at some point during the logfile generation
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// Errors
exports.Error_Shader = "Desired shader compiler platform 15 is not available in shader blob"; // Idk, need to ask desp
exports.Error_MinimumReq = "BC7' is not supported on this platform. Decompressing texture. Use 'SystemInfo.SupportsTextureFormat' C# API to check format support"; // Device does not meet minimum requirements for current game
exports.Error_Calender = "Specified time is not supported in this calendar"; // 
exports.Error_QMM = "An exception occurred while attempting to generate BepInEx PluginInfos: Could not resolve type with token"; // Incorrect version of QMM installed
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// Arrays
exports.Array_Symlinks = ["Unable to open archive file", "System.IO.IOException: Win32 IO returned 409"]; // Needs permissions error quick fix
exports.Array_DRM = ["Steam DRM Error", "Missing Steam DRM", "Couldn't initialize Steamworks", "Steamworks is not initialized", "InvalidOperationException: Steamworks is not initialized"]; // Sneaky DRM issue, requires steam restart
exports.Array_Pirate = ["QModManager:INFO] Ahoy, matey! Ye be a pirate!", "steam_api64.cdx", "steam_api64.ini", "steam_emu.ini", "valve.ini", "chuj.cdx", "SteamUserID.cfg", "Achievements.Bin", "steam_settings", "user_steam_id.txt", "account_name.txt", "STEAMUNLOCKED"]; // Ahoy 'matey! Ye be a pirate!
exports.Array_Vortex = ["__folder_managed_by_vortex", "vortex.deployment.json", "vortex.deployment.dinput.json"]; // Used Vortex Mod Manager before or using currently
exports.Array_Nitrox = ["NitroxLauncher.exe", "NitroxPatcher.dl"]; // Nitrox is installed, typically stops mods loading
exports.Array_Store_Steam = ["steam_api64", "steam_api64.dll", "Store: Steam"]; // User owns game on Steam
exports.Array_Store_Epic = [".egstore", "EpicGames", "Epic Games", "Store: Epic"]; // User owns game on Epic Games 
exports.Array_Store_Microsoft = ["MicrosoftGame.config", "Logo.png", "appxmanifest.xml", "StoreLogo.png"]; // User owns game on Microsoft Store / Xbox App
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
// Regex
exports.Regex_SNPath = (/(?:Discovering subsystems at path\s*)(.*)(?:Subnautica_Data\/UnitySubsystems)/); // Checks for game path, if Subnautica
exports.Regex_BZPath = (/(?:Discovering subsystems at path\s*)(.*)(?:SubnauticaZero_Data\/UnitySubsystems)/); // Checks for game path, if Below Zero
exports.Regex_QModManager = (/(?:Loading QModManager\s*)(v\d+(?:\.\d+)*)/); // Checks if QMM loaded, and then version if found
exports.Regex_QModManagerBuiltFor = (/(?:built for\s*)(.*)(?=\sv)/); // Checks which version installed QMM is built for
exports.Regex_SMLHelper = (/(?:Loading\s*)(v\d+(?:\.\d+)*)/); // Checks if SMLHelper loaded, and then version if found
exports.Regex_SMLHelperBuiltFor = (/(?:\sv\d+(?:\.\d+)*)(?:\sfor\s)(.*)/); // Checks which version installed SMLHelper is built for
exports.Regex_GameBuild = (/(?:Game Version:\s*)(\d+(?:\.\d+)*)/); // Checks for game build version
exports.Regex_Timestamp = (/(?:Today is\s*)(.*)/); // Checks QMMs timestamp
exports.Regex_MissingDependencies = (/(?:is missing these dependencies:\s*)(.*)(?=\n.*:)/g); // Checks QMMs missing dependencies check
exports.Regex_DuplicateMods = (/(?:Found the following duplicate mods:\s*)([\s\S]*?)(?=\n(?!\s*-))/); // Checks QMMs duplicate mods check
exports.Regex_LoadedMods = (/(?:Loaded\s)(\d+)(?:\smods)/); // Checks QMMs loaded mods check
exports.Regex_FailedMods = (/(?:g mods failed during patching:\s*)([\s\S]*?)(?=\n(?!\s*-))/); // Checks QMMs failed mods check
exports.Regex_MissingModJson = (/(?:due to a missing mod.json file:\s*)([\s\S]*?)(?=\n(?!\s*-))/); // Checks QMMs missing mod.json check
exports.Regex_SourceCode = (/(?:\s||)([^-]+)(?:.csproj)/g); // Checks for ".csproj" files
//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//
//  ██╗   ██╗ █████╗ ██████╗ ███████╗
//  ██║   ██║██╔══██╗██╔══██╗██╔════╝
//  ██║   ██║███████║██████╔╝███████╗
//  ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║
//   ╚████╔╝ ██║  ██║██║  ██║███████║
//    ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ 
