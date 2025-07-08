import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthService } from './auth.service'; // Import AuthService
import { UserService } from './user.service'; // Import UserService
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    // Mock AuthService and UserService
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    authServiceSpy.isAuthenticated.and.returnValue(true); // Default to authenticated for tests
    const userServiceSpy = jasmine.createSpyObj('UserService', [], { currentUser$: of(null) }); // Mock currentUser$

    await TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent, FooterComponent], // Declare all components
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'shop' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('shop');
  });

  // The original test for rendering title expects an h1 directly in app.component.html
  // which is no longer the case with router-outlet. This test is removed.
});
