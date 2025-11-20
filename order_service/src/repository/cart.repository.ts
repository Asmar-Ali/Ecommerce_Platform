import { CartRepositoryType } from "../types/repository.type";


const createCart = async (input: any) => {
    return Promise.resolve({ message : "Cart created successfully"});
}
const updateCart = async (id: string, input: any) => {
    return Promise.resolve({ message : "Cart updated successfully"});
}
const deleteCart = async (id: string) => {
    return Promise.resolve({ message : "Cart deleted successfully"});
}
const findCart = async (limit: number, offset: number) => {
    return Promise.resolve({ message : "Cart found successfully"});
}
const findOneCart = async (id: string) => {
    return Promise.resolve({ message : "Cart found successfully"});
}

export const CartRepository: CartRepositoryType = {
  create: createCart,
  update: updateCart,
  delete: deleteCart,
  find: findCart,
  findOne: findOneCart,
};
