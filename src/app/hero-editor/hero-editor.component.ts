import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-editor',
  templateUrl: './hero-editor.component.html',
  styleUrls: ['./hero-editor.component.css']
})
export class HeroEditorComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };


  constructor() { }

  ngOnInit(): void {
  }

}
