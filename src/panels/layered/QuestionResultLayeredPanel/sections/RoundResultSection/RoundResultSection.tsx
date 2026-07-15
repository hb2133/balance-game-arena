import { KoreanStrings } from "@/core/localization/KoreanStrings";
import type { QuestionResult } from "@/managers/game_session/GameSessionTypes";

interface RoundResultSectionProps
{
    Result: QuestionResult;
    IsFinalQuestion: boolean;
    OnComplete: () => void;
}

export function RoundResultSection(Props: RoundResultSectionProps)
{
    const ResultTitle = Props.Result.IsUnanimous === true ? KoreanStrings.RoundResultUnanimous : KoreanStrings.RoundResultTitle;

    return (
        <section className="round-result-card" data-ue-component="RoundResultSection" data-ue-root>
            <span className="result-eyebrow">{KoreanStrings.RoundResultEyebrow}</span>
            <h2>{ResultTitle}</h2>
            <p>{Props.Result.Question.Prompt}</p>
            <div className="result-scoreboard">
                <div className="score-a">
                    <span>{Props.Result.Question.EmojiA}</span>
                    <strong>{Props.Result.PercentageA}%</strong>
                    <small>{Props.Result.CountA}{KoreanStrings.VotesUnit}</small>
                </div>
                <div className="score-divider" />
                <div className="score-b">
                    <span>{Props.Result.Question.EmojiB}</span>
                    <strong>{Props.Result.PercentageB}%</strong>
                    <small>{Props.Result.CountB}{KoreanStrings.VotesUnit}</small>
                </div>
            </div>
            <div className="result-bar">
                <span className="result-bar-a" style={{ width: `${Props.Result.PercentageA}%` }} />
                <span className="result-bar-b" style={{ width: `${Props.Result.PercentageB}%` }} />
            </div>
            <button className="primary-cta" type="button" onClick={Props.OnComplete}>
                <span>{Props.IsFinalQuestion === true ? KoreanStrings.ViewFinalResult : KoreanStrings.NextQuestion}</span>
                <span aria-hidden="true">→</span>
            </button>
        </section>
    );
}
