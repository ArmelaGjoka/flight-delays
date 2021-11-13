

import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({
    name: 'flights'
})
export class Flight {
    // TEMP 
    @PrimaryColumn()
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
    origin_city: string;

    @Column()
    origin_airport_name: string;

    @Column()
    dest_city: string;

    @Column()
    dep_delay: number;

    @Column()
    arr_delay: number;

    @Column()
    cancellation_description: string;


}