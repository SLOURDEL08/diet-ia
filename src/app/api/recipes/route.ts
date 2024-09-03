import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  try {
    const db = await connectToDatabase();
    let query = {};

    if (ids) {
      const recipeIds = ids.split(',').map(id => new ObjectId(id));
      query = { _id: { $in: recipeIds } };
    }

    const recipes = await db.collection('recipes').find(query).toArray();
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Error fetching recipes' }, { status: 500 });
  }
}