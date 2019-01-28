import { browser, by, element } from 'protractor';

export class DashboardPage {

  navigateToDashboard() {
    return browser.get('/dashboard');
  }

  getDashboardComponent() {
    return element(by.tagName('moio-dashboard')).getTagName();
  }

  getConfirmComponent() {
    return element(by.tagName('moio-confirm')).getTagName();
  }

  getUsersComponent() {
    return element(by.tagName('moio-users-page')).getTagName();
  }

  getPatientsComponent() {
    return element(by.tagName('moio-patients-page')).getTagName();
  }

  get dashboard() {
    return element(by.tagName('moio-dashboard'));
  }

  get confirmDialog() {
    return element(by.id('cdk-overlay-1'));
  }

  getConfirmMessage() {
    return element(by.tagName('moio-confirm h1')).getText();
  }

  usersComponentLink() {
    return element(by.css('[href="/dashboard/users"]')).click();
  }

  patientsComponentLink() {
    return element(by.css('[href="/dashboard/patients"]')).click();
  }

  clickLogoutButton() {
    return element(by.name('logout-button')).click();
  }

  confirmLogout() {
    return element(by.name('confirm-button')).click();
  }

  logout() {
    return element(by.css('ion-alert button.logout-ok')).click();
  }

}
