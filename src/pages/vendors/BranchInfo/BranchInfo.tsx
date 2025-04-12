import { MenuItem, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchAllDataGoldNoArg } from 'functionsWork';
import { IUser, IVendor } from 'interfaces';
import React from 'react';

interface IProps {
  setBranch: (val: number) => void;
}


function BranchInfo({ setBranch }: IProps) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: [`Branches`],
    queryFn: () => fetchAllDataGoldNoArg('branches'),
  });
  console.log(data)
  return (
    <TextField
      select
      variant="outlined"
      InputLabelProps={{
        style: { fontWeight: 800, fontSize: '18px',width:"50%" }, // Makes the label bold
      }}
      sx={{
        '& .MuiInputBase-input': {
          lineHeight: '1', // Adjust line height
          width:'100%'
        },
      }}
      onChange={(e) => setBranch(+e.target.value)}
    >
      {data?.data?.data?.map((vendor: IVendor) => (
        <MenuItem key={vendor.id} value={vendor.id}>
          {vendor.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default BranchInfo;
