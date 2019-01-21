import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('login');
  }

  getTagName() {
    return element(by.tagName('moio-login-page')).getTagName();
  }

  inputUsername(name) {
    return element(by.id('mat-input-0')).sendKeys(name);
  }

  inputPassword(pass) {
    return element(by.id('mat-input-1')).sendKeys(pass);
  }

  getUsernameInput() {
    return element(by.id('username'));
  }

  getPasswordInput() {
    return element(by.id('password'));
  }

  login() {
    this.inputUsername('admin');
    this.inputPassword('admin');

    return element(by.className('mat-raised-button')).click();
  }

  getForm() {
    return element(by.id('loginForm'));
  }
}
