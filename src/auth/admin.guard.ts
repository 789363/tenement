import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    if (user) {
      if (user.isadmin) {
        // 设置用户角色为管理员
        request.user.isadmin = true;
        return true;
      } else if (user.isregular) {
        // 设置用户角色为普通用户
        request.user.isadmin = false;
        return true;
      }
    }

    // 用户既不是管理员也不是普通用户
    return false;
  }
}
