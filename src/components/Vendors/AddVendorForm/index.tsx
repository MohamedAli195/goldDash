import React, { useState } from 'react';
import { Box, Button, FormLabel, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { CloudUpload } from 'lucide-react';
import { newUrl } from 'functionsWork';
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
  phone: string;
  address: string;     
 identity_id: string,
}

function AddVendorForm({
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


  const { t } = useTranslation();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {

      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(`${newUrl}/api/v1/gold-vendors`, data, { headers });

      // (response.data);
      toast.success('Vendor added successfully');
      handleClose();
      refetch();
    } catch (err) {
      // console.error('Error:', err);
      toast.error('Failed to add Vendor, please check your input.');
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
     
        <Stack flexDirection={'column'} gap={2}>
          <TextField
            
            fullWidth
            variant="outlined"
            id="name"
            type="text"
            label={t('Vendor Name')}
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
            id="address"
            type="text"
            label={t('Address')}
            error={!!errors.address}
            helperText={errors.address?.message}
            {...register('address')}
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
            label={t('email')}
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
            id="phone"
            type="text"
            label={t('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            {...register('phone')}
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
            id="identity_id"
            type="text"
            label={t('identity_id')}
            error={!!errors.identity_id}
            helperText={errors.identity_id?.message}
            {...register('identity_id')}
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
          />
          
      </Stack>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        sx={{ mt: 3, fontSize: '18px' }}
      >
        {t('Add Company')}
      </Button>
    </Box>
  );
}

export default AddVendorForm;
