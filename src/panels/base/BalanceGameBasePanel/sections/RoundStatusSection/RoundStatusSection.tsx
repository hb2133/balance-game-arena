import { KoreanStrings } from "@/core/localization/KoreanStrings";

interface RoundStatusSectionProps
{
    CurrentRound: number;
    TotalRounds: number;
    OnExit: () => void;
}

export function RoundStatusSection(Props: RoundStatusSectionProps)
{
    const Progress = Math.round((Props.CurrentRound / Props.TotalRounds) * 100);

    return (
        <section className="round-status" data-ue-component="RoundStatusSection" data-ue-root>
            <div className="round-copy">
                <span>{KoreanStrings.RoundLabel}</span>
                <strong>{String(Props.CurrentRound).padStart(2, "0")}</strong>
                <small>/ {String(Props.TotalRounds).padStart(2, "0")}</small>
            </div>
            <div className="round-progress" aria-label={`${Progress}%`}>
                <span style={{ width: `${Progress}%` }} />
            </div>
            <button className="text-button" type="button" onClick={Props.OnExit}>{KoreanStrings.ExitGame}</button>
        </section>
    );
}
