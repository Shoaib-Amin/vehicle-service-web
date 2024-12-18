'use client'
import styles from "./page.module.css";
import React, { FormEvent, useState } from 'react';
import { AlertColor } from "@mui/material";
import { AlertState } from "@/types";
import { Alert, Button, Input } from "./components";

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
      <Alert message={alert.message} severity={alert.severity} open={alert.open} onClose={closeAlert} />
      <h2 className={styles.loginText}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label={'email'} type="email" value={email} name="email" onChange={e => setEmail(e.target.value)} />
        <Input label={'password'} type="password" value={password} name="password" onChange={e => setPassword(e.target.value)} />
        <Button
          variant="contained"
          type="submit"
          disabled={!email || !password || isLoading}
          isLoading={isLoading}
        >Login</Button>
      </form>
    </div>
  );
}
