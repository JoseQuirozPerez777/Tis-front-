import React, { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { SkillList } from '../components/SkillList';
import { SkillFormModal } from '../components/SkillFormModal';
import { useSkills } from '../hooks/useSkills';
import type { TechnicalSkill, SoftSkill } from '../models/skill.model';

type Skill = TechnicalSkill | SoftSkill;
type SkillType = 'TECNICA' | 'BLANDA';

export const SkillsPage: React.FC = () => {
  const {
    technicalSkills,
    softSkills,
    categories,
    loading,
    error,
    addTechnicalSkill,
    updateTechnicalSkill,
    deleteTechnicalSkill,
    addSoftSkill,
    updateSoftSkill,
    deleteSoftSkill,
  } = useSkills();

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [currentSkillType, setCurrentSkillType] = useState<SkillType>('TECNICA');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      setIsSaving(true);
      const success = currentSkillType === 'TECNICA'
        ? await deleteTechnicalSkill(id)
        : await deleteSoftSkill(id);

      if (success) {
        setShowDeleteConfirm(null);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setShowFormModal(true);
  };

  const handleCreateTechnical = () => {
    setCurrentSkillType('TECNICA');
    setEditingSkill(null);
    setShowFormModal(true);
  };

  const handleCreateSoft = () => {
    setCurrentSkillType('BLANDA');
    setEditingSkill(null);
    setShowFormModal(true);
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
    setEditingSkill(null);
  };

  const handleSubmitForm = async (data: Skill) => {
    try {
      setIsSaving(true);

      if (currentSkillType === 'TECNICA') {
        const technicalData = data as TechnicalSkill;
        const result = editingSkill && 'id' in editingSkill
          ? await updateTechnicalSkill(technicalData)
          : await addTechnicalSkill(technicalData);

        if (result) {
          handleCloseForm();
        }
      } else {
        const softData = data as SoftSkill;
        const result = editingSkill && 'id' in editingSkill
          ? await updateSoftSkill(softData)
          : await addSoftSkill(softData);

        if (result) {
          handleCloseForm();
        }
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-250px)] relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-brand-azul-brillante/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-azul-electrico/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-4xl mx-auto px-4 py-8 z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-6">Habilidades</h1>
          <div className="border-t-2 border-card-border" />
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent-neon" />
          </div>
        ) : (
          <div className="space-y-12">
            {/* HABILIDADES TÉCNICAS */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Habilidades Técnicas</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCreateTechnical}
                >
                  + Agregar Técnica
                </Button>
              </div>

              {technicalSkills.length === 0 ? (
                <div className="text-center py-8 bg-card-bg border border-card-border rounded-lg">
                  <p className="text-text-secondary">No hay habilidades técnicas registradas.</p>
                </div>
              ) : (
                <SkillList
                  skills={technicalSkills}
                  title="Habilidades Técnicas"
                  onEdit={handleEdit}
                  onDelete={(id) => {
                    setCurrentSkillType('TECNICA');
                    setShowDeleteConfirm(id);
                  }}
                  isLoading={false}
                />
              )}
            </section>

            {/* HABILIDADES BLANDAS */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Habilidades Blandas</h2>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCreateSoft}
                >
                  + Agregar Blanda
                </Button>
              </div>

              {softSkills.length === 0 ? (
                <div className="text-center py-8 bg-card-bg border border-card-border rounded-lg">
                  <p className="text-text-secondary">No hay habilidades blandas registradas.</p>
                </div>
              ) : (
                <SkillList
                  skills={softSkills}
                  title="Habilidades Blandas"
                  onEdit={handleEdit}
                  onDelete={(id) => {
                    setCurrentSkillType('BLANDA');
                    setShowDeleteConfirm(id);
                  }}
                  isLoading={false}
                />
              )}
            </section>

            {/* DELETE CONFIRMATION */}
            {showDeleteConfirm !== null && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-card-bg border border-card-border rounded-lg p-6 max-w-sm mx-4">
                  <h2 className="text-lg font-bold text-text-primary mb-4">
                    Confirmar eliminación
                  </h2>
                  <p className="text-text-secondary mb-6">
                    ¿Estás seguro de que deseas eliminar esta habilidad? Esta acción no se puede deshacer.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowDeleteConfirm(null)}
                      className="flex-1"
                      disabled={isSaving}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleDelete(showDeleteConfirm)}
                      className="flex-1"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* FORM MODAL */}
            <SkillFormModal
              isOpen={showFormModal}
              skillType={currentSkillType}
              categories={categories}
              initialData={editingSkill}
              isSubmitting={isSaving}
              onClose={handleCloseForm}
              onSubmit={handleSubmitForm}
            />
          </div>
        )}
      </div>
    </div>
  );
};