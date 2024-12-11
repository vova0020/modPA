'use client'
import Navbar from '@/app/components/navbar'
import StanokBlock from '@/app/components/masterComponents/stanokBlock'
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'



export default function Master() {
  const [data, setData] = useState([]); // Хранит заявки
  const [token, setToken] = useState<string | null>(null); // Токен пользователя
  const [userId, setUserId] = useState<number | null>(null); // Идентификатор пользователя
  const [userSector, setUserSector] = useState<number | null>(null); // сектор пользователя
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
        setUserSector(decoded.section);
      } catch (error) {
        console.error("Ошибка при декодировании токена:", error);
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
        console.log(response.data);
      }
    } catch (error) {
      console.error('Ошибка при загрузке заявок:', error);
    }
  };
  useEffect(() => {
    fetchRequests(userId, userSector);
    const intervalId = setInterval(() => {
      fetchRequests(userId, userSector); // Обновляем данные
    }, 4000); // Обновляем каждые 5 секунд

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [userId, userSector]);



  return (
    <div>
      <Navbar />
      <div style={{
        padding: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        flexWrap: 'wrap', // Для возможности переноса элементов на следующую строку
      }}>
        {!isMobile && (
          data
            .slice() // Создаем копию массива, чтобы не мутировать оригинал
            .sort((a, b) => a.id - b.id) // Сортируем по возрастанию id
            .map((mashinsData) => (
              <div
                key={mashinsData.id}
                style={{
                  width: '30%',         // 30% ширины по умолчанию (для больших экранов)
                  margin: '10px',       // Отступы между карточками
                  boxSizing: 'border-box', // Учитываем паддинги в расчете ширины
                }}
 
              >
                <StanokBlock mashinsData={mashinsData} />
              </div>
            ))
          
        )}
        {isMobile && (
         data
         .slice() // Создаем копию массива, чтобы не мутировать оригинал
         .sort((a, b) => a.id - b.id) // Сортируем по возрастанию id
         .map((mashinsData) => (
           <div
             key={mashinsData.id}
             style={{
              width: '30%',
              margin: '0 10px',
              minWidth: '200px',  // Устанавливаем минимальную ширину
              flexBasis: '100%',  // Устанавливаем 100% ширины на мобильных устройствах
            }}
           >
             <StanokBlock mashinsData={mashinsData} />
           </div>
         ))
       
        )}
        
      </div>


    </div>
  );
};