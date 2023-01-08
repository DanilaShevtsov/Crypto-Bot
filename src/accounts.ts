import { createWallet, signUp } from "./tatum";
const UserModule = require('./db/user');
import { UserDTO } from "./db/dto/user";
const { v4: uuidv4 } = require('uuid');

export async function registrate(tgUserId: number) {
  const uuid = uuidv4();
  const wallet: any = await createWallet();
  const customer = await signUp(wallet.xpub, uuid);
  console.log(customer);

  const userEntity: UserDTO = {
    uuid: uuid,
    xPub: wallet.xpub,
    mnemonic: wallet.mnemonic,
    customerId: customer.customerId,
    tgUserId: tgUserId
  }

  UserModule.add(userEntity);
}

module.exports = { registrate }