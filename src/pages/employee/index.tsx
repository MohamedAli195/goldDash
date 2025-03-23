import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/common/modal/ShareModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';

import { useTranslation } from 'react-i18next';
import { ICashier, IEmployee } from 'interfaces';
import { Eye, Trash2, Pencil } from 'lucide-react';

import SelectPerPage from 'components/common/selectPerPAge';
import SearchForm from 'components/common/searchForm';
import SelectSort from 'components/common/selectSort';

import DeleteModal from 'components/common/deleteModal'; 

import PackagesPageSkeleton from 'components/common/skelton';
import { deleteAnyThingGold, fetchAllDataGold } from 'functionsWork';

import AddPosForm from 'components/Point-Of-Sales/addPosForm';

import CashierTable from 'components/Point-Of-Sales/CashierTable';
import PaginationComponent from 'components/common/pagination';

import EmployTable from 'components/Employ/EmployTable';
import UpdateEmployForm from 'components/Employ/UpdateEmployForm/UpdateEmployForm';
import ViewEmployForm from 'components/Employ/ViewEmployForm/ViewEmployForm';
import AddEmployForm from 'components/Employ/addEmployForm';
// Fetch packages function
interface IProps {
  isDashBoard: boolean;
}
function EmployeePage({ isDashBoard }: IProps) {
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
  const [selectedEmpoly, setSelectedEmpoly] = useState<null | IEmployee>(null);

  const handleEditOpen = (EmployData: IEmployee) => {
    setSelectedEmpoly(EmployData); // Set selected package data
    handleOpenU(); // Open the update modal
  };
    const handleViewOpen = (CashierData: IEmployee) => {
      setSelectedEmpoly(CashierData); // Set selected package data
      handleOpenV(); // Open the update modal
    };



  // Columns configuration
  // const columns: GridColDef[] = [
  //   { field: 'id', headerName: 'ID' },

  //   i18n.language === 'ar'
  //     ? { field: 'name', headerName: 'أسم الكاشير', flex: 0.4 }
  //     : { field: 'name', headerName: 'Cashier Name', flex: 0.4 },

  //   i18n.language === 'ar'
  //     ? { field: 'national_id', headerName: 'رقم الهوية', flex: 0.4 }
  //     : { field: 'national_id', headerName: 'National ID', flex: 0.4 },

  //   i18n.language === 'ar'
  //     ? { field: 'phone1', headerName: 'رقم الهاتف 1', flex: 0.4 }
  //     : { field: 'phone1', headerName: 'Phone Number 1', flex: 0.4 },
  //   i18n.language === 'ar'
  //     ? { field: 'phone2', headerName: 'رقم الهاتف 2', flex: 0.4 }
  //     : { field: 'phone2', headerName: 'Phone Number 2', flex: 0.4 },

  //   i18n.language === 'ar'
  //     ? { field: 'email', headerName: 'البريد الألكترونى', flex: 0.4 }
  //     : { field: 'email', headerName: 'email', flex: 0.4 },

  //   i18n.language === 'ar'
  //     ? { field: 'address', headerName: 'العنوان', flex: 0.4 }
  //     : { field: 'address', headerName: 'Address', flex: 0.4 },

  //   {
  //     field: 'actions',
  //     headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
  //     flex: 1,
  //     renderCell: (params) => (
  //       <Stack direction="row" gap={1}>
  //         <Button
  //           variant="contained"
  //           color="error"
  //           // onClick={() => deleteCategory(params.row.id, refetch)}
  //           onClick={() => {
  //             handleOpend();
  //             setTempId(params.row.id);
  //           }}
  //         >
  //           {/* {t("delete")} */}
  //           <Trash2 />
  //         </Button>

  //         <Button
  //           variant="contained"
  //           color="info"
  //           onClick={() => navigate(`${paths.categories}/${params.row.id}`)}
  //         >
  //           {/* {t("view")}  */}
  //           <Eye />
  //         </Button>

  //         <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
  //           {/* {t("edit")} */}
  //           <Pencil />
  //         </Button>
  //       </Stack>
  //     ),
  //   },
  // ];

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`employees-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchAllDataGold(page, per, search, sort, '', 'employees'),
  });
  console.log(data);

  if (isLoading) return <PackagesPageSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;

  const rows =
    data?.data?.data?.length > 0
      ? data?.data?.data?.map((employee: IEmployee) => ({
          ...employee,
        }))
      : [];
      const totalItems = data.data?.pagination?.total;
  return (
    <>
      {!isDashBoard && (
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h1" color="initial">
            {t('Employees')}
          </Typography>

          {
            // checkPermissions(parsedData,'add-category') &&
            <Button variant="contained" color="info" onClick={handleOpen}>
              {t('Add Employee')}
            </Button>
          }
        </Stack>
      )}

      <Paper sx={{ width: '100%' }}>
        {isDashBoard && (
          <Typography variant="h1" color="initial">
            {t('Employees')}
          </Typography>
        )}
        <Stack flexDirection={'row'} alignItems={'center'}>
          <SelectSort data={['asc', 'desc']} setSortFun={setSort} sortVal={sort} />

          <SearchForm setsearch={setSearch} isDashBoard={isDashBoard} />
        </Stack>

        <EmployTable
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

        <AddEmployForm handleClose={handleClose} refetch={refetch} />
      </BasicModal>

      <DeleteModal
        handleClosed={handleClosed}
        opend={opend}
        refetch={refetch}
        tempId={tempId}
        deleteFunc={() => {
          deleteAnyThingGold(tempId, refetch, 'employees');
        }}
      />
      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>{t('updateCategory')}</h2>
        <UpdateEmployForm
          handleClose={handleCloseU}
          initialData={selectedEmpoly}
          refetch={refetch}
        />
      </BasicModal>


            {/* View modal */}
            <BasicModal open={openV} handleClose={handleCloseV}>
        <ViewEmployForm
        handleClose={handleCloseV}
          initialData={selectedEmpoly}
          refetch={refetch}
        />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default EmployeePage;
