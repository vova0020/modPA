/* eslint-disable */
// @ts-nocheck
import {
    Box,
    TextField,
    Tooltip,
    IconButton,
    ToggleButtonGroup,
    ToggleButton,
    Button,
    MenuItem,
    Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ModalQuanti({ dataOutputs, dataDowntimes, onClose, mashineId, unitId }) {
    const [editItem, setEditItem] = useState(null);
    const [newItem, setNewItem] = useState({ quantity: '', date: '', reason: '', time: '' });
    const [filteredData, setFilteredData] = useState([]);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [mode, setMode] = useState('production');
    const [downtimeReasons, setDowntimeReasons] = useState([]);

    useEffect(() => {
        fetchDowntimeReasons();
        filterByDateRange();
    }, [mode, dataOutputs, dataDowntimes]);

    const fetchDowntimeReasons = async () => {
        try {
            const response = await axios.get('/api/getResone');
            setDowntimeReasons(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке причин простоев:', error);
        }
    };

    const handleModeChange = (event, newMode) => {
        if (newMode !== null) {
            setMode(newMode);
            setNewItem({ quantity: '', date: '', reason: '', time: '' });
            setEditItem(null);
            filterByDateRange();
        }
    };

    const handleEditChange = (field, value) => {
        setEditItem({ ...editItem, [field]: value, });
    };

    const handleNewChange = (field, value) => {
        setNewItem({ ...newItem, [field]: value });
    };

    const filterByDateRange = () => {
        const { startDate, endDate } = dateRange;
        const data = mode === 'production' ? dataOutputs : dataDowntimes;

        if (!data) {
            setFilteredData([]);
            return;
        }

        if (startDate && endDate) {
            const start = new Date(startDate).setHours(0, 0, 0, 0);
            const end = new Date(endDate).setHours(23, 59, 59, 999);
            const filtered = data.filter(item => {
                const itemDate = new Date(item.date).getTime();
                return itemDate >= start && itemDate <= end;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData([...data]);
        }
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put('/api/master/putDataMaster', { editRowData: { ...editItem, mode: mode } });
            setEditItem(null);
            filterByDateRange();
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    const handleSaveNew = async () => {
        try {
            if ((mode === 'production' && newItem.quantity && newItem.date) ||
                (mode === 'downtime' && newItem.reason && newItem.time && newItem.date)) {

                const requestData = {
                    ...newItem,
                    machineId: mashineId,
                    unitId: unitId?.id,
                    reasonId: mode === 'downtime' ? newItem.reason : null,
                    quantity: mode === 'production' ? newItem.quantity : null,
                    mode: mode
                };

                await axios.post('/api/master/postQueryMaster', requestData);
                setNewItem({ quantity: '', date: '', reason: '', time: '' });
                filterByDateRange();
            }
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        }
    };

    return (
        <div style={modalOverlayStyle} onClick={onClose}>
            <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
                <Typography variant="h5" align="center" sx={{ mb: 3 }}>
                    {mode === 'production' ? 'Управление выработкой' : 'Управление простоями'}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <ToggleButtonGroup
                        value={mode}
                        exclusive
                        onChange={handleModeChange}
                        color="primary"
                    >
                        <ToggleButton value="production">Выработка</ToggleButton>
                        <ToggleButton value="downtime">Простои</ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <TextField
                        label="Начальная дата"
                        type="date"
                        value={dateRange.startDate}
                        onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                    <TextField
                        label="Конечная дата"
                        type="date"
                        value={dateRange.endDate}
                        onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                    />
                    <Tooltip title="Применить фильтр">
                        <IconButton
                            onClick={filterByDateRange}
                            sx={{
                                color: 'success.main',
                                '&:hover': {
                                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                },
                            }}
                        >
                            <CheckCircleIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Сбросить фильтр">
                        <IconButton
                            onClick={() => setDateRange({ startDate: '', endDate: '' })}
                            sx={{
                                color: 'error.main',
                                '&:hover': {
                                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                },
                            }}
                        >
                            <CancelIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <Box sx={{ maxHeight: '400px', overflowY: 'auto', mb: 3 }}>
                    {filteredData.sort((a, b) => a.id - b.id).map((item) => (
                        <Box key={item.id} sx={itemStyle}>
                            {editItem?.id === item.id ? (
                                <EditForm
                                    mode={mode}
                                    item={editItem}
                                    onChange={handleEditChange}
                                    onSave={handleSaveEdit}
                                    onCancel={() => setEditItem(null)}
                                    downtimeReasons={downtimeReasons}
                                />
                            ) : (
                                <DisplayItem
                                    mode={mode}
                                    item={item}
                                    onEdit={() => setEditItem(item)}
                                    unitId={unitId}
                                    downtimeReasons={downtimeReasons}
                                />
                            )}
                        </Box>
                    ))}
                </Box>

                <Box sx={newItemStyle}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Добавить новую запись
                    </Typography>
                    {mode === 'production' ? (
                        <TextField
                            type="number"
                            value={newItem.quantity}
                            onChange={(e) => handleNewChange('quantity', e.target.value)}
                            label="Количество"
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    ) : (
                        <>
                            <TextField
                                select
                                value={newItem.reason}
                                onChange={(e) => handleNewChange('reason', e.target.value)}
                                label="Причина простоя"
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                {downtimeReasons.map((reason) => (
                                    <MenuItem key={reason.id} value={reason.id}>
                                        {reason.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                type="number"
                                value={newItem.time}
                                onChange={(e) => handleNewChange('time', e.target.value)}
                                label="Время простоя (часы)"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </>
                    )}
                    <TextField
                        type="datetime-local"
                        label="Дата"
                        value={newItem.date}
                        onChange={(e) => handleNewChange('date', e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                    />

                    <Button onClick={handleSaveNew} variant="contained" fullWidth>
                        Сохранить
                    </Button>
                </Box>

                <Button onClick={onClose} sx={closeButtonStyle}>
                    Закрыть
                </Button>
            </div>
        </div>
    );
}

const EditForm = ({ mode, item, onChange, onSave, onCancel, downtimeReasons }) => (
    <>
        {mode === 'production' ? (
            <TextField
                type="number"
                value={item.quantity}
                onChange={(e) => onChange('quantity', e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
            />
        ) : (
            <>
                <TextField
                    select
                    value={item.reasonId}
                    onChange={(e) => onChange('reasonId', e.target.value)}
                    label="Причина"
                    fullWidth
                    sx={{ mb: 2 }}
                >
                    {downtimeReasons.map((reason) => (
                        <MenuItem key={reason.id} value={reason.id}>
                            {reason.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onChange('quantity', e.target.value)}
                    label="Время"
                    fullWidth
                    sx={{ mb: 2 }}
                />
            </>
        )}
        <TextField
            type="datetime-local"
            value={item.date}
            onChange={(e) => onChange('date', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
        />
        <Button onClick={onSave} variant="contained" sx={{ mr: 2 }}>
            Сохранить
        </Button>
        <Button onClick={onCancel}>Отмена</Button>
    </>
);

const DisplayItem = ({ mode, item, onEdit, unitId, downtimeReasons }) => (
    <>
        {mode === 'production' ? (
            <>
                <Typography>Количество: {item.quantity} {unitId?.name}</Typography>
                <Typography>Дата: {new Date(item.date).toLocaleString()}</Typography>
            </>
        ) : (
            <>
                <Typography>Причина: {downtimeReasons.find(r => r.id === item.reasonId)?.name}</Typography>
                <Typography>Время простоя: {item.quantity} часов</Typography>
                <Typography>Дата: {new Date(item.date).toLocaleString()}</Typography>
            </>
        )}
        <Button onClick={onEdit} variant="outlined" sx={{ mt: 1 }}>
            Редактировать
        </Button>
    </>
);

// Стили остаются без изменений
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle = {
    position: 'relative',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    zIndex: 1001,
    maxWidth: '80%',
    maxHeight: '80%',
    overflowY: 'auto',
    width: '600px',
};

const itemStyle = {
    padding: '15px',
    margin: '10px 0',
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const newItemStyle = {
    padding: '15px',
    margin: '20px 0',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const closeButtonStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'block',
    margin: '20px auto 0',
};