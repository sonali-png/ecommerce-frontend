import React from 'react'
import CommonForm from "../../../components/Admin/form/CommonForm";
import { categoryConfig } from '../../../config/categoryConfig';

 
export default function AddEdit() {
  return (
    <>
        <CommonForm config={categoryConfig}/>
    </>
  )
}
