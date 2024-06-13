import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JsonResponse, { APIResponse } from 'App/utils/JsonResponse'
import Config from '@ioc:Adonis/Core/Config'
import { HttpStatusCodes } from 'App/utils/HttpStatuses';


const jwt = require('jsonwebtoken')

export default class UserGuard {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const authorizationToken = ctx.request.header("authorization");
    let httpStatusCode = HttpStatusCodes.HTTP_UNAUTHORIZED;
    let httpErrorResponse: APIResponse;

    if (!authorizationToken) {
      httpErrorResponse = JsonResponse.unAuthorized({ error: "No Authorization Token" });
      ctx.response.status(httpStatusCode).json(httpErrorResponse);
      return;
    } else {
      let bearerToken = authorizationToken.split(" ")[1];
      if (!bearerToken) {
        httpErrorResponse = JsonResponse.unAuthorized({ error: "Invalid User Token" });
        ctx.response.status(httpStatusCode).json(httpErrorResponse);
        return
      } else {
        const appKey: string = Config.get("app.appKey");
        const decodedPayload = jwt.verify(bearerToken, appKey);
        if(decodedPayload && decodedPayload.data){
        }else{
          httpErrorResponse = JsonResponse.unAuthorized({ error: "Invalid User Token" });
          ctx.response.status(httpStatusCode).json(httpErrorResponse);
          return
        }
      }
    }
    await next();
  }
}
