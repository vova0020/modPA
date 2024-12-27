'use client';
 /* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, CssBaseline, TextField, MenuItem, Grid, Box, Typography, Container, Paper, Fade, Snackbar, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Description, AccessTime } from '@mui/icons-material';

import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';


const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#ff4081',
        },
        background: {
            default: '#f4f6f8',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

type FormInputs = {
    date: string;
    sector: string;
    equipment: string;
    dataType: string;
    material: string;
    reasonOrMeasurement: string;
    customReason?: string; // Новое поле для кастомной причины
    outputOrTime: string;
    operators: number;
    operatorNames: string[];
};

export default function ProductionForm() {
    const sectors = ['Раскрой', 'Нестинг', 'Кромка', 'Присадка', 'Фрезеровка', 'Склейка', 'Картон', 'Шлифовка', 'Покраска', 'Конвейер', 'Сборка'];
    const equipmentList: { [key: string]: string[] } = {
        'Раскрой': ['HOLZMA HCL 11/38/22', 'HOLZMA HPL 400/43/412 L', 'HOLZMA HPP 350/38/38'],
        'Нестинг': ['BIESSE ROVER A FT 2231', 'WEEKE VANTAGE 200/710'],
        'Кромка': ['IMA NOVIMAT 1', 'IMA NOVIMAT 2', 'IMA NOVIMAT 3', 'BRANDT AMBITION 1650', 'HOMAG OPTIMAT KL 26', 'HOMAG OPTIMAT KAL 310'],
        'Присадка': ['BHT PROFILINE 500', 'WEEKE BST 500', 'KDT-6022 TJ(1)', 'KDT-6022 TJ(2)', 'WEEKE OPTIMAT BHX 500', 'Ручная присадка 1', 'Ручная присадка 2', 'Ручная присадка 3'],
        'Фрезеровка': ['BIESSE ROVER A 3.30(1)', 'BIESSE ROVER A 3.30(2)', 'WEEKE VENTURE 2M', 'WEEKE VENTURE 230M', 'BIMA 400 V', 'WEEKE VENTURE 2,5M'],
        'Склейка': ['Стол склейки 1', 'Стол склейки 2'],
        'Картон': ['HOMAG VKS 200', 'HOMAG PAQTEQ C250'],
        'Шлифовка': ['SDA-1200', 'DMC Mastersand', 'Heeseman', 'Tonelli'],
        'Покраска': ['Линия покраски SUPERFICI T311', 'Линия покраски Giardina'],
        'Конвейер': ['Ковейерна линия Большая', 'Конвейерная линия Малая'],
        'Сборка': ['Сборочный стол 1', 'Сборочный стол 2', 'Сборочный стол 3', 'Сборочный стол 4', 'Сборочный стол 5', 'Сборочный стол 6', 'Сборочный стол 7', 'Сборочный стол 8'],
    };
    const dataTypes = ['Выработка', 'Простой'];
    const simpleReasons = ['Отсутствует оператор', 'Наладка', 'Уборка', 'Поломка', 'Другая причина'];

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm<FormInputs>();

    const [equipment, setEquipment] = useState<string[]>([]);
    const [materialOptions, setMaterialOptions] = useState<string[]>([]);
    const [reasonOrMeasurementOptions, setReasonOrMeasurementOptions] = useState<string[]>([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const selectedSector = watch('sector');
    const selectedDataType = watch('dataType');
    const operatorCount = watch('operators');
    const selectedReason = watch('reasonOrMeasurement');
    const [isOtherReason, setIsOtherReason] = useState(false);

    useEffect(() => {
        // Логика обновления вложенных списков
        if (selectedSector) {
            setEquipment(equipmentList[selectedSector] || []);
        }
        if (selectedSector && selectedDataType === 'Выработка') {
            switch (selectedSector) {
                case 'Раскрой':
                    setMaterialOptions(['ЛДСП', 'МДФ', 'ХДФ']);
                    setReasonOrMeasurementOptions(['Лист']);
                    break;
                case 'Кромка':
                    setMaterialOptions(['Кромка']);
                    setReasonOrMeasurementOptions(['Метры']);
                    break;
                case 'Присадка':
                case 'Фрезеровка':
                    setMaterialOptions(['Древесный материал']);
                    setReasonOrMeasurementOptions(['Количество деталей']);
                    break;
                case 'Конвейер':
                    setMaterialOptions(['Упаковки']);
                    setReasonOrMeasurementOptions(['Количество упаковок']);
                    break;
                case 'Сборка':
                    setMaterialOptions(['Изделие']);
                    setReasonOrMeasurementOptions(['Количество изделий']);
                    break;
                case 'Покраска':
                    setMaterialOptions(['Тип материала']);
                    setReasonOrMeasurementOptions(['Квадраты']);
                    break;
                default:
                    setMaterialOptions(['Древесный материал']);
                    setReasonOrMeasurementOptions([]);
            }
        } else if (selectedDataType === 'Простой') {
            setMaterialOptions(['Простой']);
            setReasonOrMeasurementOptions(simpleReasons);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSector, selectedDataType]);

    useEffect(() => {
        // Автоматическая подстановка, если один вариант
        if (materialOptions.length === 1) {
            setValue('material', materialOptions[0]);
        }
        if (reasonOrMeasurementOptions.length === 1) {
            setValue('reasonOrMeasurement', reasonOrMeasurementOptions[0]);
        }
    }, [materialOptions, reasonOrMeasurementOptions, setValue]);

    // Следим за выбором "Другая причина"
    useEffect(() => {
        setIsOtherReason(selectedReason === 'Другая причина');
    }, [selectedReason]);

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log(data);
        setOpenSnackbar(true);
        reset({
            date: '',
            sector: '',
            equipment: '',
            dataType: '',
            material: '',
            reasonOrMeasurement: '',
            customReason: '',          // Сброс кастомной причины
            outputOrTime: '',
            operators: 1,
            operatorNames: []
        });
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
                <CssBaseline />
                <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', backgroundColor: '#ffffff' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Fade in>
                            <MapsHomeWorkIcon sx={{ fontSize: 70, color: "success.main" }} />
                        </Fade>

                        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                            Ввод данных о выработке и простоях оборудования
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="outputOrTime"
                                        label="Выработка"
                                        {...register("outputOrTime", { required: "Введите выработку" })}
                                        error={!!errors.outputOrTime}
                                        helperText={errors.outputOrTime?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <AccessTime sx={{ mr: 1 }} />
                                            ),
                                        }}
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="date"
                                        label="Дата"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        {...register("date", { required: "Укажите дату" })}
                                        error={!!errors.date}
                                        helperText={errors.date?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <DateRange sx={{ mr: 1 }} />
                                            ),
                                        }}
                                    />
                                </Grid> */}
                                {/* <Grid item xs={12}>
                                    <TextField
                                        select
                                        required
                                        fullWidth
                                        id="sector"
                                        label="Сектор"
                                        {...register("sector", { required: "Выберите сектор" })}
                                        error={!!errors.sector}
                                        helperText={errors.sector?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <Business sx={{ mr: 1 }} />
                                            ),
                                        }}
                                    >
                                        {sectors.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> */}
                                {/* <Grid item xs={12}>
                                    <TextField
                                        select
                                        required
                                        fullWidth
                                        id="equipment"
                                        label="Оборудование"
                                        {...register("equipment", { required: "Выберите оборудование" })}
                                        error={!!errors.equipment}
                                        helperText={errors.equipment?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <PrecisionManufacturingIcon sx={{ mr: 1 }} />
                                            ),
                                        }}
                                    >
                                        {equipment.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> */}
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        required
                                        fullWidth
                                        id="dataType"
                                        label="Тип данных"
                                        {...register("dataType", { required: "Выберите тип данных" })}
                                        error={!!errors.dataType}
                                        helperText={errors.dataType?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <Description sx={{ mr: 1 }} />
                                            ),
                                        }}
                                    >
                                        {dataTypes.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <TextField
                                        select
                                        required
                                        fullWidth
                                        id="material"
                                        label="Материал"
                                        {...register("material", { required: "Выберите материал" })}
                                        error={!!errors.material}
                                        helperText={errors.material?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <StyleIcon sx={{ mr: 1 }} />
                                            ),
                                        }}
                                    >
                                        {materialOptions.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid> */}
                                <Grid item xs={12}>
                                    <TextField
                                        select
                                        required
                                        fullWidth
                                        id="reasonOrMeasurement"
                                        label="Причина / Измерение"
                                        {...register("reasonOrMeasurement", { required: "Выберите причину или измерение" })}
                                        error={!!errors.reasonOrMeasurement}
                                        helperText={errors.reasonOrMeasurement?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <PublishedWithChangesIcon sx={{ mr: 1 }} />
                                            ),
                                        }}
                                    >
                                        {simpleReasons.map((option) => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                {/* Поле для ввода кастомной причины, если выбрана "Другая причина" */}
                                {isOtherReason && (
                                    <Grid item xs={12} container justifyContent="center">
                                        <Grid item xs={10}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Введите причину"
                                                {...register("customReason", { required: "Введите свою причину" })}
                                                error={!!errors.customReason}
                                                helperText={errors.customReason?.message}
                                            />
                                        </Grid>
                                    </Grid>
                                )}


                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="outputOrTime"
                                        label="Выработка / Время"
                                        {...register("outputOrTime", { required: "Введите выработку или время" })}
                                        error={!!errors.outputOrTime}
                                        helperText={errors.outputOrTime?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <AccessTime sx={{ mr: 1 }} />
                                            ),
                                        }}
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                                    <TextField
                                        required
                                        type="number"
                                        fullWidth
                                        id="operators"
                                        label="Количество операторов"
                                        {...register("operators", { required: "Введите количество операторов", min: { value: 1, message: "Минимум 1 оператор" } })}
                                        error={!!errors.operators}
                                        helperText={errors.operators?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <Group sx={{ mr: 1 }} />
                                            ),
                                        }}
                                    />
                                </Grid> */}

                                {/* Поля для ввода ФИО операторов */}

                                {/* {Array.from({ length: operatorCount || 0 }).map((_, index) => (
                                    <Grid item xs={12} key={index}>
                                        <TextField
                                            required
                                            fullWidth
                                            label={`ФИО оператора ${index + 1}`}
                                            {...register(`operatorNames.${index}`, { required: "Введите ФИО оператора" })}
                                            InputProps={{
                                                startAdornment: (
                                                    <EngineeringIcon sx={{ mr: 1 }} />
                                                ),
                                            }}
                                        />
                                    </Grid>
                                ))} */}
                            </Grid>

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Сохранить данные
                            </Button>
                        </Box>
                    </Box>
                </Paper>

                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        Данные успешно сохранены!
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}





// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { Avatar, Button, CssBaseline, TextField, MenuItem, Grid, Box, Typography, Container, Paper, Fade, Snackbar, Alert } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { DateRange, Business, Assignment, Description, FormatListNumbered, Group, AccessTime } from '@mui/icons-material';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#ff4081',
//     },
//     background: {
//       default: '#f4f6f8',
//     },
//   },
//   typography: {
//     fontFamily: 'Roboto, sans-serif',
//   },
// });

// type FormInputs = {
//   date: string;
//   sector: string;
//   equipment: string;
//   dataType: string;
//   material: string;
//   reasonOrMeasurement: string;
//   outputOrTime: string;
//   operators: number;
//   operatorNames: string[];
// };

// export default function ProductionForm() {
//   const sectors = ['Раскрой', 'Нестинг', 'Кромка', 'Присадка', 'Фрезеровка', 'Конвейер', 'Сборка', 'Покраска', 'Фурнитура'];
//   const equipmentList = {
//     'Раскрой': ['Станок 1', 'Станок 2'],
//     'Нестинг': ['Станок 3', 'Станок 4'],
//     'Кромка': ['Станок 5'],
//   };
//   const dataTypes = ['Выработка', 'Простой'];
//   const simpleReasons = ['Отсутствует оператор', 'Наладка', 'Уборка', 'Поломка', 'Другая причина'];

