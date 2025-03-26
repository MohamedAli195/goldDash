import { Box, Button, FormLabel, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { CloudUpload } from 'lucide-react';
import { ICompany } from 'interfaces';
import { newUrl } from 'functionsWork';
import Input from 'components/common/UI/Input';

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
  address: string;
  client_name: string;
  email: string;
  logo: FileList | null;
  name: string;
  phone1: string;
  phone2: string;
  tax_end_date: string;
  tax_num: string;
  tax_image: FileList | null;
  identity_image: FileList | null;
  contract_file: FileList | null;
}

function UpdateCompanyForm({
  handleClose,
  initialData,
  refetch,
}: {
  handleClose: () => void;
  refetch: () => void;
  initialData?: ICompany | null;
}) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const { t } = useTranslation();

  // const [previewLogo, setPreviewLogo] = useState<string | null>(initialData?.logo || null);
  // const [previewContract, setPreviewContract] = useState<string | null>(null);
  // const [previewTaxImage, setPreviewTaxImage] = useState<string | null>(null);
  // const [previewIdentityImage, setPreviewIdentityImage] = useState<string | null>(null);

  const [preview, setPreview] = useState<string | null>(initialData?.logo ?? null);
  const [previewTax, setPreviewTax] = useState<string | null>(initialData?.tax_image ?? null);
  const [previewID, setPreviewID] = useState<string | null>(initialData?.identity_image ?? null);

  const [contractFileUrl, setContractFileUrl] = useState<string | null>(
    initialData?.contract_file ?? null,
  );

  useEffect(() => {
    if (initialData) {
      setValue('address', initialData.address);
      setValue('client_name', initialData.client_name);
      setValue('email', initialData.email);
      setValue('name', initialData.name);
      setValue('phone1', initialData.phone1);
      setValue('phone2', initialData.phone2);
      setValue('tax_end_date', initialData.tax_end_date || '');
      setValue('tax_num', initialData.tax_num || '');
    }
  }, [initialData, setValue]);

  // Watch file inputs to update previews
  const logoFile = watch('logo') as FileList | undefined;
  const taxImageFile = watch('tax_image') as FileList | undefined;
  const identityImageFile = watch('identity_image') as FileList | undefined;
  const contractFile = watch('contract_file') as FileList | undefined;

  useEffect(() => {
    if (logoFile && logoFile.length > 0) {
      setPreview(URL.createObjectURL(logoFile[0]));
    }
    if (taxImageFile && taxImageFile.length > 0) {
      setPreviewTax(URL.createObjectURL(taxImageFile[0]));
    }
    if (identityImageFile && identityImageFile.length > 0) {
      setPreviewID(URL.createObjectURL(identityImageFile[0]));
    }
    if (contractFile && contractFile.length > 0) {
      setContractFileUrl(URL.createObjectURL(contractFile[0]));
    }
  }, [logoFile, taxImageFile, identityImageFile, contractFile]);

  // const handleFileChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   setPreview: React.Dispatch<React.SetStateAction<string | null>>,
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => setPreview(reader.result as string);
  //     reader.readAsDataURL(file);
  //   }
  // };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {

    console.log(data)
    try {
      // formData.append('address', data.address);
      // formData.append('client_name', data.client_name);
      // formData.append('email', data.email || '');
      // formData.append('name', data.name);
      // formData.append('phone1', data.phone1);
      // formData.append('phone2', data.phone2);
      // formData.append('tax_end_date', data.tax_end_date || '');
      // formData.append('tax_num', data.tax_num);

      // if (data.logo?.length) formData.append('logo', data.logo[0]);
      // if (data.tax_image?.length) formData.append('tax_image', data.tax_image[0]);
      // if (data.identity_image?.length) formData.append('identity_image', data.identity_image[0]);
      // if (data.contract_file?.length) formData.append('contract_file', data.contract_file[0]);

      const formData = new FormData();
      formData.append('address', data.address);
      formData.append('client_name', data.client_name);
      formData.append('email', data.email || '');
      formData.append('name', data.name);
      formData.append('phone1', data.phone1);
      formData.append('phone2', data.phone2);
      formData.append('tax_end_date', data.tax_end_date);
      formData.append('tax_num', data.tax_num);

      if (logoFile?.length) formData.append('logo', logoFile[0]);
      if (contractFile?.length) {
        formData.append('contract_file', contractFile[0]);
      }
      if (taxImageFile?.length) formData.append('tax_image', taxImageFile[0]);
      if (identityImageFile?.length) formData.append('identity_image', identityImageFile[0]);
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('clintToken')}`,
        'Content-Type': 'multipart/form-data',
      };

      await axios.post(`${newUrl}/api/v1/companies/${initialData?.id}`, formData, { headers });

      toast.success(t('Company updated successfully'));
      refetch();
      handleClose();
    } catch (err) {
      toast.error(t('Failed to update company, please check your input.'));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: { sm: 5, xs: 2.5 } }}>
      <Stack spacing={3} gap={2}>
        <Stack flexDirection="row" gap={2}>
          <TextField
            fullWidth
            variant="outlined"
            label={t('Company Name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', { required: t('name') })}
          />
          <TextField fullWidth variant="outlined" label={t('Address')} {...register('address')} />
          <TextField
            fullWidth
            variant="outlined"
            label={t('Client Name')}
            {...register('client_name')}
          />
        </Stack>

        <Stack flexDirection="row" gap={2}>
          <TextField fullWidth variant="outlined" label="Email" {...register('email')} />
          <TextField fullWidth variant="outlined" label={t('Phone-1')} {...register('phone1')} />
          <TextField fullWidth variant="outlined" label={t('Phone-2')} {...register('phone2')} />
        </Stack>

        <Stack flexDirection="row" gap={2}>
          <TextField fullWidth variant="outlined" label="Tax Number" {...register('tax_num')} />
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            label="Tax End Date"
            {...register('tax_end_date')}
          />
        </Stack>

        {/* <Stack flexDirection="row" gap={2} alignItems="center">
          <Stack>
            <FormLabel>Logo</FormLabel>
            <Button component="label" variant="outlined" startIcon={<CloudUpload />}>
              Upload Image
              <VisuallyHiddenInput type="file" {...register('logo')} onChange={(e) => handleFileChange(e, setPreviewLogo)} />
            </Button>
            {previewLogo && <img src={previewLogo} alt={t('Preview')} style={{ maxWidth: '100%', maxHeight: 200 }} />}
          </Stack>

          <Stack>
            <FormLabel>Tax Image</FormLabel>
            <Button component="label" variant="outlined" startIcon={<CloudUpload />}>
              Upload Image
              <VisuallyHiddenInput type="file" {...register('tax_image')} onChange={(e) => handleFileChange(e, setPreviewTaxImage)} />
            </Button>
            {previewTaxImage && <img src={previewTaxImage} alt={t('Preview')} style={{ maxWidth: '100%', maxHeight: 200 }} />}
          </Stack>

          <Stack>
            <FormLabel>Identity Image</FormLabel>
            <Button component="label" variant="outlined" startIcon={<CloudUpload />}>
              Upload Image
              <VisuallyHiddenInput type="file" {...register('identity_image')} onChange={(e) => handleFileChange(e, setPreviewIdentityImage)} />
            </Button>
            {previewIdentityImage && <img src={previewIdentityImage} alt={t('Preview')} style={{ maxWidth: '100%', maxHeight: 200 }} />}
          </Stack>
        </Stack> */}

        {/* File Uploads */}
        <Stack flexDirection="row" gap={2}>
          <label className="block text-sm font-medium text-gray-700">Upload Logo</label>
          <Input type="file" accept="image/*" {...register('logo')} />
          {preview && (
            <img
              src={preview}
              alt="Logo Preview"
              className="max-w-full max-h-48 mt-2 object-cover"
            />
          )}
        </Stack>

        <Stack flexDirection="row" gap={2}>
          <label className="block text-sm font-medium text-gray-700">Upload Tax Image</label>
          <Input type="file" accept="image/*" {...register('tax_image')} />
          {previewTax && (
            <img
              src={previewTax}
              alt="Tax Image Preview"
              className="max-w-full max-h-48 mt-2 object-cover"
            />
          )}
        </Stack>
        <Stack flexDirection="row" gap={2}>
          <label className="block text-sm font-medium text-gray-700">Upload Identity Image</label>
          <Input type="file" accept="image/*" {...register('identity_image')} />
          {previewID && (
            <img
              src={previewID}
              alt="Identity Image Preview"
              className="max-w-full max-h-48 mt-2 object-cover"
            />
          )}
        </Stack>
        <Stack flexDirection="row" gap={2}>
          <label className="block text-sm font-medium text-gray-700">Upload Contract File</label>
          <Input type="file" accept=".pdf,.doc,.docx" {...register('contract_file')} />
          {contractFileUrl && (
            <span className="text-gray-500 text-sm">
              Current File:{' '}
              <a href={contractFileUrl} download className="text-blue-500 underline">
                {contractFileUrl.split('/').pop()}
              </a>
            </span>
          )}
        </Stack>
      </Stack>

      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        sx={{ mt: 3 }}
      >
        {t('Update Company')}
      </Button>
    </Box>
  );
}

export default UpdateCompanyForm;

// import toast, { Toaster } from "react-hot-toast";
// import { Form, SubmitHandler, useForm } from "react-hook-form";
// import { useEffect, useState } from "react";

// import axios from "axios";
// import { useParams } from "react-router";
// import Input from "components/common/UI/Input";
// import { Button } from "@mui/material";
// import { newUrl, token } from "functionsWork";
// import { ICompany } from "interfaces";

// const UpdateCompanyForm = ({
//   onCloseEditModal,
//   refetch,
//   selectedCompany,
// }: {
//   onCloseEditModal: () => void;
//   refetch: () => void;
//   selectedCompany?: null | ICompany;
// }) => {
//   const { register, setValue, handleSubmit, watch } = useForm<ICompany>();
//   const { id } = useParams();

//   const [preview, setPreview] = useState<string | null>(
//     selectedCompany?.logo ?? null
//   );
//   const [previewTax, setPreviewTax] = useState<string | null>(
//     selectedCompany?.tax_image ?? null
//   );
//   const [previewID, setPreviewID] = useState<string | null>(
//     selectedCompany?.identity_image ?? null
//   );

//   const [contractFileUrl, setContractFileUrl] = useState<string | null>(
//     selectedCompany?.contract_file ?? null
//   );

//   useEffect(() => {
//     if (selectedCompany) {
//       setValue("address", selectedCompany.address);
//       setValue("client_name", selectedCompany.client_name);
//       setValue("email", selectedCompany.email);
//       setValue("name", selectedCompany.name);
//       setValue("phone1", selectedCompany.phone1);
//       setValue("phone2", selectedCompany.phone2);
//       setValue("tax_end_date", selectedCompany.tax_end_date);
//       setValue("tax_num", selectedCompany.tax_num);
//       setValue("subscription_start", selectedCompany.subscription_start);
//       setValue("subscription_end", selectedCompany.subscription_end);
//     }
//   }, [selectedCompany, setValue]);

//   // Watch file inputs to update previews
//   const logoFile = watch("logo") as FileList | undefined;
//   const taxImageFile = watch("tax_image") as FileList | undefined;
//   const identityImageFile = watch("identity_image") as FileList | undefined;
//   const contractFile = watch("contract_file") as FileList | undefined;

//   useEffect(() => {
//     if (logoFile && logoFile.length > 0) {
//       setPreview(URL.createObjectURL(logoFile[0]));
//     }
//     if (taxImageFile && taxImageFile.length > 0) {
//       setPreviewTax(URL.createObjectURL(taxImageFile[0]));
//     }
//     if (identityImageFile && identityImageFile.length > 0) {
//       setPreviewID(URL.createObjectURL(identityImageFile[0]));
//     }
//     if (contractFile && contractFile.length > 0) {
//       setContractFileUrl(URL.createObjectURL(contractFile[0]));
//     }
//   }, [logoFile, taxImageFile, identityImageFile, contractFile]);

//   const onSubmit: SubmitHandler<ICompany> = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("address", data.address);
//       formData.append("client_name", data.client_name);
//       formData.append("email", data.email);
//       formData.append("name", data.name);
//       formData.append("phone1", data.phone1);
//       formData.append("phone2", data.phone2);
//       formData.append("tax_end_date", data.tax_end_date);
//       formData.append("tax_num", data.tax_num);
//       formData.append("subscription_start", data.subscription_start);
//       formData.append("subscription_end", data.subscription_end);

//       if (logoFile?.length) formData.append("logo", logoFile[0]);
//       if (contractFile?.length) {
//         formData.append("contract_file", contractFile[0]);
//       }
//       if (taxImageFile?.length) formData.append("tax_image", taxImageFile[0]);
//       if (identityImageFile?.length)
//         formData.append("identity_image", identityImageFile[0]);

//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       };

//       await axios.post(
//         `${newUrl}/api/admin/v1/${id}/companies/${selectedCompany?.id}`,
//         formData,
//         { headers }
//       );

//       toast.success("Company updated successfully");
//       refetch();
//       onCloseEditModal();
//     } catch (err) {
//       console.error("Error updating company:", err);
//       toast.error("Failed to update company, please check your input.");
//     }
//   };

//   return (
//     <>
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <Input
//           type="text"
//           placeholder="Company Name"
//           {...register("name", { required: true })}
//         />
//         <Input
//           type="text"
//           placeholder="Client Name"
//           {...register("client_name")}
//         />
//         <Input type="email" placeholder="Email" {...register("email")} />
//         <Input type="text" placeholder="Address" {...register("address")} />
//         <Input type="tel" placeholder="Phone 1" {...register("phone1")} />
//         <Input type="tel" placeholder="Phone 2" {...register("phone2")} />
//         <Input type="text" placeholder="Tax Number" {...register("tax_num")} />
//         <Input
//           type="date"
//           placeholder="Tax End Date"
//           {...register("tax_end_date")}
//         />
//         <Input
//           type="date"
//           placeholder="Subscription Start"
//           {...register("subscription_start")}
//         />
//         <Input
//           type="date"
//           placeholder="Subscription End"
//           {...register("subscription_end")}
//         />

//         {/* File Uploads */}
//         <label className="block text-sm font-medium text-gray-700">
//           Upload Logo
//         </label>
//         <Input type="file" accept="image/*" {...register("logo")} />
//         {preview && (
//           <img
//             src={preview}
//             alt="Logo Preview"
//             className="max-w-full max-h-48 mt-2 object-cover"
//           />
//         )}

//         <label className="block text-sm font-medium text-gray-700">
//           Upload Tax Image
//         </label>
//         <Input type="file" accept="image/*" {...register("tax_image")} />
//         {previewTax && (
//           <img
//             src={previewTax}
//             alt="Tax Image Preview"
//             className="max-w-full max-h-48 mt-2 object-cover"
//           />
//         )}

//         <label className="block text-sm font-medium text-gray-700">
//           Upload Identity Image
//         </label>
//         <Input type="file" accept="image/*" {...register("identity_image")} />
//         {previewID && (
//           <img
//             src={previewID}
//             alt="Identity Image Preview"
//             className="max-w-full max-h-48 mt-2 object-cover"
//           />
//         )}

//         <label className="block text-sm font-medium text-gray-700">
//           Upload Contract File
//         </label>
//         <Input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           {...register("contract_file")}
//         />
//         {contractFileUrl && (
//           <span className="text-gray-500 text-sm">
//             Current File:{" "}
//             <a
//               href={contractFileUrl}
//               download
//               className="text-blue-500 underline"
//             >
//               {contractFileUrl.split("/").pop()}
//             </a>
//           </span>
//         )}
//         <Button type="submit" className="w-full mt-5">
//           Update Company
//         </Button>
//       </Form>
//       <Toaster position="bottom-center" reverseOrder={false} />
//     </>
//   );
// };

// export default UpdateCompanyForm;

