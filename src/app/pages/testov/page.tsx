'use client';
/* eslint-disable */
// @ts-nocheck
import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text3D, Html, CameraControls } from '@react-three/drei';
import Navbar from '@/app/components/navbar';

// Компонент для загрузки и отображения модели цеха
const WorkshopModel = () => {
    const { scene } = useGLTF('/ceh/warehouse.glb');
    scene.scale.set(2, 2, 2); // Масштабируем модель
    scene.position.set(0, 0, 0); // Позиционируем модель в центре сцены

    return <primitive object={scene} />;
};

// Компонент для загрузки и отображения модели станка
import { Mesh, MeshStandardMaterial } from 'three';

const MachineModel1 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanok.glb'); // Замените на путь к вашей модели
    scene.scale.set(15, 15, 15); // Масштабируем станок
    scene.position.set(45, -20, 80); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: 0x67ff05,             // Устанавливаем заданный цвет
        emissive: 0x67ff05,          // Добавляем эффект свечения
        emissiveIntensity: 0       // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });

    return <primitive object={scene} onContextMenu={onRightClick} />;
};

const MachineModel2 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanok2.glb'); // Замените на путь к вашей модели
    scene.scale.set(15, 15, 15); // Масштабируем станок
    scene.position.set(-55, -20, 80); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: 0xdd9200,             // Устанавливаем заданный цвет
        emissive: 0xdd9200,          // Добавляем эффект свечения
        emissiveIntensity: 0       // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel3 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanok3.glb'); // Замените на путь к вашей модели
    scene.scale.set(15, 15, 15); // Масштабируем станок
    scene.position.set(-110, -20, 10); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: 0x9e9e9e,             // Устанавливаем заданный цвет
        emissive: 0x9e9e9e,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });

    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / -2, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};


// Компонент для отображения объемного текста, который всегда будет следовать за камерой
const MachineLabel1 = () => {
    const { camera } = useThree(); // Получаем камеру
    const textRef = React.useRef();

    // Каждый кадр обновляем позицию текста относительно камеры
    useFrame(() => {
        if (textRef.current) {
            // Ориентируем текст на камеру
              // @ts-ignore
            textRef.current.lookAt(camera.position);
        }
    });

    return (
        <Text3D
            ref={textRef}
            position={[60, 8, 80]} // Позиция над первым станком
            font="https://cdn.jsdelivr.net/npm/three@0.138.0/examples/fonts/helvetiker_regular.typeface.json" // Стандартный шрифт
              // @ts-ignore
            fontSize={4} // Размер шрифта
            color="#ffffff" // Цвет текста
            anchorX="center" // Центрирование по оси X
            anchorY="middle" // Центрирование по оси Y
            scale={[4, 4, 4]} // Масштабирование текста
        >
            HOLZMA_HPP_3503838
        </Text3D>
    );
};

const MachineLabel2 = () => {
    const { camera } = useThree(); // Получаем камеру
    const textRef = React.useRef();

    // Каждый кадр обновляем позицию текста относительно камеры
    useFrame(() => {
        if (textRef.current) {
            // Ориентируем текст на камеру
              // @ts-ignore
            textRef.current.lookAt(camera.position);
        }
    });

    return (
        <Text3D
            ref={textRef}
            position={[-25, 8, 80]} // Позиция над вторым станком
            font="https://cdn.jsdelivr.net/npm/three@0.138.0/examples/fonts/helvetiker_regular.typeface.json" // Стандартный шрифт
              // @ts-ignore
            fontSize={5} // Размер шрифта
            color="#0011e1" // Цвет текста
            anchorX="center" // Центрирование по оси X
            anchorY="middle" // Центрирование по оси Y
            scale={[4, 4, 4]} // Масштабирование текста
        >
            HOMAG_OPTIMAT_KL_26
        </Text3D>
    );
};
const MachineLabel3 = () => {
    const { camera } = useThree(); // Получаем камеру
    const textRef = React.useRef();

    // Каждый кадр обновляем позицию текста относительно камеры
    useFrame(() => {
        if (textRef.current) {
            // Ориентируем текст на камеру
              // @ts-ignore
            textRef.current.lookAt(camera.position);
        }
    });

    return (
        <Text3D
            ref={textRef}
            position={[-110, 8, 20]} // Позиция над вторым станком
            font="https://cdn.jsdelivr.net/npm/three@0.138.0/examples/fonts/helvetiker_regular.typeface.json" // Стандартный шрифт
              // @ts-ignore
            fontSize={5} // Размер шрифта
            color="#0011e1" // Цвет текста
            anchorX="center" // Центрирование по оси X
            anchorY="middle" // Центрирование по оси Y
            scale={[4, 4, 4]} // Масштабирование текста
        >
            Bima_400V
        </Text3D>
    );
};

