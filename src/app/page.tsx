'use client'
import styles from "./page.module.css";
import React, { FormEvent, useState } from 'react';
import InputComponent from "./components/InputComponent";
import { AlertColor, Button, CircularProgress } from "@mui/material";
import { AlertState } from "@/types";
import AlertComponent from "./components/AlertComponent";

export default function Home() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [alert, setAlert] = useState<AlertState>({
    message: "",
    open: false,
    severity: "success"
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true)

    // Create the request payload
    const requestBody = {
      email,
      password,
    };

    try {

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {

        window.location.href = '/vehicle'; // Redirect to a protected route
      } else {
        // Login failed, handle failure (e.g., show an error message)
        console.error('Invalid credentials');
        showAlert('Invalid email or password', 'error')
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      showAlert(error?.response?.data?.message || error?.message, 'error')

    } finally {
      setIsLoading(false)
    }
  }

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

  return (
    <div className={styles.container}>
      <h2 className={styles.loginRed}>Login</h2>
      <h2 className={styles['login-green']}>Login-green</h2>
      <AlertComponent message={alert.message} severity={alert.severity} open={alert.open} onClose={closeAlert} />
      <form onSubmit={handleSubmit} className={styles.form}>
        <InputComponent label={'email'} type="email" value={email} name="email" onChange={e => setEmail(e.target.value)} />
        <InputComponent label={'password'} type="password" value={password} name="password" onChange={e => setPassword(e.target.value)} />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={!email || !password || isLoading}
          startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : null}

        >Login</Button>
      </form>
    </div>
  );
}
