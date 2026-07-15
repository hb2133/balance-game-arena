import { GameSessionManager } from "@/managers/game_session/GameSessionManager";
import type { BalanceChoice, GameSession } from "@/managers/game_session/GameSessionTypes";

export function SubmitVoteAction(Session: GameSession, Choice: BalanceChoice): GameSession
{
    return GameSessionManager.SubmitVote(Session, Choice);
}
