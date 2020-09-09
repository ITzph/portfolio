import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IImageMetadata } from '@portfolio/api-interfaces';
import { MemesService } from '../memes.service';
import { MatDialog } from '@angular/material/dialog';
import { BinaryConfirmationComponent } from '../../../modules/custom-dialog/binary-confirmation/binary-confirmation.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'portfolio-meme-detail',
  templateUrl: './meme-detail.component.html',
  styleUrls: ['./meme-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemeDetailComponent implements OnInit {
  @Input()
  meme: IImageMetadata;

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}

  get isLoggedIn$() {
    return this.authService.isLoggedIn$();
  }
}
