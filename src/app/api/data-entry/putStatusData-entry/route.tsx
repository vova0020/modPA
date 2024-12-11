import { NextRequest, NextResponse } from "next/server";
import prismaInteraction from '@/api/prisma';

const prisma = new prismaInteraction();

// GET-запрос для получения данных
export async function PUT(req: NextRequest) {
    try {
        const {machineId, statusId, isCrashComment} = await req.json();
        console.log(isCrashComment);
        // console.log(formData);
        
        // Обновляем запись в базе данных с помощью Prisma
        const updatedStatus = await prisma.putStatusStanock(machineId, statusId,isCrashComment);

        return NextResponse.json(updatedStatus, { status: 200 });
    } catch (error) {
        console.error('Ошибка при обновлении Статуса:', error);
        return NextResponse.json({ message: 'Ошибка при обновлении Статуса' }, { status: 500 });
    }
}