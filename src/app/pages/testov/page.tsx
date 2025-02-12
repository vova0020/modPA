'use client';
/* eslint-disable */
// @ts-nocheck
import React, { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Text3D, Html, CameraControls } from '@react-three/drei';
import { EffectComposer, Outline, Selection } from '@react-three/postprocessing';
import Navbar from '@/app/components/navbar';
import { Text } from '@react-three/drei';
// Компонент для загрузки и отображения модели станка
import { Mesh, MeshStandardMaterial } from 'three';
import axios from 'axios';
import withAuth from '@/app/components/withAuth';


const LableText = '#00ffff'
const LableTextSize = 5
const work = 0x67ff05 // - зеленый цвет
const sloman = 0xdd9200 // - ораньжевый цвет
const prostoi = 0x9e9e9e // - серый цвет

let HOLZMA = prostoi;
let HOLZMA_HPL = prostoi;
let HOLZMA_HPP_3503838 = prostoi;
let HOMAG_OPTIMAT_KAL_310 = prostoi;
let Ima_Novimat1 = prostoi;
let Ima_Novimat2 = prostoi;
let Ima_Novimat3 = prostoi;
let Ima_Novimat4 = prostoi;
let HOMAG_OPTIMAT_KL_26 = prostoi;
let BRANDT_AMBITION_1650 = prostoi;
let KDT_6022_TJ1 = prostoi;
let KDT_6022_TJ2 = prostoi;
let WEEKE_OPTIMAT_BHX_500 = prostoi;
let BHT_PROFILINE_500 = prostoi;
let BHT_PROFILINE_500_2 = prostoi;
let Bima_400V = prostoi;
let WEEKE_VENTURE_2M = prostoi;
let WEEKE_VENTURE_2M2 = prostoi;
let WEEKE_VENTURE_230M = prostoi;
let BIESSE_ROVER_A_3301 = prostoi;
let BIESSE_ROVER_A_3302 = prostoi;
let BIESSE_ROVER_A_FT_2231x = prostoi;
let BIESSE_ROVER_A_FT_2231x2 = prostoi;
let Tonelli = prostoi;
let SDA_1200x = prostoi;
let DMC_Mastersand = prostoi;
let Heeseman = prostoi;
let HOMAG_PAQTEQ_C250 = prostoi;
let WEEKE_BST_500 = prostoi;
let SUPERFICI = prostoi;
let Giardina = prostoi;




// Компонент для загрузки и отображения модели цеха
const WorkshopModel = () => {
    const { scene } = useGLTF('/ceh/pol.glb');
    scene.scale.set(1, 1, 1); // Масштабируем модель
    scene.position.set(0, 0, 0); // Позиционируем модель в центре сцены

    return <primitive object={scene} />;
};

const MachineModel1 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/HOLZMA_HPP_3503838.glb'); // Замените на путь к вашей модели
    scene.scale.set(4, 4, 4); // Масштабируем станок
    scene.position.set(90, -4.5, -140); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: HOLZMA,             // Устанавливаем заданный цвет
        emissive: HOLZMA,          // Добавляем эффект свечения
        emissiveIntensity: 0       // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};

const MachineModel2 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/HOLZMA_HPL_40043412_L.glb'); // Замените на путь к вашей модели
    scene.scale.set(4.5, 4.5, 4.5); // Масштабируем станок
    scene.position.set(100, -4.5, -80); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: HOLZMA_HPL,             // Устанавливаем заданный цвет
        emissive: HOLZMA_HPL,          // Добавляем эффект свечения
        emissiveIntensity: 0       // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });

    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1.015, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel3 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/HOLZMA_HCL_113822X.glb'); // Замените на путь к вашей модели
    scene.scale.set(5, 5, 5); // Масштабируем станок
    scene.position.set(110, -4.5, 50); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: HOLZMA_HPP_3503838,             // Устанавливаем заданный цвет
        emissive: HOLZMA_HPP_3503838,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });

    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1.005, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel4 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/Giardina.glb'); // Замените на путь к вашей модели
    scene.scale.set(13, 9.5, 9.5); // Масштабируем станок
    scene.position.set(-55, -4.5, 180); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: Giardina,             // Устанавливаем заданный цвет
        emissive: Giardina,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    // scene.rotation.set(0, Math.PI / 1.005, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};

