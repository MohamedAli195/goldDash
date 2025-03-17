import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { IAction, IBranch, ICashier, ICompany, IEmployee, IUser } from 'interfaces';
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

export interface IFormUnput {
  action_type: string;
  amount: number;
  date: string;
  description:string;
  employee_id:number
}

function ViewEmployActionForm({
  handleClose,
  initialData,
  refetch,
}: {
  handleClose: () => void;
  refetch: () => void;
  initialData?: null | IAction;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormUnput>();
  const { t } = useTranslation();

// const [branchID, setBranchID] = useState<number |undefined>(initialData?.branch_id);
// const [cashierID, setcashierID] = useState<number |undefined>(initialData?.cashier_id);
// const [companyID, setcompanyID] = useState<number |undefined>(initialData?.company_id);
const [employeeID, setemployeeID] = useState<number |undefined>(initialData?.employee.id);

console.log(initialData)
  useEffect(() => {
    console.log(initialData);
    if (initialData) {
      setValue('action_type', initialData.action_type);
      setValue('amount', initialData.amount);
      setValue('date', initialData.date);
      setValue('description', initialData.description);
      setValue('employee_id', initialData.employee.id);
      
    }
  }, [initialData, setValue]);

    const { data: employees } = useQuery({
      queryKey: [`employees`],
      queryFn: () => fetchAllDataGoldNoArg('employees'),
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
            value={employeeID}


            onChange={(e) => setemployeeID(+e.target.value)}
          >
            {employees?.data?.data?.map((emp: IEmployee) => (
              <MenuItem key={emp.id} value={emp.id}>
                {emp.name}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

      </Stack>

    </Box>
    );
}

export default ViewEmployActionForm;
