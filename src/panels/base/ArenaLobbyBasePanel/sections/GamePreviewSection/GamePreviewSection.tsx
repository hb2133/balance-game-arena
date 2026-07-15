import { DefaultBalanceQuestions, KoreanStrings } from "@/core/localization/KoreanStrings";

interface GamePreviewSectionProps
{
    ParticipantCount: number;
    CanStart: boolean;
    OnStartGame: () => void;
}

export function GamePreviewSection(Props: GamePreviewSectionProps)
{
    return (
        <section className="preview-card" data-ue-component="GamePreviewSection" data-ue-root>
            <div className="section-heading">
                <div>
                    <span className="step-number">02</span>
                    <h2>{KoreanStrings.GamePreviewTitle}</h2>
                </div>
            </div>
            <div className="game-metrics">
                <div><strong>{DefaultBalanceQuestions.length}</strong><span>{KoreanStrings.QuestionCountLabel}</span></div>
                <div><strong>{Props.ParticipantCount}</strong><span>{KoreanStrings.PlayerCountLabel}</span></div>
                <div><strong>{KoreanStrings.EstimatedTimeValue}</strong><span>{KoreanStrings.EstimatedTimeLabel}</span></div>
            </div>
            <button className="primary-cta" type="button" disabled={Props.CanStart === false} onClick={Props.OnStartGame}>
                <span>{KoreanStrings.StartArena}</span>
                <span aria-hidden="true">→</span>
            </button>
        </section>
    );
}
