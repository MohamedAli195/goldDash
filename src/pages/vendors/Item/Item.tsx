import { Stack } from '@mui/material';
import React from 'react'
interface IProps{
    item:{
        id?:number
        itemName:string;
        CT:number;
        weight:number;
        pureGold:number;
        ManufacturerPrice:number;
        totalAmount:number;
        totalManufacturerPrice:number
    }
}
function Item({item}:IProps) {
  return (
    <Stack>

    </Stack>
  )
}

export default Item