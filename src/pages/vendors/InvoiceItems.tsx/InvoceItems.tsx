import React, { useEffect, useState } from 'react';
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
  CT:number;
  weight:number;
  pureGold:number;
  ManufacturerPrice:number
  totalAmount:number;
  totalGold:number;
  totalManufacturerPrice:number

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
      const [PureGold,setPureGold]=useState<number>(1)
     
      const [CT,setCT]=useState<number>(1)
      const [weight,setweight]=useState<number>(1)
      const [manufactoryPrice,setManufactoryPrice]=useState<number>(1)
      const [totalAmount,settotalAmount]=useState<number>(1)
      const pureGoldHandler = ()=>{
        if(CT===18){
          setPureGold(weight * (750/999) )
        }else if(CT===21){
          setPureGold(weight * (875/999) )
        }else if(CT===22){
          setPureGold(weight * (915/999) )
        }else{
          setPureGold(weight)
        }
          
      }
      const totalAmountHandler = ()=>{
        
        settotalAmount(manufactoryPrice * PureGold )
      }
      const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
          const lastData = {
            ...data,
            pureGold:PureGold,
            totalAmount:totalAmount,
            id: Date.now()
          };
          setItems((prev: items[]) => [...prev, lastData]);
          toast.success('Vendor added successfully');
          
        } catch (err) {
          // console.error('Error:', err);
          toast.error('Failed to add Vendor, please check your input.');
        }
      };
      useEffect(()=>{
        pureGoldHandler()
        totalAmountHandler()
      },[CT,weight,manufactoryPrice])

  return (
        <Box
          sx={{
            mt: { sm: 5, xs: 2.5 },
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
         
            <Stack flexDirection={'row'} gap={2}>
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
                id="CT"
                type="text"
                label={t('CT')}
                error={!!errors.CT}
                helperText={errors.CT?.message}
                {...register('CT')}
                onChange={(e)=>setCT(+e.target.value)}
                
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
                onChange={(e)=>setweight(+e.target.value)}
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
                value={PureGold}
                variant="outlined"
                id="pureGold"
                type="text"
                label={t('pureGold')}
                error={!!errors.pureGold}
                helperText={errors.pureGold?.message}
                {...register('pureGold')}
                // onChange={(e)=>setExtraW(+e.target.value *1000 )}
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
                value={manufactoryPrice}
                variant="outlined"
                id="ManufacturerPrice"
                type="text"
                label={t('ManufacturerPrice')}
                error={!!errors.ManufacturerPrice}
                helperText={errors.ManufacturerPrice?.message}
                {...register('ManufacturerPrice')}
                // onChange={(e)=>setExtraW(+e.target.value *1000 )}
                onChange={(e)=>setManufactoryPrice(+e.target.value)}

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
                value={totalAmount}
                variant="outlined"
                id="totalAmount"
                type="text"
                label={t('totalAmount')}
                error={!!errors.totalAmount}
                helperText={errors.totalAmount?.message}
                {...register('totalAmount')}
                // onChange={(e)=>setExtraW(+e.target.value *1000 )}
                InputLabelProps={{
                  style: { fontWeight: 800, fontSize: '18px' }, // Makes the label bold
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    lineHeight: '1', // Adjust line height
                  },
                }}
              />

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
              
              
          </Stack>

        </Box>
  )
}

export default InvoceItems