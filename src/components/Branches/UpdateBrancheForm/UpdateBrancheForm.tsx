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

function UpdateBrancheForm({
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


  const [previewLogo, setPreviewLogo] = useState<string | null>(initialData?.logo||null);
  const [previewContract, setPreviewContract] = useState<string | null>(initialData?.contract_file ||null);
  const [previewTaxImage, setPreviewTaxImage] = useState<string | null>(initialData?.tax_image||null);
  const [previewIdentityImage, setPreviewIdentityImage] = useState<string | null>(initialData?.identity_image||null);

    // contract handler
    const handleContractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewContract(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
  // images handlers

  // logo handler
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // tax_image handler
  const handleTaxImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewTaxImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // tax_image handler
  const handleTaxIdentityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewIdentityImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

  };
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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
        'Content-Type': 'multipart/form-data',
      };

const formData = new FormData();
      formData.append('address', data.address);
      formData.append('client_name', data.client_name);
      formData.append('company_id', String(data?.company_id || ''));
      formData.append('email', data.email || '');
      formData.append('name', data.name);
      formData.append('phone1', data.phone1);
      formData.append('phone2', data.phone2);
      formData.append('tax_end_date', data.tax_end_date || '');
      formData.append('tax_num', data.tax_num || '');
      if (data?.logo?.[0]) {
        formData.append('logo', data.logo[0]);
      }
      if (data?.tax_image?.[0]) {
        formData.append('tax_image', data.tax_image[0]);
      }
      
      if (data?.identity_image?.[0]) {
        formData.append('identity_image', data.identity_image[0]);
      }
      
      if (data?.contract_file?.[0]) {
        formData.append('contract_file', data.contract_file[0]);
      }
      const response = await axios.post(`${newUrl}/api/v1/branches/${initialData?.id}`, formData, {
        headers,
      });

      toast.success(t('Category updated successfully'));
      refetch();
      handleClose();
    } catch (err) {
      // console.error('Error updating category:', err);
      toast.error(t('Failed to update category, please check your input.'));
    }
  };

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
            multiline
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
            multiline
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
            multiline
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
            multiline
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
            multiline
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
            multiline
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
            multiline
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
            multiline
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
                              onChange={handleLogoChange}
                            />
                          </Button>
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
                              {...register('tax_image')}
                              multiple
                              onChange={handleTaxImageChange}
                            />
                          </Button>
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
                              {...register('identity_image')}
                              multiple
                              onChange={handleTaxIdentityChange}
                            />
                          </Button>
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
                          <Button
                            component="label"
                            role={undefined}
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<CloudUpload />}
                            sx={{ height: '100%' }}
                          >
                            Upload File
                            <VisuallyHiddenInput
                              type="file"
                              {...register('contract_file')}
                              multiple
                              onChange={handleContractChange}
                            />
                          </Button>
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
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        sx={{ mt: 3, fontSize: '18px' }}
      >
        {t('Update Branch')}
      </Button>
    </Box>
  );
}

export default UpdateBrancheForm;