const MachineModel5 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/SUPERFICI.glb'); // Замените на путь к вашей модели
    scene.scale.set(7.5, 7.5, 7.5); // Масштабируем станок
    scene.position.set(30, -4.5, 280); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: SUPERFICI,             // Устанавливаем заданный цвет
        emissive: SUPERFICI,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel6 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/HOMAG_OPTIMAT_KAL_310x.glb'); // Замените на путь к вашей модели
    scene.scale.set(8.5, 8.5, 8.5); // Масштабируем станок
    scene.position.set(-30, -4.5, 40); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: HOMAG_OPTIMAT_KAL_310,             // Устанавливаем заданный цвет
        emissive: HOMAG_OPTIMAT_KAL_310,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    // scene.rotation.set(0, Math.PI / 1.005, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};

const MachineModel7 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/Ima_novimad.glb'); // Замените на путь к вашей модели
    scene.scale.set(6.5, 6.5, 6.5); // Масштабируем станок
    scene.position.set(-20, -4.5, 30); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: Ima_Novimat1,             // Устанавливаем заданный цвет
        emissive: Ima_Novimat1,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel8 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/HOMAG_OPTIMAT_KL_26.glb'); // Замените на путь к вашей модели
    scene.scale.set(9, 9, 9); // Масштабируем станок
    scene.position.set(5, -4.5, -10); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: HOMAG_OPTIMAT_KL_26,             // Устанавливаем заданный цвет
        emissive: HOMAG_OPTIMAT_KL_26,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1.000, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel9 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/Ima_novimad2.glb'); // Замените на путь к вашей модели
    scene.scale.set(6.5, 6.5, 6.5); // Масштабируем станок
    scene.position.set(-20, -4.5, -45); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: Ima_Novimat2,             // Устанавливаем заданный цвет
        emissive: Ima_Novimat2,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel10 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/Ima_novimad3.glb'); // Замените на путь к вашей модели
    scene.scale.set(6.5, 6.5, 6.5); // Масштабируем станок
    scene.position.set(-20, -4.5, -85); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: Ima_Novimat3,             // Устанавливаем заданный цвет
        emissive: Ima_Novimat3,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel11 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/BRANDT_AMBITION_1650.glb'); // Замените на путь к вашей модели
    scene.scale.set(3.5, 3.5, 3.5); // Масштабируем станок
    scene.position.set(-15, -4.5, -140); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: BRANDT_AMBITION_1650,             // Устанавливаем заданный цвет
        emissive: BRANDT_AMBITION_1650,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2.0, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel12 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/Ima_novimad4.glb'); // Замените на путь к вашей модели
    scene.scale.set(6.5, 6.5, 6.5); // Масштабируем станок
    scene.position.set(-20, -4.5, -180); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: Ima_Novimat4,             // Устанавливаем заданный цвет
        emissive: Ima_Novimat4,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel13 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/KDT-6022_TJ1.glb'); // Замените на путь к вашей модели
    scene.scale.set(5.5, 5.5, 5.5); // Масштабируем станок
    scene.position.set(-150, -4.5, -30); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: KDT_6022_TJ1,             // Устанавливаем заданный цвет
        emissive: KDT_6022_TJ1,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2.001, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel14 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/KDT-6022_TJ2.glb'); // Замените на путь к вашей модели
    scene.scale.set(5.5, 5.5, 5.5); // Масштабируем станок
    scene.position.set(-150, -4.5, -80); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: KDT_6022_TJ2,             // Устанавливаем заданный цвет
        emissive: KDT_6022_TJ2,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2.001, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel15 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/WEEKE_OPTIMAT_BHX_500.glb'); // Замените на путь к вашей модели
    scene.scale.set(6.5, 6.5, 6.5); // Масштабируем станок
    scene.position.set(-165, -4.5, -135); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: WEEKE_OPTIMAT_BHX_500,             // Устанавливаем заданный цвет
        emissive: WEEKE_OPTIMAT_BHX_500,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2.001, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel16 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/WEEKE_BST_500.glb'); // Замените на путь к вашей модели
    scene.scale.set(4, 4, 4); // Масштабируем станок
    scene.position.set(-150, -4.5, 120); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: WEEKE_BST_500,             // Устанавливаем заданный цвет
        emissive: WEEKE_BST_500,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel17 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/BHT_PROFILINE_500.glb'); // Замените на путь к вашей модели
    scene.scale.set(6, 6, 6); // Масштабируем станок
    scene.position.set(-230, -4, 70); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: BHT_PROFILINE_500,             // Устанавливаем заданный цвет
        emissive: BHT_PROFILINE_500,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel18 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/BHT_PROFILINE_500_2.glb'); // Замените на путь к вашей модели
    scene.scale.set(6, 6, 6); // Масштабируем станок
    scene.position.set(-230, -3, -70); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: BHT_PROFILINE_500_2,             // Устанавливаем заданный цвет
        emissive: BHT_PROFILINE_500_2,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};

const MachineModel19 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/Bima400v.glb'); // Замените на путь к вашей модели
    scene.scale.set(0.7, 0.7, 0.7); // Масштабируем станок
    scene.position.set(-300, -4.5, 100); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: Bima_400V,             // Устанавливаем заданный цвет
        emissive: Bima_400V,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel20 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/WEEKE_VENTURE_2M.glb'); // Замените на путь к вашей модели
    scene.scale.set(7, 7, 7); // Масштабируем станок
    scene.position.set(-300, -4.5, 60); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: WEEKE_VENTURE_2M,             // Устанавливаем заданный цвет
        emissive: WEEKE_VENTURE_2M,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel21 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/WEEKE_VENTURE_230M.glb'); // Замените на путь к вашей модели
    scene.scale.set(7, 7, 7); // Масштабируем станок
    scene.position.set(-330, -4.5, 10); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: WEEKE_VENTURE_230M,             // Устанавливаем заданный цвет
        emissive: WEEKE_VENTURE_230M,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel22 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/BIESSE_ROVER_A_3_30_1.glb'); // Замените на путь к вашей модели
    scene.scale.set(1.6, 1.6, 1.6); // Масштабируем станок
    scene.position.set(-339, -5, -40); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: BIESSE_ROVER_A_3301,             // Устанавливаем заданный цвет
        emissive: BIESSE_ROVER_A_3301,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel23 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/BIESSE_ROVER_A_3_30_2.glb'); // Замените на путь к вашей модели
    scene.scale.set(1.6, 1.6, 1.6); // Масштабируем станок
    scene.position.set(-339, -5, -80); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: BIESSE_ROVER_A_3302,             // Устанавливаем заданный цвет
        emissive: BIESSE_ROVER_A_3302,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel24 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/BIESSE_ROVER_A_FT_2231.glb'); // Замените на путь к вашей модели
    scene.scale.set(2.2, 2.2, 2.2); // Масштабируем станок
    scene.position.set(-520, -4.5, 50); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: BIESSE_ROVER_A_FT_2231x,             // Устанавливаем заданный цвет
        emissive: BIESSE_ROVER_A_FT_2231x,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    // scene.rotation.set(0, Math.PI / -1, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel25 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/WEEKE_VENTURE_2M_2.glb'); // Замените на путь к вашей модели
    scene.scale.set(7, 7, 7); // Масштабируем станок
    scene.position.set(-560, -4.5, 50); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: WEEKE_VENTURE_2M2,             // Устанавливаем заданный цвет
        emissive: WEEKE_VENTURE_2M2,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel26 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/BIESSE_ROVER_A_FT_2231_2.glb'); // Замените на путь к вашей модели
    scene.scale.set(2.2, 2.2, 2.2); // Масштабируем станок
    scene.position.set(-520, -4.5, -40); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: BIESSE_ROVER_A_FT_2231x2,             // Устанавливаем заданный цвет
        emissive: BIESSE_ROVER_A_FT_2231x2,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel27 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/tonelli.glb'); // Замените на путь к вашей модели
    scene.scale.set(7, 7, 7); // Масштабируем станок
    scene.position.set(-410, -4.5, 135); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: Tonelli,             // Устанавливаем заданный цвет
        emissive: Tonelli,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    // scene.rotation.set(0, Math.PI /     0, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel28 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/SDA-1200.glb'); // Замените на путь к вашей модели
    scene.scale.set(5, 5, 5); // Масштабируем станок
    scene.position.set(-375, -4.5, 220); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: SDA_1200x,             // Устанавливаем заданный цвет
        emissive: SDA_1200x,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel29 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/DMC_Mastersand.glb'); // Замените на путь к вашей модели
    scene.scale.set(4, 4, 4); // Масштабируем станок
    scene.position.set(-445, -4.5, 220); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: DMC_Mastersand,             // Устанавливаем заданный цвет
        emissive: DMC_Mastersand,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel30 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/Heeseman.glb'); // Замените на путь к вашей модели
    scene.scale.set(22, 22, 22); // Масштабируем станок
    scene.position.set(-475, -4.5, 215); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: Heeseman,             // Устанавливаем заданный цвет
        emissive: Heeseman,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel31 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/HOMAG_PAQTEQ_C250.glb'); // Замените на путь к вашей модели
    scene.scale.set(9, 9, 9); // Масштабируем станок
    scene.position.set(-590, -0, 235); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: HOMAG_PAQTEQ_C250,             // Устанавливаем заданный цвет
        emissive: HOMAG_PAQTEQ_C250,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};
