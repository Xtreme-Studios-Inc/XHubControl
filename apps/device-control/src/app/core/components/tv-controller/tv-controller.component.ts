import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { SmartThingsService } from '../../services/smart-things.service';

@Component({
  selector: 'app-tv-controller',
  templateUrl: './tv-controller.component.html',
  styleUrls: ['./tv-controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvControllerComponent implements OnInit {
  @Input() TV_STATE: string = 'OFF';
  // TV_STATE: string = 'OFF';

  constructor(
    private smartThingsService: SmartThingsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    console.log(this.TV_STATE);
  }

  /**
   * On component initialization, handle the OAuth2 redirect to check
   * if an authorization code is present in the URL.
   */
  ngOnInit() {
    this.smartThingsService.handleAuthRedirect();
  }

  /**
   * Initiates the authentication process when the user clicks the button.
   */
  authenticate() {
    this.smartThingsService.authenticate();
  }

  /**
   * Calls the service method to turn the TV on.
   */
  turnOn() {
    this.smartThingsService.turnOn().then((res) => {
      // console.log(res);
      // const on = res;
      // if (on) {
      // console.log('TV is on');
      this.TV_STATE = 'ON';
      this.changeDetectorRef.detectChanges();
      // }
    });
  }

  /**
   * Calls the service method to turn the TV off.
   */
  turnOff() {
    this.smartThingsService.turnOff().then((res) => {
      // const off = res;
      // if (off) {
      // console.log('TV is off');
      this.TV_STATE = 'OFF';
      this.changeDetectorRef.detectChanges();
      // }
    });
  }

  /**
   * Calls the service method to navigate up.
   */
  navigateUp() {
    this.smartThingsService.navigate('UP');
  }

  /**
   * Calls the service method to navigate down.
   */
  navigateDown() {
    this.smartThingsService.navigate('DOWN');
  }

  /**
   * Calls the service method to navigate left.
   */
  navigateLeft() {
    this.smartThingsService.navigate('LEFT');
  }

  /**
   * Calls the service method to navigate right.
   */
  navigateRight() {
    this.smartThingsService.navigate('RIGHT');
  }

  /**
   * Calls the service method to select the current item.
   */
  selectItem() {
    this.smartThingsService.select();
  }

  /**
   * Calls the service method to go back.
   */
  goBack() {
    this.smartThingsService.goBack();
  }

  /**
   * Calls the service method to go to the home screen.
   */
  goHome() {
    this.smartThingsService.goHome();
  }

  /**
   * Calls the service method to play or pause media.
   */
  playPause() {
    this.smartThingsService.playPause();
  }

  /**
   * Calls the service method to increase the volume.
   */
  volumeUp() {
    this.smartThingsService.adjustVolume('up');
  }

  /**
   * Calls the service method to decrease the volume.
   */
  volumeDown() {
    this.smartThingsService.adjustVolume('down');
  }

  /**
   * Calls the service method to mute or unmute the TV.
   */
  mute() {
    this.smartThingsService.mute();
  }

  /**
   * Opens the Netflix app.
   */
  openNetflix() {
    this.smartThingsService.openApp('Netflix');
  }

  /**
   * Opens the Disney+ app.
   */
  openDisneyPlus() {
    this.smartThingsService.openApp('Disney+');
  }

  /**
   * Adds a new app shortcut.
   */
  addAppShortcut() {
    this.smartThingsService.addAppShortcut();
  }
}
