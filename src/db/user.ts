import('reflect-metadata');
import { User } from "./entities/user.entity";
import { UserDTO } from "./dto/user";
import { AppDataSource } from './db';

async function add(user: UserDTO) {

  const userModel = new User();
  userModel.uuid = user.uuid;
  userModel.xPub = user.xPub;
  userModel.mnemonic = user.mnemonic;
  userModel.customerId = user.customerId;
  userModel.tgUserId = user.tgUserId;

  await AppDataSource.manager.save(userModel);
}

module.exports = { add }