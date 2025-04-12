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

  id: number;
  item: string;
  carat: number;
  gold_weight: number;
  pure_gold_999: number;
  manufacturing_price: number;
  totalAmount?: number;
  total_pure_gold_999: number;
  total_manufacturing: number;

}

interface IProps {
  setItems: Dispatch<SetStateAction<items[]>>;
}
function InvoceItemsForm({setItems}:IProps) {
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
            pure_gold_999:PureGold,
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
      },[CT,weight,manufactoryPrice,totalAmount,PureGold])

  return (
    <>
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
                id="item"
                type="text"
                label={t('item')}
                error={!!errors.item}
                helperText={errors.item?.message}
                {...register('item', { required: t('item') })}
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
                id="carat"
                type="text"
                label={t('carat')}
                error={!!errors.carat}
                helperText={errors.carat?.message}
                {...register('carat')}
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
                id="gold_weight"
                type="number"
                label={t('gold_weight')}
                error={!!errors.gold_weight}
                helperText={errors.gold_weight?.message}
                {...register('gold_weight')}
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
                id="pure_gold_999"
                type="text"
                label={t('pure_gold_999')}
                error={!!errors.pure_gold_999}
                helperText={errors.pure_gold_999?.message}
                {...register('pure_gold_999')}
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
                id="manufacturing_price"
                type="number"
                label={t('manufacturing_price')}
                error={!!errors.manufacturing_price}
                helperText={errors.manufacturing_price?.message}
                {...register('manufacturing_price')}
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
        </>
  )
}

export default InvoceItemsForm