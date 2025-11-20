import { CartRepositoryType } from "../types/repository.type";

export const CreateCart = async (input: any, repo: CartRepositoryType) => {
  return await repo.create(input);
};
export const UpdateCart = async (
  id: string,
  input: any,
  repo: CartRepositoryType
) => {
  return await repo.update(id, input);
};
export const DeleteCart = async (id: string, repo: CartRepositoryType) => {
  return await repo.delete(id);
};
export const FindCart = async (
  limit: number,
  offset: number,
  repo: CartRepositoryType
) => {
  return await repo.find(limit, offset);
};
export const FindOneCart = async (id: string, repo: CartRepositoryType) => {
  return await repo.findOne(id);
};
