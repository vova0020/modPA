import CreateReasonsDowntime from '@/app/components/adminkaComponents/CreateReasonsDowntime'
import CreateSecktors from '@/app/components/adminkaComponents/CreateSecktors'
import CreateStanok from '@/app/components/adminkaComponents/CreateStanok'
import CreateUnitMeasurement from '@/app/components/adminkaComponents/CreateUnitMeasurement'
import Register from '@/app/components/adminkaComponents/Register'
import Navbar from '@/app/components/navbar'
import React from 'react'



export default function Adminka() {
    return (
        <div>
            <Navbar />
            <div style={{ width: '100%', padding: '10px' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '49%', border: '1px solid black' }}>

                        <h1>  Создание и редактирование пользователя</h1>
                        <div>
                            <Register />
                        </div>
                    </div>
                    <div style={{ width: '49%', border: '1px solid black' }}>

                        <h1>Создание участков</h1>
                        <CreateSecktors />
                    </div>
                </div>
                <div>
                    <div>
                        Создание станков
                        <div>
                            <CreateStanok/>
                        </div>
                    </div>
                    <div>
                        Создание единиц измерения
                        <div>
                            <CreateUnitMeasurement/>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        Создание причин простоев
                        <div>
                            <CreateReasonsDowntime/>
                        </div>
                    </div>
                    {/* <div>Создание единиц измерения</div> */}
                </div>
            </div>


        </div>
    )
}