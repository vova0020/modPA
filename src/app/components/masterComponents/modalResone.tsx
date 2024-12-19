import React, { useEffect, useState } from 'react';
import { Box, Select, MenuItem, InputLabel, FormControl, IconButton, Tooltip, Button } from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ClearIcon from '@mui/icons-material/Clear';

export default function ModalResone({ data, onClose }) {
    const [filteredData, setFilteredData] = useState(data);
    const [statusFilter, setStatusFilter] = useState('');
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    // Получение уникальных статусов из данных
    const uniqueStatuses = [...new Set(data.map((item) => item.status.name))];

    // Функция для применения фильтров
    const applyFilters = () => {
        let result = data;
    
        // Фильтр по статусу
        if (statusFilter) {
            result = result.filter((item) => item.status.name === statusFilter);
        }
    
        // Фильтр по диапазону дат
        if (dateRange.startDate && dateRange.endDate) {
            const normalizeDate = (date) => {
                const normalized = new Date(date);
                normalized.setHours(0, 0, 0, 0); // Устанавливаем время в полночь
                return normalized;
            };
    
            const startDate = normalizeDate(dateRange.startDate);
            const endDate = normalizeDate(dateRange.endDate);
    
            result = result.filter((item) => {
                const itemDate = normalizeDate(item.startDate);
                // Если даты одинаковые, показываем только этот день
                if (startDate.getTime() === endDate.getTime()) {
                    return itemDate.getTime() === startDate.getTime();
                }
                // Иначе фильтруем по диапазону
                return itemDate >= startDate && itemDate <= endDate;
            });
        }
    
        setFilteredData(result);
    };

    // Сброс фильтров
    const resetFilters = () => {
        setStatusFilter('');
        setDateRange({ startDate: '', endDate: '' });
        setFilteredData(data);
    };

    useEffect(() => {
        applyFilters();
    }, [statusFilter, dateRange]);

    // Обработчики изменения фильтров
    const handleDateChange = (field, value) => {
        setDateRange({ ...dateRange, [field]: value });
    };

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
                    Все остановки
                </h3>

                {/* Фильтры */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        marginBottom: 3,
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    {/* Фильтр по статусу */}
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel id="status-filter-label">Фильтр по статусу</InputLabel>
                        <Select
                            labelId="status-filter-label"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <MenuItem value="">Все</MenuItem>
                            {uniqueStatuses.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* Фильтр по диапазону дат */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <div>
                            <label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    display: 'block',
                                    marginBottom: '4px',
                                }}
                            >
                                Начальная дата
                            </label>
                            <input
                                type="date"
                                value={dateRange.startDate}
                                onChange={(e) => handleDateChange('startDate', e.target.value)}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    fontSize: '14px',
                                    width: '100%',
                                }}
                            />
                        </div>
                        <div>
                            <label
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    display: 'block',
                                    marginBottom: '4px',
                                }}
                            >
                                Конечная дата
                            </label>
                            <input
                                type="date"
                                value={dateRange.endDate}
                                onChange={(e) => handleDateChange('endDate', e.target.value)}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px',
                                    fontSize: '14px',
                                    width: '100%',
                                }}
                            />
                        </div>
                    </Box>

                    {/* Кнопки */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {/* <Tooltip title="Применить фильтры">
                            <Button
                                onClick={applyFilters}
                                variant="contained"
                                color="primary"
                                // startIcon={<DateRangeIcon />}
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <DateRangeIcon />
                            </Button>
                        </Tooltip> */}
                        <Tooltip title="Сбросить фильтры">
                            <Button
                                onClick={resetFilters}
                                variant="outlined"
                                color="secondary"
                                // startIcon={<ClearIcon />}
                                sx={{
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <ClearIcon />
                            </Button>
                        </Tooltip>
                    </Box>
                </Box>

                {/* Список данных */}
                <div>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
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
                                <p
                                    style={{
                                        margin: '0 0 10px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}
                                >
                                    Статус: {item.status.name}
                                </p>
                                <p
                                    style={{
                                        margin: '0 0 10px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}
                                >
                                    Комментарий: {item.comment || 'нет данных'}
                                </p>
                                <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>
                                    Дата начала: {new Date(item.startDate).toLocaleString()}
                                </p>
                                <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>
                                    Дата окончания: {item.endDate
                                        ? new Date(item.endDate).toLocaleString()
                                        : 'Не установлена'}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#666' }}>Нет данных для отображения</p>
                    )}
                </div>

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
