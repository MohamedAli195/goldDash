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

function UpdateUsersForm({
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
  // const [companyID, setcompanyID] = useState(initialData?.company?.id);

  useEffect(() => {
    console.log(initialData);
    if (initialData) {
      setValue('name', initialData.name);
      setValue('email', initialData.email);
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.put(`${newUrl}/api/v1/users/${initialData?.id}`, data, {
        headers,
      });

      toast.success(t('User updated successfully'));
      refetch();
      handleClose();
    } catch (err) {
      // console.error('Error updating category:', err);
      toast.error(t('Failed to update User, please check your input.'));
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
        <Stack flexDirection={'row'} gap={2}>
          <TextField
            multiline
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
            multiline
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

          {/* <TextField
             multiline
             fullWidth
             variant="outlined"
             id="password"
             type="password"
             label={t('password')}
             error={!!errors.password}
             helperText={errors.password?.message}
             {...register('password')}
             InputLabelProps={{
               style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
             }}
             sx={{
               '& .MuiInputBase-input': {
                 lineHeight: '1', // Adjust line height
               },
             }}
           /> */}

          {/* <TextField
             multiline
             fullWidth
             variant="outlined"
             id="password_confirmation"
             type="password"
             label={t('Confirm Password')}
             error={!!errors.password_confirmation}
             helperText={errors.password_confirmation?.message}
             {...register('password_confirmation')}
             InputLabelProps={{
               style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
             }}
             sx={{
               '& .MuiInputBase-input': {
                 lineHeight: '1', // Adjust line height
               },
             }}
           /> */}
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
  );
}

export default UpdateUsersForm;
