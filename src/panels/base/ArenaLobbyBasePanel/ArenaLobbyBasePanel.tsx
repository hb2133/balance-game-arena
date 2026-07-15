"use client";

import { useArenaLobbyBasePanelController } from "@/panels/base/ArenaLobbyBasePanel/controller/ArenaLobbyBasePanelController";
import { GamePreviewSection } from "@/panels/base/ArenaLobbyBasePanel/sections/GamePreviewSection/GamePreviewSection";
import { HeroSection } from "@/panels/base/ArenaLobbyBasePanel/sections/HeroSection/HeroSection";
import { ParticipantSetupSection } from "@/panels/base/ArenaLobbyBasePanel/sections/ParticipantSetupSection/ParticipantSetupSection";

export function ArenaLobbyBasePanel()
{
    const Controller = useArenaLobbyBasePanelController();

    return (
        <main className="base-panel lobby-panel" data-ue-page="ArenaLobbyBasePanel">
            <HeroSection />
            <div className="lobby-controls">
                <ParticipantSetupSection
                    Participants={Controller.Participants}
                    ParticipantName={Controller.ParticipantName}
                    ErrorMessage={Controller.ErrorMessage}
                    OnParticipantNameChange={Controller.SetParticipantName}
                    OnAddParticipant={Controller.AddParticipant}
                    OnRemoveParticipant={Controller.RemoveParticipant}
                />
                <GamePreviewSection
                    ParticipantCount={Controller.Participants.length}
                    CanStart={Controller.CanStart}
                    OnStartGame={Controller.StartGame}
                />
            </div>
        </main>
    );
}
