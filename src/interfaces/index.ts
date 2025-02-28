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
  logo?: string | undefined | null;

  name: string;
  phone1: string;
  phone2: string;
  tax_end_date: string;
  tax_num: string;
  updated_at?: string;
  // name: { en: string; ar: string };
}

export interface IBranch {
  address: string;
  // company_id: number;
  // company_name: string;
  client_name: string;
  created_at?: string;
  email: string;
  id?: number;
  logo?: string | undefined | null;
  name: string;
  phone1: string;
  phone2: string;
  tax_end_date: string;
  tax_num: string;
  updated_at?: string;
  company:{
    name:string
    id:number
  }
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
  branch:{
    id:number;
    name:string
  }

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
