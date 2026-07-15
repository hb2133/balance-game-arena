export type BalanceChoice = "A" | "B";

export interface ArenaParticipant
{
    Id: string;
    Name: string;
}

export interface BalanceQuestion
{
    Id: string;
    Prompt: string;
    ChoiceA: string;
    ChoiceB: string;
    EmojiA: string;
    EmojiB: string;
}

export interface QuestionVotes
{
    [ParticipantId: string]: BalanceChoice;
}

export interface ArenaVotes
{
    [QuestionId: string]: QuestionVotes;
}

export interface GameSession
{
    Id: string;
    Participants: ArenaParticipant[];
    Questions: BalanceQuestion[];
    Votes: ArenaVotes;
    CurrentQuestionIndex: number;
    CurrentParticipantIndex: number;
    CreatedAt: string;
}

export interface QuestionResult
{
    Question: BalanceQuestion;
    CountA: number;
    CountB: number;
    PercentageA: number;
    PercentageB: number;
    IsUnanimous: boolean;
}

export interface ArenaSummary
{
    Results: QuestionResult[];
    TotalA: number;
    TotalB: number;
    TotalVotes: number;
    UnanimousCount: number;
    ClosestResult?: QuestionResult;
}
