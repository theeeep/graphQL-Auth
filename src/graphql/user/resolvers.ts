import UserService, { CreateUserPayload } from "services/user";

const queries = {};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    const res = await UserService.createUser(payload);
  },
};

export const resolvers = { queries, mutations };
