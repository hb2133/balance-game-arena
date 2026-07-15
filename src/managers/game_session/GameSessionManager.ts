import { DefaultBalanceQuestions } from "@/core/localization/KoreanStrings";
import type
{
    ArenaParticipant,
    ArenaSummary,
    BalanceChoice,
    BalanceQuestion,
    GameSession,
    QuestionResult,
} from "@/managers/game_session/GameSessionTypes";

const SessionStorageKey = "balance-arena-session-v1";

function CreateId(Prefix: string): string
{
    return `${Prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export class GameSessionManager
{
    public static CreateParticipant(Name: string): ArenaParticipant
    {
        return (
        {
            Id: CreateId("player"),
            Name: Name.trim(),
        });
    }

    public static CreateSession(Participants: ArenaParticipant[]): GameSession
    {
        const Questions: BalanceQuestion[] = DefaultBalanceQuestions.map((Question) =>
        {
            const ClonedQuestion: BalanceQuestion =
            {
                ...Question,
            };

            return ClonedQuestion;
        });

        return (
        {
            Id: CreateId("game"),
            Participants,
            Questions,
            Votes: {},
            CurrentQuestionIndex: 0,
            CurrentParticipantIndex: 0,
            CreatedAt: new Date().toISOString(),
        });
    }

    public static Load(): GameSession | null
    {
        if(typeof window === "undefined")
        {
            return null;
        }

        const StoredSession = window.localStorage.getItem(SessionStorageKey);

        if(StoredSession === null)
        {
            return null;
        }

        try
        {
            return JSON.parse(StoredSession) as GameSession;
        }
        catch
        {
            window.localStorage.removeItem(SessionStorageKey);
            return null;
        }
    }

    public static Save(Session: GameSession): void
    {
        if(typeof window !== "undefined")
        {
            window.localStorage.setItem(SessionStorageKey, JSON.stringify(Session));
        }
    }

    public static Clear(): void
    {
        if(typeof window !== "undefined")
        {
            window.localStorage.removeItem(SessionStorageKey);
        }
    }

    public static SubmitVote(Session: GameSession, Choice: BalanceChoice): GameSession
    {
        const Question = Session.Questions[Session.CurrentQuestionIndex];
        const Participant = Session.Participants[Session.CurrentParticipantIndex];

        if(Question === undefined || Participant === undefined)
        {
            return Session;
        }

        const QuestionVotes = Session.Votes[Question.Id] ?? {};
        const IsLastParticipant = Session.CurrentParticipantIndex >= Session.Participants.length - 1;
        const UpdatedSession: GameSession =
        {
            ...Session,
            Votes:
            {
                ...Session.Votes,
                [Question.Id]:
                {
                    ...QuestionVotes,
                    [Participant.Id]: Choice,
                },
            },
            CurrentParticipantIndex: IsLastParticipant === true ? 0 : Session.CurrentParticipantIndex + 1,
        };

        this.Save(UpdatedSession);
        return UpdatedSession;
    }

    public static AdvanceQuestion(Session: GameSession): GameSession
    {
        const UpdatedSession: GameSession =
        {
            ...Session,
            CurrentQuestionIndex: Math.min(Session.CurrentQuestionIndex + 1, Session.Questions.length - 1),
            CurrentParticipantIndex: 0,
        };

        this.Save(UpdatedSession);
        return UpdatedSession;
    }

    public static Restart(Session: GameSession): GameSession
    {
        const UpdatedSession: GameSession =
        {
            ...Session,
            Id: CreateId("game"),
            Votes: {},
            CurrentQuestionIndex: 0,
            CurrentParticipantIndex: 0,
            CreatedAt: new Date().toISOString(),
        };

        this.Save(UpdatedSession);
        return UpdatedSession;
    }

    public static GetQuestionResult(Session: GameSession, QuestionIndex: number): QuestionResult
    {
        const Question = Session.Questions[QuestionIndex];

        if(Question === undefined)
        {
            throw new Error("Question index is out of range.");
        }

        const Votes = Object.values(Session.Votes[Question.Id] ?? {});
        const CountA = Votes.filter((Choice) => Choice === "A").length;
        const CountB = Votes.filter((Choice) => Choice === "B").length;
        const VoteCount = CountA + CountB;

        return (
        {
            Question,
            CountA,
            CountB,
            PercentageA: VoteCount === 0 ? 0 : Math.round((CountA / VoteCount) * 100),
            PercentageB: VoteCount === 0 ? 0 : Math.round((CountB / VoteCount) * 100),
            IsUnanimous: VoteCount > 0 && (CountA === 0 || CountB === 0),
        });
    }

    public static GetSummary(Session: GameSession): ArenaSummary
    {
        const Results = Session.Questions.map((_, Index) => this.GetQuestionResult(Session, Index));
        const TotalA = Results.reduce((Total, Result) => Total + Result.CountA, 0);
        const TotalB = Results.reduce((Total, Result) => Total + Result.CountB, 0);
        const CompletedResults = Results.filter((Result) => Result.CountA + Result.CountB > 0);
        const ClosestResult = CompletedResults.reduce<QuestionResult | undefined>((Closest, Result) =>
        {
            if(Closest === undefined)
            {
                return Result;
            }

            const CurrentGap = Math.abs(Result.PercentageA - Result.PercentageB);
            const ClosestGap = Math.abs(Closest.PercentageA - Closest.PercentageB);
            return CurrentGap < ClosestGap ? Result : Closest;
        }, undefined);

        return (
        {
            Results,
            TotalA,
            TotalB,
            TotalVotes: TotalA + TotalB,
            UnanimousCount: Results.filter((Result) => Result.IsUnanimous === true).length,
            ClosestResult,
        });
    }
}
