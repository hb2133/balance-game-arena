import { KoreanStrings } from "@/core/localization/KoreanStrings";
import type { BalanceChoice, BalanceQuestion } from "@/managers/game_session/GameSessionTypes";

interface QuestionStageSectionProps
{
    Question: BalanceQuestion;
    ParticipantName: string;
    OnVote: (Choice: BalanceChoice) => void;
}

export function QuestionStageSection(Props: QuestionStageSectionProps)
{
    return (
        <section className="question-stage" data-ue-component="QuestionStageSection" data-ue-root>
            <div className="current-player">
                {KoreanStrings.CurrentPlayerPrefix} <strong>{Props.ParticipantName}</strong>{KoreanStrings.CurrentPlayerSuffix}
            </div>
            <p className="pick-instruction">{KoreanStrings.PickInstruction}</p>
            <h1>{Props.Question.Prompt}</h1>
            <div className="choice-grid">
                <button className="choice-card choice-a" type="button" onClick={() => Props.OnVote("A")}>
                    <span className="choice-letter">{KoreanStrings.ChoiceALabel}</span>
                    <span className="choice-emoji">{Props.Question.EmojiA}</span>
                    <strong>{Props.Question.ChoiceA}</strong>
                    <span className="choice-arrow">↗</span>
                </button>
                <div className="versus-badge">{KoreanStrings.Versus}</div>
                <button className="choice-card choice-b" type="button" onClick={() => Props.OnVote("B")}>
                    <span className="choice-letter">{KoreanStrings.ChoiceBLabel}</span>
                    <span className="choice-emoji">{Props.Question.EmojiB}</span>
                    <strong>{Props.Question.ChoiceB}</strong>
                    <span className="choice-arrow">↗</span>
                </button>
            </div>
        </section>
    );
}
