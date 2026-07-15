import type
{
    ArenaParticipant,
    BalanceChoice,
    BalanceQuestion,
    GameSession,
    QuestionResult,
} from "@/managers/game_session/GameSessionTypes";

export interface BalanceGameControllerState
{
    IsReady: boolean;
    Session: GameSession | null;
    CurrentQuestion?: BalanceQuestion;
    CurrentParticipant?: ArenaParticipant;
    QuestionResult?: QuestionResult;
    IsResultOpen: boolean;
    IsFinalQuestion: boolean;
    SubmitVote: (Choice: BalanceChoice) => void;
    CompleteRound: () => void;
    ExitGame: () => void;
}
