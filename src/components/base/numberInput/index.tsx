import React from 'react';

export default function NumberInput (props:any) {
  const {value, onChange } = props 
  return (
    <div>
      <span onClick={() => onChange(null, -1)}>-</span>
      <input 
        type="number" 
        value={value} 
        onChange={onChange}
      />
      <span onClick={() => onChange(null, 1)}>+</span>
    </div>
  )
}