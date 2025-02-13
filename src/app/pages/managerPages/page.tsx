'use client'
/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormGroup,
  FormControlLabel,
  ListItemText,
  Chip,
  Fade,
  Grow,
  useTheme,
  Divider,
  InputAdornment,
  alpha,
  Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import withAuth from '@/app/components/withAuth';
import Navbar from '@/app/components/navbar';
import axios from 'axios';
import {
  DateRange,
  PrecisionManufacturing,
  HistoryToggleOff,
  QueryStats,
  AccessTime
} from '@mui/icons-material';
import ExcelJS from 'exceljs';

// Стилизованная карточка для станка
const ModernPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  backgroundColor: '#ffffff',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8]
  }
}));

// Базовая карточка для записи (будет переопределяться по категориям)
const RecordCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1)
}));

// Контейнер с вертикальным скроллом для длинных списков
const ScrollableContainer = styled(Box)(({ theme }) => ({
  maxHeight: 400,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: 8,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    borderRadius: 4
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: alpha(theme.palette.primary.main, 0.4),
    borderRadius: 4,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.6)
    }
  }
}));

// Градиентный заголовок для фильтров
const GradientHeader = styled(CardHeader)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2, 3),
  '& .MuiCardHeader-title': {
    fontSize: '1.25rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1)
  }
}));

// Функция сортировки по убыванию даты
const sortByDescending = (items: any[], key: string) => {
  return [...items].sort(
    (a, b) => new Date(b[key]).getTime() - new Date(a[key]).getTime()
  );
};

