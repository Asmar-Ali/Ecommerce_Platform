import { CartRepository } from "../repository/cart.repository";
import { CartRepositoryType } from "../types/repository.type";
import { CreateCart } from "./cart.service";
describe("cartService", () => {
  let repo: CartRepositoryType;
  beforeEach(() => {
    // jest.clearAllMocks();
    repo = CartRepository;
  });
  afterEach(() => {
    repo = {} as CartRepositoryType;
  });

  const mockCart = {
    name: "Mobile",
    amount: 1000,
  };
  describe("create product", () => {
    test("should create product successfully", async () => {
      jest.spyOn(repo, "create").mockImplementationOnce(() => {
        return Promise.resolve({ message: "Cart created successfully" });
      });
      const result = await CreateCart(mockCart, repo);
      expect(result).toMatchObject({ message: "Cart created successfully" });
    });
    
    test("should return error with unable to create product", async () => {
      jest.spyOn(repo, "create").mockImplementationOnce(() => {
        return Promise.reject(new Error("Unable to create cart"));
      });
      const result = await expect(CreateCart(mockCart, repo)).rejects.toThrow("Unable to create cart");
    });
  });
});
