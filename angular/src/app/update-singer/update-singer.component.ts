import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { SingerService } from '../services/singer.service';
import { Singer } from '../model/singer.model';
import { Router } from '@angular/router';
import { Label } from '../model/label.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-singer',
  templateUrl: './update-singer.component.html',
  styleUrls: ['./update-singer.component.css']
})
export class UpdateSingerComponent implements OnInit {

  currentSinger = new Singer();
  myImage! : string;
  uploadedImage!: File;
  isImageUpdated: Boolean=false;

  labels!: Label[];
  updatedLabelId?: number;

  constructor(private activatedRoute : ActivatedRoute, private singerService : SingerService, private router : Router) { }

  ngOnInit(): void {
    /* this.labels = this.singerService.labelsList(); */
    this.singerService.labelsList().subscribe (labs => {
      this.labels = labs;
      console.log(labs);
    })

    this.singerService.getSingerById(this.activatedRoute.snapshot.params['id']).
    subscribe( singer =>{ this.currentSinger = singer;
    this.updatedLabelId = singer.label.idLabel;
    this.singerService
    .loadImage(this.currentSinger.image.idImage)
    .subscribe((img: Image) => {
    this.myImage = 'data:' + img.type + ';base64,' + img.image;
    });
    } ) ;

  }

  updateSinger() {
    this.currentSinger.label = this.labels.find(label => label.idLabel == this.updatedLabelId)!;
      //tester si l'image du produit a été modifiée
      if (this.isImageUpdated)
      {
        this.singerService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
          .subscribe((img: Image) => {
            this.currentSinger.image = img;
            this.singerService
              .updateSinger(this.currentSinger)
              .subscribe((singer) => {
                this.router.navigate(['singers']);
          });
        });
      }
      else{
        this.singerService
        .updateSinger(this.currentSinger)
        .subscribe((singer) => {
        this.router.navigate(['singers']);
        });
      }

  }

  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated =true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
    }
  }



}
