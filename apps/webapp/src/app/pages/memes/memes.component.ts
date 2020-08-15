import { Component, OnInit } from '@angular/core';
import { MemesService } from './memes.service';
import { IImageMetadata } from '@portfolio/api-interfaces';

@Component({
  selector: 'portfolio-memes',
  templateUrl: './memes.component.html',
  styleUrls: ['./memes.component.scss'],
})
export class MemesComponent implements OnInit {
  imageObj: File;
  description = 'sample caption';
  title = 'sample title';

  ngOnInit(): void {}

  constructor(private readonly memesService: MemesService) {}

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
    imageForm.append('caption', this.description);
    imageForm.append('title', this.title);
    this.memesService.imageUpload(imageForm).subscribe((res) => {
      this.memesService.addMeme(res);
    });
  }
}
