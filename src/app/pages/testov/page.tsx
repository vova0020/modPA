'use client';
/* eslint-disable */
// @ts-nocheck
import React, { Suspense, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Navbar from '@/app/components/navbar';
// import * as THREE from 'three';

// Компонент для загрузки и отображения GLB-модели
const WorkshopModel = () => {
    const { scene } = useGLTF('/ceh/warehouse.glb');
    scene.scale.set(1, 1, 1); // Масштабируем модель
    scene.position.set(0, 0, 0); // Позиционируем модель в центре сцены

    return <primitive object={scene} />;
};

// Компонент для управления камерой с клавиатуры
const CameraControls = () => {
    const { camera, gl } = useThree(); // Получаем доступ к камере и Canvas
    const moveSpeed = 0.5; // Скорость движения камеры

    useEffect(() => {
        // Функция для обработки нажатий клавиш
        const handleKeyDown = (event) => {
            switch (event.key.toLowerCase()) {
                case 'w': // Движение вперёд
                    camera.position.z -= moveSpeed;
                    break;
                case 's': // Движение назад
                    camera.position.z += moveSpeed;
                    break;
                case 'a': // Движение влево
                    camera.position.x -= moveSpeed;
                    break;
                case 'd': // Движение вправо
                    camera.position.x += moveSpeed;
                    break;
                case 'e': // Движение вверх
                    camera.position.y += moveSpeed;
                    break;
                case 'q': // Движение вниз
                    camera.position.y -= moveSpeed;
                    break;
                default:
                    break;
            }
        };

        // Установка фокуса на Canvas
        const canvas = gl.domElement;
        canvas.setAttribute('tabindex', '0'); // Делаем Canvas фокусируемым
        canvas.addEventListener('keydown', handleKeyDown);

        // Убираем обработчики событий при размонтировании
        return () => {
            canvas.removeEventListener('keydown', handleKeyDown);
        };
    }, [camera, gl]);

    return null; // Этот компонент ничего не рендерит
};

// Основной компонент страницы
export default function WorkshopPage() {
    const [isLoading, setIsLoading] = useState(true); // Состояние загрузки

    return (
        <div>
             <Navbar />
           <div style={{ width: '100vw', height: '90vh', position: 'relative' }}>
            {/* Индикатор загрузки */}
            {isLoading && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#fff',
                        fontSize: '20px',
                    }}
                >
                    Загрузка модели...
                </div>
            )}

            {/* 3D-сцена */}
            <Canvas
                camera={{ position: [0, 2, 5], fov: 50 }}
                onCreated={({ gl }) => {
                    const canvas = gl.domElement as HTMLCanvasElement; // Явно указываем тип
                    canvas.tabIndex = 0; // Делаем Canvas фокусируемым
                    canvas.focus(); // Устанавливаем фокус
                }}
                onPointerDown={(e) => {
                    const canvas = e.target as HTMLCanvasElement; // Приведение к HTMLCanvasElement
                    canvas.focus(); // Устанавливаем фокус
                }}
            >

                {/* Освещение */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} intensity={1} />

                {/* Управление камерой */}
                <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    minDistance={1}
                    maxDistance={100}
                />

                {/* Загрузка модели */}
                <Suspense fallback={null}>
                    <WorkshopModel />
                </Suspense>

                {/* Управление камерой с клавиатуры */}
                <CameraControls />
            </Canvas>
        </div>   
        </div>
       
    );
}
