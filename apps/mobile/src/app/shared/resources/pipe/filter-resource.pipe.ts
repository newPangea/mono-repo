import { Pipe, PipeTransform } from '@angular/core';
import { ResourceInterface, UserAlgolia } from '@pang/interface';

@Pipe({
  name: 'filterResource',
})
export class FilterResourcePipe implements PipeTransform {
  transform(
    resource: ResourceInterface[],
    users: { [key: string]: UserAlgolia },
    text: string,
  ): ResourceInterface[] {
    return !!text
      ? resource.filter((item) => {
          const txtFilter = text.toLowerCase();
          return (
            item.name.toLowerCase().includes(txtFilter) ||
            users[item.uploadBy]?.name.toLowerCase().includes(txtFilter)
          );
        })
      : resource;
  }
}
