import { Button, Stack } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { ICashier, ICompany } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
interface IProps {
  handleEditOpen:(val:ICashier)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: ICashier[];
  handleViewOpen:(val:ICashier)=>void
}
function CashierTable({data,handleEditOpen,setTempId,handleOpend,handleViewOpen}: IProps) {

  console.log(data)
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },

    i18n.language === 'ar'
      ? { field: 'name', headerName: 'أسم الكاشير', flex: 0.4 }
      : { field: 'name', headerName: 'Cashier Name', flex: 0.4 },

    i18n.language === 'ar'
      ? { field: 'national_id', headerName: 'رقم الهوية', flex: 0.4 }
      : { field: 'national_id', headerName: 'National ID', flex: 0.4 },

    // i18n.language === 'ar'
    //   ? { field: 'phone1', headerName: 'رقم الهاتف 1', flex: 0.4 }
    //   : { field: 'phone1', headerName: 'Phone Number 1', flex: 0.4 },
    // i18n.language === 'ar'
    //   ? { field: 'phone2', headerName: 'رقم الهاتف 2', flex: 0.4 }
    //   : { field: 'phone2', headerName: 'Phone Number 2', flex: 0.4 },
    { field: 'BranchCode', headerName:i18n.language === 'ar' ? 'كود الفرع':'Branch code', renderCell: (params) => (params.row.branch.id), flex: 0.4 },
    { field: 'BranchName', headerName:i18n.language === 'ar' ? 'أسم الفرع':'Branch Name', renderCell: (params) => (params.row.branch.name), flex: 0.4 },


    i18n.language === 'ar'
      ? { field: 'address', headerName: 'العنوان', flex: 0.4 }
      : { field: 'address', headerName: 'Address', flex: 0.4 },

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
            onClick={() => handleViewOpen(params.row)}
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


  const rows =
    data.length > 0
      ? data.map((cashier: ICashier) => ({
          ...cashier,
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

export default CashierTable;
