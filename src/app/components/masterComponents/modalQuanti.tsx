import { Box, TextField, Tooltip, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function ModalQuanti({ data, onClose, mashineId, unitId }) {
    const [editItem, setEditItem] = useState(null);
    const [newItem, setNewItem] = useState({ quantity: '', date: '' });
    const [filteredData, setFilteredData] = useState(data);
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    const handleEditChange = (field, value) => {
        setEditItem({ ...editItem, process: 'ВыработкаМастер', [field]: value });
    };

    const handleNewChange = (field, value) => {
        setNewItem({ ...newItem, [field]: value });
    };

    const handleDateRangeChange = (field, value) => {
        setDateRange({ ...dateRange, [field]: value });
    };

    const filterByDateRange = () => {
        const { startDate, endDate } = dateRange;
        if (startDate && endDate) {
            const start = new Date(startDate).setHours(0, 0, 0, 0);
            const end = new Date(endDate).setHours(23, 59, 59, 999);
            const filtered = data.filter(item => {
                const itemDate = new Date(item.date).getTime();
                return itemDate >= start && itemDate <= end;
            });
            setFilteredData(filtered);
        }
    };


    const handleSaveEdit = async () => {
        let editRowData = editItem;
        await axios.put('/api/data-entry/newData-entry', { editRowData });
        setEditItem(null);
    };

    const handleSaveNew = async () => {
        if (newItem.quantity && newItem.date) {
            let requestData = ({ ...newItem, machineId: mashineId, unitId: unitId });
            const response = await axios.post('/api/master/postQueryMaster', requestData);
            setNewItem({ quantity: '', date: '' });
        }
    };

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    useEffect(() => {
        if (dateRange.startDate || dateRange.endDate) {
            filterByDateRange();
        } else {
            setFilteredData(data);
        }
    }, [data]);


    return (
        <div
            style={{
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
            }}
            onClick={onClose}
        >
            <div
                style={{
                    position: 'relative',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                    zIndex: 1001,
                    maxWidth: '80%',
                    maxHeight: '80%',
                    overflowY: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
                    Выработка
                </h3>

                {/* Фильтр по диапазону дат */}
                <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: 2,
                backgroundColor: '#f1f5f9',
                borderRadius: 2,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Box sx={{ flex: 1 }}>
                <TextField
                    label="Начальная дата"
                    type="date"
                    value={dateRange.startDate}
                    onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Box>
            <Box sx={{ flex: 1 }}>
                <TextField
                    label="Конечная дата"
                    type="date"
                    value={dateRange.endDate}
                    onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Box>
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


                {/* Список данных */}
                <div>
                    {filteredData.slice()
                        .sort((a, b) => a.id - b.id)
                        .map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    padding: '15px',
                                    margin: '10px 0',
                                    borderRadius: '5px',
                                    backgroundColor: '#eaf6ff',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    color: '#333',
                                }}
                            >
                                {editItem?.id === item.id ? (
                                    <>
                                        <input
                                            type="number"
                                            value={editItem.quantity}
                                            onChange={(e) => handleEditChange('quantity', e.target.value)}
                                            style={{ marginBottom: '10px', width: '100%' }}
                                            placeholder="Количество"
                                        />
                                        <input
                                            type="datetime-local"
                                            value={editItem.date}
                                            onChange={(e) => handleEditChange('date', e.target.value)}
                                            style={{ marginBottom: '10px', width: '100%' }}
                                            placeholder="Дата"
                                        />
                                        <button onClick={handleSaveEdit} style={{ marginRight: '10px' }}>
                                            Сохранить
                                        </button>
                                        <button onClick={() => setEditItem(null)}>Отмена</button>
                                    </>
                                ) : (
                                    <>
                                        <p style={{ margin: '0 0 10px', fontWeight: 'bold', fontSize: '16px' }}>
                                            Количество: {item.quantity} Штуки
                                        </p>
                                        <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>
                                            Дата: {new Date(item.date).toLocaleString()}
                                        </p>
                                        <button onClick={() => setEditItem(item)} style={{ marginTop: '10px' }}>
                                            Редактировать
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}
                </div>

                {/* Кнопка закрытия */}
                <button
                    style={{
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        display: 'block',
                        margin: '20px auto 0',
                    }}
                    onClick={onClose}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
}
