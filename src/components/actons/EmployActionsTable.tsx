import { Button, Stack } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import { IAction } from 'interfaces';
interface IProps {
  handleEditOpen:(val:IAction)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: IAction[];
  handleViewOpen:(val:IAction)=>void
}
function EmployActionsTable({data,handleEditOpen,setTempId,handleOpend,handleViewOpen}: IProps) {

  console.log(data)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'employee_id', headerName: i18n.language === 'ar' ? 'رقم الموظف' :'employee_id', flex: 0.4 ,renderCell:(params)=>params.row.employee.name},
    { field: 'action_type', headerName: i18n.language === 'ar' ? 'البيان' :'action_type', flex: 0.4 },
    { field: 'amount', headerName: i18n.language === 'ar' ? 'العدد' :'amount', flex: 0.4 },
    { field: 'date', headerName: i18n.language === 'ar' ? 'التاريخ' :'date', flex: 0.4 },
    { field: 'description', headerName: i18n.language === 'ar' ? 'الوصف' :'description', flex: 0.4 },
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
    data?.length > 0
      ? data?.map((action: IAction) => ({
          ...action,
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

export default EmployActionsTable;
