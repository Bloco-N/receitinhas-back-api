import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../prisma/generated/type-graphql";
import UserSignUpInput from "../inputs/UserSignUpInput";
import UserService from "../services/UserService";
import { Service } from "typedi";

@Service()
@Resolver(User)
export default class UserResolver {

  constructor(
    private readonly service: UserService  
  ){}

  @Mutation(() => User)
  async signUpUser(@Arg("data") data: UserSignUpInput) {

    return await this.service.create(data);

  }

}