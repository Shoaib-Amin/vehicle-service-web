import React from 'react'
import { Button, ButtonProps, CircularProgress } from "@mui/material";

type Props = {
    variant: 'text' | 'outlined' | 'contained';
    type?: 'submit'; // add further
    disabled?: boolean;
    isLoading?: boolean;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & ButtonProps;

function ButtonComponent({ isLoading = false, type, disabled = false, variant = "contained", children, onClick, ...props }: Props) {
    return (
        <Button
            variant={variant}
            type={type}
            disabled={disabled}
            startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
            onClick={onClick}
            {...props}
        >{children}
        </Button>
    )
}

export default ButtonComponent