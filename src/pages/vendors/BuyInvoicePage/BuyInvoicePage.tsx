import React, { useState } from 'react'
import VendorInfo from '../VendorInfo/VendorInfo'
import { items } from 'interfaces';
import IvoiceTable from '../InvoiceTable/InvoiceTable';
import { Stack } from '@mui/material';
import InvoceItemsForm from '../InvoiceItemsForm.tsx/InvoceItemsForm';

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
  
    <InvoceItemsForm setItems={setItems} />
    <IvoiceTable data={items} />

      
      </>
  )
}

export default BuyInvoicePage