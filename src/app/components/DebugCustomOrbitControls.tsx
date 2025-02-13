/* eslint-disable */
// @ts-nocheck
import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

/**
 * Этот компонент делает всё то же самое, что и CustomOrbitControls,
 * но дополнительно выводит координаты камеры и target в консоль.
 */
export default function DebugCustomOrbitControls(props) {
  const controlsRef = useRef();
  const { camera } = useThree();

  // Каждое обновление кадра выводим в консоль текущие координаты
  useFrame(() => {
    // Позиция камеры
    console.log('Camera position:', camera.position.x, camera.position.y, camera.position.z);
    // Точка, на которую смотрит камера (target)
    if (controlsRef.current) {
        
      const t = controlsRef.current.target;
      console.log('Target:', t.x, t.y, t.z);
    }
  });

  // Возвращаем обычные OrbitControls, но с ref
  return <OrbitControls ref={controlsRef} {...props} />;
}
