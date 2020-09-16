import { browser, by, element } from 'protractor';

export class SigninPage {
  navigateToSigninPage() {
    return browser.get('auth/signin');
  }

  getSigninTagName() {
    return element(by.tagName('moio-signin')).getTagName();
  }

  get signInComponent() {
    return element(by.tagName('moio-signin'));
  }

  getUsernameInput() {
    return element(by.name('username'));
  }

  getPasswordInput() {
    return element(by.name('password'));
  }

  inputUsername(name) {
    return element(by.name('username')).sendKeys(name);
  }

  inputPassword(pass) {
    return element(by.name('password')).sendKeys(pass);
  }

  login() {
    this.inputUsername('admin');
    this.inputPassword('admin');

    return element(by.className('mat-raised-button')).click();
  }

  getForm() {
    return element(by.tagName('form'));
  }
}
