import { Component, OnInit } from '@angular/core';
import { Singer } from '../model/singer.model';
import { SingerService } from '../services/singer.service';
import { AuthService } from '../services/auth.service';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-singers',
  templateUrl: './singers.component.html',
  styleUrls: ['./singers.component.css']
})
export class SingersComponent implements OnInit {

  singers : Singer[] = [];

  constructor(private singerService: SingerService, public authService : AuthService) {}

  deleteSinger(singer: Singer) {
    let conf = confirm("Are you sure you want to delete this singer?");
    if (conf) {
      this.singerService.deleteSinger(singer.idSinger).subscribe( data => {
        console.log("Singer deleted");
        this.loadSingers();
      });
    }
  }

  loadSingers() {
    this.singerService.singersList().subscribe(singers => {
      this.singers = singers;
        this.singers.forEach((prod) => {
        this.singerService
          .loadImage(prod.image.idImage)
          .subscribe((img: Image) => {
            prod.imageStr = 'data:' + img.type + ';base64,' + img.image;
        });
      });
    });
  }


  ngOnInit(): void {
    this.loadSingers();
  }

}
