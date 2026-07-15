"use client";

import { KoreanStrings } from "@/core/localization/KoreanStrings";
import { useBalanceGameBasePanelController } from "@/panels/base/BalanceGameBasePanel/controller/BalanceGameBasePanelController";
import { ParticipantProgressSection } from "@/panels/base/BalanceGameBasePanel/sections/ParticipantProgressSection/ParticipantProgressSection";
import { QuestionStageSection } from "@/panels/base/BalanceGameBasePanel/sections/QuestionStageSection/QuestionStageSection";
import { RoundStatusSection } from "@/panels/base/BalanceGameBasePanel/sections/RoundStatusSection/RoundStatusSection";
import { QuestionResultLayeredPanel } from "@/panels/layered/QuestionResultLayeredPanel/QuestionResultLayeredPanel";

export function BalanceGameBasePanel()
{
    const Controller = useBalanceGameBasePanelController();

    if(Controller.IsReady === false)
    {
        return <main className="base-panel state-panel"><p>{KoreanStrings.Loading}</p></main>;
    }

    if(Controller.Session === null || Controller.CurrentQuestion === undefined || Controller.CurrentParticipant === undefined)
    {
        return (
            <main className="base-panel state-panel" data-ue-page="BalanceGameBasePanel">
                <h1>{KoreanStrings.SessionMissing}</h1>
                <button className="primary-cta" type="button" onClick={Controller.ExitGame}>{KoreanStrings.ReturnToLobby}</button>
            </main>
        );
    }

    return (
        <main className="base-panel game-panel" data-ue-page="BalanceGameBasePanel">
            <RoundStatusSection
                CurrentRound={Controller.Session.CurrentQuestionIndex + 1}
                TotalRounds={Controller.Session.Questions.length}
                OnExit={Controller.ExitGame}
            />
            <QuestionStageSection
                Question={Controller.CurrentQuestion}
                ParticipantName={Controller.CurrentParticipant.Name}
                OnVote={Controller.SubmitVote}
            />
            <ParticipantProgressSection
                Participants={Controller.Session.Participants}
                CurrentParticipantIndex={Controller.Session.CurrentParticipantIndex}
            />
            {Controller.IsResultOpen === true && Controller.QuestionResult !== undefined && (
                <QuestionResultLayeredPanel
                    Result={Controller.QuestionResult}
                    IsFinalQuestion={Controller.IsFinalQuestion}
                    OnComplete={Controller.CompleteRound}
                />
            )}
        </main>
    );
}
