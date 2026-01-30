import { NextRequest, NextResponse } from 'next/server';
import usersData from '../../../../data/users.json';

// NOTE: This is a demo implementation. In production, use proper
// password hashing and secure session management.

interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  createdAt: string;
}

interface UsersFile {
  users: User[];
  lastUpdated: string;
}

// For demo purposes, we use a simple password check
// In a real app, passwords should be hashed and stored securely
const DEMO_PASSWORDS: Record<string, string> = {
  'admin@ionecenter.com': 'admin123',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const currentUsers: UsersFile = usersData as UsersFile;
    const user = currentUsers.users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check password (demo implementation)
    // For new users, password verification would need a backend database
    const storedPassword = DEMO_PASSWORDS[email];
    if (storedPassword && storedPassword !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Return user data without sensitive info
    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
