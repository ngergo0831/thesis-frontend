import styled from 'styled-components';

export const BoxContainer = styled.div<{ fullwidth?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  padding: 1rem;
  margin: 0.5rem 1.5rem 2rem 1.5rem;
  width: ${({ fullwidth }) => (fullwidth ? '100%' : '-webkit-fill-available')};
`;

export const style = (direction: 'column' | 'row') => ({
  display: 'flex',
  flexDirection: direction,
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  width: '100%',
  height: '100%'
});
