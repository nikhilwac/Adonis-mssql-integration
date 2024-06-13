import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthenticationRepository from "App/Repositories/AuthenticationRepository";
import UserLoginValidator from "App/Validators/UserLoginValidator";
import UserRegistrationValidator from "App/Validators/UserRegistrationValidator";
import { HttpStatusCodes } from "App/utils/HttpStatuses";
import JsonResponse, { APIResponse } from "App/utils/JsonResponse";

export default class AuthenticationController {
  private authenticationRepository: AuthenticationRepository;
  constructor() {
    this.authenticationRepository = new AuthenticationRepository();
  }
  async tryLogin(ctx: HttpContextContract) {
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR;
    let isSuccess: boolean = false;
    let response: APIResponse;
    const { email, password } = await ctx.request.validate(UserLoginValidator);
    const isLogin = await this.authenticationRepository.tryLogin(
      email,
      password
    );
    if (isLogin) {
      httpStatusCode = HttpStatusCodes.HTTP_OK;
      isSuccess = true;
      response = JsonResponse.success(
        isLogin,
        "The user has successfully logged in"
      );
    } else {
      response = JsonResponse.validationError(
        {},
        "The user was unable to log in"
      );
    }

    ctx.response.status(httpStatusCode).json(response);
  }
  async registerUser(ctx: HttpContextContract) {
    let httpStatusCode: number = HttpStatusCodes.HTTP_VALIDATION_ERROR;
    let isSuccess: boolean = false;
    let response: APIResponse;

    const { email, password } = await ctx.request.validate(
      UserRegistrationValidator
    );
    const isRegisterd = await this.authenticationRepository.registerUser(
      email,
      password
    );

    if (isRegisterd) {
      httpStatusCode = HttpStatusCodes.HTTP_OK;
      isSuccess = true;
      response = JsonResponse.success(isRegisterd, "User Registration Success");
    } else {
      response = JsonResponse.validationError({}, "User Registration Failed");
    }

    ctx.response.status(httpStatusCode).json(response);
  }
}
