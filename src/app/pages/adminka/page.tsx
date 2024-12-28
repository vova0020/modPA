'use client'
/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, Paper, TextField, Typography, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import withAuth from '@/app/components/withAuth';
import Navbar from '@/app/components/navbar';


import CreateReasonsDowntime from '@/app/components/adminkaComponents/CreateReasonsDowntime';
import CreateSecktors from '@/app/components/adminkaComponents/CreateSecktors';
import CreateStanok from '@/app/components/adminkaComponents/CreateStanok';
import CreateUnitMeasurement from '@/app/components/adminkaComponents/CreateUnitMeasurement';
import CreateUsers from '@/app/components/adminkaComponents/CreateUser';

const AdminPage: React.FC = () => {
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
export default withAuth(AdminPage, ['Руководство']);