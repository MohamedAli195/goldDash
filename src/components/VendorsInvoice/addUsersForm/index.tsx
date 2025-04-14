import React, { useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField, IconButton, InputAdornment } from '@mui/material';

import {} from '@mui/material';

import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { CloudUpload } from 'lucide-react';
import { fetchAllDataGold, fetchAllDataGoldNoArg, newUrl } from 'functionsWork';
import { useQuery } from '@tanstack/react-query';
import { ICompany } from 'interfaces';
import IconifyIcon from 'components/base/IconifyIcon';
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
  email: string;
  password: string;
  password_confirmation: string;
  // name: { en: string; ar: string };
}

function AddUsersForm({ handleClose, refetch }: { handleClose: () => void; refetch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  /**Handlers */
  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
      // const formData = new FormData();
      // formData.append('address', data.address);
      // formData.append('client_name', data.client_name);
      // formData.append('email', data.email);

      // formData.append('name', data.name);
      // formData.append('phone1', data.phone1);
      // formData.append('phone2', data.phone2);
      // formData.append('tax_end_date', data.tax_end_date);
      // formData.append('tax_num', data.tax_num);

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
        'Content-Type': 'multipart/form-data',
      };
      console.log(data);
      const response = await axios.post(`${newUrl}/api/v1/sub-users`, data, { headers });

      toast.success('Users added successfully');
      handleClose();
      refetch();
    } catch (err) {
      // console.error('Error:', err);
      toast.error('Failed to add Users, please check your input.');
    }
  };

  return (
    <Box
      sx={{
        mt: { sm: 5, xs: 2.5 },
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3} gap={2}>
        <Stack flexDirection={'column'} gap={2}>
          <TextField
            fullWidth
            variant="outlined"
            id="name"
            type="text"
            label={t('User Name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', { required: t('name') })}
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            id="email"
            type="text"
            label={t('Email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email')}
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...register('password', { required: 'Password is required' })}
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <IconifyIcon icon="el:eye-close" color="action.active" />
                    ) : (
                      <IconifyIcon icon="el:eye-open" color="action.focus" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            variant="outlined"
            id="password_confirmation"
            type={showPassword ? 'text' : 'password'}
            label="Password Confirmation"
            {...register('password_confirmation', {
              required: 'password_confirmation is required',
            })}
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password_confirmation visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <IconifyIcon icon="el:eye-close" color="action.active" />
                    ) : (
                      <IconifyIcon icon="el:eye-open" color="action.focus" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
        {t('Add User')}
      </Button>
    </Box>
  );
}

export default AddUsersForm;
