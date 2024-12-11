import { NextRequest, NextResponse } from "next/server";
import prismaInteraction from '@/api/prisma';

const prisma = new prismaInteraction();


export async function POST(req: NextRequest) {
 
    try {
        const data = await req.json(); // Парсинг тела запроса
        // console.log(data);
        
        const newOrder = await prisma.newDataEntry(data);
        // console.log(data);
        
        return NextResponse.json(newOrder, { status: 201 });
    } catch (error) {
        console.error('Ошибка при создании Заявки:', error);
        return NextResponse.json({ message: 'Ошибка при создании Заявки' }, { status: 500 });
    }
}
// GET-запрос для получения данных
export async function PUT(req: NextRequest) {
    try {
        const {editRowData} = await req.json();
        console.log(editRowData);
        

        if (editRowData.process == 'Выработка') {
           
            const updatedQuanti = await prisma.putOutput(editRowData);
            return NextResponse.json(updatedQuanti, { status: 200 });
        } else if (editRowData.process == 'Простой'){
            const updatedDowntime = await prisma.putDowntime(editRowData);
            return NextResponse.json(updatedDowntime, { status: 200 });
        }else if (editRowData.process == 'ВыработкаМастер'){
            const updatedDowntime = await prisma.putOutputMaster(editRowData);
            return NextResponse.json(updatedDowntime, { status: 200 });
        }
        // console.log(id);
        // console.log(formData);
        
        // Обновляем запись в базе данных с помощью Prisma
        

        
    } catch (error) {
        console.error('Ошибка при обновлении Статуса:', error);
        return NextResponse.json({ message: 'Ошибка при обновлении Статуса' }, { status: 500 });
    }
}
