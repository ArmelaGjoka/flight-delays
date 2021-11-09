import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { CoronaController } from "./corona.controller";
import { coronaProvider } from "./corona.providers";
import { CoronaService } from "./corona.service";

@Module({
    imports: [DatabaseModule],
    controllers: [CoronaController],
    providers: [
        CoronaService,
        ...coronaProvider
    ]
})
export class CoronaModule {}