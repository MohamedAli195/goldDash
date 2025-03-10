import { MouseEvent, useState } from 'react';

import { MenuItem, Popover } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import IconifyIcon from 'components/base/IconifyIcon';
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: 'flag:sh-4x3',
  },
  {
    value: 'ar',
    label: 'عربى',
    icon: 'flag:sa-4x3',
  },

  // {
  //   value: 'bd',
  //   label: 'Bangla',
  //   icon: 'flag:bd-4x3',
  // },
];

// ----------------------------------------------------------------------
const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose()
  };
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          height: 40,
          width: 40,
          p: 1,
          ...(open ? { bgcolor: 'primary.lighter' } : {}),
        }}
      >
        <IconifyIcon
          icon= {i18n.language === "ar" ? 'flag:sa-4x3':"flag:sh-4x3"}
          sx={{
            maxWidth: 1,
            borderRadius: 1,
            verticalAlign: 'middle',
          }}
        />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 170 },
          },
        }}
      >
        {LANGS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === LANGS[0].value}
            onClick={()=>{
              changeLanguage(option.value)
              // console.log(option.value)
              
            }}
            sx={{ typography: 'body2', py: 1 }}
          >
            <IconifyIcon icon={option.icon} sx={{ width: 28, height: 28, mr: 2 }} />

            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};

export default LanguageDropdown;
