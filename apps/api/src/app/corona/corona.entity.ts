import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Corona extends Model {
    @Column({primaryKey: true})
    id: string;

/*     @Column
    county: string;

    @Column
    state: string;

    @Column
    fips: number;

    @Column
    cases: number;

    @Column
    deaths: number; */

}