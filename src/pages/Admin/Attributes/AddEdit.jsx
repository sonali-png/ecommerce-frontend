import React from 'react'
import CommonForm from "../../../components/Admin/form/CommonForm";
import { attributeConfig } from '../../../config/attributeConfig';

 
export default function AddEdit() {
  return (
    <>
        <CommonForm config={attributeConfig}/>
    </>
  )
}
