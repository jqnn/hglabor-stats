export class Player {
    readonly playerId: string;
    readonly xp: number;
    readonly kills: number;
    readonly deaths: number;
    readonly highestKillStreak: number;
    
    constructor(playerId: string, xp: number, kills: number, deaths: number, highestKillStreak: number) {
        this.playerId = playerId;
        this.xp = xp;
        this.kills = kills;
        this.deaths = deaths;
        this.highestKillStreak = highestKillStreak;
    }
}