/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Injectable, Dependencies } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from './roles.decorator';

// @Injectable()
// @Dependencies(Reflector)
// export class RolesGuard {

//   constructor(reflector) {
//     this.reflector = reflector;
//   }

//   canActivate(context) {
//     const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     return requiredRoles.some((role) => user.roles.includes(role));
//   }
// }
