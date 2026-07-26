import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');

    if (!path) {
      return NextResponse.json({ error: 'Path parametresi gerekli.' }, { status: 400 });
    }

    revalidatePath(path);

    return NextResponse.json({ revalidated: true, path, timestamp: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { error: 'Revalidation başarısız.', details: err instanceof Error ? err.message : '' },
      { status: 500 }
    );
  }
}
