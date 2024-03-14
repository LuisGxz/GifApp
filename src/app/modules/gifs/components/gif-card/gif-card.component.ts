import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gif-card',
  templateUrl: './gif-card.component.html',
  styleUrls: ['./gif-card.component.scss']
})
export class GifCardComponent {

  @Input()
  public gif!: Gif;

  copyLinkToClipboard() {
    const link = this.gif.images.downsized_medium.url;

    navigator.clipboard.writeText(link)
      .then(() => {
        this.showSuccessToast('Link copied to clipboard!');
      })
  }

  private showSuccessToast(message: string) {
    const successToast = document.getElementById('successToast');
    const successToastMessage = document.getElementById('successToastMessage');

    if (successToast && successToastMessage) {
      successToastMessage.innerText = message;
      successToast.classList.add('show');
      setTimeout(() => {
        successToast.classList.remove('show');
      }, 3000);
    }
  }
}
