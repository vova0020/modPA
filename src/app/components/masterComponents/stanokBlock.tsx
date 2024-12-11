import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ModalQuanti from './modalQuanti';
import ModalResone from './modalResone';
import axios from 'axios';

export default function StanokBlock({ mashinsData }) {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  // Фильтруем выработку за сегодня
  const todayOutputs = mashinsData.outputs.filter((output) => {
    const outputDate = new Date(output.date);
    return outputDate >= startOfDay && outputDate < endOfDay;
  });

  // Фильтруем простой за сегодня
  const todayDowntimes = mashinsData.downtimes.filter((downtime) => {
    const downtimeDate = new Date(downtime.date);
    return downtimeDate >= startOfDay && downtimeDate < endOfDay;
  });

  // Состояния для управления модальными окнами и комментариями
  const [isQuantihModalOpen, setIsQuantiModalOpen] = useState(false);
  const [isResonehModalOpen, setIsResoneModalOpen] = useState(false);

  // Определяем цвет и текст в зависимости от статуса станка
  let statusColor = '#ffffff';  // стандартный цвет фона
  let statusText = '';
  let buttonText = 'Починили';
  let buttonColor = '#ff0000';  // красный для кнопки починили

  const currentTime = new Date();
  const isAfter21 = currentTime.getHours() >= 21;

  // Проверка на выработку до 21:00, если станок работает
  if (mashinsData.status?.name === 'Работает' && todayOutputs.length === 0 && isAfter21) {
    statusColor = '#ffcc00';  // желтый цвет для карточки после 21:00 без выработки
    statusText = 'Станок не выработал продукцию до 21:00';
  } else if (mashinsData.status?.name === 'Сломан') {
    statusColor = '#ff0000';  // красный цвет для карточки
    statusText = `Станок сломан с ${new Date(mashinsData.statusHistories[mashinsData.statusHistories.length - 1]?.startDate).toLocaleString()} до (не указано)`;
  } else if (mashinsData.status?.name === 'Работает') {
    statusColor = '#5bea3d';  // зеленый цвет для карточки
    statusText = 'Станок работает';
    buttonText = 'Остановить';
    buttonColor = '#28a745';  // зеленый для кнопки
  } else {
    statusColor = '#b7b7b7';  // серый цвет для карточки
    statusText = 'Станок не работает';
  }

  async function updateStatus(machineId: number, statusId: number) {
    const response = await axios.put('/api/data-entry/putStatusData-entry', { machineId, statusId });
    console.log('Данные успешно обновлены автоматом:', response.data);
  }

  return (
    <div
      style={{
        width: '100%',
        margin: '10px auto',
        borderRadius: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
        backgroundColor: statusColor,
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #eee',
          paddingBottom: '10px',
          marginBottom: '10px',
        }}
      >
        <div style={{ fontSize: '14px', color: '#888' }}>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: '#d18113' }} onClick={() => setIsResoneModalOpen(true)}>
            Остановки
          </Button>
        </div>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0' }}>{mashinsData.name}</h1>
        </div>
        <div style={{ fontSize: '14px', color: '#888' }}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: 'green' }}
            onClick={() => setIsQuantiModalOpen(true)}
          >
            Выработка
          </Button>
        </div>
      </div>

      <div
        style={{
          textAlign: 'left',
          padding: '10px',
          backgroundColor: '#f9f9f9',
          borderRadius: '10px',
        }}
      >
        {mashinsData.status?.name === 'Сломан' ? (
          <div style={{ textAlign: 'center' }}>
            <p>{statusText}</p>
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: '#ff0000' }}
              onClick={() => {
                updateStatus(mashinsData.id, 3);
              }}
            >
              Починили
            </Button>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '16px', margin: '10px 0' }}>Запись за сегодня</h2>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Выработка:</p>
              {todayOutputs.length > 0 ? (
                todayOutputs.map((output) => (
                  <div
                    key={output.id}
                    style={{
                      padding: '10px',
                      marginBottom: '10px',
                      backgroundColor: '#e6f7ff',
                      borderRadius: '8px',
                    }}
                  >
                    <p style={{ margin: '0' }}>Количество: {output.quantity} {mashinsData.unit.name}</p>
                    <p style={{ margin: '0', fontSize: '12px', color: '#555' }}>
                      Дата: {new Date(output.date).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: '#aaa' }}>Нет записей</p>
              )}
            </div>

            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>Простой:</p>
              {todayDowntimes.length > 0 ? (
                todayDowntimes.map((downtime) => (
                  <div
                    key={downtime.id}
                    style={{
                      padding: '10px',
                      marginBottom: '10px',
                      backgroundColor: '#ffe6e6',
                      borderRadius: '8px',
                    }}
                  >
                    <p style={{ margin: '0' }}>Количество: {downtime.quantity} ч</p>
                    <p style={{ margin: '0' }}>Причина: {downtime.reason?.name || 'Не указано'}</p>
                    <p style={{ margin: '0', fontSize: '12px', color: '#555' }}>
                      Дата: {new Date(downtime.date).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: '#aaa' }}>Нет записей</p>
              )}
            </div>
          </>
        )}
      </div>

      {isQuantihModalOpen && (
        <ModalQuanti
          unitId={mashinsData.unit.id}
          mashineId={mashinsData.id}
          data={mashinsData.outputs}
          onClose={() => setIsQuantiModalOpen(false)}
        />
      )}
      {isResonehModalOpen && (
        <ModalResone
          unitId={mashinsData.unit.id}
          mashineId={mashinsData.id}
          data={mashinsData.statusHistories}
          onClose={() => setIsResoneModalOpen(false)}
        />
      )}
    </div>
  );
}
