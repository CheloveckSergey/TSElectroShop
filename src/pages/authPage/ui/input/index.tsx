import React, { FC } from "react";
import './styles.scss';

interface CustomInputProps {
  type: string,
  header: string,
  name: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  error: string,
  setError: React.Dispatch<React.SetStateAction<string>>,
}

const CustomInput: FC<CustomInputProps> = ({ type, header, name, value, setValue, error, setError }) => {
  return (
    <>
      <label htmlFor='login'>{header}</label>
      <input type={type} name='login' value={value} onChange={(e) => {
        setValue(e.target.value);
        setError('');
      }} />
      <p className='error-message'>{error}</p>
    </>
  )
}

export default CustomInput;