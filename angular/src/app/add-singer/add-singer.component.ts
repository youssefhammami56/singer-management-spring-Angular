import { Component, OnInit } from '@angular/core';
import { Singer } from '../model/singer.model';
import { SingerService } from '../services/singer.service';
import { Router } from '@angular/router';
import { Label } from '../model/label.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-singer',
  templateUrl: './add-singer.component.html',
  styleUrls: ['./add-singer.component.css']
})
export class AddSingerComponent implements OnInit {

  newSinger = new Singer();

  labels!: Label[];
  newLabelId!: number;
  newLabel!: Label;
  uploadedImage!: File;
  imagePath: any;

  constructor(private singerService: SingerService, private router : Router) {}

  ngOnInit(): void {
    /* this.labels = this.singerService.labelsList(); */
    this.singerService.labelsList().subscribe (data => {
      this.labels = data;
      console.log(data);
      console.log(this.newLabelId);
    })
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }


  addSinger() {
    this.singerService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.newSinger.image=img;
          this.newSinger.label = this.labels.find(label => label.idLabel == this.newLabelId)!;
          this.singerService
            .addSinger(this.newSinger)
              .subscribe(() => {
                this.router.navigate(['singers']);
              });
    });
  }

}
