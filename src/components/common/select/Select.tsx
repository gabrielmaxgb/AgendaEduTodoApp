import React, { useState } from 'react';
import { Modal, FlatList } from 'react-native';
import { CloseButton, CloseButtonText, ModalContainer, ModalContent, ModalHeader, ModalTitle, OptionItem, OptionText, PlaceholderText, SelectContainer, SelectText } from './styled';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  placeholder?: string;
  value?: string;
  options: SelectOption[];
  onSelect: (value: SelectOption) => void;
  disabled?: boolean;
}

export default function Select(props: SelectProps) {

  const { 
    placeholder = 'Selecione uma opção', 
    value, 
    options, 
    onSelect, 
    disabled = false 
  } = props;

  const [isVisible, setIsVisible] = useState(false);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (selectedValue: SelectOption) => {
    onSelect(selectedValue);
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      <SelectContainer
        onPress={() => !disabled && setIsVisible(true)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {selectedOption ? (
          <SelectText>{selectedOption.label}</SelectText>
        ) : (
          <PlaceholderText>{placeholder}</PlaceholderText>
        )}
      </SelectContainer>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{placeholder}</ModalTitle>
            </ModalHeader>
            
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <OptionItem onPress={() => handleSelect(item)}>
                  <OptionText>{item.label}</OptionText>
                </OptionItem>
              )}
            />
            
            <CloseButton onPress={handleClose}>
              <CloseButtonText>Cancelar</CloseButtonText>
            </CloseButton>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
} 