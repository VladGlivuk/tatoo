import { Component, Input, OnInit } from '@angular/core';
//types
import { Artist } from 'src/app/core/types';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  @Input() artist: Artist;
  artistDefaultImage: string = '../../../../assets/images/artist-default.png';

  constructor() {}

  ngOnInit(): void {}
}
