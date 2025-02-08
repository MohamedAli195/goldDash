import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/modal/ShareModal';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import { useTranslation } from 'react-i18next';
import AddCustomer from 'components/addCustomer';
import UpdateCustomerForm from 'components/updatePacageForm/updateCustomer';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/pagination';
import SelectPerPage from 'components/selectPerPAge';
import SearchForm from 'components/searchForm';
import { ICustomer, IOrder } from 'interfaces';
import SelectSort from 'components/selectSort';
import DeleteModal from 'components/deleteModal';
// import { fetchCustomers } from 'pages/customers/costumersFunct';
import UpdateOrderForm from 'components/updateOrderForm';
import { fetchAllData } from 'functions';
import PackagesPageSkeleton from 'components/skelton';

// Fetch packages function
interface IProps {
  isDashBoard:boolean
}
function OrdersPage({isDashBoard}:IProps) {
  const [page, setPage] = useState(1);
  const [per, setper] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [typeFilter, setTypeFilter] = useState('course');
  const { t, i18n } = useTranslation();
  const [tempId, setTempId] = useState(1);
  // delete modal
  const [opend, setOpend] = useState(false);
  const handleOpend = () => setOpend(true);
  const handleClosed = () => setOpend(false);
  // states
  const navigate = useNavigate();
  // add modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  // update modal
  const [openU, setOpenU] = useState(false);
  const handleOpenU = () => setOpenU(true);
  const handleCloseU = () => setOpenU(false);
  // Define a state to store selected package data
  const [selectedPackage, setSelectedPackage] = useState<null | IOrder>(null);

  const handleEditOpen = (packageData: IOrder) => {
    setSelectedPackage(packageData); // Set selected package data
    handleOpenU(); // Open the update modal
  };

  // fetch from api
  // fetchCustomers();

  // Columns configuration
  const columns: GridColDef[] = 
  !isDashBoard ?
  [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: i18n.language === 'ar' ? 'الاسم' : 'name', flex: 0.5 },
    { field: 'order_type', headerName: i18n.language === 'ar' ? 'نوع الطلب' : 'order type', flex: 0.5},
    { field: 'created_at', headerName: i18n.language === 'ar' ? 'تاريخ الطلب' : 'created at', flex: 0.5 },

    { field: 'total', headerName: i18n.language === 'ar' ? 'الاجمالى' : 'total ' },
    { field: 'status', headerName: i18n.language === 'ar' ? 'الحالة' : 'status ',
      flex: 0.5,

      renderCell: (params) => (
        <span
          style={{
            color: params.value === 'accepted' ? 'green' : params.value === 'canceled' ? '#ffd7d7' :'blue',
            backgroundColor: params.value === 'accepted' ? '#a8f1cd' : params.value === 'canceled' ? '#FF0000' :'#6691e7',
            fontWeight: 'bold',
            padding:10,
            display:'inline-block',
            borderRadius:10
          }}
        >
          {params.value}
        </span>
      ),
     },
    {
      field: 'payment_method',
      headerName: i18n.language === 'ar' ? 'طريقة الدفع' : 'payment method',
    
    },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      flex: 0.5,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          <Button
            variant="contained"
            color="info"
            // onClick={() => navigate(`${paths.customers}/${params.row.id}`)}
          >
            {/* {t('view')} */}
            <Eye />
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
            {/* {t('edit')} */}
            <Pencil />
          </Button>
        </Stack>
      ),
    },
  ]:[ { field: 'id', headerName: 'ID' },
    i18n.language === 'ar'
      ? { field: 'name', headerName: 'الاسم', flex: 1 }
      : { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: i18n.language === 'ar' ? 'الايميل' : 'email', flex: 1 },

    { field: 'phone', headerName: i18n.language === 'ar' ? 'الحالة' : 'phone', flex: 1 },];

  // Pagination settings
  // const paginationModel = { page: 0, pageSize: 5 };

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`orders-${page}-${per}-${search}-${sort}-${typeFilter}`],
    queryFn: () => fetchAllData(page, per, search, sort,typeFilter,'orders'),
  });

  if (isLoading) return <PackagesPageSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;

  // Prepare rows for DataGrid
  // console.log(data.data.data);
  const rows =
  data?.data?.data?.length > 0
    ? data?.data?.data?.map((orderItem: IOrder) => ({
        id:  orderItem.id,
        name: orderItem.user.name,
        order_type: orderItem.order_type,
        created_at: formatDate(orderItem.created_at), // Format created_at
        status: orderItem.status,
        payment_method: orderItem.payment_method,
        total: orderItem.total,
      }))
    : [];
  const totalItems = data?.data?.total;
  return (
    <>

    {
      !isDashBoard &&<Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mb={3}
      height={''}
    >
      <Typography variant="h1" color="initial">
        {t('Orders')}
      </Typography>
      {/* <Button variant="contained" color="info" onClick={handleOpen}>
        {t('Addcustomers')}
      </Button> */}
    </Stack> 
    }
      

      <Paper sx={{ width: '100%' }}>

        {
          isDashBoard && <Typography variant="h1" color="initial" sx={{m:2}}>
         {t('Orders')}
        </Typography>
        }
        {
          !isDashBoard && <Stack flexDirection={'row'} alignItems={'center'}>
          <SelectSort data={['asc', 'desc']} setSortFun={setSort} sortVal={sort} />
          <SelectSort data={['course', 'package']} setSortFun={setTypeFilter} sortVal={typeFilter} />
            <SearchForm setsearch={setSearch} isDashBoard={isDashBoard}/>
          </Stack>
        }
        <DataGrid
          rows={rows}
          columns={columns}
          // initialState={{ pagination: { paginationModel } }}
          // pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          autoHeight
          getRowHeight={() => !isDashBoard ? 200: 'auto'} 
          getRowClassName={(params: GridRowClassNameParams) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
          }
          disableRowSelectionOnClick
          disableMultipleRowSelection
          hideFooterPagination={true}
        />
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{ marginTop: 2, mx: 2 }}
        >
          <PaginationComponent
            page={page}
            pageCounter={totalItems / per <= 1 ? 1 : Math.round(totalItems / per)}
            setPage={setPage}
          />
          <SelectPerPage perPage={per} setPerPage={setper} />
        </Stack>{' '}
      </Paper>

      {/* add modal */}
      <BasicModal open={open} handleClose={handleClose}>
        <h2>{t('Addcustomers')}</h2>

        <AddCustomer handleClose={handleClose} refetch={refetch} />
      </BasicModal>


            {/* delete modal */}
            {/* <BasicModal open={opend} handleClose={handleClosed}>
      <Typography variant="h6" component="h2" gutterBottom>
          Delete
        </Typography>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this Customer?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="outlined" onClick={handleClosed}>
            Close
          </Button>
          <Button variant="contained" color="error" onClick={() => {
            
            deleteCustomer(tempId, refetch)
            handleClosed()
            
            }}>
            Delete 
          </Button>
        </Box>
       
      </BasicModal> */}
      {/* <DeleteModal handleClosed={handleClosed}  opend={opend} refetch={refetch} tempId={tempId} deleteFunc={()=>{deleteCustomer(tempId,refetch)}}/> */}


      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU} isDeleteModal={true}>
        <h2>{t('UpdateOrderstatus')}</h2>
        <UpdateOrderForm
          handleClose={handleCloseU}
          initialData={selectedPackage}
          refetch={refetch}
        />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default OrdersPage;
