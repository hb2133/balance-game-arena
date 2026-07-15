"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AppNavigator } from "@/app/navigation/AppNavigator";
import { KoreanStrings } from "@/core/localization/KoreanStrings";
import { GameSessionManager } from "@/managers/game_session/GameSessionManager";
import type { GameSession } from "@/managers/game_session/GameSessionTypes";
import { RestartGameAction } from "@/panels/base/ArenaResultBasePanel/controller/actions/RestartGameAction";
import type { ArenaResultControllerState } from "@/panels/base/ArenaResultBasePanel/controller/ArenaResultBasePanelTypes";

export function useArenaResultBasePanelController(): ArenaResultControllerState
{
    const Router = useRouter();
    const Navigator = useMemo(() => new AppNavigator((Path) => Router.push(Path)), [Router]);
    const [Session, SetSession] = useState<GameSession | null>(null);
    const [IsReady, SetIsReady] = useState(false);

    useEffect(() =>
    {
        const LoadTimer = window.setTimeout(() =>
        {
            SetSession(GameSessionManager.Load());
            SetIsReady(true);
        }, 0);

        return () => window.clearTimeout(LoadTimer);
    }, []);

    const Summary = Session === null ? null : GameSessionManager.GetSummary(Session);
    let TeamHeadline: string = KoreanStrings.TeamBalanced;

    if(Summary !== null && Summary.TotalA > Summary.TotalB)
    {
        TeamHeadline = KoreanStrings.TeamLeansA;
    }
    else if(Summary !== null && Summary.TotalB > Summary.TotalA)
    {
        TeamHeadline = KoreanStrings.TeamLeansB;
    }

    function Replay(): void
    {
        if(Session !== null)
        {
            RestartGameAction(Session);
            Navigator.Navigate({ PanelId: "BalanceGameBasePanel" });
        }
    }

    function Reset(): void
    {
        GameSessionManager.Clear();
        Navigator.Navigate({ PanelId: "ArenaLobbyBasePanel" });
    }

    return (
    {
        IsReady,
        Session,
        Summary,
        TeamHeadline,
        Replay,
        Reset,
    });
}
