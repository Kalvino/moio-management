import { LoginPage } from './login.po';
import { browser, by, element, protractor, until } from 'protractor';

describe('Login', () => {

  let page: LoginPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new LoginPage();
  });

  it('can input data and is valid', () => {
    page.navigateTo();
    page.inputUsername('admin');
    const uname = page.getUsernameInput().getAttribute('value');
    expect(uname).toEqual('admin');

    page.inputPassword('admin');
    const pw = page.getPasswordInput().getAttribute('value');
    expect(pw).toEqual('admin');

    const form = page.getForm().getAttribute('class');
    expect(form).toContain('ng-valid');
  });

  it('should be invalid form with no input', () => {
    page.navigateTo();
    page.inputPassword('');
    page.inputUsername('');

    const classes = page.getForm().getAttribute('class');

    expect(classes).toContain('ng-invalid');
  });

});
