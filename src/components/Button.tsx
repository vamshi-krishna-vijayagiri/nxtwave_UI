import Button from '@mui/material/Button';

interface ButtonProps {
  label: string;
  variant: "contained" | "outlined";
  type?: "button" | "submit" ;
  onClick?: () => void;
}

export default function Btn({ label, variant, type, onClick }: ButtonProps) {
  return (
    <Button   
      type={type}
      variant={variant} 
      onClick={onClick} 
      fullWidth
    >
      {label}
    </Button>
  );
}