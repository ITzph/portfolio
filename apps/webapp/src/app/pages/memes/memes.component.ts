import { Component, OnInit } from '@angular/core';
import { MemesService } from './memes.service';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'portfolio-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss'],
})
export class MemesComponent implements OnInit {
  imageObj: File;
  memeForm = this.fb.group({
    title: 'Default Title',
    description: 'Default  Description',
  });

  ngOnInit(): void {}

  constructor(private readonly memesService: MemesService, private readonly fb: FormBuilder) {}

  onImagePicked(event: Event): void {
    const FILE = (event.target as HTMLInputElement).files[0];
    this.imageObj = FILE;
  }

  get memes$() {
    return this.memesService.getMemes$();
  }

  onDeleteMeme(meme: IImageMetadata) {
    this.memesService.deleteMeme(meme);
  }

  onImageUpload() {
    const imageForm = new FormData();
    imageForm.append('image', this.imageObj);
    imageForm.append('caption', this.memeForm.value.description);
    imageForm.append('title', this.memeForm.value.title);
    this.memesService.imageUpload(imageForm).subscribe((res) => {
      this.memesService.addMeme(res);
    });
  }
}
