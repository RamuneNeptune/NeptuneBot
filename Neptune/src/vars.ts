

//  ██╗   ██╗ █████╗ ██████╗ ███████╗
//  ██║   ██║██╔══██╗██╔══██╗██╔════╝
//  ██║   ██║███████║██████╔╝███████╗
//  ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║
//   ╚████╔╝ ██║  ██║██║  ██║███████║
//    ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝       


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//


// Colors

export const red = '\x1b[31m'; // Some ANSI color consts for later use
export const yellow = '\x1b[33m'; // Some ANSI color consts for later use
export const green = '\x1b[32m'; // Some ANSI color consts for later use
export const reset = '\x1b[0m'; // Some ANSI color consts for later use

//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// General
 
export const General_DebugMode = "[QModManager:DEBUG]"; // Debug mode enabled, causes unnecessary logfile bloat
export const General_WrongQMM = "A fatal error has occurred. An invalid game version was detected!"; // Likely using SN QMM for BZ (Wrong QMM for game) and vice versa
export const General_Crash = "Crash!!!"; // The game has crashed at some point during the logfile generation


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Errors

export const Error_Shader = "Desired shader compiler platform 15 is not available in shader blob"; // Idk, need to ask desp
export const Error_MinimumReq = "BC7' is not supported on this platform. Decompressing texture. Use 'SystemInfo.SupportsTextureFormat' C# API to check format support"; // Device does not meet minimum requirements for current game
export const Error_Calender = "Specified time is not supported in this calendar"; // 
export const Error_QMM = "An exception occurred while attempting to generate BepInEx PluginInfos: Could not resolve type with token"; // Incorrect version of QMM installed


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Arrays

export const Array_Symlinks = ["Unable to open archive file", "System.IO.IOException: Win32 IO returned 409"]; // Needs permissions error quick fix
export const Array_DRM = ["Steam DRM Error", "Missing Steam DRM", "Couldn't initialize Steamworks", "Steamworks is not initialized", "InvalidOperationException: Steamworks is not initialized"]; // Sneaky DRM issue, requires steam restart
export const Array_Pirate = ["QModManager:INFO] Ahoy, matey! Ye be a pirate!", "steam_api64.cdx", "steam_api64.ini", "steam_emu.ini", "valve.ini", "chuj.cdx", "SteamUserID.cfg", "Achievements.Bin", "steam_settings", "user_steam_id.txt", "account_name.txt", "STEAMUNLOCKED"]; // Ahoy 'matey! Ye be a pirate!
export const Array_Vortex = ["__folder_managed_by_vortex", "vortex.deployment.json", "vortex.deployment.dinput.json"] // Used Vortex Mod Manager before or using currently
export const Array_Nitrox = ["NitroxLauncher.exe", "NitroxPatcher.dl"] // Nitrox is installed, typically stops mods loading

export const Array_Store_Steam = ["steam_api64", "steam_api64.dll", "Store: Steam"] // User owns game on Steam
export const Array_Store_Epic = [".egstore", "EpicGames", "Epic Games", "Store: Epic"] // User owns game on Epic Games 
export const Array_Store_Microsoft = ["MicrosoftGame.config", "Logo.png", "appxmanifest.xml", "StoreLogo.png"] // User owns game on Microsoft Store / Xbox App


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//

// Regex

export const Regex_SNPath = (/(?:Discovering subsystems at path\s*)(.*)(?:Subnautica_Data\/UnitySubsystems)/); // Checks for game path, if Subnautica
export const Regex_BZPath = (/(?:Discovering subsystems at path\s*)(.*)(?:SubnauticaZero_Data\/UnitySubsystems)/); // Checks for game path, if Below Zero

export const Regex_QModManager = (/(?:Loading QModManager\s*)(v\d+(?:\.\d+)*)/); // Checks if QMM loaded, and then version if found
export const Regex_QModManagerBuiltFor = (/(?:built for\s*)(.*)(?=\sv)/); // Checks which version installed QMM is built for

export const Regex_SMLHelper = (/(?:Loading\s*)(v\d+(?:\.\d+)*)/); // Checks if SMLHelper loaded, and then version if found
export const Regex_SMLHelperBuiltFor = (/(?:\sv\d+(?:\.\d+)*)(?:\sfor\s)(.*)/); // Checks which version installed SMLHelper is built for

export const Regex_GameBuild = (/(?:Game Version:\s*)(\d+(?:\.\d+)*)/); // Checks for game build version
export const Regex_Timestamp = (/(?:Today is\s*)(.*)/); // Checks QMMs timestamp

export const Regex_MissingDependencies = (/(?:is missing these dependencies:\s*)(.*)(?=\n.*:)/g); // Checks QMMs missing dependencies check
export const Regex_DuplicateMods = (/(?:Found the following duplicate mods:\s*)([\s\S]*?)(?=\n(?!\s*-))/); // Checks QMMs duplicate mods check

export const Regex_LoadedMods = (/(?:Loaded\s)(\d+)(?:\smods)/); // Checks QMMs loaded mods check
export const Regex_FailedMods = (/(?:g mods failed during patching:\s*)([\s\S]*?)(?=\n(?!\s*-))/); // Checks QMMs failed mods check

export const Regex_MissingModJson = (/(?:due to a missing mod.json file:\s*)([\s\S]*?)(?=\n(?!\s*-))/); // Checks QMMs missing mod.json check
export const Regex_SourceCode = (/(?:\s||)([^-]+)(?:.csproj)/g); // Checks for ".csproj" files


//⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻⸻//


//  ██╗   ██╗ █████╗ ██████╗ ███████╗
//  ██║   ██║██╔══██╗██╔══██╗██╔════╝
//  ██║   ██║███████║██████╔╝███████╗
//  ╚██╗ ██╔╝██╔══██║██╔══██╗╚════██║
//   ╚████╔╝ ██║  ██║██║  ██║███████║
//    ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ 