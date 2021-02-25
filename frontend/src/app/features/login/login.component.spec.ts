import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [LoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form is invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });
  
  describe('email field', () => {

    it('is invalid when empty', () => {
      expect(component.loginForm.controls.email.valid).toBeFalsy();
    });
    
    it('is invalid when it doesn\'t contain an email address', () => {
      const emailField = component.loginForm.controls.email;
      emailField.setValue('toto.tate.com');
      expect(component.loginForm.controls.email.valid).toBeFalsy();
    });
    
    it('is valid when it contains an email address', () => {
      const emailField = component.loginForm.controls.email;
      emailField.setValue('toto.tate@gmail.com');
      expect(component.loginForm.controls.email.valid).toBeTruthy();
    });

  });

  describe('password field', () => {

    it('is invalid when empty', () => {
      expect(component.loginForm.controls.email.valid).toBeFalsy();
    });
    
    it('is valid when not empty', () => {
      const pwdField = component.loginForm.controls.password;
      pwdField.setValue('1234');
      expect(component.loginForm.controls.password.valid).toBeTruthy();
    });

  });

});
