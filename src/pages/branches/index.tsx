import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/common/modal/ShareModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import AddBranchForm from 'components/Branches/addBranchForm';
import { useTranslation } from 'react-i18next';
import { IBranch } from 'interfaces';
import { Eye, Trash2, Pencil } from 'lucide-react';

import SelectPerPage from 'components/common/selectPerPAge';
import SearchForm from 'components/common/searchForm';
import SelectSort from 'components/common/selectSort';

import DeleteModal from 'components/common/deleteModal'; 
import PackagesPageSkeleton from 'components/common/skelton';
import { deleteAnyThingGold, fetchAllDataGold } from 'functionsWork';

import UpdateBrancheForm from 'components/Branches/UpdateBrancheForm/UpdateBrancheForm';

import BranchTable from 'components/Branches/BranchTable';
import PaginationComponent from 'components/common/pagination';
import ViewBrancheForm from 'components/Branches/ViewBrancheForm/ViewBrancheForm';
// Fetch packages function
interface IProps {
  isDashBoard: boolean;
}
function BranchesPage({ isDashBoard }: IProps) {
  // states
  const [page, setPage] = useState(1);
  const [per, setper] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [tempId, setTempId] = useState(1);

  // add modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // update modal
  const [openU, setOpenU] = useState(false);
  const handleOpenU = () => setOpenU(true);
  const handleCloseU = () => setOpenU(false);

    // view modal
    const [openV, setOpenV] = useState(false);
    const handleOpenV = () => setOpenV(true);
    const handleCloseV = () => setOpenV(false);
  // delete modal
  const [opend, setOpend] = useState(false);
  const handleOpend = () => setOpend(true);
  const handleClosed = () => setOpend(false);
  // Define a state to store selected package data
  const [selectedBranch, setSelectedBranch] = useState<null | IBranch>(null);

  const handleEditOpen = (BranchData: IBranch) => {
    setSelectedBranch(BranchData); // Set selected package data
    handleOpenU(); // Open the update modal
  };

  const handleViewOpen = (BranchData: IBranch) => {
    setSelectedBranch(BranchData); // Set selected package data
    handleOpenV(); // Open the update modal
  };

  // fetch from api
  // fetchCategories();

  // Columns configuration


  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`Branches-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchAllDataGold(page, per, search, sort, '', 'branches'),
  });

  if (isLoading) return <PackagesPageSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;

  const rows =
    data?.data?.data?.length > 0
      ? data?.data?.data?.map((branch: IBranch) => ({
          ...branch,
        }))
      : [];
      const totalItems = data.data?.pagination?.total;
   return (
    <>
      {!isDashBoard && (
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h1" color="initial">
            {t('Branches')}
          </Typography>

          {
            // checkPermissions(parsedData,'add-category') &&
            <Button variant="contained" color="info" onClick={handleOpen}>
              {t('Add Branch')}
            </Button>
          }
        </Stack>
      )}

      <Paper sx={{ width: '100%' }}>
        {isDashBoard && (
          <Typography variant="h1" color="initial">
            {t('Branches')}
          </Typography>
        )}
        <Stack flexDirection={'row'} alignItems={'center'}>
          <SelectSort data={['asc', 'desc']} setSortFun={setSort} sortVal={sort} />

          <SearchForm setsearch={setSearch} isDashBoard={isDashBoard} />
        </Stack>
        <BranchTable
          data={data?.data?.data}
          handleEditOpen={handleEditOpen}
          handleOpend={handleOpend}
          setTempId={setTempId}
          handleViewOpen={handleViewOpen}
        />
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{ marginTop: 2, mx: 2 }}
        >
          <PaginationComponent
            page={page}
            pageCounter={totalItems / per <= 1 ? 1 : Math.ceil(totalItems / per)}
            setPage={setPage}
          />
          <SelectPerPage perPage={per} setPerPage={setper} />
        </Stack>
      </Paper>

      {/* add modal */}
      <BasicModal open={open} handleClose={handleClose}>
      <Box component={"h2"} sx={{fontSize:"32px",textAlign:"center" }}>{t('Add Branch')}</Box>

        <AddBranchForm handleClose={handleClose} refetch={refetch} />
      </BasicModal>

      <DeleteModal
        handleClosed={handleClosed}
        opend={opend}
        refetch={refetch}
        tempId={tempId}
        deleteFunc={() => {
          deleteAnyThingGold(tempId, refetch, 'branches');
        }}
      />
      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>{t('Update Btanch')}</h2>
        <UpdateBrancheForm
          handleClose={handleCloseU}
          initialData={selectedBranch}
          refetch={refetch}
        />
      </BasicModal>


      {/* View modal */}
      <BasicModal open={openV} handleClose={handleCloseV}>
        <ViewBrancheForm
          handleClose={handleCloseV}
          initialData={selectedBranch}
          refetch={refetch}
        />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default BranchesPage;
