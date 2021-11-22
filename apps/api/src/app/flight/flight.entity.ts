

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: 'filtered_flights_final'
})
export class Flight { 
    @PrimaryColumn()
    _rowid_: string;

    @Column()
    dep_time: number;
    
    @Column()
    year: number;

    @Column()
    month: number;
    

    @Column()
    day_of_month: number;

    @Column()
    mkt_carrier_name: string;

    @Column()
    origin: string;

    @Column()
    origin_city: string;

    @Column()
    origin_airport_name: string;

    @Column()
    dest: string;

    @Column()
    dest_city: string;

    @Column()
    dep_delay: number;

    @Column()
    arr_delay: number;

    @Column()
    cancellation_description: string;

    @Column()
    fl_date: string;

    @Column()
    time_of_day: string;

    @Column()
    distance: number;

    @Column()
    origin_state_fips: number;

    @Column()
    dest_state_fips: number;
}