import { Prestamos } from './prestamos';

export class Pagos {

    id?: number;
    monto?: number;
    vencimiento?: Date;
    nro_cuota?: number;
    // prestamoId?: Prestamos;
    prestamoId?: number;

}