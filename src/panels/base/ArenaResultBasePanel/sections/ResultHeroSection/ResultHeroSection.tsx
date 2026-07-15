import { KoreanStrings } from "@/core/localization/KoreanStrings";

interface ResultHeroSectionProps
{
    TeamHeadline: string;
}

export function ResultHeroSection(Props: ResultHeroSectionProps)
{
    return (
        <section className="result-hero" data-ue-component="ResultHeroSection" data-ue-root>
            <span className="result-eyebrow">{KoreanStrings.ResultEyebrow}</span>
            <div className="result-trophy" aria-hidden="true">✦</div>
            <h1>{KoreanStrings.ResultTitle}</h1>
            <p>{Props.TeamHeadline}</p>
            <small>{KoreanStrings.ResultDescription}</small>
        </section>
    );
}
