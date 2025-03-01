"use client";

import {useEffect, useState} from "react";
import {Player} from "@/schema/Player";
import {loadTop} from "@/api/stats_api";
import Image from 'next/image';
import {loadPlayerName, typeToTitle} from "@/api/api";


export function TableComponent() {
    const [type, setType] = useState("kills");
    const [players, setPlayers] = useState<Player[]>([])
    const [playerNames, setPlayerNames] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPlayersAndNames = async () => {
            const playersData = await loadTop(1, type);
            if (playersData == null) {
                setLoading(false);
                return;
            }

            setPlayers(playersData);
            const names = await Promise.all(
                playersData.map(async (player) => {
                    return await loadPlayerName(player.playerId);
                })
            );

            setPlayerNames(names);
            setLoading(false);
        };

        fetchPlayersAndNames().then();
    }, [type]);

    if (loading) {
        return (
            <div className={"text-2xl align-middle text-center"}>Loading...</div>
        )
    }

    if (players.length === 0) {
        return (
            <div className={"text-2xl align-middle text-center text-red-500"}>Error: Please try again later or contact
                an administrator.</div>
        )
    }

    return (
        <div className="bg-zinc-900 rounded-xl w-full p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
                Top {typeToTitle(type)}
            </h1>

            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <button
                    className="font-semibold py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-b from-green-500 to-green-600 hover:-translate-y-1 transition-transform duration-100 rounded-2xl w-full"
                    onClick={() => setType("kills")}>Kills
                </button>
                <button
                    className="font-semibold py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-b from-red-500 to-red-600 hover:-translate-y-1 transition-transform duration-100 rounded-2xl w-full"
                    onClick={() => setType("deaths")}>Deaths
                </button>
                <button
                    className="font-semibold py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-b from-yellow-500 to-yellow-600 hover:-translate-y-1 transition-transform duration-100 rounded-2xl w-full"
                    onClick={() => setType("xp")}>XP
                </button>
                <button
                    className="font-semibold py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-b from-blue-500 to-blue-600 hover:-translate-y-1 transition-transform duration-100 rounded-2xl w-full"
                    onClick={() => setType("highestKillStreak")}>Highest Kill Streak
                </button>
            </div>

            {players.flatMap((player: Player, index: number) => (
                <div key={player.playerId}
                     className="p-3 sm:p-4 flex items-center justify-between hover:bg-zinc-800 gap-4">
                    <div className="flex items-center gap-4">
                        <span className="text-base sm:text-lg font-bold text-zinc-400">#{index + 1}</span>
                        <Image src={`https://mc-heads.net/avatar/${player.playerId}/32`} width={8} height={8}
                               alt="Player avatar"
                               className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-zinc-600"/>
                        <a href={`/player/${player.playerId}`}
                           className="font-semibold text-zinc-200 text-sm sm:text-base">{playerNames[index]}</a>
                    </div>
                    <span className="font-bold text-blue-500 text-base sm:text-lg">
                    {(() => {
                        if (type === 'kills') {
                            return player.kills;
                        } else if (type === 'xp') {
                            return player.xp;
                        } else if (type === 'deaths') {
                            return player.deaths;
                        } else if (type === 'highestKillStreak') {
                            return player.highestKillStreak;
                        } else {
                            return null;
                        }
                    })()}
                </span>
                </div>
            ))}
        </div>
    )
}