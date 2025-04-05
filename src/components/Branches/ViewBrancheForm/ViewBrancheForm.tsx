import { Box, Button, FormLabel, MenuItem, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { CloudUpload } from 'lucide-react';
import { IBranch, ICompany } from 'interfaces';
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
  address: string;
  client_name: string;
  company_id: number;
  email: string;
  name: string;
  phone1: string;
  phone2: string;
  tax_end_date: string;
  tax_num: string;
  logo: FileList | null;
  tax_image: FileList | null;
  identity_image: FileList | null;
  contract_file: FileList | null;
  // name: { en: string; ar: string };
}

function ViewBrancheForm({
  handleClose,
  initialData,
  refetch,
}: {
  handleClose: () => void;
  refetch: () => void;
  initialData?: null | IBranch;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const { t } = useTranslation();
  const [companyID, setcompanyID] = useState(initialData?.company?.id);

  const [previewLogo, setPreviewLogo] = useState<string | null>(initialData?.logo || null);
  const [previewContract, setPreviewContract] = useState<string | null>(
    initialData?.contract_file || null,
  );
  const [previewTaxImage, setPreviewTaxImage] = useState<string | null>(
    initialData?.tax_image || null,
  );
  const [previewIdentityImage, setPreviewIdentityImage] = useState<string | null>(
    initialData?.identity_image || null,
  );
  useEffect(() => {
    console.log(initialData);
    if (initialData) {
      setValue('address', initialData.address);
      setValue('client_name', initialData.client_name);
      setValue('name', initialData.name);
      setValue('email', initialData.email);
      setValue('phone1', initialData.phone1);
      setValue('phone2', initialData.phone2);
      setValue('tax_end_date', initialData.tax_end_date);
      setValue('tax_num', initialData.tax_num);
      setValue('company_id', initialData.company.id);
    }
  }, [initialData, setValue]);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: [`companies`],
    queryFn: () => fetchAllDataGoldNoArg('companies'),
  });
  return (
    <Box
      sx={{
        mt: { sm: 5, xs: 2.5 },
      }}
      component="form"
     
    >
      <Stack spacing={3} gap={2}>
        <Stack flexDirection={'row'} gap={2}>
          <TextField
            fullWidth
            variant="outlined"
            id="name"
            type="text"
            label={t('Branch Name')}
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
            select
            variant="outlined"
            label={t('Company name')}
            error={!!errors.company_id}
            helperText={errors.company_id?.message}
            value={companyID}
            {...register('company_id')}
            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
            onChange={(e) => setcompanyID(+e.target.value)}
          >
            {data?.data?.data?.map((company: ICompany) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            id="address"
            type="text"
            label={t('address')}
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
        </Stack>

        <Stack flexDirection={'row'} gap={2}>
          <TextField
            fullWidth
            variant="outlined"
            id="client_name"
            type="text"
            label={t('client_name')}
            error={!!errors.client_name}
            helperText={errors.client_name?.message}
            {...register('client_name')}
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
            label="email"
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
            id="phone1"
            type="text"
            label={t('phone1')}
            error={!!errors.phone1}
            helperText={errors.phone1?.message}
            {...register('phone1')}
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
        <Stack flexDirection={'row'} gap={2}>
          <TextField
            fullWidth
            variant="outlined"
            id="phone2"
            type="text"
            label={t('phone2')}
            error={!!errors.phone2}
            helperText={errors.phone2?.message}
            {...register('phone2')}
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
            id="tax_num"
            type="text"
            label="tax_num"
            error={!!errors.tax_num}
            helperText={errors.tax_num?.message}
            {...register('tax_num')}
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
            id="tax_end_date"
            type="text"
            label="tax_end_date"
            error={!!errors.tax_end_date}
            helperText={errors.tax_end_date?.message}
            {...register('tax_end_date')}
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
        {/* File Uploads */}
        <Stack flexDirection={'row'} gap={2} alignItems={'center'}>
          <Stack flexDirection={'column'} gap={2}>
            <FormLabel>logo</FormLabel>
            {/* logo */}
            
            {previewLogo && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={previewLogo}
                  alt={t('Preview')}
                  style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover' }}
                />
              </Box>
            )}
          </Stack>

          {/* tax_image */}

          <Stack flexDirection={'column'} gap={2}>
            <FormLabel>tax_image</FormLabel>
            
            {previewTaxImage && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={previewTaxImage}
                  alt={t('Preview')}
                  style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover' }}
                />
              </Box>
            )}
          </Stack>

          <Stack flexDirection={'column'} gap={2}>
            <FormLabel>identity_image</FormLabel>
            {/* tax_image */}
            
            {previewIdentityImage && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={previewIdentityImage}
                  alt={t('Preview')}
                  style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover' }}
                />
              </Box>
            )}
          </Stack>

          <Stack flexDirection={'column'} gap={2}>
            <FormLabel>Contract File</FormLabel>
            {/* tax_image */}
            
            {previewContract && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={previewContract}
                  alt={t('Preview')}
                  style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover' }}
                />
              </Box>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ViewBrancheForm;
