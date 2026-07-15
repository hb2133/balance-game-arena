import { KoreanStrings } from "@/core/localization/KoreanStrings";

export function HeroSection()
{
    return (
        <section className="lobby-hero" data-ue-component="HeroSection" data-ue-root>
            <div className="eyebrow"><span />{KoreanStrings.LobbyEyebrow}</div>
            <h1>
                {KoreanStrings.LobbyTitleLineOne}<br />
                <em>{KoreanStrings.LobbyTitleLineTwo}</em>
            </h1>
            <p>{KoreanStrings.LobbyDescription}</p>
            <div className="arena-orbit" aria-hidden="true">
                <div className="orbit-card orbit-card-a">A</div>
                <div className="orbit-vs">VS</div>
                <div className="orbit-card orbit-card-b">B</div>
            </div>
        </section>
    );
}
