'use client';
/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { ruRU } from '@mui/x-data-grid/locales/ruRU';

type Sector = {
    id: number;
    name: string;
};

export default function CreateSectors() {
    const [unit, setUnit] = useState<Sector[]>([]);
    const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogAction, setDialogAction] = useState<'add' | 'edit' | null>(null);
    const [sectorName, setSectorName] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        getSectors();
    }, []);

    const getSectors = async () => {
        try {
            const response = await axios.get('/api/adminka/updateUnit');
            setUnit(response.data.sort((a: Sector, b: Sector) => a.id - b.id));
        } catch (error) {
            showSnackbar('Ошибка загрузки данных.', 'error');
        }
    };

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setSectorName('');
        setDialogAction(null);
    };

    const handleAddSector = async () => {
        if (!sectorName.trim()) {
            showSnackbar('Название не может быть пустым.', 'error');
            return;
        }
        try {
            await axios.post('/api/adminka/updateUnit', { name: sectorName });
            showSnackbar('Единица измерения успешно добавлена!', 'success');
            getSectors();
            handleDialogClose();
        } catch {
            showSnackbar('Ошибка при единицы измерения.', 'error');
        }
    };

    const handleEditSector = async () => {
        if (!selectedSector || !sectorName.trim()) return;
        try {
            await axios.put('/api/adminka/updateUnit', { sectorId: selectedSector.id, name: sectorName });
            showSnackbar('Единица измерения обновлёна!', 'success');
            getSectors();
            handleDialogClose();
        } catch {
            showSnackbar('Ошибка при обновлении единицы измерения.', 'error');
        }
    };

    const handleDeleteSector = async (clickId) => {
        // if (!selectedSector) return;
        try {
            await axios.delete('/api/adminka/updateUnit', { data: { sectorId: clickId } });
            showSnackbar('Единица измерения удалёна!', 'success');
            getSectors();
        } catch {
            showSnackbar('Ошибка при удалении единицы измерения.', 'error');
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Название', flex: 1 },
        {
            field: 'actions',
            headerName: 'Действия',
            sortable: false,
            renderCell: (params) => (
                <>
                    <IconButton onClick={() => { setSelectedSector(params.row); setDialogAction('edit'); setSectorName(params.row.name); setOpenDialog(true); }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => { setSelectedSector(params.row); handleDeleteSector(params.row.id); }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
            width: 150,
        },
    ];

    return (
        <Box sx={{height: '97%', p: 4, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" gutterBottom>
            Создание единиц измерения
            </Typography>
            <Button startIcon={<AddIcon />} variant="contained" onClick={() => { setDialogAction('add'); setOpenDialog(true); }}>
                Добавить единицу измерения
            </Button>
            <Box sx={{height: '70%', mt: 3 }}>
                <DataGrid 
                rows={unit}
                 columns={columns}
                 autoHeight={false}
                  localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                   disableRowSelectionOnClick />
            </Box>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>{dialogAction === 'add' ? 'Добавить единицу измерения' : 'Редактировать единицу измерения'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Название единицы измерения"
                        variant="outlined"
                        fullWidth
                        value={sectorName}
                        onChange={(e) => setSectorName(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Отмена</Button>
                    <Button onClick={dialogAction === 'add' ? handleAddSector : handleEditSector} variant="contained">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                 {/* @ts-ignore */}
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
