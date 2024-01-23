import { IsEmail, isEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export default class UserSignUpInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  username!: string;

  @Field()
  password!: string;
}