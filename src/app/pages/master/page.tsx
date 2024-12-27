'use client';
/* eslint-disable */
// @ts-nocheck
import Navbar from '@/app/components/navbar';
import StanokBlock from '@/app/components/masterComponents/stanokBlock';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react';

export default function Master() {
  const [data, setData] = useState([]); // Хранит заявки
  const [token, setToken] = useState<string | null>(null); // Токен пользователя
  const [userId, setUserId] = useState<number | null>(null); // Идентификатор пользователя
  const [userSector, setUserSector] = useState<number | null>(null); // Сектор пользователя

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded: any = jwtDecode(storedToken);
        setUserId(decoded.id);
        setUserSector(decoded.section);
      } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
      }
    }
  }, []);

  const fetchRequests = async (userId: number, userSector: number) => {
    try {
      if (userId != null) {
        const response = await axios.get('/api/master/getDataMaster', {
          params: { userId, userSector },
        });
        setData(response.data);
      }
    } catch (error) {
      console.error('Ошибка при загрузке заявок:', error);
    }
  };

  useEffect(() => {
    fetchRequests(userId, userSector);
    const intervalId = setInterval(() => {
      fetchRequests(userId, userSector);
    }, 4000); // Обновляем каждые 4 секунды

    return () => clearInterval(intervalId);
  }, [userId, userSector]);

  return (
    <div>
      <Navbar />
      <div
        style={{
          padding: '10px',
          display: 'flex',
          flexWrap: 'wrap', // Позволяет перенос блоков
          justifyContent: 'center',
          gap: '20px', // Пространство между карточками
          backgroundColor: '#f9f9f9',
        }}
      >
        {data
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((mashinsData) => (
            <div
              key={mashinsData.id}
              style={{
                flex: '1 1 calc(33.333% - 20px)', // Растягиваем на 1/3 ширины контейнера
                minWidth: '400x', // Минимальная ширина для предотвращения сужения
                maxWidth: '450px', // Ограничиваем ширину блоков
                boxSizing: 'border-box',
                margin: '0', // Отступы между блоками задаются через gap
              }}
            >
              <StanokBlock mashinsData={mashinsData} getData={()=> fetchRequests(userId, userSector)} />
            </div>
          ))}
      </div>
    </div>
  );
}
