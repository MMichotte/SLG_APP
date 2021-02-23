import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EUserRoles } from 'src/app/shared/models/user.model';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('logging in a user', () => {
    it('should return a JWT token', () => {
      const dummyToken: any = {
        token: 'azerty123456'
      };

      const dummyUserCredentials = {
        email: 'toto@gmail.com',
        password: '1234'
      };

      service.loginUser(dummyUserCredentials).subscribe(token => {
        expect(token).toEqual(dummyToken);
      });

      const req = httpMock.expectOne('/api/login');
      expect(req.request.method).toBe('POST');
      req.flush(dummyToken);

    }); 

  });

  describe('hasMinAccess of dev user', () => {
    beforeEach(() => {
      service.roleAs = EUserRoles.DEV;
    });
    
    it('minimal access: dev', () => {
      expect(service.hasMinAccess(EUserRoles.DEV)).toBeTrue();
    });

    it('minimal access: admin', () => {
      expect(service.hasMinAccess(EUserRoles.ADMIN)).toBeTrue();
    });

    it('minimal access: user', () => {
      expect(service.hasMinAccess(EUserRoles.USER)).toBeTrue();
    });

    it('minimal acces: accounting', () => {
      expect(service.hasMinAccess(EUserRoles.ACCOUNTING)).toBeTrue();
    });

  }); 

  describe('hasMinAccess of admin user', () => {
    beforeEach(() => {
      service.roleAs = EUserRoles.ADMIN;
    });
    
    it('minimal access: dev', () => {
      expect(service.hasMinAccess(EUserRoles.DEV)).toBeFalse();
    });

    it('minimal access: admin', () => {
      expect(service.hasMinAccess(EUserRoles.ADMIN)).toBeTrue();
    });

    it('minimal access: user', () => {
      expect(service.hasMinAccess(EUserRoles.USER)).toBeTrue();
    });

    it('minimal acces: accounting', () => {
      expect(service.hasMinAccess(EUserRoles.ACCOUNTING)).toBeTrue();
    });

  }); 

  describe('hasMinAccess of user user', () => {
    beforeEach(() => {
      service.roleAs = EUserRoles.USER;
    });
    
    it('minimal access: dev', () => {
      expect(service.hasMinAccess(EUserRoles.DEV)).toBeFalse();
    });

    it('minimal access: admin', () => {
      expect(service.hasMinAccess(EUserRoles.ADMIN)).toBeFalse();
    });

    it('minimal access: user', () => {
      expect(service.hasMinAccess(EUserRoles.USER)).toBeTrue();
    });

    it('minimal acces: accounting', () => {
      expect(service.hasMinAccess(EUserRoles.ACCOUNTING)).toBeTrue();
    });

  });  
  
  describe('hasMinAccess of accounting user', () => {
    beforeEach(() => {
      service.roleAs = EUserRoles.ACCOUNTING;
    });
    
    it('minimal access: dev', () => {
      expect(service.hasMinAccess(EUserRoles.DEV)).toBeFalse();
    });

    it('minimal access: admin', () => {
      expect(service.hasMinAccess(EUserRoles.ADMIN)).toBeFalse();
    });

    it('minimal access: user', () => {
      expect(service.hasMinAccess(EUserRoles.USER)).toBeFalse();
    });

    it('minimal acces: accounting', () => {
      expect(service.hasMinAccess(EUserRoles.ACCOUNTING)).toBeTrue();
    });

  });  

  describe('hasMinAccess of unregistered user', () => {
    beforeEach(() => {
      service.roleAs = '';
    });
    
    it('minimal access: dev', () => {
      expect(service.hasMinAccess(EUserRoles.DEV)).toBeFalse();
    });

    it('minimal access: admin', () => {
      expect(service.hasMinAccess(EUserRoles.ADMIN)).toBeFalse();
    });

    it('minimal access: user', () => {
      expect(service.hasMinAccess(EUserRoles.USER)).toBeFalse();
    });

    it('minimal acces: accounting', () => {
      expect(service.hasMinAccess(EUserRoles.ACCOUNTING)).toBeFalse();
    });

  });  
  
});
