import { Box, styled } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import estyled from '@emotion/styled';

const NotFound = () => {
  const _location = useLocation();
  const _to = useNavigate();

  useEffect(() => {
    document.title = 'Not Found';
  }, []);

  return (
    <BoxRoot>
      <BoxTitle>Not Found</BoxTitle>
      <BoxDesc>
        <div>
          useLocation() : {JSON.stringify(_location, undefined, '\t')}
        </div>
      </BoxDesc>
    </BoxRoot >
  );
};

const BoxRoot = styled(Box)`
  height: 100vh;
  padding: 2rem;
`;

const BoxTitle = styled(Box)`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 1em auto;
`;

const BoxDesc = styled(Box)`
  color: ${({ theme, children }) => theme.palette.secondary.main};
  display: flex;
  justify-content: center;
  white-space: break-spaces;
  word-break: keep-all;
`;

export default NotFound;
