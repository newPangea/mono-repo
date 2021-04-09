import { AfterViewInit, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as d3 from 'd3';
import { ModalController } from '@ionic/angular';
import { ResourceService } from '@pang/core';
import { ResourceInterface } from '@pang/interface';

@Component({
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss'],
})
export class AddResourceComponent implements AfterViewInit {
  @Input() owner: string;

  completeUpload = 0;
  file: File;
  fileGroup: FormGroup;
  load = false;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private modal: ModalController,
    private render: Renderer2,
    private resourceService: ResourceService,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
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

  ngAfterViewInit(): void {
    this.render.setStyle(this.elementRef.nativeElement, 'height', window.innerHeight + '`px');
  }

  changeFile(fileList: FileList) {
    this.file = fileList.length ? fileList[0] : null;
  }

  async saveFile() {
    this.load = true;
    const { name, isPublic, description, url } = this.fileGroup.value;
    const resource: ResourceInterface = {
      uid: this.db.createId(),
      name,
      public: isPublic,
      owner: this.owner,
      description,
      link: url,
    };
    if (this.file) {
      const data = await this.uploadFile();
      resource.url = data.url;
      resource.ref = data.path;
    }
    await this.resourceService.resourceCollection().doc(resource.uid).set(resource);
    this.load = false;
    this.closeModal();
  }

  uploadFile() {
    const percent = d3.scaleLinear().domain([0, 100]).range([0, 56]);
    const path = `files/${this.owner}/${this.file.name}`;

    const ref = this.storage.ref(path);
    const task = ref.put(this.file);
    task.percentageChanges().subscribe((value) => {
      this.completeUpload = percent(value);
    });
    return task.then((data) => data.ref.getDownloadURL()).then((url) => ({ url, path }));
  }

  closeModal() {
    return this.modal.dismiss();
  }
}
