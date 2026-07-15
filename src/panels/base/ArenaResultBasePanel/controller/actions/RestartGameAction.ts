import { GameSessionManager } from "@/managers/game_session/GameSessionManager";
import type { GameSession } from "@/managers/game_session/GameSessionTypes";

export function RestartGameAction(Session: GameSession): GameSession
{
    return GameSessionManager.Restart(Session);
}
