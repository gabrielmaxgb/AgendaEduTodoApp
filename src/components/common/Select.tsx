import React, { useState } from 'react';
import { Modal, FlatList } from 'react-native';
import styled from 'styled-components/native';

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

const SelectContainer = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary || '#ccc'};
  border-radius: 4px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background || '#fff'};
  min-height: 48px;
  justify-content: center;
  margin-vertical: 8px;
`;

const SelectText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.small}px;
  color: ${({ theme }) => theme.colors.text || '#000'};
`;

const PlaceholderText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.textLight || '#999'};
`;

const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.background || '#fff'};
  border-radius: 8px;
  width: 80%;
  max-height: 70%;
`;

const ModalHeader = styled.View`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border || '#ccc'};
`;

const ModalTitle = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.large}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text || '#000'};
`;

const OptionItem = styled.TouchableOpacity`
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border || '#eee'};
`;

const OptionText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.text || '#000'};
`;

const CloseButton = styled.TouchableOpacity`
  padding: 16px;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border || '#ccc'};
`;

const CloseButtonText = styled.Text`
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
  color: ${({ theme }) => theme.colors.primary || '#007AFF'};
  font-weight: bold;
`;

export default function Select({ 
  placeholder = 'Selecione uma opção', 
  value, 
  options, 
  onSelect, 
  disabled = false 
}: SelectProps) {
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