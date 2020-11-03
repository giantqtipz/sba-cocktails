export interface CocktailAttributes {
  id?: string;
  name?: string;
  image?: string;
  description?: string;
  ingredients?: {
    id: string;
    ingredient: string;
    order: number;
  }[];
  steps?: {
    id: string;
    step: string;
    order: number;
  }[];
}

export interface CocktailState {
  cocktail: CocktailAttributes;
  cocktails: {
    count: number;
    cocktails: CocktailAttributes[];
    limit: number;
  };
}
