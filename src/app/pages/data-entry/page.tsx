'use client';
/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import Navbar from '@/app/components/navbar';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Findings from '@/app/components/data-entyComponents/findings'; // Импортируем компонент Findings
import { TextField, MenuItem } from '@mui/material';
import DangerousIcon from '@mui/icons-material/Dangerous';
import WarningIcon from '@mui/icons-material/Warning';

export default function OperatorsForm() {
    const [data, setData] = useState([]); // Хранит заявки
    const [token, setToken] = useState<string | null>(null); // Токен пользователя
    const [userId, setUserId] = useState<number | null>(null); // Идентификатор пользователя
    const [isModalOpen, setIsModalOpen] = useState(false); // Управление видимостью модального окна
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize(); // Вызываем один раз при монтировании компонента

        window.addEventListener('resize', handleResize); // Слушаем изменения размера окна

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            try {
                const decoded: any = jwtDecode(storedToken);
                setUserId(decoded.id);
            } catch (error) {
                console.error("Ошибка при декодировании токена:", error);
            }
        }
    }, []);

    const fetchRequests = async (userId: number) => {
        try {
            if (userId != null) {
                const response = await axios.get('/api/data-entry/getData-entry', {
                    params: { userId },
                });
                const firstMachine = response.data?.machines?.[0];
                setData(firstMachine);
                // console.log(response.data.mashines[0]);
            }
        } catch (error) {
            console.error('Ошибка при загрузке заявок:', error);
        }
    };

    useEffect(() => {
        fetchRequests(userId);
        const intervalId = setInterval(() => {
            fetchRequests(userId); // Обновляем данные
        }, 4000); // Обновляем каждые 5 секунд

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);
    }, [userId]);


    async function updateStatus(machineId: number, statusId: number) {
        const response = await axios.put('/api/data-entry/putStatusData-entry', { machineId, statusId });
        console.log('Данные успешно обновлены автоматом:', response.data);
        fetchRequests(userId);
    }




    // Получение списка причин простоев
    const [resone, setResone] = useState([]);
    useEffect(() => {
        // Создаем асинхронную функцию внутри useEffect
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/getResone');
                setResone(response.data); // Сохраняем данные
                // console.log(response.data);

            } catch (error) {
                console.log(`Ошибка при загрузке данных ${error}`); // Обработка ошибки
            }
        };

        // Вызываем асинхронную функцию
        fetchData();

    }, []);
    useEffect(() => {
        console.log(data);


    }, [data]);



    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editRowData, setEditRowData] = useState(null);


    const openEditModal = (rowData) => {
        setEditRowData(rowData);
        setIsEditModalOpen(true);
    };

    const saveEditChanges = async () => {
        // Реализуйте сохранение изменений через API или обновление состояния
        console.log('Сохраненные данные:', editRowData);
        await axios.put('/api/data-entry/newData-entry', { editRowData })

        setIsEditModalOpen(false);
        fetchRequests(userId)
    };

    // Состояния для управления модальными окнами и комментариями
    const [isCrashModalOpen, setIsCrashModalOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isConfirmNotificationOpen, setIsConfirmNotificationOpen] = useState(false);
    const [isCrashComment, setIsCrashComment] = useState('');

    // Функция для сохранения данных и закрытия модального окна
    const saveEditChanges2 = () => {
        // Открытие уведомления с вопросом
        setIsNotificationOpen(true);
        setIsCrashModalOpen(false); // Закрыть модальное окно редактирования
    };

    // Функция для обработки нажатия "Да" в уведомлении
    const handleConfirmYes = () => {
        setIsNotificationOpen(false); // Закрыть уведомление с вопросом
        saveToDatabase(); // Сохранить данные в базу
        setIsConfirmNotificationOpen(false); // Закрыть уведомление о мех службе (если оно открыто)

    };

    // Функция для обработки нажатия "Нет" в уведомлении
    const handleConfirmNo = () => {
        setIsNotificationOpen(false); // Закрыть уведомление с вопросом
        setIsConfirmNotificationOpen(true); // Показать уведомление о необходимости уведомить мех службу
    };
    async function updateStatus2(machineId: number, statusId: number, isCrashComment: string) {
        const response = await axios.put('/api/data-entry/putStatusData-entry', { machineId, statusId, isCrashComment });
        console.log('Данные успешно обновлены автоматом:', response.data);
        fetchRequests(userId);
    }
    // Функция для сохранения данных в базу
    const saveToDatabase = () => {
        // @ts-ignore
        updateStatus2(data.id, 2, isCrashComment)
        console.log("Данные сохранены в базу", isCrashComment);
        setIsCrashComment('')
        // Здесь добавьте вызов вашей функции для сохранения данных в базу данных
    };

    // Функция для обработки нажатия "Хорошо" в уведомлении о необходимости уведомления
    const handleConfirmNotificationOk = () => {
        saveToDatabase(); // Сохранить данные в базу
        setIsConfirmNotificationOpen(false); // Закрыть уведомление о мех службе
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
                <div
                    style={{
                        width: '95%',
                        maxWidth: '900px',
                        borderRadius: '15px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                        textAlign: 'center',
                        margin: '0 10px',
                        position: 'relative',
                    }}
                >
                    {!data || (Array.isArray(data) && data.length === 0) ? (
                        <div>
                            <p style={{ fontSize: '1.2rem', color: '#e7ba00', marginTop: '20px' }}>
                                {<WarningIcon fontSize='large' />} Загрузка данных{<WarningIcon fontSize='large' />}
                            </p>

                        </div>
                    ) : (
                        <>
                         {/* @ts-ignore */}
                            <h1 style={{ fontSize: '2.5rem', color: '#333' }}>{data.name}</h1>
                            {/* @ts-ignore */}
                            {data.status?.name === 'Не работает' && (
                                <div>
                                    <p style={{ fontSize: '1.2rem', color: '#f44336', marginTop: '20px' }}>
                                        Станок не работает
                                    </p>
                                    <button
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '10px 20px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            marginTop: '15px',
                                        }}
                                        // @ts-ignore
                                        onClick={() => updateStatus(data.id, 1)}
                                    >
                                        Начать работу
                                    </button>
                                </div>
                            )}
                            {/*  @ts-ignore */}
                            {data.status?.name === 'Сломан' && (
                                <div>
                                    <p style={{ fontSize: '1.2rem', color: '#f44336', marginTop: '20px' }}>
                                        {<WarningIcon fontSize='large' />} Станок сломан. Обратитесь к мастеру!{<WarningIcon fontSize='large' />}
                                    </p>

                                </div>
                            )}
                            {/*  @ts-ignore */}
                            {data.status?.name === 'Работает' && (
                                <div style={{ marginTop: '30px' }}>
                                    <button
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            backgroundColor: '#d2cc13',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '10px 20px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        // @ts-ignore 
                                        onClick={() => updateStatus(data.id, 3)}
                                    >
                                        {!isMobile && <span style={{ fontSize: '1rem' }}>Завершить работу</span>}
                                        {isMobile && <WorkOffIcon style={{ fontSize: '20px' }} />}
                                    </button>

                                    <button
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            left: '10px',
                                            backgroundColor: '#f44336',
                                            color: '#fff',
                                            border: 'none',
                                            padding: '10px 20px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        onClick={() => setIsCrashModalOpen(true)}
                                    >
                                        {!isMobile && <span style={{ fontSize: '1rem' }}>Сломался</span>}
                                        {isMobile && <DangerousIcon style={{ fontSize: '20px' }} />}
                                    </button>

                                    <h2 style={{ fontSize: '1.8rem', color: '#555' }}>Данные за сегодня</h2>

                                    {/* Проверяем, есть ли данные */}
                                    {/*  @ts-ignore */}
                                    {(!data.outputs?.length && !data.downtimes?.length) ? (
                                        // Если данных нет, показываем кнопку
                                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                            <button
                                                style={{
                                                    backgroundColor: '#2196F3',
                                                    color: '#fff',
                                                    border: 'none',
                                                    padding: '10px 20px',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => setIsModalOpen(true)}
                                            >
                                                Добавить данные
                                            </button>
                                        </div>
                                    ) : (
                                        // Если данные есть, отображаем блоки
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginTop: '20px',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            {/* Блок Выработки */}
                                            <div
                                                style={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: '10px',
                                                    border: '1px solid #e0e0e0',
                                                    padding: '10px',
                                                    width: '48%',
                                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                                    marginBottom: '20px',
                                                }}
                                            >
                                                <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '15px' }}>Выработка</h3>
                                               {/*  @ts-ignore */}
                                                {data.outputs?.map((output) => (
                                                    <div
                                                        key={output.id}
                                                        style={{
                                                            padding: '12px',
                                                            borderRadius: '8px',
                                                            backgroundColor: '#f9f9f9',
                                                            marginBottom: '12px',
                                                            border: '1px solid #e0e0e0',
                                                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        
                                                        <div>
                                                            {/*  @ts-ignore */}
                                                            <strong>Количество:</strong> {output.quantity} - {data.unit.name}
                                                        </div>
                                                        <button
                                                            style={{
                                                                backgroundColor: 'transparent',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                color: '#2196F3',
                                                            }}
                                                            onClick={() => openEditModal(output)}
                                                        >
                                                            <EditIcon style={{ fontSize: '20px' }} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Блок Простоев */}
                                            <div
                                                style={{
                                                    backgroundColor: '#fff',
                                                    borderRadius: '10px',
                                                    border: '1px solid #e0e0e0',
                                                    padding: '10px',
                                                    width: '48%',
                                                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                                    marginBottom: '20px',
                                                }}
                                            >
                                                <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '15px' }}>Простои</h3>
                                                {/*  @ts-ignore */}
                                                {data.downtimes?.sort((a, b) => a.id - b.id).map((downtime) => (
                                                    <div
                                                        key={downtime.id}
                                                        style={{
                                                            padding: '12px',
                                                            borderRadius: '8px',
                                                            backgroundColor: '#f9f9f9',
                                                            marginBottom: '12px',
                                                            border: '1px solid #e0e0e0',
                                                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <div>
                                                            <strong>Причина:</strong> {downtime.reason.name}<br />
                                                            <strong>Количество:</strong> {downtime.quantity} ч.
                                                        </div>
                                                        <button
                                                            style={{
                                                                backgroundColor: 'transparent',
                                                                border: 'none',
                                                                cursor: 'pointer',
                                                                color: '#2196F3',
                                                            }}
                                                            onClick={() => openEditModal(downtime)}
                                                        >
                                                            <EditIcon style={{ fontSize: '20px' }} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                        </>

                    )

                    }


                </div>
            </div>

            {isEditModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '10px',
                            width: '90%',
                            maxWidth: '500px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Редактирование данных</h2>
                        {editRowData.reason ? (
                            <div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>
                                        Количество:
                                    </label>
                                    <input
                                        type="number"
                                        value={editRowData.quantity}
                                        onChange={(e) => setEditRowData({ ...editRowData, process: 'Простой', quantity: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                            fontSize: '1rem',
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>
                                        Причина:
                                    </label>
                                    <TextField
                                        required
                                        select
                                        fullWidth
                                        label={`Причина простоя ${editRowData.reason.name}`}
                                        onChange={(e) => setEditRowData({ ...editRowData, process: 'Простой', reason: { ...editRowData.reason, id: e.target.value } })}
                                    >
                                        <MenuItem key={'asc848'} value={editRowData.reason.id} disabled>
                                            {editRowData?.reason?.name} - выбранное значение
                                        </MenuItem>
                                        {resone.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>

                        )

                            : (
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>
                                        Количество:
                                    </label>
                                    <input
                                        type="number"
                                        value={editRowData.quantity}
                                        onChange={(e) => setEditRowData({ ...editRowData, process: 'Выработка', quantity: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                            fontSize: '1rem',
                                        }}
                                    />
                                </div>

                            )

                        }


                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginRight: '10px',
                                }}
                                onClick={saveEditChanges}
                            >
                                Сохранить
                            </button>
                            <button
                                style={{
                                    backgroundColor: '#f44336',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isCrashModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '10px',
                            width: '90%',
                            maxWidth: '500px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Редактирование данных</h2>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>
                                Комментарий:
                            </label>
                            <input
                                type="text"
                                value={isCrashComment}
                                onChange={(e) => setIsCrashComment(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                    fontSize: '1rem',
                                }}
                            />
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            <button
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginRight: '10px',
                                }}
                                onClick={saveEditChanges2}
                            >
                                Сохранить
                            </button>
                            <button
                                style={{
                                    backgroundColor: '#f44336',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setIsCrashModalOpen(false)}
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isNotificationOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                        zIndex: 1001,
                    }}
                >
                    <h3 style={{ textAlign: 'center', marginBottom: '15px', color: '#333' }}>
                        Мех служба в курсе?
                    </h3>
                    <div style={{ textAlign: 'center' }}>
                        <button
                            style={{
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginRight: '10px',
                            }}
                            onClick={handleConfirmYes}
                        >
                            Да
                        </button>
                        <button
                            style={{
                                backgroundColor: '#f44336',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={handleConfirmNo}
                        >
                            Нет
                        </button>
                    </div>
                </div>
            )}

            {isConfirmNotificationOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                        zIndex: 1001,
                    }}
                >
                    <h3 style={{ textAlign: 'center', marginBottom: '15px', color: '#333' }}>
                        Уведоми мастера +7-999-000-00-00
                    </h3>
                    <div style={{ textAlign: 'center' }}>
                        <button
                            style={{
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={handleConfirmNotificationOk}
                        >
                            Хорошо
                        </button>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <Findings machine={data} closeModal={() => setIsModalOpen(false)} getBaza={() => fetchRequests(userId)} />
                </div>
            )}

        </div>
    );

}


{/* <Findings machine={data} closeModal={()=>setIsModalOpen(false)}/> */ }

{/* <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                ></div> */}