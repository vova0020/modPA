'use client'
import { Typography, Box, TextField, Button } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'



export default function CreateUnitMeasurement() {
    const [departmentName, setDepartmentName] = useState('');
    const handleDepartmentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // await axios.post('/api/createApplicationsPage/getOtdels', { name: departmentName });
            // setSnackbarMessage(`Отдел "${departmentName}" успешно добавлен!`);
            // setOpenSnackbar(true);
            setDepartmentName('');
            // fetchOtdels(); // Обновление списка отделов
        } catch (error) {
            console.error('Ошибка при создании отдела:', error);
            // setSnackbarMessage(`Ошибка при создании отдела: ${error.message}`);
            // setOpenSnackbar(true);
        }
    };

    return (
        <div>
            
            <Box component="form" onSubmit={handleDepartmentSubmit} noValidate sx={{ mt: 2 }}>
                <TextField
                    label="Название Станка"
                    variant="outlined"
                    fullWidth
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Создать Станок
                </Button>
            </Box>
        </div>
    )
}