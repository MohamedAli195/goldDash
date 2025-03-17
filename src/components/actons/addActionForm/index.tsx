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
import { IAction, IBranch, ICashier, ICompany, IEmployee, IUser } from 'interfaces';
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

export interface IFormUnput {
  action_type: string;
  amount: number;
  date: string;
  description:string;
  employee_id:number
}

function AddActionForm({ handleClose, refetch }: { handleClose: () => void; refetch: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormUnput>();
  // const [companies, setCompanies] = useState();

  const { t } = useTranslation();
  const onSubmit: SubmitHandler<IFormUnput> = async (data) => {
    console.log(data);
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios.post(`${newUrl}/api/v1/employee-actions`, data, { headers });
      console.log(response.data);
      toast.success('employees added successfully');
      handleClose();
      refetch();
    } catch (err) {
      // console.error('Error:', err);
      toast.error('Failed to add Cashier, please check your input.');
    }
  };


  const { data: employees } = useQuery({
    queryKey: [`employees`],
    queryFn: () => fetchAllDataGoldNoArg('employees'),
  });


  console.log(employees?.data?.data)
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
            id="action_type"
            type="text"
            label={t('action_type')}
            error={!!errors.action_type}
            helperText={errors.action_type?.message}
            {...register('action_type')}
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
            id="amount"
            type="text"
            label={t('amount')}
            error={!!errors.amount}
            helperText={errors.amount?.message}
            {...register('amount')}
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
            id="date"
            type="text"
            label="date"
            error={!!errors.date}
            helperText={errors.date?.message}
            {...register('date')}
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
            id="description "
            type="text"
            label="description  "
            error={!!errors.description }
            helperText={errors.description  ?.message}
            {...register('description')}
          />

<TextField
            select
            variant="outlined"
            label={t('users name')}
            error={!!errors.employee_id}
            helperText={errors.employee_id?.message}
            {...register('employee_id')}
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
            {employees?.data?.data?.map((emp: IEmployee) => (
              <MenuItem key={emp.id} value={emp.id}>
                {emp.name}
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
        {t('Add Employee')}
      </Button>
    </Box>

  );
}

export default AddActionForm;
