import React, { useState } from 'react';
import { Box, Button, FormLabel, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

import { CloudUpload } from 'lucide-react';
import { newUrl } from 'functionsWork';
import { items } from 'interfaces';
import { Dispatch, SetStateAction } from 'react';

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

  itemName:string;
  quantity:number;
  weight:number;
  extraWeight:number;
}

interface IProps {
  setItems: Dispatch<SetStateAction<items[]>>;
}
function InvoceItems({setItems}:IProps) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<items>();
      const { t } = useTranslation();
      const [extraW,setExtraW]=useState<number>()
      const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
          const lastData = {
            ...data,
            extraWeight: extraW ?? 0, // uses 0 if extraW is undefined
            id: Date.now()
          };
                    setItems((prev: items[]) => [...prev, lastData]);
          toast.success('Vendor added successfully');
          
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
                id="itemName"
                type="text"
                label={t('itemName')}
                error={!!errors.itemName}
                helperText={errors.itemName?.message}
                {...register('itemName', { required: t('itemName') })}
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
                id="quantity"
                type="text"
                label={t('quantity')}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                {...register('quantity')}
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
                id="weight"
                type="text"
                label={t('weight')}
                error={!!errors.weight}
                helperText={errors.weight?.message}
                {...register('weight')}
                onChange={(e)=>setExtraW(+e.target.value *1000 )}
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
                value={extraW}
                variant="outlined"
                id="extraWeight"
                type="text"
                label={t('extraWeight')}
                error={!!errors.extraWeight}
                helperText={errors.extraWeight?.message}
                {...register('extraWeight')}
                InputLabelProps={{
                  style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
                }}
                hidden
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
            {t('Add Items')}
          </Button>
        </Box>
  )
}

export default InvoceItems