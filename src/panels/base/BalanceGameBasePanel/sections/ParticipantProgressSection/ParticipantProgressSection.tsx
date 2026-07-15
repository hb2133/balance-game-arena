import { KoreanStrings } from "@/core/localization/KoreanStrings";
import type { ArenaParticipant } from "@/managers/game_session/GameSessionTypes";

interface ParticipantProgressSectionProps
{
    Participants: ArenaParticipant[];
    CurrentParticipantIndex: number;
}

export function ParticipantProgressSection(Props: ParticipantProgressSectionProps)
{
    return (
        <section className="participant-progress" data-ue-component="ParticipantProgressSection" data-ue-root>
            {Props.Participants.map((Participant, Index) =>
            {
                const IsComplete = Index < Props.CurrentParticipantIndex;
                const IsCurrent = Index === Props.CurrentParticipantIndex;

                return (
                    <div className={`progress-player ${IsComplete === true ? "is-complete" : ""} ${IsCurrent === true ? "is-current" : ""}`} key={Participant.Id}>
                        <span>{IsComplete === true ? "✓" : Participant.Name.slice(0, 1)}</span>
                        <div><strong>{Participant.Name}</strong><small>{IsComplete === true ? KoreanStrings.VoteComplete : KoreanStrings.WaitingVote}</small></div>
                    </div>
                );
            })}
        </section>
    );
}
