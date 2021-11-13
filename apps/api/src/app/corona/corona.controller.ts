import { Controller, Get } from "@nestjs/common";
import { Corona } from "./corona.entity";
import { CoronaService } from "./corona.service";

@Controller('corona')
export class CoronaController {
    
    constructor(private coronaService: CoronaService) {}

    @Get()
    getCoronaValues(): Promise<Corona[]> {
      return this.coronaService.findAll();
    }    
}