//   const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm<FormInputs>();
//   const [equipment, setEquipment] = useState<string[]>([]);
//   const [materialOptions, setMaterialOptions] = useState<string[]>([]);
//   const [reasonOrMeasurementOptions, setReasonOrMeasurementOptions] = useState<string[]>([]);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const selectedSector = watch('sector');
//   const selectedDataType = watch('dataType');
//   const operatorCount = watch('operators');

//   useEffect(() => {
//     // Логика обновления вложенных списков
//     if (selectedSector) {
//       setEquipment(equipmentList[selectedSector] || []);
//     }
//     if (selectedSector && selectedDataType === 'Выработка') {
//       switch (selectedSector) {
//         case 'Раскрой':
//           setMaterialOptions(['ЛДСП', 'МДФ', 'ХДФ']);
//           setReasonOrMeasurementOptions(['Лист']);
//           break;
//         case 'Кромка':
//           setMaterialOptions(['Кромка']);
//           setReasonOrMeasurementOptions(['Метры']);
//           break;
//         case 'Присадка':
//         case 'Фрезеровка':
//           setMaterialOptions(['Древесный материал']);
//           setReasonOrMeasurementOptions(['Количество деталей']);
//           break;
//         case 'Конвейер':
//           setMaterialOptions(['Упаковки']);
//           setReasonOrMeasurementOptions(['Количество упаковок']);
//           break;
//         case 'Сборка':
//           setMaterialOptions(['Изделие']);
//           setReasonOrMeasurementOptions(['Количество изделий']);
//           break;
//         case 'Покраска':
//           setMaterialOptions(['Тип материала']);
//           setReasonOrMeasurementOptions(['Квадраты']);
//           break;
//         default:
//           setMaterialOptions(['Древесный материал']);
//           setReasonOrMeasurementOptions([]);
//       }
//     } else if (selectedDataType === 'Простой') {
//       setMaterialOptions(['Простой']);
//       setReasonOrMeasurementOptions(simpleReasons);
//     }
//   }, [selectedSector, selectedDataType]);

