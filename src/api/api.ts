const apiUrl = "https://api.hglabor.de";

export async function apiCall(path: string, method: string, bodyParams: string) {
    const response = await fetch(`${apiUrl}/${path}`, {
        method: method,
        body: bodyParams,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) return null
    return response
}

export async function getApiCall(path: string) {
    const response = await fetch(`${apiUrl}/${path}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) return null
    return response
}

export async function loadPlayerName(playerId: string) {
    const response = await fetch(`https://playerdb.co/api/player/minecraft/${playerId}`);
    if (!response.ok) return null
    const data = await response.json();
    return data["data"]["player"]["username"];
}

export async function loadPlayerUUID(name: string) {
    const response = await fetch(`https://playerdb.co/api/player/minecraft/${name}`);
    if (!response.ok) return null
    const data = await response.json();
    return data["data"]["player"]["id"];
}

export function isUUID(str: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
}

export function typeToTitle(type: string) {
    switch (type) {
        case "highestKillStreak":
            return "Kill Streak";
        case "xp":
            return "XP";
        case "kills":
            return "Kills";
        case "deaths":
            return "Deaths";
        default:
            return type;
    }
}