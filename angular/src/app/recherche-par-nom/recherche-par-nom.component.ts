import { Component, OnInit } from '@angular/core';
import { Singer } from '../model/singer.model';
import { SingerService } from '../services/singer.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent implements OnInit {

  singers!: Singer[];
  allSingers!: Singer[];
  searchTerm!: string;

  constructor(private singerService : SingerService) { }

  ngOnInit(): void {
    this.singerService.singersList().subscribe(data => {
      this.allSingers = data;
    });
  }

  onKeyUp(filterText : string) {
    this.singers = this.allSingers.filter(singer => singer.name.toLowerCase().includes(filterText.toLowerCase()));
  }

}
