import { Box, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BasicModal from 'components/modal/ShareModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import AddBranchForm from 'components/addBranchForm';
import { useTranslation } from 'react-i18next';
import { ICompany, ISelectCategory } from 'interfaces';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/pagination';
import SelectPerPage from 'components/selectPerPAge';
import SearchForm from 'components/searchForm';
import SelectSort from 'components/selectSort';
// import CustomDataGridFooter from 'components/common/table/CustomDataGridFooter';
import Lottie from 'lottie-react';
import deleteAnimation from '../../components/animations/delete.json';
import DeleteModal from 'components/deleteModal';
import { checkPermissions, deleteAnyThing, fetchAllData, parsedData } from 'functions';
import PackagesPageSkeleton from 'components/skelton';
import { deleteAnyThingGold, fetchAllDataGold } from 'functionsWork';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import AddCompanyForm from 'components/addCompanyForm';
import UpdateCompanyForm from 'components/updateCompanyForm/UpdateCompanyForm';
// Fetch packages function
interface IProps {
  isDashBoard: boolean;
}
function CompaniesPage({ isDashBoard }: IProps) {
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
  // delete modal
  const [opend, setOpend] = useState(false);
  const handleOpend = () => setOpend(true);
  const handleClosed = () => setOpend(false);
  // Define a state to store selected package data
  const [selectedcompany, setselectedcompany] = useState<null | ICompany>(null);

  const handleEditOpen = (companyData: ICompany) => {
    setselectedcompany(companyData); // Set selected package data
    handleOpenU(); // Open the update modal
  };

  // fetch from api
  // fetchCategories();

  // Columns configuration
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    i18n.language === 'ar'
      ? { field: 'address', headerName: 'العنوان', flex: 0.4 }
      : { field: 'address', headerName: 'Address', flex: 0.4 },
    i18n.language === 'ar'
      ? { field: 'client_name', headerName: 'أسم العميل', flex: 0.4 }
      : { field: 'client_name', headerName: 'Client Name', flex: 0.4 },

    i18n.language === 'ar'
      ? { field: 'email', headerName: 'البريد الألكترونى', flex: 0.4 }
      : { field: 'email', headerName: 'email', flex: 0.4 },
    i18n.language === 'ar'
      ? { field: 'name', headerName: 'أسم الشركة', flex: 0.4 }
      : { field: 'name', headerName: 'Company Name', flex: 0.4 },
    i18n.language === 'ar'
      ? { field: 'phone1', headerName: 'رقم الهاتف 1', flex: 0.4 }
      : { field: 'phone1', headerName: 'Phone Number 1', flex: 0.4 },
    i18n.language === 'ar'
      ? { field: 'phone2', headerName: 'رقم الهاتف 2', flex: 0.4 }
      : { field: 'phone2', headerName: 'Phone Number 2', flex: 0.4 },
    i18n.language === 'ar'
      ? { field: 'tax_end_date', headerName: 'انتهاء البطاقة الضريبية', flex: 0.4 }
      : { field: 'tax_end_date', headerName: 'Tax End Date', flex: 0.4 },
    i18n.language === 'ar'
      ? { field: 'tax_num', headerName: 'رقم البطاقة', flex: 0.4 }
      : { field: 'tax_num', headerName: 'Tax Number', flex: 0.4 },
    {
      field: 'logo',
      headerName: i18n.language === 'ar' ? 'الصورة' : 'logo',

      flex: 1,

      renderCell: (params) =>
        params.value ? (
          <img
            src={params.row.logo}
            alt={params.row.name}
            style={{ width: '100%', height: '100%' }}
            onClick={() => console.log(params)}
          />
        ) : (
          <img
            src={imgNotFound}
            alt={params.row.name}
            style={{ width: '100%', height: '100%' }}
            onClick={() => console.log(params)}
          />
        ),
    },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          <Button
            variant="contained"
            color="error"
            // onClick={() => deleteCategory(params.row.id, refetch)}
            onClick={() => {
              handleOpend();
              setTempId(params.row.id);
            }}
          >
            {/* {t("delete")} */}
            <Trash2 />
          </Button>

          <Button
            variant="contained"
            color="info"
            onClick={() => navigate(`${paths.categories}/${params.row.id}`)}
          >
            {/* {t("view")}  */}
            <Eye />
          </Button>

          <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
            {/* {t("edit")} */}
            <Pencil />
          </Button>
        </Stack>
      ),
    },
  ];

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`companies-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchAllDataGold(page, per, search, sort, '', 'companies'),
  });

  if (isLoading) return <PackagesPageSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;
  console.log(data);
  const rows =
    data?.data?.data?.length > 0
      ? data?.data?.data?.map((company: ICompany) => ({
          ...company,
        }))
      : [];
  const totalItems = data.data?.pagination?.total;
  return (
    <>
      {!isDashBoard && (
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h1" color="initial">
            {t('categories')}
          </Typography>

          {
            // checkPermissions(parsedData,'add-category') &&
            <Button variant="contained" color="info" onClick={handleOpen}>
              {t('AddCategory')}
            </Button>
          }
        </Stack>
      )}

      <Paper sx={{ width: '100%' }}>
        {isDashBoard && (
          <Typography variant="h1" color="initial">
            {t('categories')}
          </Typography>
        )}
        <Stack flexDirection={'row'} alignItems={'center'}>
          <SelectSort data={['asc', 'desc']} setSortFun={setSort} sortVal={sort} />

          <SearchForm setsearch={setSearch} isDashBoard={isDashBoard} />
        </Stack>
        <DataGrid
          rows={rows}
          columns={columns}
          // initialState={{ pagination: { paginationModel } }}
          // pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          autoHeight
          getRowHeight={() => 200} // Set each row's height to 200px
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
            pageCounter={totalItems / per <= 1 ? 1 : Math.ceil(totalItems / per)}
            setPage={setPage}
          />
          <SelectPerPage perPage={per} setPerPage={setper} />
        </Stack>
      </Paper>

      {/* add modal */}
      <BasicModal open={open} handleClose={handleClose}>
        <h2>{t('AddCategory')}</h2>

        <AddCompanyForm handleClose={handleClose} refetch={refetch} />
      </BasicModal>

      <DeleteModal
        handleClosed={handleClosed}
        opend={opend}
        refetch={refetch}
        tempId={tempId}
        deleteFunc={() => {
          deleteAnyThingGold(tempId, refetch, 'companies');
        }}
      />
      {/* update modal */}
      <BasicModal open={openU} handleClose={handleCloseU}>
        <h2>{t('updateCategory')}</h2>
        <UpdateCompanyForm
          handleClose={handleCloseU}
          initialData={selectedcompany}
          refetch={refetch}
        />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default CompaniesPage;
