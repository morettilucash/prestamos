import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrestamosPage } from './prestamos.page';

describe('PrestamosPage', () => {
  let component: PrestamosPage;
  let fixture: ComponentFixture<PrestamosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestamosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrestamosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
