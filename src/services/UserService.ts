import { PrismaClient } from "@prisma/client";
import { UserCreateInput } from "../../prisma/generated/type-graphql";
import { Service } from "typedi";
import bcrypt from "bcrypt"

@Service()
export default class UserService {

  prisma = new PrismaClient();

  async create(data: UserCreateInput) {

    data.password = bcrypt.hashSync(data.password, 10)

    return await this.prisma.user.create({data})

  }

}