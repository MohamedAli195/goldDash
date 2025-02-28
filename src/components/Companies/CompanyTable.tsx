import { Button, Stack } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { ICompany } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
interface IProps {
  handleEditOpen:(val:ICompany)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: ICompany[];
  handleViewOpen:(val:ICompany)=>void
}
function CompanyTable({data,handleEditOpen,setTempId,handleOpend,handleViewOpen}: IProps) {

  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'address', headerName: i18n.language === 'ar' ? 'العنوان' :'Address', flex: 0.4 },
    { field: 'client_name', headerName: i18n.language === 'ar' ? 'أسم العميل' :'Client Name', flex: 0.4 },
    { field: 'email', headerName: i18n.language === 'ar' ? 'البريد الألكترونى' :'email', flex: 0.4 },
    { field: 'name', headerName: i18n.language === 'ar' ? 'أسم الشركة' :'Company Name', flex: 0.4 },
    // i18n.language === 'ar'
    //   ? { field: 'name', headerName: 'أسم الشركة', flex: 0.4 }
    //   : { field: 'name', headerName: 'Company Name', flex: 0.4 },
    // i18n.language === 'ar'
    //   ? { field: 'phone1', headerName: 'رقم الهاتف 1', flex: 0.4 }
    //   : { field: 'phone1', headerName: 'Phone Number 1', flex: 0.4 },
    // i18n.language === 'ar'
    //   ? { field: 'phone2', headerName: 'رقم الهاتف 2', flex: 0.4 }
    //   : { field: 'phone2', headerName: 'Phone Number 2', flex: 0.4 },
    // i18n.language === 'ar'
    //   ? { field: 'tax_end_date', headerName: 'انتهاء البطاقة الضريبية', flex: 0.4 }
    //   : { field: 'tax_end_date', headerName: 'Tax End Date', flex: 0.4 },
    // i18n.language === 'ar'
    //   ? { field: 'tax_num', headerName: 'رقم البطاقة', flex: 0.4 }
    //   : { field: 'tax_num', headerName: 'Tax Number', flex: 0.4 },
    {
      field: 'logo',
      headerName: i18n.language === 'ar' ? 'الصورة' : 'logo',

      flex: 0.5,

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
            // onClick={() => navigate(`${paths.categories}/${params.row.id}`)}     
            onClick={() => handleViewOpen(params.row)} >
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


  const rows =
    data.length > 0
      ? data.map((company: ICompany) => ({
          ...company,
        }))
      : [];
  return (
    <DataGrid
      rows={rows}
      columns={columns}
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
  );
}

export default CompanyTable;
