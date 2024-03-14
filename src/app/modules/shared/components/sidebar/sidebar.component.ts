import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/modules/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  activeTag: string = '';

  constructor(private gifsServices: GifsService) {
  }

  ngOnInit() {
  }

  get tags() {
    return this.gifsServices.tagsHistory;
  }

  buscarGif(tag: string) {
    this.gifsServices.searchTag(tag);
  }

  isActive(tag: string): boolean {
    return tag === this.gifsServices.activeTag;
  }



}
