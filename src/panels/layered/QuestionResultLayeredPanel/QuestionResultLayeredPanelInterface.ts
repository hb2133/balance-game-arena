import type { QuestionResult } from "@/managers/game_session/GameSessionTypes";

export interface QuestionResultLayeredPanelPayload
{
    Result: QuestionResult;
    IsFinalQuestion: boolean;
}

export interface QuestionResultLayeredPanelBindings
{
    OnComplete: () => void;
}
