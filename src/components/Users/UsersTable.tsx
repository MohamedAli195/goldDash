import { Box, Button, Stack } from '@mui/material';
import i18n from 'i18n';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import imgNotFound from './../../../public/images/No_Image_Available.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { IBranch, ICashier, ICompany, IUser } from 'interfaces';
import paths from 'routes/path';
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid';
interface IProps {
  handleEditOpen: (val: IUser) => void;
  handleOpend: () => void;

  setTempId: (val: number) => void;
  data: IUser[];
  handleViewOpen: (val: IUser) => void;
  handlePermisionsOpen: (val: IUser) => void;
}
function UsersTable({
  data,
  handleEditOpen,
  setTempId,
  handleOpend,
  handleViewOpen,
  handlePermisionsOpen,
}: IProps) {
  console.log(data);
  const navigate = useNavigate();
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    i18n.language === 'ar'
      ? { field: 'name', headerName: 'أسم المستخدم', flex: 0.4 }
      : { field: 'name', headerName: '‘USer Name', flex: 0.4 },

    i18n.language === 'ar'
      ? { field: 'email', headerName: 'البريد الألكترونى', flex: 0.4 }
      : { field: 'email', headerName: 'email', flex: 0.4 },

    {
      field: 'permissions',
      headerName: i18n.language === 'ar' ? 'الصلاحيات' : 'permissions',
      flex: 0.4,
      renderCell: (params) => (
        <Stack direction="row" gap={1}>
          {params.row.permissions.map((permission: { name: string; permissions: string[] }) => (
            <Box key={permission.name}>
              {' '}
              {permission.name} :{' '}
              {permission.permissions.map((val) => {
                return <span key={val}>{val} | </span>;
              })}
            </Box>
          ))}
        </Stack>
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
            //   onClick={() => navigate(`${paths.categories}/${params.row.id}`)

            // }
            onClick={() => handleViewOpen(params.row)}
          >
            {/* {t("view")}  */}
            <Eye />
          </Button>

          <Button variant="contained" color="primary" onClick={() => handleEditOpen(params.row)}>
            {/* {t("edit")} */}
            <Pencil />
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handlePermisionsOpen(params.row)}
          >
            Permissions
            <Pencil />
          </Button>
        </Stack>
      ),
    },
  ];

  const rows =
    data.length > 0
      ? data.map((user: IUser) => ({
          ...user,
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

export default UsersTable;
