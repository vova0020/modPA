/* eslint-disable */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    // Создание ролей
    const roles = [
        { name: 'Руководство' },
        { name: 'Оператор' },
        { name: 'Менеджер' },
    ];
    await prisma.role.createMany({
        data: roles,
    });
    console.log(`${roles.length} ролей создано.`);

    // Создание пользователей
    const users = [
        {
            firstName: 'Admin',
            lastName: 'Adminow',
            login: 'Admin',
            password: await bcrypt.hash('Admin311', 10),
        },
        {
            firstName: 'Иван',
            lastName: 'Иванов',
            login: 'ivanov',
            password: await bcrypt.hash('12345678', 10),
        },
        {
            firstName: 'Петр',
            lastName: 'Петров',
            login: 'petrov',
            password: await bcrypt.hash('12345678', 10),
        },
    ];
    await prisma.user.createMany({
        data: users,
    });
    console.log(`${users.length} пользователей создано.`);

    // Привязка роли "Руководство" к пользователю "Admin"
    const adminUser = await prisma.user.findUnique({ where: { login: 'Admin' } });
    const leadershipRole = await prisma.role.findFirst({ where: { name: 'Руководство' } });

    if (adminUser && leadershipRole) {
        await prisma.user.update({
            where: { id: adminUser.id },
            data: {
                role: { connect: { id: leadershipRole.id } },
            },
        });
        console.log('Роль "Руководство" успешно назначена пользователю Admin.');
    } else {
        console.log('Не удалось назначить роль "Руководство" пользователю Admin.');
    }

    // Привязка ролей к другим пользователям
    const operatorRole = await prisma.role.findFirst({ where: { name: 'Оператор' } });
    const managerRole = await prisma.role.findFirst({ where: { name: 'Менеджер' } });

    const ivanUser = await prisma.user.findUnique({ where: { login: 'ivanov' } });
    const petrUser = await prisma.user.findUnique({ where: { login: 'petrov' } });

    if (ivanUser && operatorRole) {
        await prisma.user.update({
            where: { id: ivanUser.id },
            data: {
                role: { connect: { id: operatorRole.id } },
            },
        });
        console.log('Роль "Оператор" успешно назначена пользователю Иван.');
    }

    if (petrUser && managerRole) {
        await prisma.user.update({
            where: { id: petrUser.id },
            data: {
                role: { connect: { id: managerRole.id } },
            },
        });
        console.log('Роль "Менеджер" успешно назначена пользователю Петр.');
    }

    // Создание участков
    const sections = [
        { name: 'Цех 1' },
        { name: 'Цех 2' },
    ];
    await prisma.section.createMany({
        data: sections,
    });
    console.log(`${sections.length} участков создано.`);

    // Создание станков
    const machines = [
        { name: 'Станок 1', sectionId: 1 },
        { name: 'Станок 2', sectionId: 1 },
        { name: 'Станок 3', sectionId: 2 },
    ];
    await prisma.machine.createMany({
        data: machines,
    });
    console.log(`${machines.length} станков создано.`);

    // Привязка пользователей к станкам
    const firstMachine = await prisma.machine.findFirst({ where: { name: 'Станок 1' } });
    const secondMachine = await prisma.machine.findFirst({ where: { name: 'Станок 2' } });

    if (ivanUser && firstMachine) {
        await prisma.user.update({
            where: { id: ivanUser.id },
            data: {
                machine: { connect: { id: firstMachine.id } },
            },
        });
        console.log('Пользователь Иван привязан к Станку 1.');
    }

    if (petrUser && secondMachine) {
        await prisma.user.update({
            where: { id: petrUser.id },
            data: {
                machine: { connect: { id: secondMachine.id } },
            },
        });
        console.log('Пользователь Петр привязан к Станку 2.');
    }

    // Создание единиц измерения
    const units = [
        { name: 'Штуки' },
        { name: 'Килограммы' },
    ];
    await prisma.unit.createMany({
        data: units,
    });
    console.log(`${units.length} единиц измерения создано.`);

    // Создание причин простоев
    const downtimeReasons = [
        { name: 'Поломка' },
        { name: 'Профилактика' },
    ];
    await prisma.downtimeReason.createMany({
        data: downtimeReasons,
    });
    console.log(`${downtimeReasons.length} причин простоев создано.`);

    // Создание статусов
    const statuses = [
        { name: 'Работает' },
        { name: 'Сломан' },
        { name: 'Не работает' },
    ];
    await prisma.status.createMany({
        data: statuses,
    });
    console.log(`${statuses.length} статусов создано.`);

    // Привязка статуса к станкам
    const workingStatus = await prisma.status.findFirst({ where: { name: 'Работает' } });
    const waitingStatus = await prisma.status.findFirst({ where: { name: 'Ожидание' } });

    if (firstMachine && workingStatus) {
        await prisma.machine.update({
            where: { id: firstMachine.id },
            data: {
                status: { connect: { id: workingStatus.id } },
            },
        });
        console.log('Станок 1 назначен статус "Работает".');
    }

    if (secondMachine && waitingStatus) {
        await prisma.machine.update({
            where: { id: secondMachine.id },
            data: {
                status: { connect: { id: waitingStatus.id } },
            },
        });
        console.log('Станок 2 назначен статус "Ожидание".');
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
