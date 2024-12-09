'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { 
    Button, CssBaseline, TextField, MenuItem, Grid, Box, Typography, 
    Container, Paper, Fade, Snackbar, Alert, IconButton 
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ff4081',
        },
        background: {
            default: '#f4f6f8',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

type DowntimeEntry = {
    reason: string;
    time: number | null;
};

type FormInputs = {
    productivity: number;
    downtimes: DowntimeEntry[];
};

export default function OperatorsForm() {
    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm<FormInputs>({
        defaultValues: {
            downtimes: [{ reason: '', time: null }],
        },
    });

    const [formKey, setFormKey] = useState(0);

    const simpleReasons = ['Отсутствует оператор', 'Наладка', 'Уборка', 'Поломка', 'Другая причина'];
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const downtimes = watch("downtimes");

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data);
        setOpenSnackbar(true);
        reset(); // Сброс формы
        setFormKey((prevKey) => prevKey + 1);
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const addDowntime = () => {
        setValue("downtimes", [...downtimes, { reason: '', time: null }]);
    };

    const removeDowntime = (index: number) => {
        const updatedDowntimes = downtimes.filter((_, i) => i !== index);
        setValue("downtimes", updatedDowntimes);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
                <CssBaseline />
                <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', backgroundColor: '#ffffff' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Fade in>
                                <PrecisionManufacturingIcon sx={{ fontSize: 70, color: "success.main" }} />
                            </Fade>
                            <Typography component="h1" variant="h4" sx={{ ml: 1, fontWeight: 'bold' }}>
                                - BST
                            </Typography>
                        </Box>

                        <Box component="form" key={formKey} onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                            {/* Выработка */}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sx={{ mt: 2, mb: 1 }}>
                                    <Typography component="h2" variant="h6" sx={{ textAlign: 'center', borderBottom: '1px solid black' }}>
                                        Данные о выработке оборудования
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="productivity"
                                        label="Выработка"
                                        {...register("productivity", {
                                            required: "Введите выработку",
                                            setValueAs: (value) => (value === "" ? null : Number(value)),
                                        })}
                                        error={!!errors.productivity}
                                        helperText={errors.productivity?.message}
                                        InputProps={{
                                            startAdornment: <AssignmentIcon sx={{ mr: 1 }} />,
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {/* Простои */}
                            <Grid item xs={12} sx={{ mt: 2, mb: 3 }}>
                                <Typography component="h2" variant="h6" sx={{ textAlign: 'center', borderBottom: '1px solid black' }}>
                                    Данные о простое оборудования
                                </Typography>
                            </Grid>

                            {downtimes.map((downtime, index) => (
                                <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            select
                                            fullWidth
                                            label={`Причина простоя ${index + 1}`}
                                            {...register(`downtimes.${index}.reason` as const, { required: "Выберите причину простоя" })}
                                            error={!!errors?.downtimes?.[index]?.reason}
                                            helperText={errors?.downtimes?.[index]?.reason?.message}
                                        >
                                            {simpleReasons.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            required
                                            fullWidth
                                            type="number"
                                            label="Время простоя (ч)"
                                            {...register(`downtimes.${index}.time` as const, { required: "Введите время простоя" })}
                                            error={!!errors?.downtimes?.[index]?.time}
                                            helperText={errors?.downtimes?.[index]?.time?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <IconButton color="secondary" onClick={() => removeDowntime(index)} disabled={downtimes.length === 1}>
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

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Сохранить данные
                            </Button>
                        </Box>
                    </Box>
                </Paper>

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        Данные успешно сохранены!
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}
