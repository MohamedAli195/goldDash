import { Button, Stack } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { ICompany, IVendor } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
interface IProps {
  handleEditOpen:(val:IVendor)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: IVendor[];
  handleViewOpen:(val:IVendor)=>void
}
function VendorsTable({data,handleEditOpen,setTempId,handleOpend,handleViewOpen}: IProps) {

  console.log(data)
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'address', headerName: i18n.language === 'ar' ? 'العنوان' :'Address', flex: 0.4 },
    { field: 'name', headerName: i18n.language === 'ar' ? 'أسم المورد' :'Name', flex: 0.4 },
    { field: 'email', headerName: i18n.language === 'ar' ? 'البريد الألكترونى' :'email', flex: 0.4 },
    { field: 'phone', headerName: i18n.language === 'ar' ? 'المحمول' :'phone', flex: 0.4 },
    { field: 'identity_id', headerName: i18n.language === 'ar' ? 'الهوية' :'identity_id', flex: 0.4 },
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
      ? data.map((vendor: IVendor) => ({
          ...vendor,
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

export default VendorsTable;
