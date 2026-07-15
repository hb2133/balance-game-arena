import { GameSessionManager } from "@/managers/game_session/GameSessionManager";
import type { ArenaParticipant } from "@/managers/game_session/GameSessionTypes";

export function StartGameAction(Participants: ArenaParticipant[]): void
{
    const Session = GameSessionManager.CreateSession(Participants);
    GameSessionManager.Save(Session);
}
