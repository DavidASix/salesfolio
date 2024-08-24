export type TimeUnit = "ms" | "s" | "m" | "h" | "d";
export type Duration = `${number} ${TimeUnit}` | `${number}${TimeUnit}`;
export type FAQ = { question: string; answer: string }[];
