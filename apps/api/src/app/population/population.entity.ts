import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Population {

    @PrimaryColumn()
    fips: number;

    @Column()
    county_name: string; 

    @Column()
    state: string;

    @Column()
    population: number;
}