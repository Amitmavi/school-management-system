import React from 'react'
import FeesDiscountForm from '../../component/feesdiscount/feesdiscount'
import FeesDiscountList from '../../component/feesdiscount/feesdiscountlist'

export default function Discount() {
  return (
    <div> 
      <div style={{ display: 'flex' }}>
      <FeesDiscountForm />
      <FeesDiscountList />
    </div>
    </div>
  )
}