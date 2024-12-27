'use client';
/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Box, TextField, Button, IconButton, Snackbar, Alert, Dialog, DialogTitle, DialogActions, DialogContent, MenuItem } from '@mui/material';
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
    const [stanock, setStanock] = useState<Sector[]>([]);
    const [sectors, setSectors] = useState([]);
    const [units, setUnits] = useState([]);
    const [users, setUsers] = useState<Sector[]>([]);
    const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogAction, setDialogAction] = useState<'add' | 'edit' | null>(null);
    const [sectorName, setSectorName] = useState('');
    const [selectSector, setSelectSector] = useState('');
    const [selectUnit, setSelectUnit] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        getSectors();
    }, []);

    useMemo(() => {
        const intervalId = setInterval(() => {
            getSectors(); // Обновляем данные
        }, 8000); // Обновляем каждые 5 секунд

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);

    }, []);


    const getSectors = async () => {
        try {
            const response = await axios.get('/api/adminka/updateStanock');
            setStanock(response.data.sort((a: Sector, b: Sector) => a.id - b.id));
            const response2 = await axios.get('/api/adminka/updateSector');
            setSectors(response2.data.sort((a, b) => a.id - b.id));
            const response3 = await axios.get('/api/adminka/updateUnit');
            setUnits(response3.data.sort((a, b) => a.id - b.id));
            const response4 = await axios.get('/api/adminka/updateUsers');
            setUsers(response4.data.sort((a: Sector, b: Sector) => a.id - b.id));
            // console.log(response.data);

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
        setSelectSector('')
        setSelectUnit('')
        setDialogAction(null);
    };

    const handleAddSector = async () => {
        if (!sectorName.trim() && !selectSector.trim() && !selectUnit.trim()) {
            showSnackbar('Название и участок не может быть пустым.', 'error');
            return;
        }
        
        try {
            await axios.post('/api/adminka/updateStanock', { name: sectorName,  unitId:selectUnit, sectionId:selectSector });
            showSnackbar('Станок успешно добавлен!', 'success');
            getSectors();
            handleDialogClose();
        } catch {
            showSnackbar('Ошибка при добавлении станка.', 'error');
        }
    };

    const handleEditSector = async () => {
        if (!selectedSector ) return;
        try {
            await axios.put('/api/adminka/updateStanock', { sectorId: selectedSector.id, name: sectorName, unitId:selectUnit, sectionId:selectSector });
            showSnackbar('Станок успешно обновлён!', 'success');
            getSectors();
            handleDialogClose();
        } catch {
            showSnackbar('Ошибка при обновлении станка.', 'error');
        }
    };

    const handleDeleteSector = async (clickId) => {
        // if (!selectedSector) return;
        try {
            await axios.delete('/api/adminka/updateStanock', { data: { sectorId: clickId } });
            showSnackbar('станок удалён!', 'success');
            getSectors();
        } catch {
            showSnackbar('Ошибка при удалении станка.', 'error');
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 20 },
        { field: 'name', headerName: 'Название', width: 150, },
        {
            field: 'sectionName',
            headerName: 'Связь с участком',
            width: 150,
            renderCell: (params) => (
                params.row?.section?.name || 'Без участка'
            ),
        },
        {
            field: 'unitName',
            headerName: 'Единица измерения',
            width: 150,
            renderCell: (params) => (
                params.row?.unit?.name || 'Без единицы измерения'
            ),
        },
        {
            field: 'UserName',
            headerName: 'Связь с оператором',
            width: 150,
            renderCell: (params) => {
                const user = params.row?.user;
                if (user) {
                    return `${user.firstName || ''}  ${user.lastName || ''}`;
                }
                return 'Не привязан к пользователю';
            },
            
        },
        {
            field: 'masterName',
            headerName: 'Доп связь с мастером',
            width: 150,
            renderCell: (params) => {
                const master = params.row?.master;
                if (master) {
                    return `${master.firstName || ''}  ${master.lastName || ''}`;
                }
                return 'Нет доп связи';
            },
            
        },
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
        <Box sx={{ height: '97%', p: 4, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h5" gutterBottom>
                Управление станками
            </Typography>
            <Button startIcon={<AddIcon />} variant="contained" onClick={() => { setDialogAction('add'); setOpenDialog(true); }}>
                Добавить станок
            </Button>
            <Box sx={{ height: '70%', mt: 3 }}>
                <DataGrid
                    rows={stanock}
                    columns={columns}
                    autoHeight={false}
                    localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                    disableRowSelectionOnClick />
            </Box>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>{dialogAction === 'add' ? 'Добавить станок' : 'Редактировать станок'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Название станка"
                        variant="outlined"
                        fullWidth
                        value={sectorName}
                        onChange={(e) => setSectorName(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        select
                        label="Участок"
                        variant="outlined"
                        fullWidth
                        value={selectSector}
                        onChange={(e) => setSelectSector(e.target.value)}

                        sx={{ mt: 2 }}
                    >
                        {sectors.map((sector) => (
                            <MenuItem key={sector.id} value={sector.id || ''}>
                                {sector.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        label="Единица измерения"
                        variant="outlined"
                        fullWidth
                        value={selectUnit}
                        onChange={(e) => setSelectUnit(e.target.value)}

                        sx={{ mt: 2 }}
                    >
                        {units.map((unit) => (
                            <MenuItem key={unit.id} value={unit.id || ''}>
                                {unit.name}
                            </MenuItem>
                        ))}
                    </TextField>
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