const MachineModel32 = ({ onRightClick }) => {
    const { scene } = useGLTF('/ceh/stanki/HOMAG_PAQTEQ_C250_2.glb'); // Замените на путь к вашей модели
    scene.scale.set(9, 9, 9); // Масштабируем станок
    scene.position.set(-630, -0, 235); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: HOMAG_PAQTEQ_C250,             // Устанавливаем заданный цвет
        emissive: HOMAG_PAQTEQ_C250,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene} onContextMenu={onRightClick} />;
};

const MachineModel33 = () => {
    const { scene } = useGLTF('/ceh/stanki/Ruchnaya_Pokraska.glb'); // Замените на путь к вашей модели
    scene.scale.set(20, 18, 18); // Масштабируем станок
    scene.position.set(-110, -11, 280); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: prostoi,             // Устанавливаем заданный цвет
        emissive: prostoi,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene}  />;
};
const MachineModel34 = () => {
    const { scene } = useGLTF('/ceh/stanki/Press_ORMA_PFL30_13.glb'); // Замените на путь к вашей модели
    scene.scale.set(12, 10, 10); // Масштабируем станок
    scene.position.set(-80, -4, 120); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: prostoi,             // Устанавливаем заданный цвет
        emissive: prostoi,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene}  />;
};
const MachineModel35 = () => {
    const { scene } = useGLTF('/ceh/stanki/Konveer_Line_Big.glb'); // Замените на путь к вашей модели
    scene.scale.set(13, 13, 13); // Масштабируем станок
    scene.position.set(-445, -4, -30); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: prostoi,             // Устанавливаем заданный цвет
        emissive: prostoi,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene}  />;
};
const MachineModel36 = () => {
    const { scene } = useGLTF('/ceh/stanki/Ruchnaya_Shlifovka_sred.glb'); // Замените на путь к вашей модели
    scene.scale.set(10, 10, 16); // Масштабируем станок
    scene.position.set(-320, -4, 320) // Позиционируем станок в сцене


    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: prostoi,             // Устанавливаем заданный цвет
        emissive: prostoi,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene}  />;
};
const MachineModel37 = () => {
    const { scene } = useGLTF('/ceh/stanki/Ruchnaya_Shlifovka_mal.glb'); // Замените на путь к вашей модели
    scene.scale.set(10, 10, 13); // Масштабируем станок
    scene.position.set(-320, -4, 170); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: prostoi,             // Устанавливаем заданный цвет
        emissive: prostoi,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene}  />;
};
const MachineModel38 = () => {
    const { scene } = useGLTF('/ceh/stanki/Ruchnaya_Shlifovka_big.glb'); // Замените на путь к вашей модели
    scene.scale.set(12, 11, 14); // Масштабируем станок
    scene.position.set(-311, -4, 230); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: prostoi,             // Устанавливаем заданный цвет
        emissive: prostoi,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 1, 0);

    return <primitive object={scene}  />;
};
const MachineModel39 = () => {
    const { scene } = useGLTF('/ceh/stanki/Ruchnaya_Shlifovka_sred2.glb'); // Замените на путь к вашей модели
    scene.scale.set(10, 10, 16); // Масштабируем станок
    scene.position.set(-410, -4, 320) // Позиционируем станок в сцене


    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: prostoi,             // Устанавливаем заданный цвет
        emissive: prostoi,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene}  />;
};
const MachineModel40 = () => {
    const { scene } = useGLTF('/ceh/stanki/Skleika.glb'); // Замените на путь к вашей модели
    scene.scale.set(10, 10, 10); // Масштабируем станок
    scene.position.set(-510, -4, 160) // Позиционируем станок в сцене


    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: prostoi,             // Устанавливаем заданный цвет
        emissive: prostoi,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene}  />;
};



