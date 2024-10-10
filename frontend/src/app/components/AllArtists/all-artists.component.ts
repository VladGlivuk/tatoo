import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//constants
import { SUCCESS } from 'src/app/core/constants';
//functions
import { getFilteredPagination, getPaginationValuesFromPage } from 'src/app/core/functions';
//services
import { ArtistService } from 'src/app/services/Artist/artist.service';
//types
import { Artist, PaginationValues } from 'src/app/core/types';

@Component({
  selector: 'all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.scss'],
})
export class AllArtistsComponent implements OnInit {
  allArtists: Array<Artist>;
  currentPage: number = 1;
  pages: Array<number> = [];
  filteredPages: Array<number> = [];
  isError: boolean = false;
  errorCode: number = 500;

  sendCurrentPage(data: number) {
    this.currentPage = data;
  }

  scrollToTop = (el: HTMLElement) => {
    el.scrollIntoView();
  };

  constructor(private artistsService: ArtistService, private route: ActivatedRoute) {}

  getArtistsHelper = () => {
    const paginationValues: PaginationValues = getPaginationValuesFromPage(this.currentPage, 9);
    this.getArtists(paginationValues.offset, paginationValues.limit);
  };

  public getArtists(offset: number, limit: number): void {
    this.artistsService.getAllArtists(offset, limit).subscribe((artistsResponse) => {
      if (artistsResponse.status === SUCCESS) {
        this.allArtists = artistsResponse.data;

        if (artistsResponse.detail) this.pages = artistsResponse.detail.pages;
        this.filteredPages = getFilteredPagination(this.pages, this.currentPage);
      } else {
        this.isError = true;
        this.errorCode = artistsResponse.status_code || 500;
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = params.page ? params.page : 1;
    });

    const paginationValues: PaginationValues = getPaginationValuesFromPage(this.currentPage, 9);

    this.artistsService.getAllArtists(paginationValues.offset, paginationValues.limit).subscribe((artistsResponse) => {
      if (artistsResponse.status === SUCCESS) {
        this.allArtists = artistsResponse.data;
        if (artistsResponse.detail) this.pages = artistsResponse.detail.pages;
        this.filteredPages = getFilteredPagination(this.pages, this.currentPage);
      } else {
        this.isError = true;
        this.errorCode = artistsResponse.status_code || 500;
      }
    });
  }

  ngOnDestroy(): void {
    this.isError = false;
  }
}
