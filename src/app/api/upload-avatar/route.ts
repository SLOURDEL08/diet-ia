import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('avatar') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Assurez-vous que le dossier d'upload existe
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const extension = path.extname(file.name);
    const fileName = `avatar-${uniqueSuffix}${extension}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const avatarUrl = `/uploads/${fileName}`;
    return NextResponse.json({ avatarUrl });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}