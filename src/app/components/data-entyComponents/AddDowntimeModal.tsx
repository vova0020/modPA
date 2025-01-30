/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    MenuItem,
    Grid,
    Box,
    Typography,

    IconButton,
    Snackbar,
    Alert,
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import axios from 'axios';

type DowntimeEntry = {
    reason: string;
    time: number | null;
};

type AddDowntimeModalProps = {
    
    machine: any;
    closeModal: () => void;
    getBaza: () => void;
};

export default function AddDowntimeModal({ machine, closeModal, getBaza }: AddDowntimeModalProps) {
    const [resone, setResone] = useState([]);
    const [downtimes, setDowntimes] = useState<DowntimeEntry[]>([{ reason: '', time: null }]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Загрузка причин простоев
    useEffect(() => {
        const fetchResone = async () => {
            try {
                const response = await axios.get('/api/getResone');
                setResone(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке причин простоев:', error);
            }
        };
        fetchResone();
    }, []);

    // Фильтрация уже выбранных причин
    const availableResones = resone.filter(
        (reason) => !machine.downtimes?.some((downtime) => downtime.reason.id === reason.id)
    );

    // Добавление новой строки для простоя
    const addDowntime = () => {
        setDowntimes([...downtimes, { reason: '', time: null }]);
    };

    // Удаление строки простоя
    const removeDowntime = (index: number) => {
        const updatedDowntimes = downtimes.filter((_, i) => i !== index);
        setDowntimes(updatedDowntimes);
    };

    // Обработка изменений в полях
    const handleChange = (index: number, field: keyof DowntimeEntry, value: string | number) => {
        const updatedDowntimes = [...downtimes];
        updatedDowntimes[index][field] = value as never;
        setDowntimes(updatedDowntimes);
    };

    // Сохранение данных
    const handleSave = async () => {
        try {
            const requestData = {
                machineId: machine.id,
                downtimes: downtimes.map((downtime) => ({
                    reasonId: downtime.reason,
                    quantity: downtime.time,
                })),
            };

            const response = await axios.post('/api/data-entry/newData-entryProstoy', requestData);
            console.log('Данные успешно сохранены:', response.data);

            closeModal();
            getBaza();
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Ошибка при сохранении данных:', error);
            setErrorMessage('Ошибка при сохранении данных. Попробуйте снова.');
        }
    };

    return (
        <Box sx={{ p: 4, borderRadius: '16px', backgroundColor: '#ffffff' }}>
            <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
                Добавление простоев для {machine.name}
            </Typography>

            {downtimes.map((downtime, index) => (
                <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                    <Grid item xs={6}>
                        <TextField
                            select
                            fullWidth
                            label={`Причина простоя ${index + 1}`}
                            value={downtime.reason}
                            onChange={(e) => handleChange(index, 'reason', e.target.value)}
                        >
                            {availableResones.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Время простоя (ч)"
                            value={downtime.time || ''}
                            onChange={(e) => handleChange(index, 'time', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton
                            color="secondary"
                            onClick={() => removeDowntime(index)}
                            disabled={downtimes.length === 1}
                        >
                            <RemoveCircle />
                        </IconButton>
                        {index === downtimes.length - 1 && (
                            <IconButton color="primary" onClick={addDowntime}>
                                <AddCircle />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            ))}

            {errorMessage && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {errorMessage}
                </Typography>
            )}

            <Button
                fullWidth
                variant="contained"
                onClick={handleSave}
                sx={{ mt: 3, mb: 2 }}
            >
                Сохранить
            </Button>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                    Данные успешно сохранены!
                </Alert>
            </Snackbar>
        </Box>
    );
}