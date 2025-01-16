'use client';
/* eslint-disable */
// @ts-nocheck
import Image from 'next/image';
import HOLZMASvg from '/public/img/HOLZMA_HCL_113822X.svg'; // Импорт SVG как компонента
import HOLZMA_HPLSvg from '/public/img/HOLZMA_HPL_40043412_L.svg'; // Импорт SVG как компонента
import HOLZMA_HPP_3503838Svg from '/public/img/HOLZMA_HPP_3503838.svg'; // Импорт SVG как компонента
import HOMAG_OPTIMAT_KAL_310Svg from '/public/img/HOMAG_OPTIMAT_KAL_310.svg'; // Импорт SVG как компонента
import Ima_NovimatSvg from '/public/img/Ima_Novimat.svg'; // Импорт SVG как компонента
import HOMAG_OPTIMAT_KL_26Svg from '/public/img/HOMAG_OPTIMAT_KL_26.svg'; // Импорт SVG как компонента
import BRANDT_AMBITION_1650Svg from '/public/img/BRANDT_AMBITION_1650.svg'; // Импорт SVG как компонента
import KDT_6022_TJSvg from '/public/img/KDT_6022_TJ.svg'; // Импорт SVG как компонента
import WEEKE_OPTIMAT_BHX_500Svg from '/public/img/WEEKE_OPTIMAT_BHX_500.svg'; // Импорт SVG как компонента
import BHT_PROFILINE_500Svg from '/public/img/BHT_PROFILINE_500.svg'; // Импорт SVG как компонента
import Bima_400VSvg from '/public/img/Bima_400V.svg'; // Импорт SVG как компонента
import WEEKE_VENTURE_2MSvg from '/public/img/WEEKE_VENTURE_2M.svg'; // Импорт SVG как компонента
import WEEKE_VENTURE_230MSvg from '/public/img/WEEKE_VENTURE_230M.svg'; // Импорт SVG как компонента
import BIESSE_ROVER_A_330Svg from '/public/img/BIESSE_ROVER_A_330.svg'; // Импорт SVG как компонента
import BIESSE_ROVER_A_FT_2231xSvg from '/public/img/BIESSE_ROVER_A_FT_2231x.svg'; // Импорт SVG как компонента
import TonelliSvg from '/public/img/tonelli.svg'; // Импорт SVG как компонента
import SDA_1200xSvg from '/public/img/SDA_1200x.svg'; // Импорт SVG как компонента
import DMC_MastersandSvg from '/public/img/DMC_Mastersand.svg'; // Импорт SVG как компонента
import HeesemanSvg from '/public/img/Heeseman.svg'; // Импорт SVG как компонента
import HOMAG_PAQTEQ_C250Svg from '/public/img/HOMAG_PAQTEQ_C250.svg'; // Импорт SVG как компонента
import WEEKE_BST_500Svg from '/public/img/WEEKE_BST_500.svg'; // Импорт SVG как компонента
import SUPERFICISvg from '/public/img/SUPERFICI_T311.svg'; // Импорт SVG как компонента
import GiardinaSvg from '/public/img/Giardina.svg'; // Импорт SVG как компонента
import Navbar from '@/app/components/navbar';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export default function Ceh() {
  const [stanocks, setStanock] = useState([]);
const work = 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)' // - зеленый цвет
const sloman = 'invert(10%) sepia(40%) saturate(1500%) hue-rotate(0deg) brightness(105%) contrast(110%)' // - ораньжевый цвет
const prostoi = 'invert(21%) sepia(10%) saturate(14%) hue-rotate(23deg) brightness(89%) contrast(87%)' // - серый цвет

