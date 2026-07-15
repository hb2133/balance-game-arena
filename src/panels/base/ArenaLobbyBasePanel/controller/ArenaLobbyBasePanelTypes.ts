import type { ArenaParticipant } from "@/managers/game_session/GameSessionTypes";

export interface ArenaLobbyControllerState
{
    Participants: ArenaParticipant[];
    ParticipantName: string;
    ErrorMessage: string;
    CanStart: boolean;
    SetParticipantName: (Name: string) => void;
    AddParticipant: () => void;
    RemoveParticipant: (ParticipantId: string) => void;
    StartGame: () => void;
}
