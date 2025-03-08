import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

interface IProps {
  permissions: string[];
  setPermissions: (permissions: string[]) => void;
}
export default function CheckboxLabels({ permissions, setPermissions }: IProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    const newPermissions = [...permissions];
    if (newPermissions[0] === '') {
      newPermissions.pop();
    }
    if (checked) {
      newPermissions.push(name);
    } else {
      newPermissions.splice(newPermissions.indexOf(name), 1);
    }
    setPermissions(newPermissions);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox />}
        name="create"
        label="Create"
        onChange={handleChange}
      />
      <FormControlLabel control={<Checkbox />} name="edit" label="Edit" onChange={handleChange} />
      <FormControlLabel
        control={<Checkbox />}
        name="delete"
        label="Delete"
        onChange={handleChange}
      />
      <FormControlLabel control={<Checkbox />} name="view" label="View" onChange={handleChange} />
    </FormGroup>
  );
}
