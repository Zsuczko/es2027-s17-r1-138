export type Course = {
  startDate: string;
  endDate: string;
  language: string;
  category: string;
  courseName: string;
  courseNameEnglish: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  price: number;
};

export type Currencies = {
  EUR: number;
  HUF: number;
  CNY: number;
};
