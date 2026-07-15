"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AppNavigator } from "@/app/navigation/AppNavigator";
import { DefaultParticipantNames, KoreanStrings } from "@/core/localization/KoreanStrings";
import { GameSessionManager } from "@/managers/game_session/GameSessionManager";
import type { ArenaParticipant } from "@/managers/game_session/GameSessionTypes";
import { StartGameAction } from "@/panels/base/ArenaLobbyBasePanel/controller/actions/StartGameAction";
import type { ArenaLobbyControllerState } from "@/panels/base/ArenaLobbyBasePanel/controller/ArenaLobbyBasePanelTypes";

export function useArenaLobbyBasePanelController(): ArenaLobbyControllerState
{
    const Router = useRouter();
    const Navigator = useMemo(() => new AppNavigator((Path) => Router.push(Path)), [Router]);
    const [Participants, SetParticipants] = useState<ArenaParticipant[]>([]);
    const [ParticipantName, SetParticipantName] = useState("");
    const [ErrorMessage, SetErrorMessage] = useState("");

    useEffect(() =>
    {
        const LoadTimer = window.setTimeout(() =>
        {
            const ExistingSession = GameSessionManager.Load();

            if(ExistingSession !== null && ExistingSession.Participants.length > 0)
            {
                SetParticipants(ExistingSession.Participants);
                return;
            }

            SetParticipants([
                GameSessionManager.CreateParticipant(DefaultParticipantNames[0]),
                GameSessionManager.CreateParticipant(DefaultParticipantNames[1]),
            ]);
        }, 0);

        return () => window.clearTimeout(LoadTimer);
    }, []);

    function AddParticipant(): void
    {
        const TrimmedName = ParticipantName.trim();

        if(TrimmedName.length === 0)
        {
            return;
        }

        if(Participants.length >= 8)
        {
            SetErrorMessage(KoreanStrings.ParticipantLimit);
            return;
        }

        if(Participants.some((Participant) => Participant.Name.toLocaleLowerCase() === TrimmedName.toLocaleLowerCase()))
        {
            SetErrorMessage(KoreanStrings.DuplicateParticipant);
            return;
        }

        SetParticipants([...Participants, GameSessionManager.CreateParticipant(TrimmedName)]);
        SetParticipantName("");
        SetErrorMessage("");
    }

    function RemoveParticipant(ParticipantId: string): void
    {
        SetParticipants(Participants.filter((Participant) => Participant.Id !== ParticipantId));
        SetErrorMessage("");
    }

    function StartGame(): void
    {
        if(Participants.length < 2)
        {
            SetErrorMessage(KoreanStrings.ParticipantMinimum);
            return;
        }

        StartGameAction(Participants);
        Navigator.Navigate({ PanelId: "BalanceGameBasePanel" });
    }

    return (
    {
        Participants,
        ParticipantName,
        ErrorMessage,
        CanStart: Participants.length >= 2,
        SetParticipantName,
        AddParticipant,
        RemoveParticipant,
        StartGame,
    });
}
