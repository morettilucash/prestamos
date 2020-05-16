import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Clientes } from "./clientes";
import { Pagos } from "./pagos";


@Entity('prestamos')
export class Prestamos extends BaseEntity {

    @PrimaryGeneratedColumn('increment', { type: 'integer' })
    id: number;

    @Column({ type: 'double', nullable: false })
    monto: number;

    @Column({ type: 'timestamp', nullable: true })
    fecha_hora: Date;

    @Column({ type: 'timestamp', nullable: true })
    vencimiento: Date;

    @Column({ type: 'double', nullable: true })
    tasa_interes: number;

    @Column({ type: 'double', nullable: true })
    intereses: number;

    @Column({ type: 'int', nullable: true })
    cantidad_cuotas: number;

    @Column({ type: 'int', nullable: true })
    cuotas_pagadas: number;

    @Column({ type: 'varchar', nullable: true })
    tipo_pago: string;

    @Column({ type: 'double', nullable: true })
    saldo: number;

    @Column({ type: 'varchar', nullable: true })
    estado: string;

    @ManyToOne(type=> Clientes, cliente => cliente.id )
    clienteId: Clientes;

    @OneToMany(type=> Pagos, pago => pago.prestamoId )
    pagos: Pagos[];

    static findByTxtPaginated(pageNro: number, pageSize: number, attr: string, txt: string) {
        const skipRecords = pageNro * pageSize;
        // attr = col nombre, apellido, etc..
        console.log('Filtrando por txt');
        return this.createQueryBuilder('usuario')
            .where(`LOWER(usuario.${attr}) LIKE LOWER(:txt)`, { txt: '%' + txt + '%' })
            .orderBy('usuario.nombre')
            .offset(skipRecords)
            .limit(pageSize)
            .getMany();
    }

}

