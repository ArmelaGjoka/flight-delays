import { Corona } from "./corona.entity";


export const coronaProvider = [
    {
        provide: 'CORONA_REPOSITORY',
        useValue: Corona
    }
]