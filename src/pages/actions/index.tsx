import { Box, Button, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/common/modal/ShareModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { useTranslation } from 'react-i18next';
import { IAction, ICashier, IEmployee } from 'interfaces';


import SelectPerPage from 'components/common/selectPerPAge';
import SearchForm from 'components/common/searchForm';
import SelectSort from 'components/common/selectSort';

import DeleteModal from 'components/common/deleteModal'; 

import PackagesPageSkeleton from 'components/common/skelton';
import { deleteAnyThingGold, fetchAllDataGold } from 'functionsWork';
import PaginationComponent from 'components/common/pagination';
import EmployActionsTable from 'components/actons/EmployActionsTable';
import UpdateEmployAction from 'components/actons/UpdateEmployActionForm/UpdateEmployActionForm';
import ViewEmployActionForm from 'components/actons/ViewEmployActionForm/ViewEmployActionForm';
import AddActionForm from 'components/actons/addActionForm';
// Fetch packages function
interface IProps {
  isDashBoard: boolean;
}
function ActionsPage({ isDashBoard }: IProps) {
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
  const [selectedAction, setSelectedAction] = useState<null | IAction>(null);

  const handleEditOpen = (actionData: IAction) => {
    setSelectedAction(actionData); // Set selected package data
    handleOpenU(); // Open the update modal
  };
    const handleViewOpen = (actionData: IAction) => {
      setSelectedAction(actionData); // Set selected package da
      handleOpenV(); // Open the update modal
    };

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`employee-actions-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchAllDataGold(page, per, search, sort, '', 'employee-actions'),
  });
  console.log(data);

  if (isLoading) return <PackagesPageSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;
      const totalItems = data.data?.pagination?.total;
  return (
    <>
      {!isDashBoard && (
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h1" color="initial">
            {t('Employee Actions')}
          </Typography>

          {
            // checkPermissions(parsedData,'add-category') &&
            <Button variant="contained" color="info" onClick={handleOpen}>
              {t('Add Action')}
            </Button>
          }
        </Stack>
      )}

      <Paper sx={{ width: '100%' }}>
        {isDashBoard && (
          <Typography variant="h1" color="initial">
            {t('Cashiers')}
          </Typography>
        )}
        <Stack flexDirection={'row'} alignItems={'center'}>
          <SelectSort data={['asc', 'desc']} setSortFun={setSort} sortVal={sort} />

          <SearchForm setsearch={setSearch} isDashBoard={isDashBoard} />
        </Stack>

        <EmployActionsTable
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
        <h2>{t('AddCashier')}</h2>

        <AddActionForm handleClose={handleClose} refetch={refetch} />
      </BasicModal>

      <DeleteModal
        handleClosed={handleClosed}
        opend={opend}
        refetch={refetch}
        tempId={tempId}
        deleteFunc={() => {
          deleteAnyThingGold(tempId, refetch, 'employee-actions');
        }}
      />
      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>{t('updateCategory')}</h2>
        <UpdateEmployAction
          handleClose={handleCloseU}
          initialData={selectedAction}
          refetch={refetch}
        />
      </BasicModal>


            {/* View modal */}
            <BasicModal open={openV} handleClose={handleCloseV}>
        <ViewEmployActionForm
        handleClose={handleCloseV}
          initialData={selectedAction}
          refetch={refetch}
        />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default ActionsPage;