const MachineModel41 = () => {
    const { scene } = useGLTF('/ceh/stanki/Ruchnaya_Prisadka_1.glb'); // Замените на путь к вашей модели
    scene.scale.set(9, 9, 9); // Масштабируем станок
    scene.position.set(-235, -4, -180); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: prostoi,             // Устанавливаем заданный цвет
        emissive: prostoi,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene}  />;
};
const MachineModel42 = () => {
    const { scene } = useGLTF('/ceh/stanki/Ruchnaya_Prisadka_2.glb'); // Замените на путь к вашей модели
    scene.scale.set(9, 9, 9); // Масштабируем станок
    scene.position.set(-250, -4, -185); // Позиционируем станок в сцене

    // Применяем новый зеленый материал ко всем Mesh-объектам модели
    const greenMaterial = new MeshStandardMaterial({
        color: prostoi,             // Устанавливаем заданный цвет
        emissive: prostoi,          // Добавляем эффект свечения
        emissiveIntensity: 0        // Интенсивность свечения (увеличьте при необходимости)
    });

    scene.traverse((object) => {
        if (object instanceof Mesh) {
            object.material = greenMaterial; // Заменяем материал 
        }
    });
    // Повернуть объект на 90 градусов по оси Y (по часовой стрелке)
    scene.rotation.set(0, Math.PI / 2, 0);

    return <primitive object={scene}  />;
};


