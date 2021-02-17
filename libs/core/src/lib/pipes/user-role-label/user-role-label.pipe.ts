import { Pipe, PipeTransform } from '@angular/core';
import { ROLES } from '@pang/const';

@Pipe({
  name: 'userRoleLabel',
})
export class UserRoleLabelPipe implements PipeTransform {
  transform(schoolCode: string): string {
    const code = (schoolCode || '').charAt(0);
    switch (code) {
      case ROLES.TEACHER.code:
        return ROLES.TEACHER.label;
      case ROLES.PARENT.code:
        return ROLES.PARENT.label;
      case ROLES.STUDENT.code:
        return ROLES.STUDENT.label;
      case ROLES.ADMIN.code:
        return ROLES.ADMIN.label;
      case ROLES.EXPERT.code:
        return ROLES.EXPERT.label;
      default:
        return null;
    }
  }
}
