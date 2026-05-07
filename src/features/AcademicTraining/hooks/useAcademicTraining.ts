import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@shared/hooks/useToast';
import { academicTrainingService } from '../services/academicTraining.service';

export const useAcademicTraining = () => {
  const navigate = useNavigate();
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [level, setLevel] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [certificateTest, setCertificateTest] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleAddTraining = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!level) {
      showToast('Por favor, selecciona un nivel.', 'error');
      setIsLoading(false);
      return;
    }

    if (!status) {
      showToast('Por favor, selecciona un estado.', 'error');
      setIsLoading(false);
      return;
    }

    if (!startDate) {
      showToast('Por favor, ingresa la fecha de inicio.', 'error');
      setIsLoading(false);
      return;
    }

    try {
      const newTraining = await academicTrainingService.addAcademicTraining({
        institution,
        degree,
        level,
        fieldOfStudy,
        startDate,
        endDate,
        status,
        description,
        certificateTest,
      });
      showToast(`Formación "${newTraining.degree}" añadida con éxito.`, 'success');
      handleCancel();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al añadir la formación académica';
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setInstitution('');
    setDegree('');
    setLevel('');
    setFieldOfStudy('');
    setStartDate('');
    setEndDate('');
    setStatus('');
    setDescription('');
    setCertificateTest(null);
    navigate(-1);
  };

  return {
    institution, setInstitution,
    degree, setDegree,
    level, setLevel,
    fieldOfStudy, setFieldOfStudy,
    startDate, setStartDate,
    endDate, setEndDate,
    status, setStatus,
    description, setDescription,
    certificateTest, setCertificateTest,
    isLoading,
    handleAddTraining,
    handleCancel,
  };
};
