import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { CloudUpload } from 'lucide-react';
import { IBranch, ICompany, IUser } from 'interfaces';
import { useQuery } from '@tanstack/react-query';
import { fetchAllDataGoldNoArg, newUrl } from 'functionsWork';
import CheckboxLabels from 'components/common/UI/CheckedBox/CheckBox';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
interface internalPErmissions  {
  entity_type: string;
  name: string;
  entity_scope?: string;
  entity_id?: number;
};
interface IFormInput {
  permissions: string[];
  perm: {
    entity_type: string;
    name: string;
    entity_scope?: string;
    entity_id?: number;
  };
  // name: { en: string; ar: string };
}

function AddPermissionsForm({
  handleClose,
  initialData,
  refetch,
}: {
  handleClose: () => void;
  refetch: () => void;
  initialData?: null | IUser;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const { t } = useTranslation();
  const [selectedPErmissions,setSelectedPErmissions]= useState<internalPErmissions>()

  const [permissions, setPermissions] = useState<string[]>(['']);

  const selectPermissionsHandler = (permis:internalPErmissions)=>{
    setSelectedPErmissions(permis)
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log({ ...selectedPErmissions ,permissions, user_id: initialData?.id })
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(`${newUrl}/api/v1/assign-permissions`, { ...selectedPErmissions ,permissions, user_id: initialData?.id }, {
        headers,
      });

      toast.success(t('assign permissions successfully'));
      refetch();
      handleClose();
    } catch (err) {
      // console.error('Error updating category:', err);
      toast.error(t('Failed to update User, please check your input.'));
    }
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: [`Permissions`],
    queryFn: () => fetchAllDataGoldNoArg(`permissions?user_id=${initialData?.id}`),
  });


  console.log(selectedPErmissions)
  return (
    <>
      <TextField
        select
        variant="outlined"
        label={t('Type')}
        sx={{
          '.MuiOutlinedInput-root': {
            lineHeight: 0,
          },
        }}
        multiline
        fullWidth
        InputLabelProps={{
          style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
        }}
      >
        {data?.data?.available_permissions?.map(
          (permission: {
            entity_type: string;
            name: string;
            entity_id: number;
            entity_scope: string;
          }) => (
            <MenuItem
              key={permission.entity_id !== null ? permission.entity_id : permission.entity_scope}
              onClick={()=>selectPermissionsHandler(permission)}
              value={permission.name}
            >
              {permission.name}
            </MenuItem>
          ),
        )}
      </TextField>
      <Box
        sx={{
          mt: { sm: 5, xs: 2.5 },
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={3} gap={2}>
          <Stack flexDirection={'row'} gap={2}>
            <CheckboxLabels permissions={permissions} setPermissions={setPermissions} />
          </Stack>
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          sx={{ mt: 3, fontSize: '18px' }}
        >
          {t('Update User')}
        </Button>
      </Box>
    </>
  );
}

export default AddPermissionsForm;