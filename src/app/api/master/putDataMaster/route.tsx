import { NextRequest, NextResponse } from "next/server";
import prismaInteraction from '@/api/prisma';

const prisma = new prismaInteraction();



// GET-запрос для получения данных
export async function PUT(req: NextRequest) {
    try {
        const {editRowData} = await req.json();
        console.log(editRowData);
        

      
            const updatedDowntime = await prisma.putDataMaster(editRowData);
            return NextResponse.json(updatedDowntime, { status: 200 });
        
    } catch (error) {
        console.error('Ошибка при обновлении Статуса:', error);
        return NextResponse.json({ message: 'Ошибка при обновлении Статуса' }, { status: 500 });
    }
}
