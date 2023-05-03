import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component = new AppComponent();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('show alert messgae', () => {
    // expect(component.showMessage('hello')).toBe('hello');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.showMessage('hello')).toBe('hello');
  });

  it('AAA', () => {
    // Arrange
    let comp = new AppComponent();

    //  Act
    let msg = comp.showMessage('hello');

    // Assert
    expect(msg).toBe('hello');
  });

  xit('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'unit-test app is running!'
    );
  });

  it(`should have as title 'unit-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('unit-test');
  });

  it(`toBe and toEqual`, () => {
    // we use toBe for primitives like strinf, number or boolean, for everything else use toEqual

    // The toBe() Jasmine matcher is basically the === operator (equal value and equal type).Therefore, the expectation

    let a = ['1'];
    let b = ['1'];
    let x = 1;
    let y = 1;

    expect(a).toEqual(b);
    expect(x).toBe(y);

    // expect(a).toBe(b);
    // // can also be written as
    // expect(a === b).toBe(true);
  });

  it('component should render "Welcome to My App" in h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to My App'
    );
  });
});