//   useEffect(() => {
//     // Автоматическая подстановка, если один вариант
//     if (materialOptions.length === 1) {
//       setValue('material', materialOptions[0]);
//     }
//     if (reasonOrMeasurementOptions.length === 1) {
//       setValue('reasonOrMeasurement', reasonOrMeasurementOptions[0]);
//     }
//   }, [materialOptions, reasonOrMeasurementOptions, setValue]);

//   const onSubmit: SubmitHandler<FormInputs> = (data) => {
//     console.log(data);
//     setOpenSnackbar(true);
//     // Сброс формы после успешного сохранения
//     reset();
//   };

//   const handleSnackbarClose = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
//         <CssBaseline />
//         <Paper elevation={3} sx={{ p: 4, borderRadius: '16px', backgroundColor: '#ffffff' }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <Fade in>
//               <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} />
//             </Fade>
//             <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
//               Ввод данных о выработке и простоях оборудования
//             </Typography>
//             <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="date"
//                     label="Дата"
//                     type="date"
//                     InputLabelProps={{ shrink: true }}
//                     {...register("date", { required: "Укажите дату" })}
//                     error={!!errors.date}
//                     helperText={errors.date?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <DateRange sx={{ mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     select
//                     required
//                     fullWidth
//                     id="sector"
//                     label="Участок"
//                     {...register("sector", { required: "Выберите участок" })}
//                     error={!!errors.sector}
//                     helperText={errors.sector?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <Business sx={{ mr: 1 }} />
//                       ),
//                     }}
//                   >
//                     {sectors.map((sector) => (
//                       <MenuItem key={sector} value={sector}>
//                         {sector}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     select
//                     required
//                     fullWidth
//                     id="equipment"
//                     label="Оборудование"
//                     {...register("equipment", { required: "Выберите оборудование" })}
//                     error={!!errors.equipment}
//                     helperText={errors.equipment?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <Assignment sx={{ mr: 1 }} />
//                       ),
//                     }}
//                   >
//                     {equipment.map((equip) => (
//                       <MenuItem key={equip} value={equip}>
//                         {equip}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     select
//                     required
//                     fullWidth
//                     id="dataType"
//                     label="Тип данных"
//                     {...register("dataType", { required: "Выберите тип данных" })}
//                     error={!!errors.dataType}
//                     helperText={errors.dataType?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <Description sx={{ mr: 1 }} />
//                       ),
//                     }}
//                   >
//                     {dataTypes.map((type) => (
//                       <MenuItem key={type} value={type}>
//                         {type}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     select
//                     required
//                     fullWidth
//                     id="material"
//                     label="Материал"
//                     {...register("material", { required: "Выберите материал" })}
//                     error={!!errors.material}
//                     helperText={errors.material?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <FormatListNumbered sx={{ mr: 1 }} />
//                       ),
//                     }}
//                   >
//                     {materialOptions.map((material) => (
//                       <MenuItem key={material} value={material}>
//                         {material}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     select
//                     required
//                     fullWidth
//                     id="reasonOrMeasurement"
//                     label="Причина / Измерение"
//                     {...register("reasonOrMeasurement", { required: "Выберите причину или измерение" })}
//                     error={!!errors.reasonOrMeasurement}
//                     helperText={errors.reasonOrMeasurement?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <Group sx={{ mr: 1 }} />
//                       ),
//                     }}
//                   >
//                     {reasonOrMeasurementOptions.map((option) => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="outputOrTime"
//                     label="Выработка / Время"
//                     {...register("outputOrTime", { required: "Введите значение" })}
//                     error={!!errors.outputOrTime}
//                     helperText={errors.outputOrTime?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <AccessTime sx={{ mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     required
//                     fullWidth
//                     id="operators"
//                     label="Количество операторов"
//                     type="number"
//                     {...register("operators", { required: "Укажите количество операторов", min: 1 })}
//                     error={!!errors.operators}
//                     helperText={errors.operators?.message}
//                     InputProps={{
//                       startAdornment: (
//                         <Group sx={{ mr: 1 }} />
//                       ),
//                     }}
//                   />
//                 </Grid>

//                 {Array.from({ length: operatorCount || 0 }).map((_, index) => (
//                   <Grid item xs={12} key={index}>
//                     <TextField
//                       required
//                       fullWidth
//                       label={`ФИО оператора ${index + 1}`}
//                       {...register(`operatorNames.${index}`, { required: "Введите ФИО оператора" })}
//                       InputProps={{
//                         startAdornment: (
//                           <Group sx={{ mr: 1 }} />
//                         ),
//                       }}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>

//               <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
//                 Сохранить данные
//               </Button>
//             </Box>
//           </Box>
//         </Paper>

//         <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
//           <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
//             Данные успешно сохранены!
//           </Alert>
//         </Snackbar>
//       </Container>
//     </ThemeProvider>
//   );
// }
