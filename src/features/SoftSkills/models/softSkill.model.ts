export interface SoftSkill {
  id?: string;
  name: string;
  level: string;
  type: string;
  evidenceContext: string;
  description?: string;
  certificateTest?: File | null;
}
