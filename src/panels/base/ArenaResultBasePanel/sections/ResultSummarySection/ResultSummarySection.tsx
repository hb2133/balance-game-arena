import { KoreanStrings } from "@/core/localization/KoreanStrings";
import type { ArenaSummary } from "@/managers/game_session/GameSessionTypes";

interface ResultSummarySectionProps
{
    Summary: ArenaSummary;
    ParticipantCount: number;
}

export function ResultSummarySection(Props: ResultSummarySectionProps)
{
    return (
        <section className="summary-grid" data-ue-component="ResultSummarySection" data-ue-root>
            <article className="summary-card accent-lime">
                <span>{KoreanStrings.UnanimousLabel}</span>
                <strong>{Props.Summary.UnanimousCount}</strong>
                <small>/ {Props.Summary.Results.length}</small>
            </article>
            <article className="summary-card accent-purple">
                <span>{KoreanStrings.CloseMatchLabel}</span>
                <strong className="summary-question">{Props.Summary.ClosestResult?.Question.Prompt ?? KoreanStrings.NoCloseMatch}</strong>
                {Props.Summary.ClosestResult !== undefined && (
                    <small>{Props.Summary.ClosestResult.PercentageA}% : {Props.Summary.ClosestResult.PercentageB}%</small>
                )}
            </article>
            <article className="summary-card">
                <span>{KoreanStrings.TotalVotesLabel}</span>
                <strong>{Props.Summary.TotalVotes}</strong>
                <small>{Props.ParticipantCount} {KoreanStrings.PlayerCountLabel}</small>
            </article>
        </section>
    );
}
