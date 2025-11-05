export interface LessonTab {
  id: string;
  title: string;
  content: string;
}

export interface LessonPlan {
  id: number;
  date: string;
  teacher: string;
  class: string;
  subject: string;
  title: string;
  tabs: LessonTab[];
}
