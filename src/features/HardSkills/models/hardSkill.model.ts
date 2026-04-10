export interface HardSkill {
  id?: string;
  name: string;
  masteryLevel: string;
  category: string;
  yearsOfExperience: number;
  description: string;
  certificateTest?: File | null;
}
