import { dataSource } from '@/app/lib/server/data-source';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const todos = await dataSource.getTodos();
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const newTodo = await dataSource.addTodo(text);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add todo' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json();
    await dataSource.toggleTodo(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to toggle todo' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await dataSource.deleteTodo(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}