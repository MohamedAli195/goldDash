import { Button, Stack, styled, TextField ,Box } from '@mui/material'
import { t } from 'i18next'
import { ICompany } from 'interfaces';
import { CloudUpload } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

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


export interface IFormInput {
    address: string;
    client_name: string;
    email: string;
    logo: string | FileList;
    name: string;
    phone1: string;
    phone2: string;
    tax_end_date: string;
    tax_num: string;
  
    // name: { en: string; ar: string };
  }
interface IProps {
    errors: FieldErrors<IFormInput>
    register: UseFormRegister<IFormInput>
    setValue: UseFormSetValue<IFormInput>
  initialData?: null | ICompany;
}
export const FormInputs = ({errors,register,initialData,setValue}:IProps) => {

      const [preview, setPreview] = useState<string | null>(null);
      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
      };


        useEffect(() => {
          // console.log(initialData);
          if (initialData) {
            setValue('address', initialData.address);
            setValue('client_name', initialData.client_name);
            setValue('name', initialData.name);
            setValue('email', initialData.email);
            setValue('phone1', initialData.phone1);
            setValue('phone2', initialData.phone2);
            setValue('tax_end_date', initialData.tax_end_date);
            setValue('tax_num', initialData.tax_num);
            // setValue('logo', initialData?.logo?[0]);
          }
        }, [initialData, setValue]);
  return (
    <Stack spacing={3} gap={2}>
    <Stack flexDirection={'row'} gap={2}>
    <TextField
        multiline
        fullWidth
        variant="outlined"
        id="name"
        type="text"
        label={t('Company Name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name', { required: t('name') })}
        InputLabelProps={{
          style: { fontWeight: 800 ,fontSize:"18px" }, // Makes the label bold
        }}
        sx={{
          '& .MuiInputBase-input': {
            lineHeight: '1', // Adjust line height
          },
        }}
      />
      <TextField
        fullWidth
        multiline
        variant="outlined"
        id="address"
        type="text"
        label={t('Address')}
        error={!!errors.address}
        helperText={errors.address?.message}
        {...register('address')}
        InputLabelProps={{
          style: { fontWeight: 800 ,fontSize:"18px" }, // Makes the label bold
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
        id="client_name"
        type="text"
        label={t('Client Name')}
        error={!!errors.client_name}
        helperText={errors.client_name?.message}
        {...register('client_name')}
        InputLabelProps={{
          style: { fontWeight: 800 ,fontSize:"18px" }, // Makes the label bold
        }}
        sx={{
          '& .MuiInputBase-input': {
            lineHeight: '1', // Adjust line height
          },
        }}
      />
      
    </Stack>
    <Stack flexDirection={'row'} gap={2}>
    <TextField
    multiline
        fullWidth
        variant="outlined"
        id="email"
        type="text"
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
        InputLabelProps={{
          style: { fontWeight: 800 ,fontSize:"18px" }, // Makes the label bold
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
        id="phone1"
        type="text"
        label={t('Phone-1')}
        error={!!errors.phone1}
        helperText={errors.phone1?.message}
        {...register('phone1')}
        InputLabelProps={{
          style: { fontWeight: 800 ,fontSize:"18px" }, // Makes the label bold
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
        id="phone2"
        type="text"
        label={t('Phone-2')}
        error={!!errors.phone2}
        helperText={errors.phone2?.message}
        {...register('phone2')}
        InputLabelProps={{
          style: { fontWeight: 800 ,fontSize:"18px" }, // Makes the label bold
        }}
        sx={{
          '& .MuiInputBase-input': {
            lineHeight: '1', // Adjust line height
          },
        }}
      />
    </Stack>
    <Stack flexDirection={'row'} gap={2}>
      <TextField
        multiline
        fullWidth
        variant="outlined"
        id="tax_num"
        type="text"
        label="Tax Number"
        error={!!errors.tax_num}
        helperText={errors.tax_num?.message}
        {...register('tax_num')}
        InputLabelProps={{
          style: { fontWeight: 800 ,fontSize:"18px" }, // Makes the label bold
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
        id="tax_end_date"
        type="text"
        label="Tax End Date"
        error={!!errors.tax_end_date}
        helperText={errors.tax_end_date?.message}
        {...register('tax_end_date')}
        InputLabelProps={{
          style: { fontWeight: 800 ,fontSize:"18px" }, // Makes the label bold
        }}
        sx={{
          '& .MuiInputBase-input': {
            lineHeight: '1', // Adjust line height
          },
        }}
      />
    </Stack>
    <Stack flexDirection={'row'} gap={2} alignItems={'center'}>
      <Button
        component="label"
        role={undefined}
        variant="outlined"
        tabIndex={-1}
        startIcon={<CloudUpload />}
        sx={{ height: '100%' }}
      >
        Upload Image
        <VisuallyHiddenInput
          type="file"
          {...register('logo')}
          multiple
          onChange={handleFileChange}
        />
      </Button>
      {preview && (
        <Box sx={{ mt: 2 }}>
          <img
            src={preview}
            alt={t('Preview')}
            style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover' }}
          />
        </Box>
      )}
    </Stack>
  </Stack>
  )
}
