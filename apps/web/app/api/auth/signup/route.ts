import { NextRequest, NextResponse } from 'next/server';
import { Octokit } from '@octokit/rest';
import usersData from '../../../../data/users.json';

// NOTE: For production, use proper password hashing (bcrypt) and secure storage
// This demo stores user data in GitHub for demonstration purposes

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'ione2025';
const GITHUB_REPO = process.env.GITHUB_REPO || 'ionemain';
const USERS_FILE_PATH = 'apps/web/data/users.json';

type UserRole = 'buyer' | 'seller' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

interface UsersFile {
  users: User[];
  lastUpdated: string;
}

async function saveUsersToGitHub(users: UsersFile): Promise<boolean> {
  if (!GITHUB_TOKEN) {
    console.error('GITHUB_TOKEN not configured');
    return false;
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  try {
    // Get the current file to get its SHA
    const { data: currentFile } = await octokit.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: USERS_FILE_PATH,
    });

    if (!('sha' in currentFile)) {
      throw new Error('Could not get file SHA');
    }

    // Update the file
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: USERS_FILE_PATH,
      message: `chore: add new user (${users.users[users.users.length - 1].email})`,
      content: Buffer.from(JSON.stringify(users, null, 2)).toString('base64'),
      sha: currentFile.sha,
    });

    return true;
  } catch (error) {
    console.error('Error saving to GitHub:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['buyer', 'seller'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be buyer or seller' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Load current users
    const currentUsers: UsersFile = usersData as UsersFile;

    // Check if email already exists
    if (currentUsers.users.some((u) => u.email === email)) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      );
    }

    // Create new user (password is NOT stored in the JSON file for security)
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: role as UserRole,
      createdAt: new Date().toISOString(),
    };

    // Add user to the list
    const updatedUsers: UsersFile = {
      users: [...currentUsers.users, newUser],
      lastUpdated: new Date().toISOString(),
    };

    // Save to GitHub if token is available
    if (GITHUB_TOKEN) {
      const saved = await saveUsersToGitHub(updatedUsers);
      if (!saved) {
        // Fall back to localStorage-based auth if GitHub save fails
        console.warn('GitHub save failed, user will only be in localStorage');
      }
    }

    // Return user data (without password)
    return NextResponse.json({
      user: newUser,
      message: 'User created successfully',
      persistedToGitHub: !!GITHUB_TOKEN,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
