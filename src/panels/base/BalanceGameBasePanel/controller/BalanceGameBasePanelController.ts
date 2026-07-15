"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AppNavigator } from "@/app/navigation/AppNavigator";
import { GameSessionManager } from "@/managers/game_session/GameSessionManager";
import type { BalanceChoice, GameSession } from "@/managers/game_session/GameSessionTypes";
import { AdvanceRoundAction } from "@/panels/base/BalanceGameBasePanel/controller/actions/AdvanceRoundAction";
import { SubmitVoteAction } from "@/panels/base/BalanceGameBasePanel/controller/actions/SubmitVoteAction";
import type { BalanceGameControllerState } from "@/panels/base/BalanceGameBasePanel/controller/BalanceGameBasePanelTypes";

export function useBalanceGameBasePanelController(): BalanceGameControllerState
{
    const Router = useRouter();
    const Navigator = useMemo(() => new AppNavigator((Path) => Router.push(Path)), [Router]);
    const [Session, SetSession] = useState<GameSession | null>(null);
    const [IsReady, SetIsReady] = useState(false);
    const [IsResultOpen, SetIsResultOpen] = useState(false);

    useEffect(() =>
    {
        const LoadTimer = window.setTimeout(() =>
        {
            const LoadedSession = GameSessionManager.Load();
            SetSession(LoadedSession);
            SetIsReady(true);

            if(LoadedSession !== null)
            {
                const Question = LoadedSession.Questions[LoadedSession.CurrentQuestionIndex];
                const VoteCount = Object.keys(LoadedSession.Votes[Question?.Id ?? ""] ?? {}).length;
                SetIsResultOpen(VoteCount >= LoadedSession.Participants.length);
            }
        }, 0);

        return () => window.clearTimeout(LoadTimer);
    }, []);

    function SubmitVote(Choice: BalanceChoice): void
    {
        if(Session === null)
        {
            return;
        }

        const IsLastParticipant = Session.CurrentParticipantIndex >= Session.Participants.length - 1;
        const UpdatedSession = SubmitVoteAction(Session, Choice);
        SetSession(UpdatedSession);

        if(IsLastParticipant === true)
        {
            SetIsResultOpen(true);
        }
    }

    function CompleteRound(): void
    {
        if(Session === null)
        {
            return;
        }

        const IsFinalQuestion = Session.CurrentQuestionIndex >= Session.Questions.length - 1;

        if(IsFinalQuestion === true)
        {
            SetIsResultOpen(false);
            Navigator.Navigate({ PanelId: "ArenaResultBasePanel" });
            return;
        }

        const UpdatedSession = AdvanceRoundAction(Session);
        SetSession(UpdatedSession);
        SetIsResultOpen(false);
    }

    function ExitGame(): void
    {
        GameSessionManager.Clear();
        Navigator.Navigate({ PanelId: "ArenaLobbyBasePanel" });
    }

    const CurrentQuestion = Session?.Questions[Session.CurrentQuestionIndex];
    const CurrentParticipant = Session?.Participants[Session.CurrentParticipantIndex];
    const QuestionResult = Session === null ? undefined : GameSessionManager.GetQuestionResult(Session, Session.CurrentQuestionIndex);

    return (
    {
        IsReady,
        Session,
        CurrentQuestion,
        CurrentParticipant,
        QuestionResult,
        IsResultOpen,
        IsFinalQuestion: Session !== null && Session.CurrentQuestionIndex >= Session.Questions.length - 1,
        SubmitVote,
        CompleteRound,
        ExitGame,
    });
}
