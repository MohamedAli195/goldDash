import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { CloudUpload } from 'lucide-react';
import { IBranch, ICompany } from 'interfaces';
import { useQuery } from '@tanstack/react-query';
import { fetchAllDataGoldNoArg } from 'functionsWork';

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
  logo: string | FileList;
  name: string;
  phone1: string;
  phone2: string;
  tax_end_date: string;
  tax_num: string;

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

    console.log(data)
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
       'Content-Type': 'application/json',
      };

      const response = await axios.put(
        `https://4b96-197-59-106-248.ngrok-free.app/api/v1/branches/${initialData?.id}`,
        data,
        { headers },
      );

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
            {...register('company_id')}
            // sx={{
            //   '.MuiOutlinedInput-root': {
            //     lineHeight: 0,
            //   },
            //   width: '25%',
            // }}

            InputLabelProps={{
              style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
            }}
            sx={{
              '& .MuiInputBase-input': {
                lineHeight: '1', // Adjust line height
              },
            }}
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
            {...register('address', { required: t('addressReq') })}
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
      </Stack>
    </Box>
  );
}

export default ViewBrancheForm;
