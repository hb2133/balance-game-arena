"use client";

import { KoreanStrings } from "@/core/localization/KoreanStrings";
import { useArenaResultBasePanelController } from "@/panels/base/ArenaResultBasePanel/controller/ArenaResultBasePanelController";
import { QuestionBreakdownSection } from "@/panels/base/ArenaResultBasePanel/sections/QuestionBreakdownSection/QuestionBreakdownSection";
import { ResultHeroSection } from "@/panels/base/ArenaResultBasePanel/sections/ResultHeroSection/ResultHeroSection";
import { ResultSummarySection } from "@/panels/base/ArenaResultBasePanel/sections/ResultSummarySection/ResultSummarySection";

export function ArenaResultBasePanel()
{
    const Controller = useArenaResultBasePanelController();

    if(Controller.IsReady === false)
    {
        return <main className="base-panel state-panel"><p>{KoreanStrings.Loading}</p></main>;
    }

    if(Controller.Session === null || Controller.Summary === null)
    {
        return (
            <main className="base-panel state-panel" data-ue-page="ArenaResultBasePanel">
                <h1>{KoreanStrings.SessionMissing}</h1>
                <button className="primary-cta" type="button" onClick={Controller.Reset}>{KoreanStrings.ReturnToLobby}</button>
            </main>
        );
    }

    return (
        <main className="base-panel result-panel" data-ue-page="ArenaResultBasePanel">
            <ResultHeroSection TeamHeadline={Controller.TeamHeadline} />
            <ResultSummarySection Summary={Controller.Summary} ParticipantCount={Controller.Session.Participants.length} />
            <QuestionBreakdownSection Results={Controller.Summary.Results} />
            <div className="result-actions">
                <button className="primary-cta" type="button" onClick={Controller.Replay}>{KoreanStrings.ReplaySamePlayers}<span>↻</span></button>
                <button className="secondary-cta" type="button" onClick={Controller.Reset}>{KoreanStrings.StartNewGame}</button>
            </div>
        </main>
    );
}
