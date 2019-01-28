import { SigninPage } from './signin.po';
import { DashboardPage } from './dashboard.po';
import { browser, by, element, protractor, until } from 'protractor';

describe('Signin', () => {

  let signinPage: SigninPage;
  let dashboardPage: DashboardPage;

  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    signinPage = new SigninPage();
    dashboardPage = new DashboardPage;
  });

  it('should have signin component loaded', () => {
    signinPage.navigateToSigninPage();
    expect(signinPage.getSigninTagName()).toEqual('moio-signin');
  });  

  it('can input data and is valid', () => {
    signinPage.navigateToSigninPage();

    signinPage.inputUsername('admin');
    const uname = signinPage.getUsernameInput().getAttribute('value');
    expect(uname).toEqual('admin');

    signinPage.inputPassword('admin');
    const pw = signinPage.getPasswordInput().getAttribute('value');
    expect(pw).toEqual('admin');

    const formClasses = signinPage.getForm().getAttribute('class');
    expect(formClasses).toContain('ng-valid');
  });

  it('should be invalid form with no input', () => {
    signinPage.navigateToSigninPage();
    signinPage.inputPassword('');
    signinPage.inputUsername('');

    const formClasses = signinPage.getForm().getAttribute('class');
    expect(formClasses).toContain('ng-invalid');
  });

  it('should successfully login', (done) => {
    signinPage.login();

    browser.waitForAngularEnabled(false);
    browser.wait(EC.visibilityOf(dashboardPage.dashboard));

    expect(dashboardPage.getDashboardComponent())
      .toEqual('moio-dashboard');
    done();
  });

  it('should load users component', (done) => {
    dashboardPage.usersComponentLink();
    expect(dashboardPage.getUsersComponent()).toEqual('moio-users-page');
    done();
  });

  it('should load patients component', (done) => {
    dashboardPage.patientsComponentLink();
    expect(dashboardPage.getPatientsComponent()).toEqual('moio-patients-page');
    done();
  });

  it('should successfully logout', (done) => {
    dashboardPage.clickLogoutButton();
    browser.wait(EC.visibilityOf(dashboardPage.confirmDialog));
    expect(dashboardPage.getConfirmComponent()).toEqual('moio-confirm');

    dashboardPage.confirmLogout();

    browser.wait(EC.visibilityOf(signinPage.signInComponent));

    expect(signinPage.getSigninTagName())
      .toEqual('moio-signin');

    done();
  });


});
