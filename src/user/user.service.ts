import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  role: 'INTERN' | 'EMPLOYEE' | 'ADMIN';
}

@Injectable()
export class UserService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      role: 'EMPLOYEE',
      email: 'john.doe@example.com',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'INTERN',
      email: 'jane.smith@example.com',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      role: 'ADMIN',
      email: 'alice.johnson@example.com',
    },
    {
      id: 4,
      name: 'Bob Brown',
      role: 'EMPLOYEE',
      email: 'bob.brown@example.com',
    },
    {
      id: 5,
      name: 'Charlie White',
      role: 'INTERN',
      email: 'charlie.white@example.com',
    },
    {
      id: 6,
      name: 'Diana Green',
      role: 'ADMIN',
      email: 'diana.green@example.com',
    },
    {
      id: 7,
      name: 'Ethan Blue',
      role: 'EMPLOYEE',
      email: 'ethan.blue@example.com',
    },
  ];

  findAll(role?: 'INTERN' | 'EMPLOYEE' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return {
        message: `User with id ${id} not found`,
        statusCode: 404,
      };
    }

    return user;
  }

  create(user: {
    name: string;
    role: 'INTERN' | 'EMPLOYEE' | 'ADMIN';
    email: string;
  }) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, userUpdate: Partial<User>) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    const updateUserData = {
      ...user,
      ...userUpdate,
    };

    this.users[user.id] = updateUserData;

    return updateUserData;
  }

  delete(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return {
        message: `User with id ${id} not found`,
        statusCode: 404,
      };
    }

    this.users = this.users.filter((user) => user.id !== id);

    return {
      message: `User with id ${id} deleted successfully`,
    };
  }
}
