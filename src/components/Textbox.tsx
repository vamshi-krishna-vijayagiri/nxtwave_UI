import * as React from "react";
import TextField from "@mui/material/TextField";

interface TextInputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

export default function TextInputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  maxLength = 100,
}: TextInputFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= maxLength) {
      onChange(event.target.value);
    }
  };

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={handleChange}
      type={type}
      placeholder={placeholder}
      required={required}
      fullWidth
    />
  );
}
