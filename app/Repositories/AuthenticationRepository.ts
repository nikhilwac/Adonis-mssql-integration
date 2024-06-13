import Hash from '@ioc:Adonis/Core/Hash'
import User from "App/Models/User";
import FunctionalSevice from 'App/Services/FunctionalServices';


export default class AuthenticationRepository {
  private functionalSevice: FunctionalSevice;
  constructor() {
    this.functionalSevice = new FunctionalSevice();
  }
  /**
   * registerUser
   * @param email : Email Address Entered by the user
   * @param password : Password Entered by the User
   */
  public async registerUser(email: string, password: string) {
    const user = await User.create({
      email,
      password,
    });

    return user;
  }

  /**
   * tryLogin
   */
  public async tryLogin(email: string, password: string) {
    const isExist = await User.findBy("email", email);
    if (isExist) {
      if (await Hash.verify(isExist.password, password)) {
        let token = await this.functionalSevice.makeJWT({ email });
        return { token };
      }
      return false;
    }else return false
  }
}