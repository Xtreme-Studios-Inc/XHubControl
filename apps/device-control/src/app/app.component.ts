import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SmartThingsModule } from './core/smart-things.module';

const IMPORTS = [SmartThingsModule];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ...IMPORTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'DeviceControl';
}
