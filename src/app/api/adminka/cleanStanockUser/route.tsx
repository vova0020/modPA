import { NextRequest, NextResponse } from "next/server";
import prismaInteraction from '@/api/prisma';

const prisma = new prismaInteraction();
export const dynamic = 'force-dynamic'; // показывает что фаил должен динамический быть


export async function PUT(req: NextRequest) {
    try {
        const {stanock, stanockMaster} = await req.json();
        console.log(stanock);
        console.log(stanockMaster);
        // console.log(formData);
        
        // Обновляем запись в базе данных с помощью Prisma
        const updatedSectors = await prisma.cleanAdminUsers(stanock, stanockMaster);

        return NextResponse.json(updatedSectors, { status: 200 });
    } catch (error) {
        console.error('Ошибка при обновлении Участка:', error);
        return NextResponse.json({ message: 'Ошибка при обновлении Участка' }, { status: 500 });
    }
}
