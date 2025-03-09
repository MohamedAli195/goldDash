import React, { useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { CloudUpload } from 'lucide-react';
import { fetchAllDataGold, fetchAllDataGoldNoArg, newUrl } from 'functionsWork';
import { useQuery } from '@tanstack/react-query';
import { IBranch, ICashier, ICompany, IEmployee, IUser } from 'interfaces';
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


function AddEmployForm({ handleClose, refetch }: { handleClose: () => void; refetch: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEmployee>();
  // const [companies, setCompanies] = useState();

  const { t } = useTranslation();
  const onSubmit: SubmitHandler<IEmployee> = async (data) => {
    console.log(data);
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(`${newUrl}/api/v1/employees`, data, { headers });

      console.log(response.data);
      toast.success('employees added successfully');
      handleClose();
      refetch();
    } catch (err) {
      // console.error('Error:', err);
      toast.error('Failed to add Cashier, please check your input.');
    }
  };

  const { data } = useQuery({
    queryKey: [`branches`],
    queryFn: () => fetchAllDataGoldNoArg('branches'),
  });
  const { data: users } = useQuery({
    queryKey: [`users`],
    queryFn: () => fetchAllDataGoldNoArg('users'),
  });
  const { data: companies } = useQuery({
    queryKey: [`companies`],
    queryFn: () => fetchAllDataGoldNoArg('companies'),
  });
  const { data: cashiers } = useQuery({
    queryKey: [`cashiers`],
    queryFn: () => fetchAllDataGoldNoArg('cashiers'),
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
        </Stack>

        <Stack flexDirection={'row'} gap={2}>
          <TextField
            select
            variant="outlined"
            label={t('company name')}
            error={!!errors.company_id}
            helperText={errors.company_id?.message}
            {...register('company_id')}
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
            {companies?.data?.data?.map((user: IUser) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            variant="outlined"
            label={t('Branch name')}
            error={!!errors.branch_id}
            helperText={errors.branch_id?.message}
            {...register('branch_id')}
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

          <TextField
            select
            variant="outlined"
            label={t('cashier name')}
            error={!!errors.cashier_id}
            helperText={errors.cashier_id?.message}
            {...register('cashier_id')}
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
            {cashiers?.data?.data?.map((cashiers: ICashier) => (
              <MenuItem key={cashiers.id} value={cashiers.id}>
                {cashiers.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack flexDirection={'row'} gap={2}>
          <TextField
            select
            variant="outlined"
            label={t('users name')}
            error={!!errors.user_id}
            helperText={errors.user_id?.message}
            {...register('user_id')}
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
            {users?.data?.data?.map((user: IUser) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </TextField>

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
            id="salary"
            type="text"
            label={t('salary')}
            error={!!errors.salary}
            helperText={errors.salary?.message}
            {...register('salary')}
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
            id="start_time"
            type="text"
            label={t('start_time')}
            error={!!errors.start_time}
            helperText={errors.start_time?.message}
            {...register('start_time')}
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
            id="end_time"
            type="text"
            label={t('end_time')}
            error={!!errors.end_time}
            helperText={errors.end_time?.message}
            {...register('end_time')}
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
            id="position"
            type="text"
            label={t('position')}
            error={!!errors.position}
            helperText={errors.position?.message}
            {...register('position')}
          />
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
        {t('Add Employee')}
      </Button>
    </Box>
  );
}

export default AddEmployForm;
