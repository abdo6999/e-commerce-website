import * as bcrypt from "bcrypt";
import * as env from "dotenv";
env.config();
const { PEPPER, SALT_ROUNDS } = process.env;
const hashpass = {
  hash(password: string): string {
    if (SALT_ROUNDS && PEPPER) {
      return bcrypt.hashSync(password + PEPPER, parseInt(SALT_ROUNDS));
    } else {
      throw new Error("PEPPER or SALT_ROUNDS is null");
    }
  },
  compare(password: string, inputpassword: string): boolean {
    if (PEPPER) {
      password = password + PEPPER;
      return bcrypt.compareSync(password, inputpassword);
    } else {
      throw new Error("PEPPER or SALT_ROUNDS is null");
    }
  }
};
export default hashpass;
