import CreateReasonsDowntime from '@/app/components/adminkaComponents/CreateReasonsDowntime'
import CreateSecktors from '@/app/components/adminkaComponents/CreateSecktors'
import CreateStanok from '@/app/components/adminkaComponents/CreateStanok'
import CreateUnitMeasurement from '@/app/components/adminkaComponents/CreateUnitMeasurement'
import CreateUsers from '@/app/components/adminkaComponents/CreateUser'

import Navbar from '@/app/components/navbar'
import React from 'react'



export default function Adminka() {
    return (
        <div>
            <Navbar />
            <div style={{ width: '100%', padding: '10px' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '49%', padding:'10px' }}>

                        <div>
                            <CreateUsers />
                        </div>
                    </div>
                    <div style={{ width: '49%',  boxSizing:'border-box', padding:'10px' }}>

                      
                        <CreateSecktors />
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '49%', padding:'10px' }}>
               
                        <div>
                            <CreateStanok/>
                        </div>
                    </div>
                    <div style={{ width: '49%',  boxSizing:'border-box', padding:'10px' }}>
                      
                        <div>
                            <CreateUnitMeasurement/>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                  
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