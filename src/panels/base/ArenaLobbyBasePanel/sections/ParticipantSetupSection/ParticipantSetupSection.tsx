import type { FormEvent, KeyboardEvent } from "react";
import { KoreanStrings } from "@/core/localization/KoreanStrings";
import type { ArenaParticipant } from "@/managers/game_session/GameSessionTypes";

interface ParticipantSetupSectionProps
{
    Participants: ArenaParticipant[];
    ParticipantName: string;
    ErrorMessage: string;
    OnParticipantNameChange: (Name: string) => void;
    OnAddParticipant: () => void;
    OnRemoveParticipant: (ParticipantId: string) => void;
}

export function ParticipantSetupSection(Props: ParticipantSetupSectionProps)
{
    function HandleSubmit(Event: FormEvent<HTMLFormElement>): void
    {
        Event.preventDefault();
        Props.OnAddParticipant();
    }

    function HandleInputKeyDown(Event: KeyboardEvent<HTMLInputElement>): void
    {
        if(Event.key === "Escape")
        {
            Props.OnParticipantNameChange("");
        }
    }

    return (
        <section className="setup-card" data-ue-component="ParticipantSetupSection" data-ue-root>
            <div className="section-heading">
                <div>
                    <span className="step-number">01</span>
                    <h2>{KoreanStrings.ParticipantTitle}</h2>
                </div>
                <span className="participant-count">{Props.Participants.length}/8</span>
            </div>
            <p className="section-description">{KoreanStrings.ParticipantDescription}</p>
            <form className="participant-form" onSubmit={HandleSubmit}>
                <input
                    value={Props.ParticipantName}
                    onChange={(Event) => Props.OnParticipantNameChange(Event.target.value)}
                    onKeyDown={HandleInputKeyDown}
                    placeholder={KoreanStrings.ParticipantPlaceholder}
                    maxLength={12}
                    aria-label={KoreanStrings.ParticipantPlaceholder}
                />
                <button type="submit">{KoreanStrings.AddParticipant}</button>
            </form>
            {Props.ErrorMessage.length > 0 && <p className="form-error">{Props.ErrorMessage}</p>}
            <div className="participant-list">
                {Props.Participants.map((Participant, Index) => (
                    <div className="participant-chip" key={Participant.Id}>
                        <span className="avatar">{Participant.Name.slice(0, 1)}</span>
                        <span>{Participant.Name}</span>
                        <button
                            type="button"
                            onClick={() => Props.OnRemoveParticipant(Participant.Id)}
                            aria-label={`${Participant.Name} ${KoreanStrings.RemoveParticipant}`}
                        >
                            ×
                        </button>
                        <small>{String(Index + 1).padStart(2, "0")}</small>
                    </div>
                ))}
            </div>
        </section>
    );
}
