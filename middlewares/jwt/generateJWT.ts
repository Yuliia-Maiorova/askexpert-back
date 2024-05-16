import jwt from "jsonwebtoken";
import secret_key from './secret_key';

function generateToken(is_expert: boolean, id: number): string {
    const token = jwt.sign(
      { is_expert: is_expert, id: id },
      secret_key.getSecretKey(),
      { expiresIn: "2h" }
    );
    return token;
}

export default generateToken;