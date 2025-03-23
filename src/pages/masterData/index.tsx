import React from 'react';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import CompaniesPage from 'pages/comapanies';
import BranchesPage from 'pages/branches';
import PointOfSalesPage from 'pages/point-of-sales';

function MasterDataPage() {
  return (
    <>
      <Stack flexDirection={'row'} alignItems={"center"}>
        <Box>
          <Button component={Link} to="/masterData">Company</Button>
        </Box>
        <Box>
          <Button component={Link} to="/masterData/branch">Branch</Button>
        </Box>
        <Box>
          <Button component={Link} to="/masterData/point-of-sales">Point Of Sales</Button>
        </Box>
      </Stack>


      <Outlet />

    </>
  );
}

export default MasterDataPage;
