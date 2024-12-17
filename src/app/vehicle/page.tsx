'use client'
import React, { useState } from 'react';
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';
import InputComponent from '../components/InputComponent';
import { Button, CircularProgress } from '@mui/material';
import { AlertColor } from '@mui/material/Alert';
import axiosInstance from '@/utils/axios';
import AlertComponent from '../components/AlertComponent';
import Link from 'next/link';
import { AlertState } from '@/types';

function page() {
    const router = useRouter();
    const [carModel, setCarModel] = useState<string>("");
    const [price, setPrice] = useState<number | undefined>();
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [images, setImages] = useState<(string | ArrayBuffer | null)[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [alert, setAlert] = useState<AlertState>({
        message: "",
        open: false,
        severity: "success"
    })

    // Function to handle multiple image selections
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages: (string | ArrayBuffer | null)[] = [];
            Array.from(files).forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageUrl = reader.result;
                    // Check if the image is already in the state
                    if (!images.includes(imageUrl)) {
                        newImages.push(imageUrl);
                        setImages(prevImages => [...prevImages, imageUrl]);
                    }
                };
                reader.readAsDataURL(file);
            });
        }
    };

    // Function to remove an image
    const handleRemoveImage = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            if (response.ok) {
                router.push('/');
            } else {
                console.error('Failed to logout');
                showAlert('Failed to logout', 'error')
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Function to make a POST request
    const handlePostRequest = async () => {
        const formData = new FormData();

        formData.append('car_model', carModel);
        formData.append('price', price);
        formData.append('phone_number', phoneNumber);
        images.forEach((image: any) => {
            formData.append('images', image);
        });

        try {
            setIsLoading(true)
            const response = await axiosInstance.post('/vehicle/add', formData)
            showAlert('Vehicle created successfully', 'success')
            resetState()
        } catch (error: any) {
            console.error('Error during POST request:', error);
            showAlert(error.response?.data?.message || error.message, 'error')
        } finally {
            setIsLoading(false)
        }
    };

    const showAlert = (message: string, severity: AlertColor) => {
        setAlert({
            ...alert,
            open: true,
            message,
            severity
        })
    }

    const closeAlert = () => {
        setAlert({
            ...alert,
            open: false,
        })
    }

    const resetState = () => {
        setImages([])
        setCarModel("")
        setPhoneNumber("")
        setPrice(undefined)
    }

    return (
        <>
            <div className={styles['layout-container']}>
                <Link href="/vehicle/list">See list</Link>
                <Button variant="contained" onClick={handleLogout}>Logout</Button>
            </div>
            <AlertComponent message={alert.message} severity={alert.severity} open={alert.open} onClose={closeAlert} />

            <div className={styles.container}>

                {/* <Snackbar message='Only 10 pic' open={images.length > 10} autoHideDuration={2000}/> */}
                <h2>Car Information</h2>
                <InputComponent label={'Model'} type="text" value={carModel} name="carModel" onChange={e => setCarModel(e.target.value)} />
                <InputComponent label={'Price'} type="number" value={price} name="price" onChange={e => setPrice(parseInt(e.target.value))} />
                <InputComponent label={'Phone'} type="number" value={phoneNumber} name="phoneNumber" onChange={e => setPhoneNumber(parseInt(e.target.value))} />

                <div>
                    <label>Upload Photos</label>
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                </div>
                <Button
                    variant="contained"
                    onClick={handlePostRequest}
                    disabled={!carModel || !price || !phoneNumber || images.length < 1 || images.length > 10 || isLoading}
                    startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}
                >Submit</Button>
                {images.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap' }} className={styles['images-container ']}>
                        {images.map((image, index) => (
                            <div key={index} className={styles["image-container"]}>
                                <img src={image as string} alt={`Preview ${index}`} className={styles["preview-image"]} />
                                <div className={styles["remove-icon"]} onClick={() => handleRemoveImage(index)}>
                                    ✖
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                
            </div>
        </>
    );
}

export default page;