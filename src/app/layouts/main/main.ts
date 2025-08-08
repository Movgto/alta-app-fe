import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, Header],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {

}
