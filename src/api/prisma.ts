// /* eslint-disable */


import { PrismaClient } from '@prisma/client';
// import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();


export default class prismaInteraction {

    // Функция авторизации
    async findUserByLogin(login: string) {
        return await prisma.user.findUnique({
            where: { login },
            include: {
                role: true
            }
        });

    }

    // Получение причин простоя
    async getResone() {
        try {
            const requestData = await prisma.downtimeReason.findMany();
            // console.log(JSON.stringify(requestData, null, 2));

            return requestData;
        } catch (error) {
            console.error('Ошибка при получении списка простоев:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    //   Добавление новых записей
    async newDataEntry(data: any) {
        try {
            // Получаем текущую дату
            const newDate = new Date(); // Текущая дата и время

            // Преобразуем quantity в число с плавающей запятой
            const productQuantity = parseFloat(data.productivity);
            if (isNaN(productQuantity)) {
                throw new Error("Некорректное значение quantity для выработки");
            }

            // Создаем запись для output
            const requestOutput = await prisma.output.create({
                data: {
                    quantity: productQuantity,
                    date: newDate,
                    unit: { connect: { id: data.machine.unitId } },
                    machine: { connect: { id: data.machine.id } },
                }
            });

            // Создаем записи для downtime
            const requestDowntime = await Promise.all(
                data.downtimes.map(async (downtime: any) => {
                    // Преобразуем downtime.time в число с плавающей запятой
                    const downtimeQuantity = parseFloat(downtime.time);
                    if (isNaN(downtimeQuantity)) {
                        throw new Error(`Некорректное значение времени простоя для причины ${downtime.reason}`);
                    }

                    const requestDowntime = await prisma.downtime.create({
                        data: {
                            quantity: downtimeQuantity, // Количество времени простоя
                            date: newDate, // Записываем текущую дату
                            reason: { connect: { id: downtime.reason } }, // Связываем с причиной простоя по ID
                            machine: { connect: { id: data.machine.id } }, // Связываем с машиной по ID
                        }
                    });
                    return requestDowntime; // Возвращаем созданную запись
                })
            );

            // Возвращаем как записи output, так и записи downtime
            return {
                output: requestOutput,
                downtimes: requestDowntime
            };
        } catch (error) {
            console.error('Ошибка при добавлении данных:', error);
            throw error;
        } finally {
            await prisma.$disconnect(); // Закрытие соединения с базой данных
        }
    }

    //   Добавление новых записей мастером
    async newDataQueryMaster(data: any) {
        try {
            // Получаем текущую дату
            // const newDate = new Date(); // Текущая дата и время

            // Преобразуем quantity в число с плавающей запятой
            const productQuantity = parseFloat(data.quantity);
            if (isNaN(productQuantity)) {
                throw new Error("Некорректное значение quantity для выработки");
            }

            // Создаем запись для output
            const requestOutput = await prisma.output.create({
                data: {
                    quantity: productQuantity,
                    date: new Date(data.date).toISOString(),
                    unit: { connect: { id: data.unitId } },
                    machine: { connect: { id: data.machineId } },
                }
            });


            return requestOutput; // Возвращаем созданную запись



            // Возвращаем как записи output, так и записи downtime

        } catch (error) {
            console.error('Ошибка при добавлении данных:', error);
            throw error;
        } finally {
            await prisma.$disconnect(); // Закрытие соединения с базой данных
        }
    }


    // Получение данных для Оператора для станка
    async getOperatorsData(requestId: number) {
        try {
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

            const requestData = await prisma.user.findUnique({
                where: { id: requestId },
                select: {
                    machine: {
                        include: {
                            section: true, // Включаем всю информацию о секции для станков
                            unit: true,    // Включаем всю информацию о единице измерения
                            outputs: {     // Включаем только сегодняшние выработки
                                where: {
                                    date: {
                                        gte: startOfDay,
                                        lt: endOfDay
                                    },
                                },
                            },
                            downtimes: {    // Включаем только сегодняшние простои
                                where: {
                                    date: {
                                        gte: startOfDay,
                                        lt: endOfDay
                                    },
                                },
                                include: {
                                    reason: true, // Включаем информацию о причине
                                },
                            },
                            status: true,          // Включаем все статусы
                            statusHistories: true, // Включаем историю статусов
                        },
                    },
                },
            });

            return requestData;
        } catch (error) {
            console.error("Ошибка при получении связанных данных пользователя:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
    // Получение данных для мастера
    async getMasterData(requestId: number, requestUserSector: number) {
        try {
            // const today = new Date();
            // const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            // const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

            // Получаем данные станков для указанного сектора
            const machines = await prisma.machine.findMany({
                where: {
                    sectionId: requestUserSector,
                },
                include: {
                    section: true, // Включаем всю информацию о секции для станков
                    unit: true,    // Включаем всю информацию о единице измерения
                    outputs: true,
                    downtimes: {    // Включаем только сегодняшние простои

                        include: {
                            reason: true, // Включаем информацию о причине
                        },
                    },
                    status: true,          // Включаем все статусы
                    statusHistories: {    // Включаем только сегодняшние простои

                        include: {
                            status: true, // Включаем информацию о причине
                        },
                    }, // Включаем историю статусов
                },
            });

            return machines;
        } catch (error) {
            console.error("Ошибка при получении данных для мастера:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }


    // Изменение статуса станка 
    async putStatusStanock(machineId: number, statusId: number, comment?: string) {
        try {
            // Шаг 1: Получить текущий статус станка
            const currentMachine = await prisma.machine.findUnique({
                where: { id: machineId },
                include: {
                    status: true, // Получаем текущий статус
                    statusHistories: {
                        orderBy: { startDate: 'desc' }, // Сортируем по дате начала, чтобы получить последний статус
                        take: 1, // Берем только последнюю запись истории
                    },
                },
            });
    
            if (!currentMachine) {
                throw new Error('Станок не найден');
            }
    
            // Шаг 2: Обновить статус станка
            const updatedMachine = await prisma.machine.update({
                where: { id: machineId },
                data: {
                    statusId: statusId, // Обновляем статус
                },
            });
    
            // Шаг 3: Проверить, был ли уже предыдущий статус, и завершить его, если он есть
            if (currentMachine.statusHistories.length > 0) {
                const lastHistory = currentMachine.statusHistories[0];
    
                // Проверяем, что предыдущий статус имеет заполненную дату окончания
                if (lastHistory.endDate) {
                    // Если дата окончания уже есть, создаем новую запись в истории
                    await prisma.statusHistory.create({
                        data: {
                            machineId: machineId,
                            statusId: statusId,
                            startDate: new Date(),
                            comment: comment || null,
                        },
                    });
                } else {
                    // Если дата окончания не установлена, завершаем текущую запись
                    await prisma.statusHistory.update({
                        where: { id: lastHistory.id },
                        data: {
                            endDate: new Date(), // Устанавливаем текущую дату как дату окончания
                        },
                    });
    
                    // Создаем новую запись с новым статусом
                    await prisma.statusHistory.create({
                        data: {
                            machineId: machineId,
                            statusId: statusId,
                            startDate: new Date(),
                            comment: comment || null,
                        },
                    });
                }
            } else {
                // Если нет записи в истории, создаем первую запись с новым статусом
                await prisma.statusHistory.create({
                    data: {
                        machineId: machineId,
                        statusId: statusId,
                        startDate: new Date(),
                        comment: comment || null,
                    },
                });
            }
    
            return updatedMachine;
        } catch (error) {
            console.error("Ошибка при обновлении статуса станка:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
    

    // Изменение данных в выработки
    async putOutput(editRowData) {
        // console.log(editRowData);

        try {
            const downtimeQuantity = parseFloat(editRowData.quantity);
            const requestData = await prisma.output.update({
                where: { id: editRowData.id },
                data: {
                    quantity: downtimeQuantity, // Обновляем значение внешнего ключа напрямую
                },
            });

            return requestData;
        } catch (error) {
            console.error("Ошибка при получении связанных данных пользователя:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
     // Изменение данных в выработки мастером
     async putOutputMaster(editRowData) {
        console.log(editRowData);

        try {
            const downtimeQuantity = parseFloat(editRowData.quantity);
            const requestData = await prisma.output.update({
                where: { id: editRowData.id },
                data: {
                    quantity: downtimeQuantity, // Обновляем значение внешнего ключа напрямую
                    date: new Date(editRowData.date).toISOString(), // Обновляем значение внешнего ключа напрямую
                },
            });

            return requestData;
        } catch (error) {
            console.error("Ошибка при получении связанных данных пользователя:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
    // Изменение данных в простое
    async putDowntime(editRowData) {
        try {
            const downtimeQuantity = parseFloat(editRowData.quantity);
            const requestData = await prisma.downtime.update({
                where: { id: editRowData.id },
                data: {
                    quantity: downtimeQuantity,
                    reason: { connect: { id: editRowData.reason.id } },
                },
            });

            return requestData;
        } catch (error) {
            console.error("Ошибка при получении связанных данных пользователя:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }







}