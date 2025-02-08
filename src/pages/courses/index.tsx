import { Button, Stack, Typography, Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import { useTranslation } from 'react-i18next';
import { ICourse, ICourseSelect, IFormInputCourses } from 'interfaces';
import { Eye, Trash2, Pencil } from 'lucide-react';
import PaginationComponent from 'components/pagination';
import SelectPerPage from 'components/selectPerPAge';
import SearchForm from 'components/searchForm';
import SelectSort from 'components/selectSort';
import BasicModal from 'components/modal/ShareModal';
import SwitchStatus from 'components/switch';
import DeleteModal from 'components/deleteModal';
import { checkPermissions, deleteAnyThing, fetchAllData, parsedData } from 'functions';
import PackagesPageSkeleton from 'components/skelton';
import AddCourseForm from 'components/AddCourseForm';

// Fetch packages function
interface IProps {
  isDashBoard: boolean;
}
function CoursesPage({ isDashBoard }: IProps) {
  // states
  const [page, setPage] = useState(1);
  const [per, setper] = useState(10);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [tempId, setTempId] = useState(1);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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
  const [selectedCourse, setSelectedCourse] = useState<null | IFormInputCourses | undefined>(null);
  const handleEditOpen = (packageData: IFormInputCourses) => {
    setSelectedCourse(packageData); // Set selected package data
    handleOpenU(); // Open the update modal
  };
  // Columns configuration
  const columns: GridColDef[] = !isDashBoard
    ? [
        { field: 'id', headerName: 'ID', width: 30 },
        i18n.language === 'ar'
          ? { field: 'nameAr', headerName: 'اسم الكورس', flex: 1 }
          : { field: 'nameEn', headerName: 'Name ', flex: 1 },
        { field: 'price', headerName: i18n.language === 'ar' ? 'السعر' : 'price' },
        i18n.language === 'ar'
          ? { field: 'categoryAr', headerName: 'القسم', flex: 1 }
          : { field: 'categoryEn', headerName: 'category ', flex: 1 },
        {
          field: 'image',
          headerName: i18n.language === 'ar' ? 'الصورة' : 'image',
          flex: 1.5,
          renderCell: (params) =>
            params.value ? (
              <img
                src={params.value}
                alt={params.row.name}
                style={{ width: '100%', height: 'auto' }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Image
              </Typography>
            ),
        },
        {
          field: 'status',
          headerName: i18n.language === 'ar' ? 'الحالة' : 'status',
          width: 130,
          renderCell: (params) => (
            <SwitchStatus id={params.row.id} url={'courses'} apiStatus={params.row.status} />
          ),
        },
        {
          field: 'actions',
          headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
          width: 130,
          flex: 1,
          renderCell: (params) => (
            <Stack direction="row" gap={1}>
              {
                checkPermissions(parsedData,'delete-course') &&  <Button
                variant="contained"
                color="error"
                // onClick={() => deleteCourse(params.row.id, refetch)}
                onClick={() => {
                  handleOpend();
                  setTempId(params.row.id);
                }}
              >
                {/* {t("delete")} */}
                <Trash2 />
              </Button>
              }
              {
                checkPermissions(parsedData,'show-courses') && <Button
                variant="contained"
                color="info"
                onClick={() => navigate(`${paths.courses}/${params.row.id}`)}
              >
                {/* {t("view")} */}
                <Eye />
              </Button>
              }

{
   checkPermissions(parsedData,'edit-course') && <Button
   variant="contained"
   color="primary"
   onClick={() => navigate(`${paths.courses}/update/${params.row.id}`)}
 >
   {/* {t("edit")} */}
   <Pencil />
 </Button>
}

            </Stack>
          ),
        },
      ]
    : [
        { field: 'id', headerName: 'ID', width: 30 },
        i18n.language === 'ar'
          ? { field: 'nameAr', headerName: 'اسم الكورس', flex: 1 }
          : { field: 'nameEn', headerName: 'Name ', flex: 1 },

        { field: 'price', headerName: i18n.language === 'ar' ? 'السعر' : 'price' },
        i18n.language === 'ar'
          ? { field: 'categoryAr', headerName: 'القسم', flex: 1 }
          : { field: 'categoryEn', headerName: 'category ', flex: 1 },
      ];

  // Fetch packages using React Query
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: [`courses-${page}-${per}-${search}-${sort}`],
    queryFn: () => fetchAllData(page, per, search, sort, '', 'courses'),
  });

  // Prepare rows for DataGrid
  const rows =
    data?.data?.data?.length > 0
      ? data?.data?.data.map((packageItem: ICourse) => ({
          id: packageItem.id,
          nameEn: packageItem.name?.en,
          nameAr: packageItem.name?.ar,
          price: packageItem.price,
          image: packageItem.image,
          status: packageItem.status,
          categoryEn: packageItem.category?.name?.en,
          categoryAr: packageItem.category?.name?.ar,
          packageEn: packageItem.package?.name?.en,
          packageAr: packageItem.package?.name?.ar,
          // descriptionEn: packageItem.description.en,
          // descriptionAr: packageItem.description.ar,
        }))
      : [];
  if (isLoading) return <PackagesPageSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;
  // console.log(data)
  const totalItems = data.data?.total;
  return (
    <>
      {isDashBoard ? (
        ''
      ) : (
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
          height={''}
        >
          <Typography variant="h1" color="initial">
            {t('courses')}
          </Typography>

          {
            checkPermissions(parsedData,'add-course') &&  <Button variant="contained" color="info" onClick={() => handleOpen()}>
            {t('AddCourse')}
          </Button>
          }
         
        </Stack>
      )}

      <Paper sx={{ width: '100%' }}>
        {isDashBoard && (
          <Typography variant="h1" color="initial" sx={{ m: 2 }}>
            {t('courses')}
          </Typography>
        )}
        {!isDashBoard && (
          <Stack flexDirection={'row'} alignItems={'center'}>
            <SelectSort data={['asc', 'desc']} setSortFun={setSort} sortVal={sort} />

            <SearchForm isDashBoard={isDashBoard} setsearch={setSearch} />
          </Stack>
        )}

        <DataGrid
          rows={rows}
          columns={columns}
          // initialState={{ pagination: { paginationModel } }}
          // pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
          autoHeight
          getRowHeight={() => (!isDashBoard ? 200 : 'auto')} // Set each row's height to 200px
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

      <DeleteModal
        handleClosed={handleClosed}
        opend={opend}
        refetch={refetch}
        tempId={tempId}
        deleteFunc={() => {
          deleteAnyThing(tempId, refetch, 'courses');
        }}
      />

       {/* add modal */}
       <BasicModal open={open} handleClose={handleClose}>
        <h2>{t('AddCourse')}</h2>
        <AddCourseForm handleClose={handleClose} refetch={refetch} />
      </BasicModal>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default CoursesPage;
