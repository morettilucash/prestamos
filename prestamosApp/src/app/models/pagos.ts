import { Prestamos } from './prestamos';

export class Pagos {

    id: number;
    monto: string;
    vencimiento: Date;
    nro_cuota: number;
    prestamoId: Prestamos;
}