import React from 'react';
import Select, { SelectOption } from '../../common/select/Select';
import { useStudentsList } from '../../../hooks/queries/students';

interface StudentSelectProps {
  value?: string;
  onSelect: (student: SelectOption) => any;
  placeholder?: string;
  disabled?: boolean;
}

export default function StudentSelect({ 
  value, 
  onSelect, 
  placeholder = 'Selecione um estudante',
  disabled = false 
}: StudentSelectProps) {
  const { data: students, isLoading } = useStudentsList();

  const studentOptions = students?.map((student) => ({
    value: student.id,
    label: student.name,
  })) || [];

  return (
    <Select
      placeholder={placeholder}
      value={value}
      options={studentOptions}
      onSelect={onSelect}
      disabled={disabled || isLoading}
    />
  );
} 