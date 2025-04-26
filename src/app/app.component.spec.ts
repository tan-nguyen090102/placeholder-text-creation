import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent)
      component = fixture.componentInstance
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'placeholder-text-creation' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('placeholder-text-creation');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Random Paragraph Generator');
  });

  it('should render input field', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')).toBeTruthy()
  })

  it('should render "Generate" button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toEqual('Generate')
  })

  it('should call the onGenerateParagraph function when all valid', fakeAsync(() => {
    spyOn(component, 'onGenerateParagraph')
    
    const inputField = fixture.debugElement.query(By.css('#numParagraphInput')).nativeElement
    const button = fixture.debugElement.nativeElement.querySelector('button')

    inputField.value = "1"
    button?.click()
    tick();

    expect(component.onGenerateParagraph).toHaveBeenCalled()
  }));
});