import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ModalResone({ data, onClose, mashineId, unitId }) {
    const [editItem, setEditItem] = useState(null);
    const [newItem, setNewItem] = useState({ quantity: '', date: '' });

    const handleEditChange = (field, value) => {
        // Разрешаем редактировать только 'endDate', если оно пустое
        if (field === 'endDate' && !editItem.endDate) {
            setEditItem({ ...editItem, [field]: value });
        }
    };

    const handleSaveEdit = async () => {
        // Обновляем данные в массиве
        const updatedData = data.map(item =>
            item.id === editItem.id ? { ...item, endDate: editItem.endDate } : item
        );

        // Отправляем обновленные данные на сервер
        await axios.put('/api/data-entry/newData-entry', { updatedData });

        // Обновляем состояние с новыми данными
        setEditItem(null);
        // После обновления данных можно передать их родителю, если нужно
        onClose(updatedData);
    };

    const handleNewChange = (field, value) => {
        setNewItem({ ...newItem, [field]: value });
    };

    const handleSaveNew = async () => {
        if (newItem.quantity && newItem.date) {
            let requestData = ({ ...newItem, machineId: mashineId, unitId: unitId });
            console.log(requestData);
            const response = await axios.post('/api/master/postQueryMaster', requestData);
            setNewItem({ quantity: '', date: '' });
        }
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
                <h3 style={{ textAlign: 'center', marginBottom: '15px', color: '#333' }}>
                    Все остановки
                </h3>
                <div style={{ marginBottom: '20px' }}>
                    {data.slice()
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
                                            type="datetime-local"
                                            value={editItem.endDate || ''}
                                            onChange={(e) => handleEditChange('endDate', e.target.value)}
                                            style={{ marginBottom: '10px', width: '100%' }}
                                            placeholder="Дата окончания"
                                            disabled={!!editItem.endDate} // Отключаем, если уже есть значение
                                        />
                                        <button onClick={handleSaveEdit} style={{ marginRight: '10px' }}>
                                            Сохранить
                                        </button>
                                        <button onClick={() => setEditItem(null)}>Отмена</button>
                                    </>
                                ) : (
                                    <>
                                        <p style={{ margin: '0 0 10px', fontWeight: 'bold', fontSize: '16px' }}>
                                            Статус: {item.status.name}
                                        </p>
                                        <p style={{ margin: '0 0 10px', fontWeight: 'bold', fontSize: '16px' }}>
                                            Комментарий: {item.comment || 'нет данных'}
                                        </p>
                                        <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>
                                            Дата начала: {new Date(item.startDate).toLocaleString()}
                                        </p>
                                        <p style={{ margin: '0', fontSize: '14px', color: '#555' }}>
                                            Дата окончания: {item.endDate ? new Date(item.endDate).toLocaleString() : 'Не установлена'}
                                        </p>
                                        {/* Показываем кнопку "Редактировать" только если endDate пустое */}
                                        {!item.endDate && (
                                            <button onClick={() => setEditItem(item)} style={{ marginTop: '10px' }}>
                                                Редактировать
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
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
                        margin: '0 auto',
                    }}
                    onClick={onClose}
                >
                    Закрыть
                </button>
            </div>
        </div>
    );
}
