import Env from "@ioc:Adonis/Core/Env";

export const settings = {
  token_lifespan: Env.get("TOKEN_LIFESPAN_IN_DAYS") || 10,
};

export default settings