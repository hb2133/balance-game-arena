import { GameSessionManager } from "@/managers/game_session/GameSessionManager";
import type { GameSession } from "@/managers/game_session/GameSessionTypes";

export function AdvanceRoundAction(Session: GameSession): GameSession
{
    return GameSessionManager.AdvanceQuestion(Session);
}
