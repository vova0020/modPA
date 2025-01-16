 /* eslint-disable */


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
    //  Создание пользователя
    async createUser(data: { firstName: string, lastName: string, login: string; password: string; role: number; sector: number; stanock: number; }) {
        console.log(data);

        // Проверка, существует ли пользователь с таким логином
        const existingUser = await prisma.user.findUnique({
            where: { login: data.login }, // Проверяем по полю login
        });

        if (existingUser) {
            throw new Error('USER_EXISTS'); // Меняем текст ошибки на ключевое значение
        }

        // Формируем объект данных для создания пользователя
        const userData: any = {
            firstName: data.firstName,
            lastName: data.lastName,
            login: data.login,
            password: data.password,
            role: { connect: { id: data.role } },
        };

        // Условно добавляем section, если сектор указан
        if (data.sector) {
            userData.section = { connect: { id: data.sector } };
        }

        // Сохраняем пользователя
        const newUser = await prisma.user.create({ data: userData });

        // Условно связываем станок с созданным пользователем
        if (data.stanock) {
            await prisma.machine.update({
                where: { id: data.stanock },
                data: { userId: newUser.id }, // Обновляем userId в записи Machine
            });
        }

        return newUser; // Возвращаем созданного пользователя
    };


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
            // console.log(data);

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
                    machines: {
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


    // =========================================================
    // Админка

    // Получение списка пользователей
    async getAdminUsers() {
        try {
            const requestData = await prisma.user.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    login: true,
                    role: { select: { id: true, name: true } },   // Выбираем только id и name для роли
                    section: { select: { id: true, name: true } },  // Выбираем только id и name для сектора
                    machines: { select: { id: true, name: true } } ,
                    masterMachines: { select: { id: true, name: true } } 
                }
            });
            // console.log(JSON.stringify(requestData, null, 2));


            return requestData;
        } catch (error) {
            console.error('Ошибка при получении списка участков:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    // Изменение Названия участка
    async putAdminUsers(sectorId: number, data: any) {
        try {
            // Проверяем, является ли data массивом или одним числом
            if (Array.isArray(data)) {
                // Если это массив, обновляем каждый станок по отдельности
                const updatedSectors = await prisma.machine.updateMany({
                    where: {
                        id: { in: data }, // Фильтруем по массиву id
                    },
                    data: {
                        masterId: sectorId,
                    },
                });
    
                return updatedSectors;
            } else {
                // Если это одно число, обновляем только один станок
                const updatedSector = await prisma.machine.update({
                    where: { id: data }, // Используем одно значение
                    data: {
                        userId: sectorId,
                    },
                });
    
                return updatedSector;
            }
        } catch (error) {
            console.error("Ошибка при обновлении статуса станка:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
    // Удаление связей
    async cleanAdminUsers(stanock: any, stanockMaster: any) {
        try {
            // Проверяем, является ли data массивом или одним числом
            if (stanock.length > 0) {
                const stanockIds = stanock.map((item) => item.id); // Получаем массив ID из stanock
    
                // Убираем связи в userId для машин из массива stanock
                const updatedSectorsUserId = await prisma.machine.updateMany({
                    where: {
                        id: { in: stanockIds }, // Фильтруем по массиву id
                    },
                    data: {
                        userId: null, // Убираем связи в userId
                    },
                });
    
                console.log(`Связи удалены`);
            }
             // Проверяем, не пуст ли массив stanockMaster
        if (stanockMaster.length > 0) {
            const stanockMasterIds = stanockMaster.map((item) => item.id); // Получаем массив ID из stanockMaster

            // Убираем связи в masterId для машин из массива stanockMaster
            const updatedSectorsMasterId = await prisma.machine.updateMany({
                where: {
                    id: { in: stanockMasterIds }, // Фильтруем по массиву id
                },
                data: {
                    masterId: null, // Убираем связи в masterId
                },
            });

            console.log(`Связи удалены`);
        }

        return {
            success: true,
            message: 'Связи обновлены успешно.',
        };
        } catch (error) {
            console.error("Ошибка при обновлении статуса станка:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
    
    // Удаление  участка
    async delAdminUsers(sectorId: number) {
        try {
            // Удаление записи из таблицы section
            const deletedSector = await prisma.user.delete({
                where: { id: sectorId },
            });

            return deletedSector;
        } catch (error) {
            console.error('Ошибка при удалении участка:', error);
            throw new Error('Ошибка при удалении участка');
        } finally {
            await prisma.$disconnect();
        }
    }




    // Получение списка станков
    async getAdminStanock() {
        try {
            const requestData = await prisma.machine.findMany({
                include: {
                    section: true,
                    unit: true,
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true, // Указываем конкретные поля, которые хотим получить
                        },
                    },
                    master: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true, // Указываем конкретные поля, которые хотим получить
                        },
                    },
                }
            });
            // console.log(JSON.stringify(requestData, null, 2));


            return requestData;
        } catch (error) {
            console.error('Ошибка при получении списка участков:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    // Изменение Названия участка
    async putAdminStanock( sectorId: number, name: string, unitId: number, sectionId:number) {
        try {

            const machineData = {
                name: name,
                ...(sectionId && { section: { connect: { id: sectionId } } }),
                ...(unitId && { unit: { connect: { id:unitId } } }),
            };

            // Шаг 2: Обновить статус станка
            const updatedSectors = await prisma.machine.update({
                where: { id: sectorId },
                data: machineData,
            })

            return updatedSectors;
        } catch (error) {
            console.error("Ошибка при обновлении статуса станка:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
    // Удаление  участка
    async delAdminStanock(sectorId: number) {
        try {
            // Удаление записи из таблицы section
            const deletedSector = await prisma.machine.delete({
                where: { id: sectorId },
            });

            return deletedSector;
        } catch (error) {
            console.error('Ошибка при удалении участка:', error);
            throw new Error('Ошибка при удалении участка');
        } finally {
            await prisma.$disconnect();
        }
    }
    //   Добавление новых записей
    async createAdminStanock(data: any) {
        try {
            // Создаем запись для output
            const requestSectors = await prisma.machine.create({
                data: {
                    name: data.name,
                    section: {connect: { id: data.sectionId }},
                    unit: {connect: { id: data.unitId }},
                    status: {connect: { id: 3 }}
                }
            });

            // Возвращаем как записи output, так и записи downtime
            return {
                output: requestSectors,

            };
        } catch (error) {
            console.error('Ошибка при добавлении данных:', error);
            throw error;
        } finally {
            await prisma.$disconnect(); // Закрытие соединения с базой данных
        }
    }



    // Получение списка участков
    async getAdminSectors() {
        try {
            const requestData = await prisma.section.findMany();
            // console.log(JSON.stringify(requestData, null, 2));

            return requestData;
        } catch (error) {
            console.error('Ошибка при получении списка участков:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    // Изменение Названия участка
    async putAdminSectors(sectorId: number, name: string) {
        try {

            // Шаг 2: Обновить статус станка
            const updatedSectors = await prisma.section.update({
                where: { id: sectorId },
                data: {
                    name: name, // Обновляем статус
                },
            })

            return updatedSectors;
        } catch (error) {
            console.error("Ошибка при обновлении статуса станка:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
    // Удаление  участка
    async delAdminSectors(sectorId: number) {
        try {
            // Удаление записи из таблицы section
            const deletedSector = await prisma.section.delete({
                where: { id: sectorId },
            });

            return deletedSector;
        } catch (error) {
            console.error('Ошибка при удалении участка:', error);
            throw new Error('Ошибка при удалении участка');
        } finally {
            await prisma.$disconnect();
        }
    }
    //   Добавление новых записей
    async createAdminSectors(data: any) {
        try {
            // Создаем запись для output
            const requestSectors = await prisma.section.create({
                data: {
                    name: data.name,
                }
            });

            // Возвращаем как записи output, так и записи downtime
            return {
                output: requestSectors,

            };
        } catch (error) {
            console.error('Ошибка при добавлении данных:', error);
            throw error;
        } finally {
            await prisma.$disconnect(); // Закрытие соединения с базой данных
        }
    }


    // Получение списка единиц измерения
    async getAdminUnit() {
        try {
            const requestData = await prisma.unit.findMany();
            // console.log(JSON.stringify(requestData, null, 2));


            return requestData;
        } catch (error) {
            console.error('Ошибка при получении списка единиц измерения:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    // Изменение Названия участка
    async putAdminUnit(sectorId: number, name: string) {
        try {

            // Шаг 2: Обновить статус станка
            const updatedSectors = await prisma.unit.update({
                where: { id: sectorId },
                data: {
                    name: name, // Обновляем статус
                },
            })

            return updatedSectors;
        } catch (error) {
            console.error("Ошибка при обновлении единицы измерения:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
    // Удаление  участка
    async delAdminUnit(sectorId: number) {
        try {
            // Удаление записи из таблицы section
            const deletedSector = await prisma.unit.delete({
                where: { id: sectorId },
            });

            return deletedSector;
        } catch (error) {
            console.error('Ошибка при удалении единицы измерения:', error);
            throw new Error('Ошибка при удалении единицы измерения');
        } finally {
            await prisma.$disconnect();
        }
    }
    //   Добавление новых записей
    async createAdminUnit(data: any) {
        try {
            // Создаем запись для output
            const requestSectors = await prisma.unit.create({
                data: {
                    name: data.name,
                }
            });

            // Возвращаем как записи output, так и записи downtime
            return {
                output: requestSectors,

            };
        } catch (error) {
            console.error('Ошибка при добавлении данных единицы измерения:', error);
            throw error;
        } finally {
            await prisma.$disconnect(); // Закрытие соединения с базой данных
        }
    }

    // Получение списка единиц измерения
    async getAdminDowntime() {
        try {
            const requestData = await prisma.downtimeReason.findMany();
            // console.log(JSON.stringify(requestData, null, 2));


            return requestData;
        } catch (error) {
            console.error('Ошибка при получении списка причин простоя:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    // Изменение Названия участка
    async putAdminDowntime(sectorId: number, name: string) {
        try {

            // Шаг 2: Обновить статус станка
            const updatedSectors = await prisma.downtimeReason.update({
                where: { id: sectorId },
                data: {
                    name: name, // Обновляем статус
                },
            })

            return updatedSectors;
        } catch (error) {
            console.error("Ошибка при обновлении причины простоя:", error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
    // Удаление  участка
    async delAdminDowntime(sectorId: number) {
        try {
            // Удаление записи из таблицы section
            const deletedSector = await prisma.downtimeReason.delete({
                where: { id: sectorId },
            });

            return deletedSector;
        } catch (error) {
            console.error('Ошибка при удалении причины простоя:', error);
            throw new Error('Ошибка при удалении причины простоя');
        } finally {
            await prisma.$disconnect();
        }
    }
    //   Добавление новых записей
    async createAdminDowntime(data: any) {
        try {
            // Создаем запись для output
            const requestSectors = await prisma.downtimeReason.create({
                data: {
                    name: data.name,
                }
            });

            // Возвращаем как записи output, так и записи downtime
            return {
                output: requestSectors,

            };
        } catch (error) {
            console.error('Ошибка при добавлении данных причины простоя:', error);
            throw error;
        } finally {
            await prisma.$disconnect(); // Закрытие соединения с базой данных
        }
    }

    // Получение причин простоя
    async getRole() {
        try {
            const requestData = await prisma.role.findMany();
            // console.log(JSON.stringify(requestData, null, 2));

            return requestData;
        } catch (error) {
            console.error('Ошибка при получении списка ролей:', error);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }



 // Получение списка станков
 async getMashins() {
    try {
        const machines = await prisma.machine.findMany({
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
        // console.log(JSON.stringify(requestData, null, 2));


        return machines;
    } catch (error) {
        console.error('Ошибка при получении списка участков:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

}