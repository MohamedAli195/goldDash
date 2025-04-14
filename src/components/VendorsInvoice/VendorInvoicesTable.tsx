import { Box, Button, Stack } from '@mui/material';
import i18n from 'i18n';
import { Eye, MonitorCog, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { IBranch, ICashier, ICompany, IInvoice, IUser } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
interface IProps {

  handleOpend: () => void;

  setTempId: (val: number) => void;
  data: IInvoice[];
  handleViewOpen: (val: IInvoice) => void;
  // handlePermisionsOpen: (val: IUser) => void;
}
function VendorInvoicesTable({
  data,
  setTempId,
  handleOpend,
  handleViewOpen,
}: IProps) {
  console.log(data)
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'gold_vendor_id', headerName: 'رقم المستخدم', flex: 0.4 },
    { field: 'total_999_pure_gold', headerName: '‘total_999_pure_gold', flex: 0.4 },
    { field: 'total_manufacturing', headerName: 'total_manufacturing', flex: 0.4 },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          

          <Button
            variant="contained"
            color="info"
            //   onClick={() => navigate(`${paths.categories}/${params.row.id}`)

            // }
            onClick={() => handleViewOpen(params.row)}
          >
            {/* {t("view")}  */}
            <Eye />
          </Button>

        </Stack>
      ),
    },
  ];

  const rows =
    data?.length > 0
      ? data?.map((invoice: IInvoice) => ({
          ...invoice,
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

export default VendorInvoicesTable;
