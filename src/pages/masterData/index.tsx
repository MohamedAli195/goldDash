import React, { useState } from 'react'
import Company from './components/Company'
import Cashier from './components/Cashier'
import Branch from './components/Branch'
import Factory from './components/Factory'
import { Box, Button, Stack } from '@mui/material'


// interface IContent {
//     content : "company"|"cashier"|"branch"|"factory"
// }
function MasterDataPage() {

    const [content,setContent] =useState("company")

    const render = ()=>{
        if (content==="company") return <Company />
        if (content==="cashier") return <Cashier />
        if (content==="branch") return <Branch />
        if (content==="factory") return <Factory />
    }
    
  return (
    <>
    <Stack flexDirection={"row"}>
    
    <Box onClick ={()=>setContent("company")}><Button>company</Button></Box>
    <Box onClick ={()=>setContent("cashier")}><Button>cashier</Button></Box>
    <Box onClick ={()=>setContent("branch")}><Button>branch</Button></Box>
    <Box onClick ={()=>setContent("factory")}><Button>factory</Button></Box>
    </Stack>

{render()}

    </>
  )
}

export default MasterDataPage