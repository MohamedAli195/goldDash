import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { IBranch, ICashier, ICompany, IEmployee, IUser } from 'interfaces';
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
function UpdateEmployForm({
  handleClose,
  initialData,
  refetch,
}: {
  handleClose: () => void;
  refetch: () => void;
  initialData?: null | IEmployee;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IEmployee>();
  const { t } = useTranslation();

const [branchID, setBranchID] = useState<number |undefined>(initialData?.branch_id);
const [cashierID, setcashierID] = useState<number |undefined>(initialData?.cashier_id);
const [companyID, setcompanyID] = useState<number |undefined>(initialData?.company_id);
const [userID, setuserID] = useState<number |undefined>(initialData?.user_id);

console.log(initialData)
  useEffect(() => {
    console.log(initialData);
    if (initialData) {
      setValue('address', initialData.address);
      setValue('national_id', initialData.national_id);
      setValue('name', initialData.name);
      setValue('email', initialData.email);
      setValue('phone1', initialData.phone1);
      setValue('phone2', initialData.phone2);
      setValue('branch_id', initialData?.branch_id);

      setValue('user_id', initialData.user_id);
      setValue('company_id', initialData.company_id);
      setValue('cashier_id', initialData.cashier_id);
      setValue('position', initialData.position);
      setValue('start_time', initialData.start_time);
      setValue('end_time', initialData.end_time);
      setValue('hire_date', initialData?.hire_date);
      setValue('salary', initialData?.salary);
      
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<IEmployee> = async (data) => {

    console.log(data) 
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
         'Content-Type': 'application/json',
      };

      const response = await axios.put(
        `${newUrl}/api/v1/employees/${initialData?.id}`,
        {...data},
        { headers },
      );

      console.log(response)
      toast.success(t('Cashier updated successfully',));
      refetch();
      handleClose();
    } catch (err) {
      // console.error('Error updating category:', err);
      toast.error(t('Failed to update Cashier, please check your input.'));
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
            multiline
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
              value={companyID}
              fullWidth
              InputLabelProps={{
                style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
              }}
              onChange={(e) => setcompanyID(+e.target.value)}
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
              value={branchID}
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
              onChange={(e) => setBranchID(+e.target.value)}
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
              value={cashierID}
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
              onChange={(e) => setcashierID(+e.target.value)}
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
              value={userID}

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
              onChange={(e) => setuserID(+e.target.value)}
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
                        id="hire_date"
                        type="text"
                        label={t('hire_date')}
                        error={!!errors.hire_date}
                        helperText={errors.hire_date?.message}
                        {...register('hire_date')}
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

export default UpdateEmployForm;
