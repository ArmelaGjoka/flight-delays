import { Controller, Get } from "@nestjs/common";
import { Corona } from "./corona.entity";
import { CoronaService } from "./corona.service";

@Controller('corona')
export class CoronaController {
    
    constructor(private coronaService: CoronaService) {}

    @Get()
    index(): Promise<Corona[]> {
      return this.coronaService.findAll();
    }    
}
