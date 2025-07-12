import React from 'react';
import Select, { SelectOption } from '../../common/select/Select';
import { useClassesList } from '../../../queries/classes';

interface ClassSelectProps {
  value?: string;
  onSelect: (student: SelectOption) => any;
  placeholder?: string;
  disabled?: boolean;
}

export default function ClassSelect({ 
  value, 
  onSelect, 
  placeholder = 'Selecione uma classe',
  disabled = false 
}: ClassSelectProps) {
  const { data: classes, isLoading } = useClassesList();

  const classOptions = classes?.map((classData) => ({
    value: classData.id,
    label: classData.name,
  })) || [];

  return (
    <Select
      placeholder={placeholder}
      value={value}
      options={classOptions}
      onSelect={onSelect}
      disabled={disabled || isLoading}
    />
  );
} 