import { Button, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
interface IProps {
  data: { id: number; name: string; address: string }[];
}
function CompanyTable({data}: IProps) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    {
      field: 'name',
      headerName: i18n.language === 'ar' ? 'اسم الشركة' : 'Company Name',
      flex: 0.5,
    },
    { field: 'address', headerName: i18n.language === 'ar' ? 'العنوان' : 'Address', flex: 1 },
    {
      field: 'actions',
      headerName: i18n.language === 'ar' ? 'العمليات' : 'actions',
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              //   handleOpend()
              //   setTempId(params.row.id)
            }}
          >
            {/* {t('delete')} */}
            <Trash2 />
          </Button>
          <Button
            variant="contained"
            color="primary"
            // onClick={() => navigate(`${paths.packages}/${params.row.id}`)}
          >
            {/* {t('view')} */}
            <Eye />
          </Button>
          <Button
            variant="contained"
            color="info"
            //   onClick={() => handleEditOpen(params.row)}
          >
            {/* {t('edit')} */}
            <Pencil />
          </Button>
        </Stack>
      ),
    },
  ];

  const rows =
    data?.length > 0
      ? data.map((company: { name: string; id: number; address: string }) => ({
          id: company?.id,
          name: company?.name,
          // display_name: company?.display_name,
          address: company?.address,
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
