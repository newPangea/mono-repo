import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModalController } from '@ionic/angular';

@Component({
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss'],
})
export class AddResourceComponent implements AfterViewInit {
  fileGroup: FormGroup;
  load = false;
  file: File;

  constructor(
    private modal: ModalController,
    private elementRef: ElementRef<HTMLElement>,
    private render: Renderer2,
    builder: FormBuilder,
  ) {
    this.fileGroup = builder.group({
      name: ['', Validators.required],
      url: [''],
      description: [],
      isPublic: [true],
      file: [],
    });
  }

  changeFile(fileList: FileList) {
    this.file = fileList.length ? fileList[0] : null;
  }

  saveFile() {
    console.log(this.fileGroup.value);
  }

  ngAfterViewInit(): void {
    this.render.setStyle(this.elementRef.nativeElement, 'height', window.innerHeight + '`px');
  }

  closeModal() {
    return this.modal.dismiss();
  }
}
