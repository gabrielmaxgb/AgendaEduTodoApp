import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: start;
  align-items: start;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.secondary || '#fff'};
`;

export default Container;
