import React, { useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { CloudUpload } from 'lucide-react';
import { fetchAllDataGold, fetchAllDataGoldNoArg } from 'functionsWork';
import { useQuery } from '@tanstack/react-query';
import { IBranch, ICashier, ICompany } from 'interfaces';
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
  name: string;
  national_id: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  branch_id: number;
  // name: { en: string; ar: string };
}

function AddCashierForm({
  handleClose,
  refetch,
}: {
  handleClose: () => void;
  refetch: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  // const [companies, setCompanies] = useState();

  const { t } = useTranslation();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(
        `https://4b96-197-59-106-248.ngrok-free.app/api/v1/cashiers`,
        data,
        { headers },
      );

      console.log(response.data);
      toast.success('Cashier added successfully');
      handleClose();
      refetch();
    } catch (err) {
      // console.error('Error:', err);
      toast.error('Failed to add Cashier, please check your input.');
    }
  };

  const { data, error, isLoading, isError } = useQuery({
    queryKey: [`branches`],
    queryFn: () => fetchAllDataGoldNoArg('branches'),
  });

  console.log(data);
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
            {...register('address')}
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
            {...register('national_id')}
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
            {...register('email')}
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
            {...register('phone1')}
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
            {...register('phone2')}
          />

          <TextField
            select
            variant="outlined"
            label={t('Branch name')}
            error={!!errors.branch_id}
            helperText={errors.branch_id?.message}
            {...register('branch_id',)}
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
        {t('AddCashier')}
      </Button>
    </Box>
  );
}

export default AddCashierForm;
