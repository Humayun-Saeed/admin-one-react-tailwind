import React from 'react'
import { IoSearch } from 'react-icons/io5'

const Input = ({ containerProps, value, onChange, placeholder, icon: Icon }) => {
  return (
    <div
      className={`flex items-center h-12 mb-3 rounded-md border border-gray-300 ${containerProps}`}
    >
      <span className="flex items-center pl-3">{Icon && <IoSearch />}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="flex-1 px-3 py-2 border-none focus:outline-none focus:ring-0"
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
