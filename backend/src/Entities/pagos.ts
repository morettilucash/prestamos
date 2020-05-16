import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Prestamos } from "./prestamos";


@Entity('pagos')
export class Pagos extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'varchar', length: 40, nullable: true })
    monto: string;

    @Column({ type: 'timestamp', nullable: true })
    vencimiento: Date;

    @Column({ type: 'int', nullable: true })
    nro_cuota: number;

    @ManyToOne(type => Prestamos, pres => pres.pagos)
    prestamoId: Prestamos;

    static findByTxtPaginated(pageNro: number, pageSize: number, attr: string, txt: string) {
        const skipRecords = pageNro * pageSize;
        // attr = col nombre, apellido, etc..
        console.log('Filtrando por txt');
        return this.createQueryBuilder('usuario')
            .orderBy('usuario.nombre')
            .offset(skipRecords)
            .limit(pageSize)
            .getMany();
    }

}

