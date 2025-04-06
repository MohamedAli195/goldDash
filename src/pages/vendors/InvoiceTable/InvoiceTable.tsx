import { Button, Stack } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { ICompany, items, IVendor } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
interface IProps {
  
 
  data: items[];
  
}
function IvoiceTable({data}: IProps) {

  console.log(data)
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID' },
    { field: 'itemName', headerName: i18n.language === 'ar' ? 'الصنف' :'itemName', flex: 0.4 },
    { field: 'quantity', headerName: i18n.language === 'ar' ? 'الكمية' :'quantity', flex: 0.4 },
    { field: 'weight', headerName: i18n.language === 'ar' ? ' الوزن' :'weight', flex: 0.4 },
    { field: 'extraWeight', headerName: i18n.language === 'ar' ? 'الوزن بالرملة' :'extraWeight', flex: 0.4 },
  ];


  const rows =
    data.length > 0
      ? data.map((item: items) => ({
          ...item,
        }))
      : [];
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      
      sx={{ border: 0 }}
      autoHeight
   
      getRowClassName={(params: GridRowClassNameParams) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
      }
      disableRowSelectionOnClick
      disableMultipleRowSelection
      hideFooterPagination={true}
      getRowId={(row) => row.itemName} // or any unique property or combination

      
    />
  );
}

export default IvoiceTable;
