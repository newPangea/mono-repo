import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { Plugins } from '@capacitor/core';

import { ResourceOptions } from '../../constants/resource-options';

const { Modals } = Plugins;

@Component({
  templateUrl: './option-resource.component.html',
  styleUrls: ['./option-resource.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionResourceComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<OptionResourceComponent>) {}

  async delete() {
    const modal = await Modals.confirm({
      title: 'Delete resource',
      message: 'Are you sure to delete the resource?',
    });
    this.bottomSheetRef.dismiss({
      type: ResourceOptions.DELETE,
      value: modal.value,
    });
  }
}
