import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginPage } from './login.page';
import { DatosService } from '../datos.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockDatosService: jasmine.SpyObj<DatosService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockNavController: jasmine.SpyObj<NavController>;

  beforeEach(async () => {
    mockDatosService = jasmine.createSpyObj('DatosService', ['login', 'getUserRole']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockNavController = jasmine.createSpyObj('NavController', ['navigateForward']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DatosService, useValue: mockDatosService },
        { provide: Router, useValue: mockRouter },
        { provide: NavController, useValue: mockNavController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia mostrar alerta de error si el usuario esta vacio', () => {
    spyOn(component, 'alertaErrorUser');
    component.login.usuario = '';
    component.ingresar();
    expect(component.alertaErrorUser).toHaveBeenCalled();
  });

  it('deberia mostrar alerta de error si la contraseña esta vacia', () => {
    spyOn(component, 'alertaErrorPass');
    component.login.usuario = 'ian';
    component.login.password = '';
    component.ingresar();
    expect(component.alertaErrorPass).toHaveBeenCalled();
  });

  it('deberia navegar a la ruta correcta si el login es exitoso', () => {
    const mockResponse = [{ password: '1111', token: '1111', rol: 'Conductor' }];
    mockDatosService.login.and.returnValue(of(mockResponse));

    component.login.usuario = 'ignacio';
    component.login.password = '1111';
    component.ingresar();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/administrar-viaje']);
  });

  it('deberia mostrar alerta de error si el login falla', () => {
    spyOn(component, 'alertaErrorLogin');
    mockDatosService.login.and.returnValue(of([]));

    component.login.usuario = 'javier';
    component.login.password = 'silva';
    component.ingresar();

    expect(component.alertaErrorLogin).toHaveBeenCalled();
  });

  it('deberia manejar el error de login', () => {
    spyOn(component, 'alertaErrorLogin');
    mockDatosService.login.and.returnValue(throwError('error'));

    component.login.usuario = 'javier';
    component.login.password = 'silva';
    component.ingresar();

    expect(component.alertaErrorLogin).toHaveBeenCalled();
  });

  it('deberia navegar segun el rol del usuario', () => {
    mockDatosService.getUserRole.and.returnValue('Pasajero');
    component.validarRol();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home/ruta']);
  });

  it('deberia filtrar caracteres no numericos de la contraseña', () => {
    const event = { target: { value: 'abc123' } };
    component.valNumPass(event);
    expect(component.login.password).toBe('123');
  });
});
