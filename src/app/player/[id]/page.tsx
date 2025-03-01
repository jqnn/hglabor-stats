"use client";

import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {loadPlayer} from '@/api/stats_api';
import {isUUID, loadPlayerName, loadPlayerUUID} from "@/api/api";
import {Player} from "@/schema/Player";
import Image from 'next/image';

/*
TODO:
- add hero stats
 */
export default function Post() {
    const {id} = useParams();
    const stringId = String(id);
    const [player, setPlayer] = useState<Player | null>(null)
    const [playerName, setPlayerName] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPlayer = async () => {
            if (isUUID(stringId)) {
                const playerData = await loadPlayer(stringId)
                if (playerData == null) {
                    setLoading(false)
                    return;
                }

                setPlayer(playerData)
                setPlayerName(await loadPlayerName(playerData.playerId))
                return
            }

            const uuid = await loadPlayerUUID(stringId)
            if (!(isUUID(uuid))) {
                setLoading(false)
                return;
            }

            const playerData = await loadPlayer(uuid)
            if (playerData == null) {
                setLoading(false)
                return;
            }

            setPlayer(playerData)
            setPlayerName(stringId)
        }

        fetchPlayer().then(() => {
            setLoading(false)
        })
    }, [stringId]);

    if (loading) {
        return (
            <div className={"text-2xl align-middle text-center"}>Loading...</div>
        )
    }

    if (player == null) {
        return (
            <div className={"text-2xl align-middle text-center text-red-500"}>Error: No player with given information
                was found.</div>
        )
    }

    return (
        <div className="bg-zinc-900 rounded-xl w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                <div
                    className="flex flex-col sm:flex-row items-center rounded-xl bg-zinc-800 hover:-translate-y-1 transition-transform duration-100 p-4">
                    <Image src={`https://mc-heads.net/avatar/${player.playerId}/256`} width={150} height={150}
                           alt="Player avatar" className="p-2 sm:p-4 w-24 h-24 sm:w-32 sm:h-32"/>
                    <span
                        className="text-xl sm:text-2xl font-semibold text-zinc-200 mt-2 sm:mt-0 sm:ml-4">{playerName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <div
                        className="rounded-xl p-4 sm:p-6 bg-zinc-800 hover:-translate-y-1 transition-transform duration-100">
                        <h3 className="text-sm sm:text-lg font-semibold text-slate-400 mb-1 sm:mb-2">Kills</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-green-500">{player.kills}</p>
                    </div>
                    <div
                        className="rounded-xl p-4 sm:p-6 bg-zinc-800 hover:-translate-y-1 transition-transform duration-100">
                        <h3 className="text-sm sm:text-lg font-semibold text-slate-400 mb-1 sm:mb-2">Deaths</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-red-500">{player.deaths}</p>
                    </div>
                    <div
                        className="rounded-xl p-4 sm:p-6 bg-zinc-800 hover:-translate-y-1 transition-transform duration-100">
                        <h3 className="text-sm sm:text-lg font-semibold text-slate-400 mb-1 sm:mb-2">XP</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-yellow-500">{player.xp}</p>
                    </div>
                    <div
                        className="rounded-xl p-4 sm:p-6 bg-zinc-800 hover:-translate-y-1 transition-transform duration-100">
                        <h3 className="text-sm sm:text-lg font-semibold text-slate-400 mb-1 sm:mb-2">Highest Kill
                            Streak</h3>
                        <p className="text-2xl sm:text-3xl font-bold text-blue-500">{player.highestKillStreak}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}