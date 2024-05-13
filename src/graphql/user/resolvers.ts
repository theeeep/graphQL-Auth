import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
} from "services/user";

const queries = {
  getUserToken: async (_: any, payload: GetUserTokenPayload) => {
    const token = await UserService.getUserToken(payload);
    return token;
  },
  getCurrentLoggedInUser: async (_: any, parameters: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("Tu hai kaun re !!!");
  },
};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
    return `${res.id} User Created`;
  },
};

export const resolvers = { queries, mutations };
