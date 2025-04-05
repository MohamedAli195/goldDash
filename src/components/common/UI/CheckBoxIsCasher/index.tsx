import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxIsCashier({checked,setChecked}:{checked:boolean,setChecked:(val:boolean)=>void}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}