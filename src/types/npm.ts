export interface DataItem {
  name: string;
  version: string;
  description: string;
  date: string;
  score: {
    searchScore: number;
    final: number;
    details: object;
  };
}
