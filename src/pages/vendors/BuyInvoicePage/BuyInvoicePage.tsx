import React, { useState } from 'react'
import VendorInfo from '../VendorInfo/VendorInfo'
import { items } from 'interfaces';
import InvoceItems from '../InvoiceItems.tsx/InvoceItems';
import IvoiceTable from '../InvoiceTable/InvoiceTable';
import { Stack } from '@mui/material';

function BuyInvoicePage() {

  const [vendor,setVendor] = useState<number>()
  const [items, setItems] = useState<items[]>([]);
  console.log(items)

  return (
    <>
    <div>
      <p>clinet information </p>
      <VendorInfo setClinet={setVendor} />
      <p>Vendor id :{vendor }</p>
    </div>
    <Stack flexDirection={'row'}>
    <InvoceItems setItems={setItems} />
    <IvoiceTable data={items} />
      </Stack>
      
      </>
  )
}

export default BuyInvoicePage