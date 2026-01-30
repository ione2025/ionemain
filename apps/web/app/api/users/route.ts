import { NextResponse } from 'next/server';
import usersData from '../../../data/users.json';

// GET /api/users - Get all users (for admin dashboard)
export async function GET() {
  try {
    // Return users without any sensitive data
    const users = usersData.users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
