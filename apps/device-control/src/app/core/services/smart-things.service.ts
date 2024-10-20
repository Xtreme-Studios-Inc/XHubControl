import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SmartThingsService {
  private clientId = 'YOUR_CLIENT_ID';
  private redirectUri = 'YOUR_REDIRECT_URI';
  private accessToken: string | null = '951a064e-c1a6-449c-abec-5812ed086b54';

  private deviceID = 'c270f6c6-599d-326f-f5bc-4c58ee380fd5';

  private url = `https://api.smartthings.com/v1/devices/${this.deviceID}/commands`;
  isMuted: any;
  isPlaying: any;

  constructor() {}

  /**
   * Initiates the OAuth2 authentication flow by redirecting
   * the user to the SmartThings authorization URL.
   */
  authenticate() {
    // Build the authorization URL with necessary parameters
    const authUrl = `https://api.smartthings.com/oauth/authorize?response_type=code&client_id=${
      this.clientId
    }&redirect_uri=${encodeURIComponent(this.redirectUri)}`;
    // Redirect the user to the authorization URL
    window.location.href = authUrl;
  }

  /**
   * Handles the redirect back from SmartThings after authentication.
   * It extracts the authorization code from the URL and exchanges it
   * for an access token.
   */
  handleAuthRedirect() {
    // Extract the authorization code from the URL parameters
    const code = this.getParameterByName('code');
    if (code) {
      // Exchange the authorization code for an access token
      this.exchangeCodeForToken(code);
    }
  }

  /**
   * Exchanges the authorization code for an access token by
   * making a POST request to the SmartThings token endpoint.
   * @param code - The authorization code received from SmartThings
   */
  private exchangeCodeForToken(code: string) {
    const tokenUrl = 'https://api.smartthings.com/oauth/token';
    const data = {
      grant_type: 'authorization_code',
      code: code,
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
    };

    // Make a POST request to get the access token
    fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: this.encodeFormData(data),
    })
      .then((response) => response.json())
      .then((tokenData) => {
        // Store the access token for future API calls
        this.accessToken = tokenData.access_token;
      })
      .catch((error) => {
        console.error('Error obtaining access token:', error);
      });
  }

  /**
   * Sends a command to turn the TV on using the SmartThings API.
   */
  async turnOn(): Promise<boolean> {
    if (!this.accessToken) {
      console.error('Access token not available.');
      return false;
    }

    // Replace with your TV's device ID from SmartThings
    // const this.url = `https://api.smartthings.com/v1/devices/${this.deviceID}/commands`;
    // The JSON body of the request to turn the TV on
    const body = {
      commands: [
        {
          component: 'main',
          capability: 'switch',
          command: 'on',
        },
      ],
    };

    // Make a POST request to send the 'on' command
    await fetch(this.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log('TV turned on successfully.');
          return true;
        } else {
          console.error('Error turning on TV:', response.statusText);
          return false;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        return false;
      });

    return false;
  }

  /**
   * Sends a command to turn the TV off using the SmartThings API.
   */
  async turnOff(): Promise<boolean> {
    if (!this.accessToken) {
      console.error('Access token not available.');
      return false;
    }

    // Replace with your TV's device ID from SmartThings
    // const this.url = `https://api.smartthings.com/v1/devices/${this.deviceID}/commands`;
    // The JSON body of the request to turn the TV off
    const body = {
      commands: [
        {
          component: 'main',
          capability: 'switch',
          command: 'off',
        },
      ],
    };

    // Make a POST request to send the 'off' command
    await fetch(this.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log('TV turned off successfully.');
          return true;
        } else {
          console.error('Error turning off TV:', response.statusText);
          return false;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        return false;
      });

    return false;
  }

  /**
   * Sends navigation commands to the TV (up, down, left, right).
   */
  navigate(direction: string) {
    if (!this.accessToken) {
      console.error('Access token not available.');
      return;
    }

    // const this.url = `https://api.smartthings.com/v1/devices/${this.deviceID}/commands`;
    const body = {
      commands: [
        {
          component: 'main',
          capability: 'samsungvd.remoteControl',
          command: 'sendKey',
          arguments: [
            `${direction.charAt(0).toUpperCase() + direction.slice(1)}`,
          ],
        },
      ],
    };

    fetch(this.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log(`Navigated ${direction} successfully.`);
        } else {
          console.error(`Error navigating ${direction}:`, response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /**
   * Sends a command to select the current item.
   */
  select() {
    if (!this.accessToken) {
      console.error('Access token not available.');
      return;
    }

    // const this.url = `https://api.smartthings.com/v1/devices/${this.deviceID}/commands`;
    const body = {
      commands: [
        {
          component: 'main',
          capability: 'samsungvd.remoteControl',
          command: 'sendKey',
          arguments: ['ENTER'],
        },
      ],
    };

    fetch(this.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Item selected successfully.');
        } else {
          console.error('Error selecting item:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /**
   * Sends a command to go back.
   */
  goBack() {
    if (!this.accessToken) {
      console.error('Access token not available.');
      return;
    }

    // const this.url = `https://api.smartthings.com/v1/devices/${this.deviceID}/commands`;
    const body = {
      commands: [
        {
          component: 'main',
          capability: 'samsungvd.remoteControl',
          command: 'sendKey',
          arguments: ['RETURN'],
        },
      ],
    };

    fetch(this.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Navigated back successfully.');
        } else {
          console.error('Error navigating back:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /**
   * Sends a command to go to the home screen.
   */
  async goHome() {
    if (!this.accessToken) {
      console.error('Access token not available.');
      return;
    }

    // const this.url = `https://api.smartthings.com/v1/devices/${this.deviceID}/commands`;
    const body = {
      commands: [
        {
          component: 'main',
          capability: 'irRemoteController',
          command: 'sendButton',
          arguments: ['home'],
        },
      ],
    };

    await fetch(this.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Home screen accessed successfully.');
        } else {
          console.error('Error going to home screen:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /**
   * Sends a command to play or pause media.
   */
  playPause() {
    if (!this.accessToken) {
      console.error('Access token not available.');
      return;
    }

    const key = this.isPlaying ? 'PAUSE' : 'PLAY'; //TODO: Implement isPlaying

    // const command = this.isPlaying ? 'pause' : 'play'; //TODO: Implement isPlaying

    // const this.url = `https://api.smartthings.com/v1/devices/${this.deviceID}/commands`;
    const body = {
      commands: [
        {
          name: 'setPlaybackStatus',
          play: 'playing',
          // pause: 'paused',
          // component: 'main',
          // capability: 'mediaPlayback',
          // command: 'command',
          // command: 'sendKey',
          // arguments: [key],
        },
      ],
    };

    fetch(this.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Media play/pause toggled successfully.');
        } else {
          console.error('Error toggling play/pause:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /**
   * Sends a command to mute or unmute the TV.
   */
  mute() {
    if (!this.accessToken) {
      console.error('Access token not available.');
      return;
    }

    const command = this.isMuted ? 'unmute' : 'mute'; //TODO: Implement isMuted

    // const this.url = `https://api.smartthings.com/v1/devices/${this.deviceID}/commands`;
    const body = {
      commands: [
        {
          component: 'main',
          capability: 'audioMute',
          command: `${command}`,
        },
      ],
    };

    fetch(this.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log('TV muted successfully.');
        } else {
          console.error('Error muting TV:', response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /**
   * Opens an app on the TV.
   * @param appName - The name of the app to open (e.g., Netflix, Disney+).
   */
  openApp(appName: string) {
    if (!this.accessToken) {
      console.error('Access token not available.');
      return;
    }

    // const this.url = `https://api.smartthings.com/v1/devices/${this.deviceID}/commands`;
    const body = {
      commands: [
        {
          component: 'main',
          capability: 'custom',
          command: 'launchApp',
          arguments: [appName],
        },
      ],
    };

    fetch(this.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`${appName} opened successfully.`);
        } else {
          console.error(`Error opening ${appName}:`, response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /**
   * Adds a new app shortcut to the controller UI (dummy implementation).
   */
  addAppShortcut() {
    console.log('Add app shortcut feature coming soon.');
  }

  /**
   * Sends a command to adjust the volume (up or down).
   * @param direction - 'up' to increase volume, 'down' to decrease volume.
   */
  adjustVolume(direction: string) {
    if (!this.accessToken) {
      console.error('Access token not available.');
      return;
    }

    // const this.url = `https://api.smartthings.com/v1/devices/${this.deviceID}/commands`;
    const body = {
      commands: [
        {
          component: 'main',
          capability: 'audioVolume',
          command: direction === 'up' ? 'volumeUp' : 'volumeDown',
        },
      ],
    };

    fetch(this.url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Volume ${direction} successfully.`);
        } else {
          console.error(
            `Error adjusting volume ${direction}:`,
            response.statusText
          );
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /**
   * Helper method to extract query parameters from the URL.
   * @param name - The name of the parameter to retrieve
   * @returns The value of the parameter or null if not found
   */
  private getParameterByName(name: string): string | null {
    const windoUrl = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(windoUrl);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  /**
   * Helper method to URL-encode form data for POST requests.
   * @param data - An object containing key-value pairs
   * @returns A URL-encoded string
   */
  private encodeFormData(data: any): string {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
      )
      .join('&');
  }
}
