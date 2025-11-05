export interface RecordOfWork {
  id: number;
  subject: string;
  grade: string;
  term: string;
  year: string;
  weekly_entries: WeeklyEntry[];
}

export interface WeeklyEntry {
  week: number;
  work_covered: string;
  resources_references: string;
  method_strategies: string;
  learners_progress: string;
  hod_remarks: string;
}