// Компонент для отображения всплывающего окна
const InfoWindow = ({ position, onClose, machineData }) => {
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
                    width: '400px', // Увеличиваем ширину контейнера
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
                    <div>Название: <strong>{machineData?.name}</strong></div>
                    {/* <div>Статус: <strong>{machineData?.status?.name}</strong></div> */}
                    {machineData?.latestOutput ? (
                        <>
                            <div>Выработка: <strong>{machineData.latestOutput.quantity || 'нет данных'}</strong></div>
                            <div>Единица измерения: <strong>{machineData?.unit?.name || 'нет данных'}</strong></div>
                            <div>
                                Дата: <strong>
                                    {new Date(machineData.latestOutput.date).toLocaleDateString('ru-RU', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </strong>
                            </div>
                        </>
                    ) : (
                        <div>Статус: <strong>Нет Данных</strong></div>
                    )}

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
                    onClick={onClose}
                >
                    Закрыть
                </button>
            </div>
        </Html>
    );
};

// Основной компонент страницы
const WorkshopPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showWindow, setShowWindow] = useState(false);
    const [windowPosition, setWindowPosition] = useState([0, 0, 0]);
    const [stanocks, setStanock] = useState([]);
    const [selectedMachineData, setSelectedMachineData] = useState(null);


    useEffect(() => {
        getStanock();
    }, []);

    const getStanock = async () => {
        try {
            const response = await axios.get('/api/getMashine');
            setStanock(response.data.sort((a, b) => a.id - b.id));
            // console.log(response.data);

        } catch (error) {
            // showSnackbar('Ошибка загрузки данных.', 'error');
        }
    };

    useMemo(() => {
        const intervalId = setInterval(() => {
            getStanock(); // Обновляем данные
        }, 6000); // Обновляем каждые 5 секунд

        // Очищаем интервал при размонтировании компонента
        return () => clearInterval(intervalId);

    }, []);

    useEffect(() => {
        // console.log(stanocks);
        for (const mashine of stanocks) {
            if (mashine.name == "HOLZMA HCL 11/38/22") {
                if (mashine.status.id == 1) {
                    HOLZMA = work
                } else if (mashine.status.id == 2) {
                    HOLZMA = sloman
                } else if (mashine.status.id == 3) {
                    HOLZMA = prostoi
                }
            } else if (mashine.name == "HOLZMA HPL 400/43/412 L") {
                if (mashine.status.id == 1) {
                    HOLZMA_HPL = work
                } else if (mashine.status.id == 2) {
                    HOLZMA_HPL = sloman
                } else if (mashine.status.id == 3) {
                    HOLZMA_HPL = prostoi
                }
            } else if (mashine.name == "HOLZMA HPP 350/38/38") {
                if (mashine.status.id == 1) {
                    HOLZMA_HPP_3503838 = work
                } else if (mashine.status.id == 2) {
                    HOLZMA_HPP_3503838 = sloman
                } else if (mashine.status.id == 3) {
                    HOLZMA_HPP_3503838 = prostoi
                }
            } else if (mashine.name == "HOMAG KAL 310") {
                if (mashine.status.id == 1) {
                    HOMAG_OPTIMAT_KAL_310 = work
                } else if (mashine.status.id == 2) {
                    HOMAG_OPTIMAT_KAL_310 = sloman
                } else if (mashine.status.id == 3) {
                    HOMAG_OPTIMAT_KAL_310 = prostoi
                }
            } else if (mashine.name == "IMA 1") {
                if (mashine.status.id == 1) {
                    Ima_Novimat1 = work
                } else if (mashine.status.id == 2) {
                    Ima_Novimat1 = sloman
                } else if (mashine.status.id == 3) {
                    Ima_Novimat1 = prostoi
                }
            } else if (mashine.name == "IMA 2") {
                if (mashine.status.id == 1) {
                    Ima_Novimat2 = work
                } else if (mashine.status.id == 2) {
                    Ima_Novimat2 = sloman
                } else if (mashine.status.id == 3) {
                    Ima_Novimat2 = prostoi
                }
            } else if (mashine.name == "IMA 3") {
                if (mashine.status.id == 1) {
                    Ima_Novimat3 = work
                } else if (mashine.status.id == 2) {
                    Ima_Novimat3 = sloman
                } else if (mashine.status.id == 3) {
                    Ima_Novimat3 = prostoi
                }
            } else if (mashine.name == "HOMAG KL 26 двусторонний") {
                if (mashine.status.id == 1) {
                    HOMAG_OPTIMAT_KL_26 = work
                } else if (mashine.status.id == 2) {
                    HOMAG_OPTIMAT_KL_26 = sloman
                } else if (mashine.status.id == 3) {
                    HOMAG_OPTIMAT_KL_26 = prostoi
                }
            } else if (mashine.name == "BRANDT") {
                if (mashine.status.id == 1) {
                    BRANDT_AMBITION_1650 = work
                } else if (mashine.status.id == 2) {
                    BRANDT_AMBITION_1650 = sloman
                } else if (mashine.status.id == 3) {
                    BRANDT_AMBITION_1650 = prostoi
                }
            } else if (mashine.name == "KDT-6022 TJ(1)") {
                if (mashine.status.id == 1) {
                    KDT_6022_TJ1 = work
                } else if (mashine.status.id == 2) {
                    KDT_6022_TJ1 = sloman
                } else if (mashine.status.id == 3) {
                    KDT_6022_TJ1 = prostoi
                }
            } else if (mashine.name == "KDT-6022 TJ(2)") {
                if (mashine.status.id == 1) {
                    KDT_6022_TJ2 = work
                } else if (mashine.status.id == 2) {
                    KDT_6022_TJ2 = sloman
                } else if (mashine.status.id == 3) {
                    KDT_6022_TJ2 = prostoi
                }
            } else if (mashine.name == "BHX 500") {
                if (mashine.status.id == 1) {
                    WEEKE_OPTIMAT_BHX_500 = work
                } else if (mashine.status.id == 2) {
                    WEEKE_OPTIMAT_BHX_500 = sloman
                } else if (mashine.status.id == 3) {
                    WEEKE_OPTIMAT_BHX_500 = prostoi
                }
            } else if (mashine.name == "BHT 500") {
                if (mashine.status.id == 1) {
                    BHT_PROFILINE_500 = work
                } else if (mashine.status.id == 2) {
                    BHT_PROFILINE_500 = sloman
                } else if (mashine.status.id == 3) {
                    BHT_PROFILINE_500 = prostoi
                }
            } else if (mashine.name == "BIMA 400 V") {
                if (mashine.status.id == 1) {
                    Bima_400V = work
                } else if (mashine.status.id == 2) {
                    Bima_400V = sloman
                } else if (mashine.status.id == 3) {
                    Bima_400V = prostoi
                }
            } else if (mashine.name == "VENTURE 2M") {
                if (mashine.status.id == 1) {
                    WEEKE_VENTURE_2M = work
                } else if (mashine.status.id == 2) {
                    WEEKE_VENTURE_2M = sloman
                } else if (mashine.status.id == 3) {
                    WEEKE_VENTURE_2M = prostoi
                }
            } else if (mashine.name == "VENTURE 230M") {
                if (mashine.status.id == 1) {
                    WEEKE_VENTURE_230M = work
                } else if (mashine.status.id == 2) {
                    WEEKE_VENTURE_230M = sloman
                } else if (mashine.status.id == 3) {
                    WEEKE_VENTURE_230M = prostoi
                }
            } else if (mashine.name == "ROVER A 3.30(1)") {
                if (mashine.status.id == 1) {
                    BIESSE_ROVER_A_3301 = work
                } else if (mashine.status.id == 2) {
                    BIESSE_ROVER_A_3301 = sloman
                } else if (mashine.status.id == 3) {
                    BIESSE_ROVER_A_3301 = prostoi
                }
            } else if (mashine.name == "ROVER A 3.30(2)") {
                if (mashine.status.id == 1) {
                    BIESSE_ROVER_A_3302 = work
                } else if (mashine.status.id == 2) {
                    BIESSE_ROVER_A_3302 = sloman
                } else if (mashine.status.id == 3) {
                    BIESSE_ROVER_A_3302 = prostoi
                }
            } else if (mashine.name == "BIESSE ROVER A FT 2231") {
                if (mashine.status.id == 1) {
                    BIESSE_ROVER_A_FT_2231x = work
                } else if (mashine.status.id == 2) {
                    BIESSE_ROVER_A_FT_2231x = sloman
                } else if (mashine.status.id == 3) {
                    BIESSE_ROVER_A_FT_2231x = prostoi
                }
            } else if (mashine.name == "Tonelli") {
                if (mashine.status.id == 1) {
                    Tonelli = work
                } else if (mashine.status.id == 2) {
                    Tonelli = sloman
                } else if (mashine.status.id == 3) {
                    Tonelli = prostoi
                }
            } else if (mashine.name == "SDA-1200") {
                if (mashine.status.id == 1) {
                    SDA_1200x = work
                } else if (mashine.status.id == 2) {
                    SDA_1200x = sloman
                } else if (mashine.status.id == 3) {
                    SDA_1200x = prostoi
                }
            } else if (mashine.name == "DMC Mastersand") {
                if (mashine.status.id == 1) {
                    DMC_Mastersand = work
                } else if (mashine.status.id == 2) {
                    DMC_Mastersand = sloman
                } else if (mashine.status.id == 3) {
                    DMC_Mastersand = prostoi
                }
            } else if (mashine.name == "Heeseman") {
                if (mashine.status.id == 1) {
                    Heeseman = work
                } else if (mashine.status.id == 2) {
                    Heeseman = sloman
                } else if (mashine.status.id == 3) {
                    Heeseman = prostoi
                }
            } else if (mashine.name == "HOMAG PAQTEQ C250") {
                if (mashine.status.id == 1) {
                    HOMAG_PAQTEQ_C250 = work
                } else if (mashine.status.id == 2) {
                    HOMAG_PAQTEQ_C250 = sloman
                } else if (mashine.status.id == 3) {
                    HOMAG_PAQTEQ_C250 = prostoi
                }
            } else if (mashine.name == "BST 500") {
                if (mashine.status.id == 1) {
                    WEEKE_BST_500 = work
                } else if (mashine.status.id == 2) {
                    WEEKE_BST_500 = sloman
                } else if (mashine.status.id == 3) {
                    WEEKE_BST_500 = prostoi
                }
            } else if (mashine.name == "SUPERFICI T311") {
                if (mashine.status.id == 1) {
                    SUPERFICI = work
                } else if (mashine.status.id == 2) {
                    SUPERFICI = sloman
                } else if (mashine.status.id == 3) {
                    SUPERFICI = prostoi
                }
            } else if (mashine.name == "Giardina") {
                if (mashine.status.id == 1) {
                    Giardina = work
                } else if (mashine.status.id == 2) {
                    Giardina = sloman
                } else if (mashine.status.id == 3) {
                    Giardina = prostoi
                }
            }

        }

    }, [stanocks])


    const handleRightClickMachine1 = (stanokName) => {
        const machineData = stanocks.find(machine => machine.name === stanokName); // Находим данные о станке

        let latestOutput = null; // По умолчанию нет данных о выработке

        if (machineData && machineData.outputs && machineData.outputs.length > 0) {
            // Сортируем outputs по дате в порядке убывания (от самой новой к самой старой)
            // @ts-ignore
            const sortedOutputs = machineData.outputs.sort((a, b) => new Date(b.date) - new Date(a.date));
            latestOutput = sortedOutputs[0]; // Берем первый элемент (самый новый)
        }

        console.log(latestOutput); // Выводим последний объект по дате или null, если данных нет

        setSelectedMachineData({
            ...machineData,
            latestOutput, // Добавляем последний объект (или null, если данных нет)
        });

        setWindowPosition([23, 15, 40]); // Позиция окна для первого станка
        setShowWindow(true); // Показываем окно
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
                    camera={{ position: [-210, 150, -180], fov: 50 }}
                >
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[-5, 20, 5]} intensity={2} color={0xffffff} />
                    <Suspense fallback={null}>
                        <WorkshopModel />
                        <MachineModel1 onRightClick={() => handleRightClickMachine1('HOLZMA HPP 350/38/38')} />
                        <MachineModel2 onRightClick={() => handleRightClickMachine1('HOLZMA HPL 400/43/412 L')} />
                        <MachineModel3 onRightClick={() => handleRightClickMachine1('HOLZMA HCL 11/38/22')} />
                        <MachineModel4 onRightClick={() => handleRightClickMachine1('Giardina')} />
                        <MachineModel5 onRightClick={() => handleRightClickMachine1('SUPERFICI T311')} />
                        <MachineModel6 onRightClick={() => handleRightClickMachine1('HOMAG KAL 310')} />
                        <MachineModel7 onRightClick={() => handleRightClickMachine1('IMA 1')} />
                        <MachineModel8 onRightClick={() => handleRightClickMachine1('HOMAG KL 26 двусторонний')} />
                        <MachineModel9 onRightClick={() => handleRightClickMachine1('IMA 2')} />
                        <MachineModel10 onRightClick={() => handleRightClickMachine1('IMA 3')} />
                        <MachineModel11 onRightClick={() => handleRightClickMachine1('BRANDT')} />
                        <MachineModel12 onRightClick={() => handleRightClickMachine1('IMA 4')} />  {/* //??????? */}
                        <MachineModel13 onRightClick={() => handleRightClickMachine1('KDT-6022 TJ(1)')} />
                        <MachineModel14 onRightClick={() => handleRightClickMachine1('KDT-6022 TJ(2)')} />
                        <MachineModel15 onRightClick={() => handleRightClickMachine1('BHX 500')} />
                        <MachineModel16 onRightClick={() => handleRightClickMachine1('BST 500')} />
                        <MachineModel17 onRightClick={() => handleRightClickMachine1('BHT 500')} />
                        <MachineModel18 onRightClick={() => handleRightClickMachine1('BHT 500 2')} />  {/* //??????? */}
                        <MachineModel19 onRightClick={() => handleRightClickMachine1('BIMA 400 V')} />
                        <MachineModel20 onRightClick={() => handleRightClickMachine1('VENTURE 2M')} />
                        <MachineModel21 onRightClick={() => handleRightClickMachine1('VENTURE 230M')} />
                        <MachineModel22 onRightClick={() => handleRightClickMachine1('ROVER A 3.30(1)')} />
                        <MachineModel23 onRightClick={() => handleRightClickMachine1('ROVER A 3.30(2)')} />
                        <MachineModel24 onRightClick={() => handleRightClickMachine1('BIESSE ROVER A FT 2231')} />
                        <MachineModel25 onRightClick={() => handleRightClickMachine1('VENTURE 2,5M')} />
                        <MachineModel26 onRightClick={() => handleRightClickMachine1('BIESSE ROVER A FT 2231 2')} />  {/* //??????? */}
                        <MachineModel27 onRightClick={() => handleRightClickMachine1('Tonelli')} />
                        <MachineModel28 onRightClick={() => handleRightClickMachine1('SDA-1200')} />
                        <MachineModel29 onRightClick={() => handleRightClickMachine1('DMC Mastersand')} />
                        <MachineModel30 onRightClick={() => handleRightClickMachine1('Heeseman')} />
                        <MachineModel31 onRightClick={() => handleRightClickMachine1('HOMAG PAQTEQ C250')} />
                        <MachineModel32 onRightClick={() => handleRightClickMachine1('HOMAG PAQTEQ C250')} />
                        <MachineModel33  />
                        <MachineModel34  />
                        <MachineModel35  />
                        <MachineModel36  />
                        <MachineModel37  />
                        <MachineModel38  />
                        <MachineModel39  />
                        <MachineModel40  />
                        <MachineModel41  />
                        <MachineModel42  />
                        {showWindow && (
                            <InfoWindow
                                position={windowPosition}
                                onClose={handleClickOutside}
                                machineData={selectedMachineData} // Передаем данные о станке
                            />
                        )}

                    </Suspense>
                    <CameraControls
                        // maxDistance={200}  // Максимальная дистанция от камеры
                        // minDistance={1}    // Минимальная дистанция от камеры
                        dollySpeed={2}     // Скорость изменения масштаба
                        // @ts-ignore
                        panSpeed={35}       // Скорость перемещения камеры
                        dampingFactor={0.1} // "Сглаживание" движения
                        infinityDolly={false} // Возможность бесконечного изменения масштаба
                    />
                </Canvas>
            </div>
        </div>
    );
}

export default withAuth(WorkshopPage, ['Руководство']);