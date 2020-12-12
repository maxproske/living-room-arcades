export type ScoringCategory =
  'ones' | 'twos' | 'threes' | 'fours' | 'fives' | 'sixes' |
  'onePair' | 'twoPairs' | 'threeOfAKind' | 'fourOfAKind' |
  'smallStraight' | 'largeStraight' | 'fullHouse' | 'chance' |
  'yatzy' // The categories a player may score in

export type ScoringSection = 'Upper' | 'Lower'; // A category may be in the upper or lower sections

export interface ScoringCategoryDetails {
  category: ScoringCategory;
  name: string;
  description: string;
  section: ScoringSection;
}

// Provides supplemental information about each scoring category,
// such as a description of how the category is scored.
export const ScoringCategoryDescriptions: ScoringCategoryDetails[] = [
  {
    category: "ones",
    name: "Ones",
    section: "Upper",
    description: "The sum of all dice showing the number 1."
  },
  // ...truncated for brevity