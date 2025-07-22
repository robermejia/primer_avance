import { Component, signal } from '@angular/core';
import { Toolbar } from './toolbar/toolbar';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [Toolbar, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('primer_avance');
}
