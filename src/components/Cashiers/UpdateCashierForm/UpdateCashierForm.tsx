import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { CloudUpload } from 'lucide-react';
import { IBranch, ICashier, ICompany } from 'interfaces';
import { useQuery } from '@tanstack/react-query';
import { fetchAllDataGoldNoArg } from 'functionsWork';

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

interface IFormInput {
  branch_id: number;
  name: string;
  national_id: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  // name: { en: string; ar: string };
}

function UpdateCashierForm({
  handleClose,
  initialData,
  refetch,
}: {
  handleClose: () => void;
  refetch: () => void;
  initialData?: null | ICashier;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const { t } = useTranslation();
  const [branchID, setBranchID] = useState<number |undefined>(initialData?.branch?.id);
  // console.log(ImageFromApi)
  // const [preview, setPreview] = useState<string | FileList | undefined | null>(ImageFromApi);
  // const [imageSrc, setImageSrc] = useState<string | undefined>();
console.log(initialData)
  useEffect(() => {
    console.log(initialData);
    if (initialData) {
      setValue('address', initialData.address);
      setValue('national_id', initialData.national_id);
      setValue('name', initialData.name);
      setValue('email', initialData.email);
      setValue('phone1', initialData.phone1);
      setValue('phone2', initialData.phone2);
      setValue('branch_id', initialData?.branch?.id);
      
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {

    console.log(data) 
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
         'Content-Type': 'application/json',
      };

      const response = await axios.put(
        `https://4b96-197-59-106-248.ngrok-free.app/api/v1/cashiers/${initialData?.id}`,
        {...data},
        { headers },
      );

      console.log(response)
      toast.success(t('Cashier updated successfully'));
      refetch();
      handleClose();
    } catch (err) {
      // console.error('Error updating category:', err);
      toast.error(t('Failed to update Cashier, please check your input.'));
    }
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: [`branches`],
    queryFn: () => fetchAllDataGoldNoArg('branches'),
  });

  return (
    <Box
      sx={{
        mt: { sm: 5, xs: 2.5 },
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3} gap={2}>
        <Stack flexDirection={'row'} gap={2}>
          <TextField
            multiline
            fullWidth
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
            variant="outlined"
            id="address"
            type="text"
            label={t('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
            {...register('address', { required: t('addressReq') })}
          />
          <TextField
            multiline
            fullWidth
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
            variant="outlined"
            id="national_id"
            type="text"
            label={t('national_id')}
            error={!!errors.national_id}
            helperText={errors.national_id?.message}
            {...register('national_id', { required: t('national_idReq') })}
          />
          <TextField
            multiline
            fullWidth
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
            variant="outlined"
            id="email"
            type="text"
            label="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', { required: ' email is requried' })}
          />
        </Stack>
        <Stack flexDirection={'row'} gap={2}>
          <TextField
            multiline
            fullWidth
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
            variant="outlined"
            id="name"
            type="text"
            label={t('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', { required: t('name') })}
          />
          <TextField
            multiline
            fullWidth
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
            variant="outlined"
            id="phone1"
            type="text"
            label={t('phone1')}
            error={!!errors.phone1}
            helperText={errors.phone1?.message}
            {...register('phone1', { required: t('phone1') })}
          />
          <TextField
            multiline
            fullWidth
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
            variant="outlined"
            id="phone2"
            type="text"
            label={t('phone2')}
            error={!!errors.phone2}
            helperText={errors.phone2?.message}
            {...register('phone2', { required: t('phone2') })}
          />

          <TextField
            select
            value={branchID}
            variant="outlined"
            label={t('Branch name')}
            error={!!errors.branch_id}
            helperText={errors.branch_id?.message}
            {...register('branch_id', { required: t('branch_idReq') })}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              setBranchID(+e.target.value)
            }
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
            {data?.data?.data?.map((branch: IBranch) => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.name}
              </MenuItem>
            ))}
          </TextField>
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
        {t('updateBranch')}
      </Button>
    </Box>
  );
}

export default UpdateCashierForm;
