import { Prestamos } from './prestamos';

export class Pagos {

    id?: number;
    monto?: number;
    fecha_hora?: Date;
    nro_cuota?: number;
    // prestamoId?: Prestamos;
    prestamoId?: number;

}