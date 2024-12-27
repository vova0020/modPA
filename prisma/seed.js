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
