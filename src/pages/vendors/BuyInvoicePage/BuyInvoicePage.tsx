import React, { useState } from 'react'
import VendorInfo from '../VendorInfo/VendorInfo'
import { items } from 'interfaces';
import IvoiceTable from '../InvoiceTable/InvoiceTable';
import { Button, Stack } from '@mui/material';
import InvoceItemsForm from '../InvoiceItemsForm.tsx/InvoceItemsForm';
import BranchInfo from '../BranchInfo/BranchInfo';
import axios from 'axios';
import toast from 'react-hot-toast';
import { newUrl } from 'functionsWork';

function BuyInvoicePage() {

  const [vendor,setVendor] = useState<number>()
  const [branch,setBranch] = useState<number>()
  const [items, setItems] = useState<items[]>([]);


  const SaveHandler = async () => {
    try {
      const data = {
        branch_id :branch,
        gold_vendor_id:vendor,
        items:items,
        total_pure_gold_999:55,
        total_manufacturing : 52225,
        invoice_date: "2025-03-15",
      }
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(`${newUrl}/api/v1/gold-purchase-invoices`, data, { headers });

      // (response.data);
      toast.success('Vendor added successfully');
      // handleClose();
      // refetch();
    } catch (err) {
      // console.error('Error:', err);
      toast.error('Failed to add Vendor, please check your input.');
    }
  };

  return (
    <>
    <Stack flexDirection={'row'}>
    <div>
      <p>Vendor information </p>
      <VendorInfo setClinet={setVendor} />
      <p>Vendor id :{vendor }</p>
    </div>
    <div>
      <p>Branch information </p>
      <BranchInfo setBranch={setBranch} />
      <p>Branch id :{branch }</p>
    </div>
    </Stack>

  
    <InvoceItemsForm setItems={setItems} />
    <IvoiceTable data={items} />

      <Button onClick={SaveHandler} >Save</Button>
      </>
  )
}

export default BuyInvoicePage