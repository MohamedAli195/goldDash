import React from 'react'
import AddCompanyForm from './subComponents/CompanyForm'
import CompanyTable from './subComponents/CompanyTable'

function Company() {

  const data: { id: number; name: string; address: string }[] = []

  // const data = [{id:1,name:"test",address:"10 main streat"}]
  return (
    
      <>
      {
         data.length > 0 ? <CompanyTable data={data} /> : <AddCompanyForm />
      }
      </>
     
    
  )
}

export default Company