// Компонент для отображения всплывающего окна
const InfoWindow = ({ position, onClose }) => {
    return (
        <Html
            position={position}
            center
            style={{
                perspective: '500px',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                opacity: 1,
                transform: 'scale(1) rotateX(0deg)',
            }}
            onPointerEnter={(e) => {
                  // @ts-ignore
                e.target.style.transform = 'scale(1.05) rotateX(2deg)';
            }}
            onPointerLeave={(e) => {
                  // @ts-ignore
                e.target.style.transform = 'scale(1) rotateX(0deg)';
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: 'rgba(20, 20, 20, 0.95)',
                    color: '#ffffff',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    fontFamily: 'Arial, sans-serif',
                    transform: 'translateZ(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <div
                    style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        marginBottom: '10px',
                        color: '#67ff05',
                    }}
                >
                    📊 Информация
                </div>
                <div style={{ fontSize: '16px', lineHeight: '1.5' }}>
                    <div>Выработка: <strong>300 штук</strong></div>
                    <div>Станок: <strong>HOLZMA_HPP_3503838</strong></div>
                </div>
                <button
                    style={{
                        marginTop: '15px',
                        padding: '10px 20px',
                        backgroundColor: '#67ff05',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#000',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                      // @ts-ignore
                    onPointerEnter={(e) => (e.target.style.backgroundColor = '#4ecc03')}
                      // @ts-ignore
                    onPointerLeave={(e) => (e.target.style.backgroundColor = '#67ff05')}
                >
                    Закрыть
                </button>
            </div>
        </Html>
    );
};


// Основной компонент страницы
export default function WorkshopPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [showWindow, setShowWindow] = useState(false);
    const [windowPosition, setWindowPosition] = useState([0, 0, 0]);

    const handleRightClickMachine1 = (e) => {
        setWindowPosition([23, 2, 40]); // Позиция окна для первого станка
        setShowWindow(true);
    };

    const handleRightClickMachine2 = (e) => {
        setWindowPosition([-28, 2, 40]); // Позиция окна для второго станка
        setShowWindow(true);
    };
    const handleRightClickMachine3 = (e) => {
        setWindowPosition([-80, 2, 40]); // Позиция окна для второго станка
        setShowWindow(true);
    };

    const handleClickOutside = () => {
        setShowWindow(false);
    };

    // Обработчик отпускания левой кнопки мыши
    const handlePointerUp = () => {
        setShowWindow(false);
    };

    return (
        <div onClick={handleClickOutside}>
            <Navbar />
            <div style={{ width: '100vw', height: '90vh', position: 'relative' }}>
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

                <Canvas
                    camera={{ position: [0, 5, -15], fov: 85 }}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 10]} intensity={3} color={0xffffff} />
                    <Suspense fallback={null}>
                        <WorkshopModel />
                        <MachineModel1 onRightClick={handleRightClickMachine1} />
                        <MachineLabel1 />
                        <MachineModel2 onRightClick={handleRightClickMachine2} />
                        <MachineLabel2 />
                        <MachineModel3 onRightClick={handleRightClickMachine3} />
                        <MachineLabel3 />
                        {showWindow && <InfoWindow position={windowPosition} onClose={handleClickOutside} />}
                    </Suspense>
                    <CameraControls
                        // maxDistance={200}  // Максимальная дистанция от камеры
                        // minDistance={1}    // Минимальная дистанция от камеры
                        dollySpeed={2}     // Скорость изменения масштаба
                          // @ts-ignore
                        panSpeed={4}       // Скорость перемещения камеры
                        dampingFactor={0.1} // "Сглаживание" движения
                        infinityDolly={false} // Возможность бесконечного изменения масштаба
                    />
                </Canvas>
            </div>
        </div>
    );
}