import { Component, OnInit } from '@angular/core';
import { Singer } from '../model/singer.model';
import { Label } from '../model/label.model';
import { SingerService } from '../services/singer.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-search-by-label',
  templateUrl: './search-by-label.component.html',
  styleUrls: ['./search-by-label.component.css']
})
export class SearchByLabelComponent implements OnInit {

  singers: Singer[] = [];
  idLabel!: number;
  labels: Label[] = [];
  singer!: Singer;
  constructor(private singerService : SingerService, public authService : AuthService) { }

  ngOnInit(): void {
    this.singerService.labelsList().subscribe (labs => {
      this.labels = labs;
      console.log (this.labels)
      this.singerService.singersList().subscribe (albs => {
        this.singers = albs;
      })
    })
  }

  onChange() {
    console.log (this.idLabel);
    this.singerService.rechrcheParLabel(this.idLabel).subscribe (albs => {
      console.log(albs);
      this.singers = albs;
      console.log(this.singers);
    })
  }

}