const [HOLZMA, setHOLZMA] = useState(prostoi);
const [HOLZMA_HPL, setHOLZMA_HPL] = useState(prostoi);
const [HOLZMA_HPP_3503838, setHOLZMA_HPP_3503838] = useState(prostoi);
const [HOMAG_OPTIMAT_KAL_310, setHOMAG_OPTIMAT_KAL_310] = useState(prostoi);
const [Ima_Novimat1, setIma_Novimat1] = useState(prostoi);
const [Ima_Novimat2, setIma_Novimat2] = useState(prostoi);
const [Ima_Novimat3, setIma_Novimat3] = useState(prostoi);
const [HOMAG_OPTIMAT_KL_26, setHOMAG_OPTIMAT_KL_26] = useState(prostoi);
const [BRANDT_AMBITION_1650, setBRANDT_AMBITION_1650] = useState(prostoi);
const [KDT_6022_TJ1, setKDT_6022_TJ1] = useState(prostoi);
const [KDT_6022_TJ2, setKDT_6022_TJ2] = useState(prostoi);
const [WEEKE_OPTIMAT_BHX_500, setWEEKE_OPTIMAT_BHX_500] = useState(prostoi);
const [BHT_PROFILINE_500, setBHT_PROFILINE_500] = useState(prostoi);
const [Bima_400V, setBima_400V] = useState(prostoi);
const [WEEKE_VENTURE_2M, setWEEKE_VENTURE_2M] = useState(prostoi);
const [WEEKE_VENTURE_230M, setWEEKE_VENTURE_230M] = useState(prostoi);
const [BIESSE_ROVER_A_3301, setBIESSE_ROVER_A_3301] = useState(prostoi);
const [BIESSE_ROVER_A_3302, setBIESSE_ROVER_A_3302] = useState(prostoi);
const [BIESSE_ROVER_A_FT_2231x, setBIESSE_ROVER_A_FT_2231x] = useState(prostoi);
const [Tonelli, setTonelli] = useState(prostoi);
const [SDA_1200x, setSDA_1200x] = useState(prostoi);
const [DMC_Mastersand, setDMC_Mastersand] = useState(prostoi);
const [Heeseman, setHeeseman] = useState(prostoi);
const [HOMAG_PAQTEQ_C250, setHOMAG_PAQTEQ_C250] = useState(prostoi);
const [WEEKE_BST_500, setWEEKE_BST_500] = useState(prostoi);
const [SUPERFICI, setSUPERFICI] = useState(prostoi);
const [Giardina, setGiardina] = useState(prostoi);



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
  }, 4000); // Обновляем каждые 5 секунд

  // Очищаем интервал при размонтировании компонента
  return () => clearInterval(intervalId);

}, []);

