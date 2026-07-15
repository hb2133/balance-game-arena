import { KoreanStrings } from "@/core/localization/KoreanStrings";
import type { QuestionResult } from "@/managers/game_session/GameSessionTypes";

interface QuestionBreakdownSectionProps
{
    Results: QuestionResult[];
}

export function QuestionBreakdownSection(Props: QuestionBreakdownSectionProps)
{
    return (
        <section className="breakdown-section" data-ue-component="QuestionBreakdownSection" data-ue-root>
            <div className="section-heading">
                <div><span className="step-number">{KoreanStrings.ResultSectionLabel}</span><h2>{KoreanStrings.QuestionBreakdownTitle}</h2></div>
            </div>
            <div className="breakdown-list">
                {Props.Results.map((Result, Index) => (
                    <article className="breakdown-item" key={Result.Question.Id}>
                        <span className="breakdown-index">{String(Index + 1).padStart(2, "0")}</span>
                        <div className="breakdown-content">
                            <h3>{Result.Question.Prompt}</h3>
                            <div className="breakdown-labels">
                                <span>{Result.Question.EmojiA} {Result.Question.ChoiceA}</span>
                                <span>{Result.Question.ChoiceB} {Result.Question.EmojiB}</span>
                            </div>
                            <div className="result-bar">
                                <span className="result-bar-a" style={{ width: `${Result.PercentageA}%` }} />
                                <span className="result-bar-b" style={{ width: `${Result.PercentageB}%` }} />
                            </div>
                            <div className="breakdown-percentages"><strong>{Result.PercentageA}%</strong><strong>{Result.PercentageB}%</strong></div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
