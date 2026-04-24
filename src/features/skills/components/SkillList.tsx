import React from 'react';
import type { TechnicalSkill, SoftSkill } from '../models/skill.model';
import { SkillCard } from './SkillCard';

type Skill = TechnicalSkill | SoftSkill;

interface SkillListProps {
  skills: Skill[];
  title: string;
  onEdit: (skill: Skill) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

export const SkillList: React.FC<SkillListProps> = ({ 
  skills, 
  title,
  onEdit, 
  onDelete, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent-neon" />
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary mb-4">No hay {title.toLowerCase()} registradas.</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-text-primary mb-4">{title}</h3>
      {skills.map((skill) => (
        <SkillCard
          key={skill.id}
          skill={skill}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
