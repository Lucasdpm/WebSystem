import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Access } from '../access';

export const modPermitionGuard = () => {
  const userService = inject(UserService)
  const router = inject(Router)

  const userAccess = userService.user.value.access
  if(userAccess === Access.mod || userAccess === Access.admin) return true

  router.navigateByUrl('/home')
  return false
};
