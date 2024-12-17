import { AlertColor } from "@mui/material";

export type Vehicle = {
    car_model: string;
    phone_number: string;
    price: number;
    images: [
        {
            image_name: string;
            image_url: string;
        }
    ];
    [key: string]: any;
}

export type AlertState = {
    message: string,
    open: boolean,
    severity: AlertColor
}