import jwt from "jsonwebtoken";
import secret_key from './secret_key';

function generateToken(is_expert: boolean, id: number): string {
  // create the token who last 2 hours
    const token = jwt.sign(
      { is_expert: is_expert, id: id }, // this allows routes to know if the sender is an experts and know its id
      secret_key.getSecretKey(),
      { expiresIn: "2h" }
    );
    return token;
}

export default generateToken;