import React, { ChangeEvent } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface InputComponentProps {
  label: string;
  value: string | number | undefined;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

// Use `TextFieldProps` directly as a type for additional props
const InputComponent: React.FC<InputComponentProps & TextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined" // You can change this to "filled" or "standard" as needed
      fullWidth // Makes the input take the full width of its container
      {...props}
    />
  );
};

export default InputComponent;
