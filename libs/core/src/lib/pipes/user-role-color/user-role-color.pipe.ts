import { Pipe, PipeTransform } from '@angular/core';
import { ROLES } from '@pang/const';

@Pipe({
  name: 'userRoleColor',
})
export class UserRoleColorPipe implements PipeTransform {
  transform(schoolCode: string): string {
    const code = (schoolCode || '').charAt(0);
    switch (code) {
      case ROLES.TEACHER.code:
        return ROLES.TEACHER.color;
      case ROLES.PARENT.code:
        return ROLES.PARENT.color;
      case ROLES.STUDENT.code:
        return ROLES.STUDENT.color;
      case ROLES.ADMIN.code:
        return ROLES.ADMIN.color;
      case ROLES.EXPERT.code:
        return ROLES.EXPERT.color;
      default:
        return null;
    }
  }
}
