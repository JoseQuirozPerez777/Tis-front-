import React from 'react';
import type { TechnicalSkill, SoftSkill } from '../models/skill.model';
import { Button } from '@/shared/components/ui/Button';

type Skill = TechnicalSkill | SoftSkill;

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (id: number) => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, onEdit, onDelete }) => {
  const isTechnical = 'nivelDominio' in skill;

  return (
    <div className="bg-card-bg border border-card-border rounded-lg p-6 mb-6 hover:border-brand-accent-neon/50 transition-all duration-300">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-text-primary mb-2">{skill.nombre}</h3>
        
        {isTechnical && (
          <div className="flex gap-4 text-sm text-text-secondary mb-3">
            <span className="flex items-center">
              <span className="font-semibold text-text-primary mr-2">Nivel:</span>
              {skill.nivelDominio}
            </span>
            <span className="flex items-center">
              <span className="font-semibold text-text-primary mr-2">Años de Experiencia:</span>
              {skill.anosExperiencia}
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-card-border my-4" />

      {/* Description (Technical) */}
      {isTechnical && skill.descripcion && (
        <div className="mb-4">
          <p className="text-text-secondary text-sm font-semibold mb-2">Descripción:</p>
          <p className="text-text-secondary text-sm">{skill.descripcion}</p>
          <div className="border-t border-card-border my-4" />
        </div>
      )}

      {/* Certificado URL (Technical) */}
      {isTechnical && skill.certificadoUrl && (
        <div className="mb-4">
          <p className="text-text-secondary text-sm font-semibold mb-2">Certificado:</p>
          <a
            href={skill.certificadoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-accent-neon hover:text-brand-accent-neon/80 underline break-all"
          >
            Ver certificado
          </a>
          <div className="border-t border-card-border my-4" />
        </div>
      )}

      {/* Evidencia URL (Soft) */}
      {!isTechnical && skill.evidenciaUrl && (
        <div className="mb-4">
          <p className="text-text-secondary text-sm font-semibold mb-2">Evidencia:</p>
          <a
            href={skill.evidenciaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-accent-neon hover:text-brand-accent-neon/80 underline break-all"
          >
            Ver evidencia
          </a>
          <div className="border-t border-card-border my-4" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => skill.id && onDelete(skill.id)}
          className="flex-1"
        >
          Eliminar
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => onEdit(skill)}
          className="flex-1"
        >
          Editar
        </Button>
      </div>
    </div>
  );
};