useEffect(()=>{
console.log(stanocks);
for (const mashine of stanocks) {
  if (mashine.name ==  "HOLZMA HCL 11/38/22") {
    if (mashine.status.id == 1) {
      setHOLZMA(work)
    } else if(mashine.status.id == 2){
      setHOLZMA(sloman)
    }else if(mashine.status.id == 3){
      setHOLZMA(prostoi)
    }
  } else if (mashine.name ==  "HOLZMA HPL 400/43/412 L") {
    if (mashine.status.id == 1) {
      setHOLZMA_HPL(work)
    } else if(mashine.status.id == 2){
      setHOLZMA_HPL(sloman)
    }else if(mashine.status.id == 3){
      setHOLZMA_HPL(prostoi)
    }
  }else if (mashine.name ==  "HOLZMA HPP 350/38/38") {
    if (mashine.status.id == 1) {
      setHOLZMA_HPP_3503838(work)
    } else if(mashine.status.id == 2){
      setHOLZMA_HPP_3503838(sloman)
    }else if(mashine.status.id == 3){
      setHOLZMA_HPP_3503838(prostoi)
    }
  }else if (mashine.name ==  "HOMAG KAL 310") {
    if (mashine.status.id == 1) {
      setHOMAG_OPTIMAT_KAL_310(work)
    } else if(mashine.status.id == 2){
      setHOMAG_OPTIMAT_KAL_310(sloman)
    }else if(mashine.status.id == 3){
      setHOMAG_OPTIMAT_KAL_310(prostoi)
    }
  }else if (mashine.name ==  "IMA 1") {
    if (mashine.status.id == 1) {
      setIma_Novimat1(work)
    } else if(mashine.status.id == 2){
      setIma_Novimat1(sloman)
    }else if(mashine.status.id == 3){
      setIma_Novimat1(prostoi)
    }
  }else if (mashine.name ==  "IMA 2") {
    if (mashine.status.id == 1) {
      setIma_Novimat2(work)
    } else if(mashine.status.id == 2){
      setIma_Novimat2(sloman)
    }else if(mashine.status.id == 3){
      setIma_Novimat2(prostoi)
    }
  }else if (mashine.name ==  "IMA 3") {
    if (mashine.status.id == 1) {
      setIma_Novimat3(work)
    } else if(mashine.status.id == 2){
      setIma_Novimat3(sloman)
    }else if(mashine.status.id == 3){
      setIma_Novimat3(prostoi)
    }
  }else if (mashine.name ==  "HOMAG KL 26 двусторонний") {
    if (mashine.status.id == 1) {
      setHOMAG_OPTIMAT_KL_26(work)
    } else if(mashine.status.id == 2){
      setHOMAG_OPTIMAT_KL_26(sloman)
    }else if(mashine.status.id == 3){
      setHOMAG_OPTIMAT_KL_26(prostoi)
    }
  }else if (mashine.name ==  "BRANDT") {
    if (mashine.status.id == 1) {
      setBRANDT_AMBITION_1650(work)
    } else if(mashine.status.id == 2){
      setBRANDT_AMBITION_1650(sloman)
    }else if(mashine.status.id == 3){
      setBRANDT_AMBITION_1650(prostoi)
    }
  }else if (mashine.name ==  "KDT-6022 TJ(1)") {
    if (mashine.status.id == 1) {
      setKDT_6022_TJ1(work)
    } else if(mashine.status.id == 2){
      setKDT_6022_TJ1(sloman)
    }else if(mashine.status.id == 3){
      setKDT_6022_TJ1(prostoi)
    }
  }else if (mashine.name ==  "KDT-6022 TJ(2)") {
    if (mashine.status.id == 1) {
      setKDT_6022_TJ2(work)
    } else if(mashine.status.id == 2){
      setKDT_6022_TJ2(sloman)
    }else if(mashine.status.id == 3){
      setKDT_6022_TJ2(prostoi)
    }
  }else if (mashine.name ==  "BHX 500") {
    if (mashine.status.id == 1) {
      setWEEKE_OPTIMAT_BHX_500(work)
    } else if(mashine.status.id == 2){
      setWEEKE_OPTIMAT_BHX_500(sloman)
    }else if(mashine.status.id == 3){
      setWEEKE_OPTIMAT_BHX_500(prostoi)
    }
  }else if (mashine.name ==  "BHT 500") {
    if (mashine.status.id == 1) {
      setBHT_PROFILINE_500(work)
    } else if(mashine.status.id == 2){
      setBHT_PROFILINE_500(sloman)
    }else if(mashine.status.id == 3){
      setBHT_PROFILINE_500(prostoi)
    }
  }else if (mashine.name ==  "BIMA 400 V") {
    if (mashine.status.id == 1) {
      setBima_400V(work)
    } else if(mashine.status.id == 2){
      setBima_400V(sloman)
    }else if(mashine.status.id == 3){
      setBima_400V(prostoi)
    }
  }else if (mashine.name ==  "VENTURE 2M") {
    if (mashine.status.id == 1) {
      setWEEKE_VENTURE_2M(work)
    } else if(mashine.status.id == 2){
      setWEEKE_VENTURE_2M(sloman)
    }else if(mashine.status.id == 3){
      setWEEKE_VENTURE_2M(prostoi)
    }
  }else if (mashine.name ==  "VENTURE 230M") {
    if (mashine.status.id == 1) {
      setWEEKE_VENTURE_230M(work)
    } else if(mashine.status.id == 2){
      setWEEKE_VENTURE_230M(sloman)
    }else if(mashine.status.id == 3){
      setWEEKE_VENTURE_230M(prostoi)
    }
  }else if (mashine.name ==  "ROVER A 3.30(1)") {
    if (mashine.status.id == 1) {
      setBIESSE_ROVER_A_3301(work)
    } else if(mashine.status.id == 2){
      setBIESSE_ROVER_A_3301(sloman)
    }else if(mashine.status.id == 3){
      setBIESSE_ROVER_A_3301(prostoi)
    }
  }else if (mashine.name ==  "ROVER A 3.30(2)") {
    if (mashine.status.id == 1) {
      setBIESSE_ROVER_A_3302(work)
    } else if(mashine.status.id == 2){
      setBIESSE_ROVER_A_3302(sloman)
    }else if(mashine.status.id == 3){
      setBIESSE_ROVER_A_3302(prostoi)
    }
  }else if (mashine.name ==  "BIESSE ROVER A FT 2231") {
    if (mashine.status.id == 1) {
      setBIESSE_ROVER_A_FT_2231x(work)
    } else if(mashine.status.id == 2){
      setBIESSE_ROVER_A_FT_2231x(sloman)
    }else if(mashine.status.id == 3){
      setBIESSE_ROVER_A_FT_2231x(prostoi)
    }
  }else if (mashine.name ==  "Tonelli") {
    if (mashine.status.id == 1) {
      setTonelli(work)
    } else if(mashine.status.id == 2){
      setTonelli(sloman)
    }else if(mashine.status.id == 3){
      setTonelli(prostoi)
    }
  }else if (mashine.name ==  "SDA-1200") {
    if (mashine.status.id == 1) {
      setSDA_1200x(work)
    } else if(mashine.status.id == 2){
      setSDA_1200x(sloman)
    }else if(mashine.status.id == 3){
      setSDA_1200x(prostoi)
    }
  }else if (mashine.name ==  "DMC Mastersand") {
    if (mashine.status.id == 1) {
      setDMC_Mastersand(work)
    } else if(mashine.status.id == 2){
      setDMC_Mastersand(sloman)
    }else if(mashine.status.id == 3){
      setDMC_Mastersand(prostoi)
    }
  }else if (mashine.name ==  "Heeseman") {
    if (mashine.status.id == 1) {
      setHeeseman(work)
    } else if(mashine.status.id == 2){
      setHeeseman(sloman)
    }else if(mashine.status.id == 3){
      setHeeseman(prostoi)
    }
  }else if (mashine.name ==  "HOMAG PAQTEQ C250") {
    if (mashine.status.id == 1) {
      setHOMAG_PAQTEQ_C250(work)
    } else if(mashine.status.id == 2){
      setHOMAG_PAQTEQ_C250(sloman)
    }else if(mashine.status.id == 3){
      setHOMAG_PAQTEQ_C250(prostoi)
    }
  }else if (mashine.name ==  "BST 500") {
    if (mashine.status.id == 1) {
      setWEEKE_BST_500(work)
    } else if(mashine.status.id == 2){
      setWEEKE_BST_500(sloman)
    }else if(mashine.status.id == 3){
      setWEEKE_BST_500(prostoi)
    }
  }else if (mashine.name ==  "SUPERFICI T311") {
    if (mashine.status.id == 1) {
      setSUPERFICI(work)
    } else if(mashine.status.id == 2){
      setSUPERFICI(sloman)
    }else if(mashine.status.id == 3){
      setSUPERFICI(prostoi)
    }
  }else if (mashine.name ==  "Giardina") {
    if (mashine.status.id == 1) {
      setGiardina(work)
    } else if(mashine.status.id == 2){
      setGiardina(sloman)
    }else if(mashine.status.id == 3){
      setGiardina(prostoi)
    }
  }
 
}

},[stanocks])



  return (
    <div >
      <Navbar />
      <div
  style={{
    position: 'relative',
    width: '100vw', // Полная ширина экрана
    height: '100vh', // Полная высота экрана
    overflow: 'hidden', // Предотвращаем выход изображения за пределы контейнера
  }}
>
  <Image
    src="/img/conc_f.jpg"
    alt="План цеха"
    layout="fill" // Заполняем весь контейнер
    style={{
      objectFit: 'cover', // Заполняем контейнер, сохраняя пропорции
      objectPosition: 'center', // Центрируем изображение
    }}
    priority
  />
</div>





      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '-4.5%',
          transform: 'translate(0%, 0%) skew(0deg, 28deg) rotate(-58deg) ',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: HOLZMA,
        }}
      >
        <HOLZMASvg width="320px" height="320px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '-1%',
          transform: 'translate(0%, 0%) skew(12deg, 15deg) rotate(-46deg)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: HOLZMA_HPL,
        }}
      >
        <HOLZMA_HPLSvg width="240px" height="240px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '68%',
          left: '4%',
          transform: 'translate(0%, 0%) skew(-7deg, 35deg) rotate(-85deg)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: HOLZMA_HPP_3503838,
        }}
      >
        <HOLZMA_HPP_3503838Svg width="210px" height="210px" />
      </div>


      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '21%',
          left: '14%',
          transform: 'translate(0%, 0%) skew(-30deg, 20deg) rotate(-50deg) scaleX(-1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: HOMAG_OPTIMAT_KAL_310,
        }}
      >
        <HOMAG_OPTIMAT_KAL_310Svg width="265px" height="265px" />
      </div>
      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '27%',
          left: '14%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: Ima_Novimat1,
        }}
      >
        <Ima_NovimatSvg width="275px" height="275px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '39%',
          left: '18%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: HOMAG_OPTIMAT_KL_26,
        }}
      >
        <HOMAG_OPTIMAT_KL_26Svg width="170px" height="170px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '47.5%',
          left: '14%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: Ima_Novimat2,
        }}
      >
        <Ima_NovimatSvg width="275px" height="275px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '56.5%',
          left: '14%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: Ima_Novimat3,
        }}
      >
        <Ima_NovimatSvg width="275px" height="275px" />
      </div>
      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '69.5%',
          left: '12.5%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(-1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: BRANDT_AMBITION_1650,
        }}
      >
        <BRANDT_AMBITION_1650Svg width="255px" height="255px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '74.5%',
          left: '14%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: Ima_Novimat3,
        }}
      >
        <Ima_NovimatSvg width="275px" height="275px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '35%',
          transform: 'translate(0%, 0%) skew(-10deg, 10deg) rotate(-40deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: KDT_6022_TJ1,
        }}
      >
        <KDT_6022_TJSvg width="200px" height="200px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '52%',
          left: '35%',
          transform: 'translate(0%, 0%) skew(-10deg, 10deg) rotate(-40deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: KDT_6022_TJ2,
        }}
      >
        <KDT_6022_TJSvg width="200px" height="200px" />
      </div>
      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '65%',
          left: '33%',
          transform: 'translate(0%, 0%) skew(0deg, 10deg) rotate(-40deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: WEEKE_OPTIMAT_BHX_500,
        }}
      >
        <WEEKE_OPTIMAT_BHX_500Svg width="200px" height="200px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '44%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: BHT_PROFILINE_500,
        }}
      >
        <BHT_PROFILINE_500Svg width="200px" height="200px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '59%',
          left: '44%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          // filter: 'invert(10%) sepia(40%) saturate(1500%) hue-rotate(0deg) brightness(105%) contrast(110%)',
          filter: BHT_PROFILINE_500,
        }}
      >
        <BHT_PROFILINE_500Svg width="200px" height="200px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '54%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: Bima_400V,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <Bima_400VSvg width="200px" height="200px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '54%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: WEEKE_VENTURE_2M,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <WEEKE_VENTURE_2MSvg width="200px" height="200px" />
      </div>
      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '41%',
          left: '54%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: WEEKE_VENTURE_230M,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <WEEKE_VENTURE_230MSvg width="200px" height="200px" />
      </div>
      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '57%',
          left: '49%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(-1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: BIESSE_ROVER_A_3301,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <BIESSE_ROVER_A_330Svg width="220px" height="220px" />
      </div>
      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '66%',
          left: '49%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(-1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: BIESSE_ROVER_A_3302,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <BIESSE_ROVER_A_330Svg width="220px" height="220px" />
      </div>
      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '68%',
          left: '70%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(-1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: BIESSE_ROVER_A_FT_2231x,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <BIESSE_ROVER_A_FT_2231xSvg width="200px" height="200px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '47%',
          left: '75%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: WEEKE_VENTURE_2M,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <WEEKE_VENTURE_2MSvg width="200px" height="200px" />
      </div>
      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '70%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(-1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: BIESSE_ROVER_A_FT_2231x,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <BIESSE_ROVER_A_FT_2231xSvg width="200px" height="200px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '65%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: Tonelli,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <TonelliSvg width="200px" height="200px" />
      </div>
      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '22%',
          left: '74%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: SDA_1200x,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <SDA_1200xSvg width="200px" height="200px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '13%',
          left: '77%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(0deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: DMC_Mastersand,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <DMC_MastersandSvg width="150px" height="150px" />
      </div>
      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '14%',
          left: '83%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(0deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: Heeseman,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <HeesemanSvg width="120px" height="120px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          left: '88%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(0deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: HOMAG_PAQTEQ_C250,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <HOMAG_PAQTEQ_C250Svg width="170px" height="170px" />
      </div>

      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '19%',
          left: '44%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg) scaleX(1)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: WEEKE_BST_500,
          // filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',
        }}
      >
        <WEEKE_BST_500Svg width="200px" height="200px" />
      </div>








      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-7%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '300px', // Высота SVG
          filter: Giardina,
        }}
      >
        <GiardinaSvg width="850px" height="850px" />
      </div>
      {/* SVG поверх фона */}
      <div
        style={{
          position: 'absolute',
          top: '-8%',
          left: '-2%',
          transform: 'translate(0%, 0%) skew(0deg, 0deg) rotate(-30deg)',
          // transform: 'translate(-50%, -50%)  rotate(215deg)',
          width: '300px', // Ширина SVG
          height: '200px', // Высота SVG
          filter: SUPERFICI,
        }}
      >
        <SUPERFICISvg width="380px" height="380px" />
      </div>

      {/* </div> */}
    </div>

  );

}


// filter: 'invert(5%) sepia(100%) saturate(1000%) hue-rotate(-300deg)',  - зеленый цвет
// filter: 'invert(10%) sepia(40%) saturate(1500%) hue-rotate(0deg) brightness(105%) contrast(110%)',  - оранжевый
