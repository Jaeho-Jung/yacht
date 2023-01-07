import { ScoringCategory } from "./Scoring";

export interface Player {
    id: string;
    name: string;
    scoring: Record<ScoringCategory, number | null>;
}