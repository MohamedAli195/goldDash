import { Button, Stack } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { ICashier, ICompany, IEmployee } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
interface IProps {
  handleEditOpen:(val:IEmployee)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: IEmployee[];
  handleViewOpen:(val:IEmployee)=>void
}
function EmployTable({data,handleEditOpen,setTempId,handleOpend,handleViewOpen}: IProps) {

  console.log(data)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: i18n.language === 'ar' ? 'أسم الكاشير' :'Empoly Name', flex: 0.4 },
    { field: 'national_id', headerName: i18n.language === 'ar' ? 'رقم الهوية' :'National ID', flex: 0.4 },
    { field: 'salary', headerName: i18n.language === 'ar' ? 'الراتب' :'salary', flex: 0.4 },
    { field: 'hire_date', headerName: i18n.language === 'ar' ? 'تاريخ التعين' :'hire_date', flex: 0.4 },
    { field: 'address', headerName: i18n.language === 'ar' ? 'العنوان' :'address', flex: 0.4 },
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
      ? data.map((cashier: IEmployee) => ({
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

export default EmployTable;