const AdminPage: React.FC = () => {
  const theme = useTheme();
  const [stanock, setStanock] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [selectedMachines, setSelectedMachines] = useState<number[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showOutputs, setShowOutputs] = useState<boolean>(true);
  const [showDowntimes, setShowDowntimes] = useState<boolean>(false);
  const [showStatusHistories, setShowStatusHistories] = useState<boolean>(false);

  useEffect(() => {
    getSectors();
  }, []);

  useMemo(() => {
    const intervalId = setInterval(() => getSectors(), 8000);
    return () => clearInterval(intervalId);
  }, []);

  const getSectors = async () => {
    try {
      const response = await axios.get('/api/managerApi');
      setStanock(response.data.sort((a, b) => a.id - b.id));
      console.log(response.data);
    } catch (error) {
      showSnackbar('Ошибка загрузки данных.', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  // Форматирование даты: "дд.мм.гггг, чч:мм"
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Фильтрация записей по диапазону дат (конечная дата учитывается до конца дня)
  const filterByDate = (items: any[], dateKey: string) => {
    return items.filter(item => {
      const itemDate = new Date(item[dateKey]);
      if (startDate) {
        const sDate = new Date(startDate);
        if (itemDate < sDate) return false;
      }
      if (endDate) {
        const eDate = new Date(endDate);
        eDate.setHours(23, 59, 59, 999);
        if (itemDate > eDate) return false;
      }
      return true;
    });
  };

  // Отображаем только выбранные станки
  const filteredMachines = stanock.filter(machine =>
    selectedMachines.includes(machine.id)
  );

  // Определяем стили для карточек в зависимости от категории
  const outputCardStyle = {
    backgroundColor: alpha(theme.palette.info.main, 0.05),
    '&:hover': { backgroundColor: alpha(theme.palette.info.main, 0.1) }
  };
  const downtimeCardStyle = {
    backgroundColor: alpha(theme.palette.error.main, 0.05),
    '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.1) }
  };
  const statusCardStyle = {
    backgroundColor: alpha(theme.palette.success.main, 0.05),
    '&:hover': { backgroundColor: alpha(theme.palette.success.main, 0.1) }
  };

  // Функция для вычисления длительности статуса
  const calculateDuration = (startDate: string, endDate?: string) => {
    if (!endDate) return 'Не завершен';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffMs = end.getTime() - start.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    if (diffMinutes < 60) {
      return `${diffMinutes} мин`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return minutes > 0 ? `${hours} ч ${minutes} мин` : `${hours} ч`;
    }
  };

  // Функция экспорта в Excel с учетом выбранных фильтров и чекбоксов.
  // Здесь создается "Главный лист" с объединенной таблицей, где для каждого станка
  // отображаются полные записи (как в индивидуальных листах) – что позволяет применять автофильтр.
  const exportExcel = async () => {
    if (selectedMachines.length === 0) {
      showSnackbar('Нет выбранных станков для экспорта.', 'error');
      return;
    }
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Ваше Приложение';
    workbook.created = new Date();
    workbook.modified = new Date();

    // ===== Главный лист (объединенная таблица с полными данными) =====
    const mainWorksheet = workbook.addWorksheet("Главный лист", {
      properties: { defaultRowHeight: 20 }
    });

    // Единая таблица с 7 колонками:
    // "Станок", "Тип", "Дата/Начало", "Параметр 1", "Параметр 2", "Параметр 3", "Комментарий"
    const headerRow = [
      "Станок",
      "Тип",
      "Дата/Начало",
      "Параметр 1",
      "Параметр 2",
      "Параметр 3",
      "Комментарий"
    ];
    mainWorksheet.addRow(headerRow);
    const mainHeader = mainWorksheet.getRow(1);
    mainHeader.eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCCCCCC' } };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Для каждого выбранного станка добавляем записи из всех разделов
    filteredMachines.forEach((machine: any) => {
      // Выработка
      if (showOutputs && machine.outputs && machine.outputs.length > 0) {
        const outputs = sortByDescending(filterByDate(machine.outputs, 'date'), 'date');
        outputs.forEach((output: any) => {
          mainWorksheet.addRow([
            machine.name,
            "Выработка",
            formatDate(output.date),
            output.quantity,
            machine.unit?.name || output.unitId,
            "",
            ""
          ]);
        });
      }
      // Простои
      if (showDowntimes && machine.downtimes && machine.downtimes.length > 0) {
        const downtimes = sortByDescending(filterByDate(machine.downtimes, 'date'), 'date');
        downtimes.forEach((downtime: any) => {
          mainWorksheet.addRow([
            machine.name,
            "Простой",
            formatDate(downtime.date),
            downtime.reason.name,
            `${downtime.quantity} ч`,
            "",
            ""
          ]);
        });
      }
      // История статусов
      if (showStatusHistories && machine.statusHistories && machine.statusHistories.length > 0) {
        const histories = sortByDescending(filterByDate(machine.statusHistories, 'startDate'), 'startDate');
        histories.forEach((history: any) => {
          mainWorksheet.addRow([
            machine.name,
            "Статус",
            formatDate(history.startDate),
            history.status?.name || history.statusId,
            history.endDate ? formatDate(history.endDate) : 'нет',
            calculateDuration(history.startDate, history.endDate),
            history.comment || ""
          ]);
        });
      }
    });

    // Устанавливаем автофильтр для всей таблицы главного листа
    mainWorksheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: headerRow.length }
    };

    // Задаем ширину столбцов
    mainWorksheet.columns.forEach((column) => {
      column.width = 20;
    });

    // ===== Листы для каждого станка (как ранее) =====
    for (const machine of filteredMachines) {
      let sheetName = machine.name;
      if (sheetName.length > 31) {
        sheetName = sheetName.substring(0, 31);
      }
      const worksheet = workbook.addWorksheet(sheetName, {
        properties: { defaultRowHeight: 20 }
      });

      // Заголовок листа с названием станка
      worksheet.mergeCells('A1', 'E1');
      const titleCell = worksheet.getCell('A1');
      titleCell.value = `Станок: ${machine.name}`;
      titleCell.font = { bold: true, size: 14 };
      titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

      let currentRow = 3;

      // Раздел "Выработка"
      if (showOutputs && machine.outputs && machine.outputs.length > 0) {
        worksheet.mergeCells(`A${currentRow}`, `E${currentRow}`);
        const sectionCell = worksheet.getCell(`A${currentRow}`);
        sectionCell.value = 'Выработка';
        sectionCell.font = { bold: true };
        sectionCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB0E0E6' } };
        currentRow++;

        worksheet.getRow(currentRow).values = ['Дата', 'Количество', 'Единица измерения'];
        worksheet.getRow(currentRow).eachCell((cell) => {
          cell.font = { bold: true };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
        currentRow++;

        const outputs = sortByDescending(filterByDate(machine.outputs, 'date'), 'date');
        outputs.forEach((output: any) => {
          worksheet.getRow(currentRow).values = [
            formatDate(output.date),
            output.quantity,
            machine.unit?.name || output.unitId
          ];
          currentRow++;
        });
        currentRow++;
      }

      // Раздел "Простои"
      if (showDowntimes && machine.downtimes && machine.downtimes.length > 0) {
        worksheet.mergeCells(`A${currentRow}`, `E${currentRow}`);
        const sectionCell = worksheet.getCell(`A${currentRow}`);
        sectionCell.value = 'Простои';
        sectionCell.font = { bold: true };
        sectionCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE0B2' } };
        currentRow++;

        worksheet.getRow(currentRow).values = ['Дата', 'Причина', 'Длительность'];
        worksheet.getRow(currentRow).eachCell((cell) => {
          cell.font = { bold: true };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
        currentRow++;

        const downtimes = sortByDescending(filterByDate(machine.downtimes, 'date'), 'date');
        downtimes.forEach((downtime: any) => {
          worksheet.getRow(currentRow).values = [
            formatDate(downtime.date),
            downtime.reason.name,
            `${downtime.quantity} ч`
          ];
          currentRow++;
        });
        currentRow++;
      }

      // Раздел "История статусов"
      if (showStatusHistories && machine.statusHistories && machine.statusHistories.length > 0) {
        worksheet.mergeCells(`A${currentRow}`, `E${currentRow}`);
        const sectionCell = worksheet.getCell(`A${currentRow}`);
        sectionCell.value = 'История статусов';
        sectionCell.font = { bold: true };
        sectionCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFB2DFDB' } };
        currentRow++;

        worksheet.getRow(currentRow).values = ['Статус', 'Начало', 'Конец', 'Длительность', 'Комментарий'];
        worksheet.getRow(currentRow).eachCell((cell) => {
          cell.font = { bold: true };
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
        currentRow++;

        const histories = sortByDescending(filterByDate(machine.statusHistories, 'startDate'), 'startDate');
        histories.forEach((history: any) => {
          worksheet.getRow(currentRow).values = [
            history.status?.name || history.statusId,
            formatDate(history.startDate),
            history.endDate ? formatDate(history.endDate) : 'нет',
            calculateDuration(history.startDate, history.endDate),
            history.comment || ''
          ];
          currentRow++;
        });
        currentRow++;
      }

      // Автоматическая ширина столбцов для листа станка
      worksheet.columns.forEach((column) => {
        column.width = 20;
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Статистика производства.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 800,
            color: theme.palette.primary.dark,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}
        >
          <QueryStats fontSize="inherit" />
          Статистика производства
        </Typography>

        {/* Фильтры */}
        <Card sx={{ mb: 4, borderRadius: 3 }}>
          <GradientHeader title={<><DateRange /> Фильтры</>} />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Начальная дата"
                  type="date"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PrecisionManufacturing color="action" />
                      </InputAdornment>
                    ),
                  }}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Конечная дата"
                  type="date"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <HistoryToggleOff color="action" />
                      </InputAdornment>
                    ),
                  }}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Выберите станки</InputLabel>
                  <Select
                    multiple
                    value={selectedMachines}
                    onChange={(e) => setSelectedMachines(e.target.value as number[])}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as number[]).map((id) => {
                          const machine = stanock.find((m: any) => m.id === id);
                          return (
                            <Chip
                              key={id}
                              label={machine?.name || id}
                              color="primary"
                              size="small"
                            />
                          );
                        })}
                      </Box>
                    )}
                  >
                    {stanock.map((machine: any) => (
                      <MenuItem key={machine.id} value={machine.id}>
                        <Checkbox checked={selectedMachines.includes(machine.id)} />
                        <ListItemText primary={machine.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormGroup row sx={{ gap: 3 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showOutputs}
                        onChange={(e) => setShowOutputs(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Показать выработку"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showDowntimes}
                        onChange={(e) => setShowDowntimes(e.target.checked)}
                        color="secondary"
                      />
                    }
                    label="Показать простои"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showStatusHistories}
                        onChange={(e) => setShowStatusHistories(e.target.checked)}
                        color="success"
                      />
                    }
                    label="История статусов"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Кнопка экспорта в Excel */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={exportExcel}
            disabled={selectedMachines.length === 0}
          >
            Выгрузить в Excel
          </Button>
        </Box>

        {/* Если станки не выбраны, показываем подсказку */}
        {selectedMachines.length === 0 ? (
          <Fade in>
            <Box
              sx={{
                textAlign: 'center',
                p: 4,
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                borderRadius: 3,
                mt: 4
              }}
            >
              <Typography variant="h6" color="textSecondary">
                Выберите станки для отображения статистики
              </Typography>
            </Box>
          </Fade>
        ) : (
          // Для каждого выбранного станка
          filteredMachines.map((machine: any) => (
            <Grow in key={machine.id} timeout={500}>
              <ModernPaper>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <PrecisionManufacturing sx={{ fontSize: 40, color: theme.palette.primary.main }} />
                  <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.dark }}>
                    {machine.name}
                  </Typography>
                </Box>

                {/* Выработка */}
                {showOutputs && machine.outputs && machine.outputs.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Divider sx={{ mb: 2 }}>
                      <Chip label="Выработка" color="primary" />
                    </Divider>
                    <ScrollableContainer>
                      {sortByDescending(filterByDate(machine.outputs, 'date'), 'date').map((output: any) => (
                        <RecordCard key={output.id} sx={outputCardStyle}>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} md={4}>
                              <Typography variant="body2" color="textSecondary">
                                <QueryStats fontSize="small" sx={{ mr: 0.5 }} />
                                Дата: {formatDate(output.date)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Typography variant="body2">
                                🏭 Количество: {output.quantity} {machine.unit?.name || output.unitId}
                              </Typography>
                            </Grid>
                          </Grid>
                        </RecordCard>
                      ))}
                    </ScrollableContainer>
                  </Box>
                )}

                {/* Простои */}
                {showDowntimes && machine.downtimes && machine.downtimes.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Divider sx={{ mb: 2 }}>
                      <Chip label="Простои" color="secondary" />
                    </Divider>
                    <ScrollableContainer>
                      {sortByDescending(filterByDate(machine.downtimes, 'date'), 'date').map((downtime: any) => (
                        <RecordCard key={downtime.id} sx={downtimeCardStyle}>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} md={4}>
                              <Typography variant="body2" color="textSecondary">
                                <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                                Дата: {formatDate(downtime.date)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Typography variant="body2">
                                Причина: {downtime.reason.name}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <Typography variant="body2">
                                Длительность: {downtime.quantity} ч
                              </Typography>
                            </Grid>
                          </Grid>
                        </RecordCard>
                      ))}
                    </ScrollableContainer>
                  </Box>
                )}

                {/* История статусов */}
                {showStatusHistories && machine.statusHistories && machine.statusHistories.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Divider sx={{ mb: 2 }}>
                      <Chip label="История статусов" color="success" />
                    </Divider>
                    <ScrollableContainer>
                      {sortByDescending(filterByDate(machine.statusHistories, 'startDate'), 'startDate').map((history: any) => (
                        <RecordCard key={history.id} sx={statusCardStyle}>
                          <Grid container spacing={1} alignItems="center">
                            <Grid item xs={12} md={3}>
                              <Typography variant="body2" color="textSecondary">
                                <HistoryToggleOff fontSize="small" sx={{ mr: 0.5 }} />
                                {history.status?.name || history.statusId}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Typography variant="body2">
                                Начало: {formatDate(history.startDate)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Typography variant="body2">
                                Конец: {history.endDate ? formatDate(history.endDate) : 'нет'}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Typography variant="body2">
                                Длительность: {calculateDuration(history.startDate, history.endDate)}
                              </Typography>
                            </Grid>
                            {history.comment && (
                              <Grid item xs={12}>
                                <Typography variant="body2">
                                  Комментарий: {history.comment}
                                </Typography>
                              </Grid>
                            )}
                          </Grid>
                        </RecordCard>
                      ))}
                    </ScrollableContainer>
                  </Box>
                )}
              </ModernPaper>
            </Grow>
          ))
        )}
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
        // @ts-ignore
          severity={snackbar.severity}
          sx={{
            boxShadow: theme.shadows[6],
            alignItems: 'center',
            minWidth: 300
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default withAuth(AdminPage, ['Руководство']);
