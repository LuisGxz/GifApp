import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';


const GIPHY_API_KEY = "pH6UBgJK3Bcv5OucZjCgdEfG6Q48w32N";
const SERVICE_URL = "https://api.giphy.com/v1/gifs/search";

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: string[] = [];
  private _gifs: Gif[] = [];
  activeTag: string = '';

  constructor(private http: HttpClient) {

    this.loadLocalStorage();
    this.searchTag(this.activeTag);
    console.log('Gif services Ready')
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  get gifs() {
    return [...this._gifs];
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    localStorage.setItem('activeTag', JSON.stringify(this.activeTag));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history') && !localStorage.getItem('activeTag')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    this.activeTag = JSON.parse(localStorage.getItem('activeTag')!);
  }

  searchTag(tag: string): void {
    tag = tag.trim();
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', '20')
      .set('q', tag)

    this.http.get<SearchResponse>(SERVICE_URL, { params })
      .subscribe(resp => {
        this._gifs = resp.data;
      })


  }
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.activeTag = tag;
    this.saveLocalStorage();
  }

}
