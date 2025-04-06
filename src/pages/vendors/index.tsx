import React from 'react';
import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import { Box, Button, Stack } from '@mui/material';
import CompaniesPage from 'pages/comapanies';
import BranchesPage from 'pages/branches';
import PointOfSalesPage from 'pages/point-of-sales';

function Vendors() {
  return (
    <>
      <Stack flexDirection={'row'} alignItems={"center"}>
        <Box>
          <Button component={Link} to="/vendors">vendors</Button>
        </Box>
        <Box>
          <Button component={Link} to="/vendors/sales-invoice">sales invoice</Button>
        </Box>
        <Box>
          <Button component={Link} to="/vendors/buy-invoice">buy invoice</Button>
        </Box>
      </Stack>


      <Outlet />

    </>
  );
}

export default Vendors;
