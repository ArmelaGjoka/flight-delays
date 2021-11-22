import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: 'corona_state'
})
export class Corona {

    @PrimaryColumn()
    _rowid_: string;

    @Column()
    date: string;

    @Column()
    state: string;

    @Column()
    fips_state: string;

    @Column()
    cases: number;

    @Column()
    deaths: number;

    @Column()
    population: number;

    @Column()
    cases_perc: number;

}