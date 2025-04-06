import { Button, Stack, TextField } from '@mui/material';
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
    
  // itemName:string;
  // CT:number;
  // weight:number;
  // pureGold:number;
  // ManufacturerPrice:number
  // totalAmount:number;
  // totalGold:number;
  // totalManufacturerPrice:number
    { field: 'itemName', headerName: i18n.language === 'ar' ? 'الصنف' :'itemName', flex: 0.4 },
    {
      field: 'CT',
      headerName: i18n.language === 'ar' ? 'العيار' : 'CT',
      flex: 0.4,
      renderCell: (params) => (
        <TextField
          type="number"
          variant="standard"
          value={params.value}
          onChange={(e) => {
            const newValue = e.target.value;
            // You can handle the change here (e.g., update state or call a function)
            console.log(`New value for row ${params.id}:`, newValue);
          }}
          InputProps={{ disableUnderline: true }}
          sx={{ width: '100%' }}
        />
      ),
    },
    { field: 'weight', headerName: i18n.language === 'ar' ? ' وزن الذهب' :'weight', flex: 0.4 },
    { field: 'pureGold', headerName: i18n.language === 'ar' ? 'الذهب الصافى' :'pureGold', flex: 0.4 },
    { field: 'ManufacturerPrice', headerName: i18n.language === 'ar' ? 'ثمن المصنعية ':'ManufacturerPrice', flex: 0.4 },
    { field: 'totalAmount', headerName: i18n.language === 'ar' ? 'المبلغ الاجمالى':'totalAmount', flex: 0.4 },
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
