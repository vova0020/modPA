import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ModalQuanti({ data, onClose, mashineId, unitId }) {
    const [editItem, setEditItem] = useState(null);
    const [newItem, setNewItem] = useState({ quantity: '', date: '' });

    const handleEditChange = (field, value) => {
        setEditItem({ ...editItem, process: 'ВыработкаМастер', [field]: value });
    };

    const handleNewChange = (field, value) => {
        setNewItem({ ...newItem, [field]: value });
    };

    const handleSaveEdit = async () => {
        // onUpdate(editItem);
        console.log(editItem);
        let editRowData = editItem
        await axios.put('/api/data-entry/newData-entry', { editRowData })
        setEditItem(null);
    };

    const handleSaveNew = async () => {

        if (newItem.quantity && newItem.date) {
            let requestData = ({ ...newItem, machineId: mashineId, unitId: unitId });
            console.log(requestData);
            const response = await axios.post('/api/master/postQueryMaster', requestData);
            setNewItem({ quantity: '', date: '' });
        }
    };
    //   useEffect(()=>{
    //     console.log(editItem);
    //     console.log(newItem);

    //   },[editItem,newItem])

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
                    Выработка
                </h3>
                <div style={{ marginBottom: '20px' }}>
                    {data.slice() // Создаем копию массива, чтобы не мутировать оригинал
                        .sort((a, b) => a.id - b.id) // Сортируем по возрастанию id
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

                <div style={{
                    padding: '15px',
                    margin: '20px 0',
                    borderRadius: '5px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}>
                    <h4>Добавить новую запись</h4>
                    <input
                        type="number"
                        value={newItem.quantity}
                        onChange={(e) => handleNewChange('quantity', e.target.value)}
                        style={{ marginBottom: '10px', width: '100%' }}
                        placeholder="Количество"
                    />
                    <input
                        type="datetime-local"
                        value={newItem.date}
                        onChange={(e) => handleNewChange('date', e.target.value)}
                        style={{ marginBottom: '10px', width: '100%' }}
                        placeholder="Дата"
                    />
                    <button onClick={handleSaveNew} style={{ display: 'block', margin: '0 auto' }}>
                        Сохранить
                    </button>
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
