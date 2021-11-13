import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: 'CORONA_STATE'
})
export class Corona {

    @PrimaryColumn()
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

}