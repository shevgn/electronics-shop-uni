import { LoginResponse } from "@/types/auth.type";
import { User, UserLogin, UserRegister } from "@/types/user.type";
import query from "@db/queries/users.query";
import {
  ServerError,
  NotFoundError,
  UnauthorizedError,
} from "@/utils/errors.util";
import { generateToken } from "@/utils/jwt.utils";

export async function getAll(): Promise<User[]> {
  try {
    const result = await query.getAll();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function get(id: number): Promise<User> {
  try {
    const user = await query.get(id);
    return user;
  } catch (error) {
    throw error;
  }
}

export async function login(user: UserLogin): Promise<LoginResponse> {
  try {
    const foundUser = await query.findOne(user.email);
    if (!foundUser) {
      throw new NotFoundError("User not found");
    }

    const isMatch = foundUser.password === user.password;
    if (!isMatch) {
      throw new UnauthorizedError("Invalid password");
    }

    const token = generateToken(foundUser.id, foundUser.email, foundUser.role);

    return {
      user: {
        id: foundUser.id,
        role: foundUser.role,
        name: foundUser.name,
        email: foundUser.email,
      },
      token: token,
    };
  } catch (error) {
    throw new ServerError("Login failed", 500, error);
  }
}

export async function register(user: UserRegister): Promise<LoginResponse> {
  try {
    const foundUser = await query.findOne(user.email);
    if (foundUser) {
      throw new ServerError("User already exists", 400);
    }

    const createdUser = await query.addOne(
      user.name,
      user.email,
      user.password,
    );
    if (!createdUser) {
      throw new ServerError("Adding user failed", 500);
    }

    const token = generateToken(
      createdUser.id,
      createdUser.email,
      createdUser.role,
    );

    return {
      user: {
        id: createdUser.id,
        role: createdUser.role,
        name: createdUser.name,
        email: createdUser.email,
      },
      token: token,
    };
  } catch (error) {
    throw new ServerError("Register failed", 500, error);
  }
}

const deleteUser = async (id: number): Promise<void> => {
  try {
    await query.deleteOne(id);
  } catch (error) {
    throw new ServerError("Delete user failed", 500, error);
  }
};

export default { getAll, get, login, register, deleteUser };
