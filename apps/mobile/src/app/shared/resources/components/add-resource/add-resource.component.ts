import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as d3 from 'd3';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

import { ResourceInterface } from '@pang/interface';
import { ResourceService } from '@pang/core';
import { ResourceType } from '@pang/const';

const { Keyboard, Device, Modals } = Plugins;

@Component({
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss'],
})
export class AddResourceComponent implements AfterViewInit, OnInit {
  @Input() owner: string;

  completeUpload = 0;
  file: File;
  fileGroup: FormGroup;
  load = false;
  resourceTypes = ResourceType;
  resourceType: ResourceType = ResourceType.FILE;

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

  ngOnInit(): void {
    Device.getInfo().then((data) => {
      if (data.platform !== 'web') {
        Keyboard.addListener('keyboardDidShow', () => {
          document.activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        Keyboard.setAccessoryBarVisible({ isVisible: true });
      }
    });
  }

  ngAfterViewInit(): void {
    this.render.setStyle(this.elementRef.nativeElement, 'height', window.innerHeight + '`px');
  }

  changeFile(fileList: FileList) {
    this.file = fileList.length ? fileList[0] : null;
  }

  async saveFile() {
    try {
      this.load = true;
      const { name, isPublic, description, url } = this.fileGroup.value;
      const resource: ResourceInterface = {
        uid: this.db.createId(),
        name,
        public: isPublic,
        owner: this.owner,
        uploadBy: this.owner,
        description,
        link: url,
        type: this.resourceType,
        createAt: new Date(),
        updateAt: new Date(),
      };
      if (this.file) {
        const data = await this.uploadFile();
        resource.url = data.url;
        resource.ref = data.path;
      }
      await this.resourceService.resourceCollection().doc(resource.uid).set(resource);
      this.load = false;
      this.closeModal();
    } catch (e) {
      this.load = false;
      console.log(e);
      Modals.alert({
        title: 'Error',
        message: 'We had an error, please try again',
      }).then();
    }
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

  get acceptType() {
    switch (this.resourceType) {
      case ResourceType.IMAGE:
        return 'image/*';
      case ResourceType.FILE:
        return '.pdf,.docx,.xlsx,.ppt';
      default:
        return '';
    }
  }
}
