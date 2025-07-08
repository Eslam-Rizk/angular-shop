import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject } from 'rxjs';
import { GitHubUser } from '../user.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let currentUserSubject: BehaviorSubject<GitHubUser | null>;

  const mockUser: GitHubUser = {
    login: 'testuser',
    id: 123,
    node_id: 'node123',
    avatar_url: 'https://example.com/avatar.jpg',
    gravatar_id: '',
    url: 'https://api.github.com/users/testuser',
    html_url: 'https://github.com/testuser',
    followers_url: '',
    following_url: '',
    gists_url: '',
    starred_url: '',
    subscriptions_url: '',
    organizations_url: '',
    repos_url: '',
    events_url: '',
    received_events_url: '',
    type: 'User',
    site_admin: false,
    name: 'Test User',
    company: null,
    blog: null,
    location: null,
    email: 'test@example.com',
    hireable: true,
    bio: null,
    twitter_username: null,
    public_repos: 10,
    public_gists: 5,
    followers: 20,
    following: 15,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  };

  beforeEach(async () => {
    currentUserSubject = new BehaviorSubject<GitHubUser | null>(mockUser);
    userServiceSpy = jasmine.createSpyObj('UserService', ['clearUserData'], {
      currentUser$: currentUserSubject.asObservable()
    });
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout', 'isAuthenticated']);
    authServiceSpy.isAuthenticated.and.returnValue(true); // Mock isAuthenticated

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent], // Declare the component
      imports: [RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user data if available', () => {
    component.user = mockUser;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Test User');
    expect(compiled.querySelector('p')?.textContent).toContain('test@example.com');
    expect(compiled.querySelector('img')?.getAttribute('src')).toBe(mockUser.avatar_url);
  });

  it('should call logout and clear user data on logout click', () => {
    component.handleLogoutClick();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(userServiceSpy.clearUserData).toHaveBeenCalled();
  });
});
