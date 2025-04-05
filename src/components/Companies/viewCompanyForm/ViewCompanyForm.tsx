import { Box, Button, FormLabel, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { CloudUpload } from 'lucide-react';
import { ICompany } from 'interfaces';
import { newUrl } from 'functionsWork';
import Input from 'components/common/UI/Input';

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
}

function ViewCompanyForm({
  handleClose,
  initialData,
  refetch,
}: {
  handleClose: () => void;
  refetch: () => void;
  initialData?: ICompany | null;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const { t } = useTranslation();

  // const [previewLogo, setPreviewLogo] = useState<string | null>(initialData?.logo || null);
  // const [previewContract, setPreviewContract] = useState<string | null>(null);
  // const [previewTaxImage, setPreviewTaxImage] = useState<string | null>(null);
  // const [previewIdentityImage, setPreviewIdentityImage] = useState<string | null>(null);

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
    if (initialData) {
      setValue('address', initialData.address);
      setValue('client_name', initialData.client_name);
      setValue('email', initialData.email);
      setValue('name', initialData.name);
      setValue('phone1', initialData.phone1);
      setValue('phone2', initialData.phone2);
      setValue('tax_end_date', initialData.tax_end_date || '');
      setValue('tax_num', initialData.tax_num || '');
    }
  }, [initialData, setValue]);
  return (
    <Box component="form" sx={{ mt: { sm: 5, xs: 2.5 } }}>
      <Stack spacing={3} gap={2}>
        <Stack flexDirection="row" gap={2}>
          <TextField
            fullWidth
            variant="outlined"
            label={t('Company Name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', { required: t('name') })}
          />
          <TextField fullWidth variant="outlined" label={t('Address')} {...register('address')} />
          <TextField
            fullWidth
            variant="outlined"
            label={t('Client Name')}
            {...register('client_name')}
          />
        </Stack>
        <Stack flexDirection="row" gap={2}>
          <TextField fullWidth variant="outlined" label="Email" {...register('email')} />
          <TextField fullWidth variant="outlined" label={t('Phone-1')} {...register('phone1')} />
          <TextField fullWidth variant="outlined" label={t('Phone-2')} {...register('phone2')} />
        </Stack>
        <Stack flexDirection="row" gap={2}>
          <TextField fullWidth variant="outlined" label="Tax Number" {...register('tax_num')} />
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            label="Tax End Date"
            {...register('tax_end_date')}
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

export default ViewCompanyForm;
