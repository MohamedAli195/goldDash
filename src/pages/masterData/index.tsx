import React, { useState } from 'react';
import Company from './components/Company';
import Cashier from './components/Cashier';
import Branch from './components/Branch';

import { Box, Button, Stack } from '@mui/material';
import CompaniesPage from 'pages/comapanies';
import BranchesPage from 'pages/branches';
import CashiersPage from 'pages/cashiers';

// interface IContent {
//     content : "company"|"cashier"|"branch"|"factory"
// }
function MasterDataPage() {
  const [content, setContent] = useState('company');

  const render = () => {
    if (content === 'company') return <CompaniesPage isDashBoard={false} />;
    if (content === 'cashier') return <CashiersPage isDashBoard={false} />;
    if (content === 'branch') return <BranchesPage isDashBoard={false} />;
  };

  return (
    <>
      <Stack flexDirection={'row'}>
        <Box onClick={() => setContent('company')}>
          <Button>company</Button>
        </Box>
        <Box onClick={() => setContent('branch')}>
          <Button>branch</Button>
        </Box>
        <Box onClick={() => setContent('cashier')}>
          <Button>cashier</Button>
        </Box>
      </Stack>

      {render()}
    </>
  );
}

export default MasterDataPage;
