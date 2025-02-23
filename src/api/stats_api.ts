import {getApiCall} from "@/api/api";
import {Player} from "@/schema/Player";

export async function loadPlayer(id: string) {
    const response = await getApiCall("stats/FFA/" + id)
    if (response == null) return null;

    const json = await response.json();
    const playerId = json["playerId"];
    const xp = json["xp"];
    const kills = json["kills"];
    const deaths = json["deaths"];
    const highestKillStreak = json["highestKillStreak"];

    return new Player(playerId, xp, kills, deaths, highestKillStreak);
}

export async function loadTop(page: number = 1, sortBy: string = "kills") {
    const response = await getApiCall("stats/FFA/top?sort=" + sortBy + "&page=" + page)
    if (response == null) return null;

    const players: Player[] = [];
    const json = await response.json();
    json.forEach((object: { [x: string]: never; }) => {
        const playerId = object["playerId"];
        const xp = object["xp"];
        const kills = object["kills"];
        const deaths = object["deaths"];
        const highestKillStreak = object["highestKillStreak"];
        players.push(new Player(playerId, xp, kills, deaths, highestKillStreak))
    })

    return players;
}