import { Button, Stack } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { IBranch, ICashier, ICompany } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
interface IProps {
  handleEditOpen:(val:IBranch)=>void
  handleOpend:()=>void
  setTempId:(val:number)=>void
  data: IBranch[];
}
function BranchTable({data,handleEditOpen,setTempId,handleOpend}: IProps) {

  const navigate = useNavigate();
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
      ? { field: 'name', headerName: 'أسم الفرع', flex: 0.4 }
      : { field: 'name', headerName: 'Branch Name', flex: 0.4 },
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
    i18n.language === 'ar'
      ? { field: 'company_id', headerName: 'كود الشركة', flex: 0.4 }
      : { field: 'company_id', headerName: 'Company code', flex: 0.4 },
    i18n.language === 'ar'
      ? { field: 'company_name', headerName: 'أسم الشركة', flex: 0.4 }
      : { field: 'company_name', headerName: 'Company Name', flex: 0.4 },

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


  const rows =
    data.length > 0
      ? data.map((branch: IBranch) => ({
          ...branch,
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

export default BranchTable;
