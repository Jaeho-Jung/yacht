export type ScoringCategory = 
    "ones" | "twos" | "threes" | "fours" | "fives" | "sixes" |
    "choice" | "fourOfAKind" | "fullHouse" | "smallStraight" | 
    "largeStraight" | "yacht";

type ScoringSection = "Upper" | "Lower";

export interface ScoringCategoryDetails {
    category: ScoringCategory;
    name: string;
    section: ScoringSection;
    description: String;
}

export const ScoringCategoryDescriptions: ScoringCategoryDetails[] = [
    {
        category: "ones",
        name: "Ones",
        section: "Upper",
        description: "The sum of all dice showing the number 1."
    },
    {
        category: "twos",
        name: "Twos",
        section: "Upper",
        description: "The sum of all dice showing the number 2."
    },
    {
        category: "threes",
        name: "Threes",
        section: "Upper",
        description: "The sum of all dice showing the number 3."
    },
    {
        category: "fours",
        name: "Fours",
        section: "Upper",
        description: "The sum of all dice showing the number 4."
    },
    {
        category: "fives",
        name: "Fives",
        section: "Upper",
        description: "The sum of all dice showing the number 5."
    },
    {
        category: "sixes",
        name: "Sixes",
        section: "Upper",
        description: "The sum of all dice showing the number 6."
    },
    {
        category: "choice",
        name: "Choice",
        section: "Lower",
        description: "Any combination of dice. Score: Sum of all the dice."
    },
    {
        category: "fourOfAKind",
        name: "Four of a Kind",
        section: "Lower",
        description: "Four dice with the same number. Score: Sum of those four dice"
    },
    {
        category: "fullHouse",
        name: "Full House",
        section: "Lower",
        description: "Any set of three combined with a different pair. Score: Sum of all the dice."
    },
    {
        category: "smallStraight",
        name: "Small Straight",
        section: "Lower",
        description: "Four dice in numerical sequence. Score: 15 points."
    },
    {
        category: "largeStraight",
        name: "Large Staright",
        section: "Lower",
        description: "Five dice in numerical sequence. Score: 30 points."
    },
    {
        category: "yacht",
        name: "Yacht",
        section: "Lower",
        description: " five dice with the same number. Score: 50 points."
    }
];