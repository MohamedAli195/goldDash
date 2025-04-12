import { number } from 'echarts';

export interface ISelectCategory {
  id: number;
  nameAr: string;
  nameEn: string;
  imageUrl: string;
  descriptionAr: string;
  descriptionEn: string;
  // price: string;
}

export interface ICategory {
  id: number;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  //   price: string;
  image: FileList | string;
}

export interface ICompany {
  address: string;
  client_name: string;
  created_at?: string;
  email: string;
  id?: number;
  name: string;
  phone1: string;
  phone2: string;
  tax_end_date?: string  | null;
  tax_num?: string  | null;
  updated_at?: string;
  logo?: string | undefined | null;
  tax_image?: string | undefined | null;
  identity_image?: string | undefined | null;
  contract_file?: string | undefined | null;

}
export interface IVendor {
 id?: number;
 name: string;
 email: string;  
 phone: string;
 address: string;     
identity_id: string,
               
}
export interface items{
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
export interface IEmployee {
  // user_id: number;
  company_id: number;
  branch_id: number;
  // cashier_id: number;
  isCashier:boolean
  name: string;
  address: string;
  national_id: string;
  email: string;
  position: string;
  phone1: string;
  phone2: string;
  start_time: string;
  end_time: string;
  hire_date: string;
  salary: string;
  id?:number
}

export interface IAction {
  action_type: string;
  amount: number;
  date: string;
  description:string;
  employee : {
    id:number;
    name:string;
  };
  id?:number
}

export interface IBranch {
  address: string;

  client_name: string;
  created_at?: string;
  email: string;
  id?: number;
  name: string;
  phone1: string;
  phone2: string;
  tax_end_date: string;
  tax_num: string;
  updated_at?: string;
  company: {
    name: string;
    id: number;
  };

  logo?: string | undefined | null;
  tax_image?: string | undefined | null;
  identity_image?: string | undefined | null;
  contract_file?: string | undefined | null;
}

export interface ICashier {
  id?: number;
  branch_id: number;
  name: string;
  national_id: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  created_at?: string;
  updated_at?: string;
  branch: {
    id: number;
    name: string;
  };
}

//package done

export interface IPackageSelected {
  id: number;
  nameAr: string;
  nameEn: string;
  price: string;
  imageUrl: string;
  status: string | null;
}

export interface IPackage {
  id: number;
  name: { en: string; ar: string };
  price: string;
  image: string | null | FileList;
  status: string | null;
}

export interface Ipermisson {
  id: number;
  name: string;
  display_name: string;
}

export interface ISupPermission {
  entity_type: string;
  entity_id: number;

  name: string;
  permissions: string[];
}
export interface IUser {
  id: number;
  name: string;
  email: string;
  permission?: ISupPermission[];
}
