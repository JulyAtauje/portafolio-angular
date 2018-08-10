import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  /* Para poner fecha actualizada */
  anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
