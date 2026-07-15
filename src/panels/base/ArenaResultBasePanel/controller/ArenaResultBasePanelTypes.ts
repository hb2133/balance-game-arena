import type { ArenaSummary, GameSession } from "@/managers/game_session/GameSessionTypes";

export interface ArenaResultControllerState
{
    IsReady: boolean;
    Session: GameSession | null;
    Summary: ArenaSummary | null;
    TeamHeadline: string;
    Replay: () => void;
    Reset: () => void;
}
