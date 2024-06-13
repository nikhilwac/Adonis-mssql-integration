import Config from '@ioc:Adonis/Core/Config'
const jwt = require('jsonwebtoken')


export default class FunctionalSevice {
  async makeJWT(data) {
    const appKey = Config.get("app.appKey");
    const tokenLifeSpanInDays = Config.get("settings.token_lifespan");
    const generatedJWT = jwt.sign(
      { data },
      appKey,
      {
        expiresIn: `${tokenLifeSpanInDays}d`,
      }
    );
    return generatedJWT;
  }
}
