'use client'
import styles from "./page.module.css";
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/utils/axios';
import { AlertState, Vehicle } from '@/types';
import { AlertColor } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress, Typography } from '@mui/material';
import AlertComponent from '@/app/components/AlertComponent';
import Image from 'next/image';

function VehicleListPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [alert, setAlert] = useState<AlertState>({
        message: "",
        open: false,
        severity: "success"
    })
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    useEffect(() => {
        fetchData()
    }, [])

    // Fetch vehicle data from API
    const fetchData = async () => {
        setLoading(true); // Set loading to true when data is being fetched
        try {
            const response = await axiosInstance.get('/vehicle')
            if (response.data) {
                setVehicles(response.data.data)
            }
        } catch (error: any) {
            showAlert(error?.response?.data?.message || error.message, 'error')
        } finally {
            setLoading(false); // Set loading to false after fetching completes
        }
    }

    // Delete vehicle by ID
    const deleteVehicle = async (vehicleId: string) => {
        try {
            const response = await axiosInstance.delete(`/vehicle/${vehicleId}`)
            if (response.data) {
                setVehicles(vehicles.filter(vehicle => vehicle._id !== vehicleId)) // Remove deleted vehicle from the state
                showAlert('Vehicle deleted successfully', 'success')
            }
        } catch (error: any) {
            showAlert(error?.response?.data?.message || error.message, 'error')
        }
    }

    // Show alert message
    const showAlert = (message: string, severity: AlertColor) => {
        setAlert({
            ...alert,
            open: true,
            message,
            severity
        })
    }

    // Close alert
    const closeAlert = () => {
        setAlert({
            ...alert,
            open: false,
        })
    }

    return (
        <>
        <div className={styles.test}>
                <p>test 1</p>
        </div>
        <div className={styles.test2}>
                <p>test 2</p>
        </div>
        <div className={styles["vehicle-list-container"]}>
            <AlertComponent message={alert.message} severity={alert.severity} open={alert.open} onClose={closeAlert} />
            <h2>Vehicle List</h2>

            {/* Loading Spinner */}
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </div>
            ) : vehicles.length === 0 ? (
                <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
                    No vehicles available.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Car Model</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Actions</TableCell> {/* Add Actions column */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {vehicles.length > 0 && vehicles.map((vehicle) => (
                                <TableRow key={vehicle._id}> {/* Use vehicle._id as key */}
                                    <TableCell>{vehicle.car_model}</TableCell>
                                    <TableCell>{vehicle.phone_number}</TableCell>
                                    <TableCell>{vehicle.price}</TableCell>
                                    <TableCell>
                                        <img
                                            src={vehicle.images[0]?.image_url || ''}  // Provide a fallback image URL
                                            alt={vehicle.images[0]?.image_name || 'vehicle image'}
                                            width={100}
                                            height={60}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {/* Delete Button */}
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => deleteVehicle(vehicle._id)} // Delete the vehicle by ID
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
        </>
    )
}

export default VehicleListPage
