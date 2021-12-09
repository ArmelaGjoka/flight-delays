(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apps/api/src/app/app.controller.ts":
/*!********************************************!*\
  !*** ./apps/api/src/app/app.controller.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/api/src/app/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
AppController = tslib_1.__decorate([
    common_1.Controller(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/*!****************************************!*\
  !*** ./apps/api/src/app/app.module.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./apps/api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./apps/api/src/app/app.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const flight_module_1 = __webpack_require__(/*! ./flight/flight.module */ "./apps/api/src/app/flight/flight.module.ts");
const flight_entity_1 = __webpack_require__(/*! ./flight/flight.entity */ "./apps/api/src/app/flight/flight.entity.ts");
const corona_module_1 = __webpack_require__(/*! ./corona/corona.module */ "./apps/api/src/app/corona/corona.module.ts");
const corona_entity_1 = __webpack_require__(/*! ./corona/corona.entity */ "./apps/api/src/app/corona/corona.entity.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            flight_module_1.FlightModule,
            corona_module_1.CoronaModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: "flights.db",
                synchronize: false,
                migrationsRun: false,
                entities: [
                    flight_entity_1.Flight, corona_entity_1.Corona
                ],
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/app.service.ts":
/*!*****************************************!*\
  !*** ./apps/api/src/app/app.service.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = class AppService {
    getData() {
        return { message: 'Welcome to api!' };
    }
};
AppService = tslib_1.__decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/api/src/app/corona/corona.controller.ts":
/*!******************************************************!*\
  !*** ./apps/api/src/app/corona/corona.controller.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoronaController = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const corona_service_1 = __webpack_require__(/*! ./corona.service */ "./apps/api/src/app/corona/corona.service.ts");
let CoronaController = class CoronaController {
    constructor(coronaService) {
        this.coronaService = coronaService;
    }
    getCoronaValues() {
        return this.coronaService.findAll();
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], CoronaController.prototype, "getCoronaValues", null);
CoronaController = tslib_1.__decorate([
    common_1.Controller('corona'),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof corona_service_1.CoronaService !== "undefined" && corona_service_1.CoronaService) === "function" ? _b : Object])
], CoronaController);
exports.CoronaController = CoronaController;


/***/ }),

/***/ "./apps/api/src/app/corona/corona.entity.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/app/corona/corona.entity.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Corona = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Corona = class Corona {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", String)
], Corona.prototype, "_rowid_", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Corona.prototype, "date", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Corona.prototype, "state", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Corona.prototype, "fips_state", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Corona.prototype, "cases", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Corona.prototype, "deaths", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Corona.prototype, "population", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Corona.prototype, "cases_perc", void 0);
Corona = tslib_1.__decorate([
    typeorm_1.Entity({
        name: 'corona_state'
    })
], Corona);
exports.Corona = Corona;


/***/ }),

/***/ "./apps/api/src/app/corona/corona.module.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/app/corona/corona.module.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CoronaModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const corona_controller_1 = __webpack_require__(/*! ./corona.controller */ "./apps/api/src/app/corona/corona.controller.ts");
const corona_entity_1 = __webpack_require__(/*! ./corona.entity */ "./apps/api/src/app/corona/corona.entity.ts");
const corona_service_1 = __webpack_require__(/*! ./corona.service */ "./apps/api/src/app/corona/corona.service.ts");
let CoronaModule = class CoronaModule {
};
CoronaModule = tslib_1.__decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([corona_entity_1.Corona])],
        providers: [corona_service_1.CoronaService],
        controllers: [corona_controller_1.CoronaController]
    })
], CoronaModule);
exports.CoronaModule = CoronaModule;


/***/ }),

/***/ "./apps/api/src/app/corona/corona.service.ts":
/*!***************************************************!*\
  !*** ./apps/api/src/app/corona/corona.service.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoronaService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const corona_entity_1 = __webpack_require__(/*! ./corona.entity */ "./apps/api/src/app/corona/corona.entity.ts");
let CoronaService = class CoronaService {
    constructor(coronaRepository) {
        this.coronaRepository = coronaRepository;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.coronaRepository.find();
        });
    }
};
CoronaService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(corona_entity_1.Corona)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], CoronaService);
exports.CoronaService = CoronaService;


/***/ }),

/***/ "./apps/api/src/app/flight/flight.controller.ts":
/*!******************************************************!*\
  !*** ./apps/api/src/app/flight/flight.controller.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightsController = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const flight_service_1 = __webpack_require__(/*! ./flight.service */ "./apps/api/src/app/flight/flight.service.ts");
let FlightsController = class FlightsController {
    constructor(flightService) {
        this.flightService = flightService;
    }
    getFlights() {
        return this.flightService.findAll();
    }
    getFlightByOriginDest(data) {
        return this.flightService.getFlightsByOriginDest(data.origin, data.dest);
    }
    groupFlightsByOrigin() {
        return this.flightService.getFlightsGroupedByOrigin();
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], FlightsController.prototype, "getFlights", null);
tslib_1.__decorate([
    common_1.Get(':origin/:dest'),
    tslib_1.__param(0, common_1.Param()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], FlightsController.prototype, "getFlightByOriginDest", null);
tslib_1.__decorate([
    common_1.Get('/count'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], FlightsController.prototype, "groupFlightsByOrigin", null);
FlightsController = tslib_1.__decorate([
    common_1.Controller('flight'),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof flight_service_1.FlightService !== "undefined" && flight_service_1.FlightService) === "function" ? _c : Object])
], FlightsController);
exports.FlightsController = FlightsController;


/***/ }),

/***/ "./apps/api/src/app/flight/flight.entity.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/app/flight/flight.entity.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let Flight = class Flight {
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", String)
], Flight.prototype, "_rowid_", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Flight.prototype, "dep_time", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Flight.prototype, "year", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Flight.prototype, "month", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Flight.prototype, "day_of_month", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Flight.prototype, "mkt_carrier_name", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Flight.prototype, "origin", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Flight.prototype, "origin_city", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Flight.prototype, "origin_airport_name", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Flight.prototype, "dest", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Flight.prototype, "dest_city", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Flight.prototype, "dep_delay", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Flight.prototype, "arr_delay", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Flight.prototype, "cancellation_description", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Flight.prototype, "fl_date", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], Flight.prototype, "time_of_day", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Flight.prototype, "distance", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Flight.prototype, "origin_state_fips", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], Flight.prototype, "dest_state_fips", void 0);
Flight = tslib_1.__decorate([
    typeorm_1.Entity({
        name: 'filtered_flights_final'
    })
], Flight);
exports.Flight = Flight;


/***/ }),

/***/ "./apps/api/src/app/flight/flight.module.ts":
/*!**************************************************!*\
  !*** ./apps/api/src/app/flight/flight.module.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightModule = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const flight_entity_1 = __webpack_require__(/*! ./flight.entity */ "./apps/api/src/app/flight/flight.entity.ts");
const flight_service_1 = __webpack_require__(/*! ./flight.service */ "./apps/api/src/app/flight/flight.service.ts");
const flight_controller_1 = __webpack_require__(/*! ./flight.controller */ "./apps/api/src/app/flight/flight.controller.ts");
let FlightModule = class FlightModule {
};
FlightModule = tslib_1.__decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([flight_entity_1.Flight])],
        providers: [flight_service_1.FlightService],
        controllers: [flight_controller_1.FlightsController],
    })
], FlightModule);
exports.FlightModule = FlightModule;


/***/ }),

/***/ "./apps/api/src/app/flight/flight.service.ts":
/*!***************************************************!*\
  !*** ./apps/api/src/app/flight/flight.service.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightService = void 0;
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const flight_entity_1 = __webpack_require__(/*! ./flight.entity */ "./apps/api/src/app/flight/flight.entity.ts");
let FlightService = class FlightService {
    constructor(flightRepository) {
        this.flightRepository = flightRepository;
    }
    findAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.flightRepository.find();
        });
    }
    getFlightsByOriginDest(origin, dest) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.flightRepository.find({ origin, dest });
            return result;
        });
    }
    getFlightsGroupedByOrigin() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.flightRepository.query('SELECT origin as origin, dest as destination, COUNT(_rowid_) as count from FILTERED_FLIGHTS_FINAL GROUP BY origin;');
            return result;
        });
    }
};
FlightService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(flight_entity_1.Flight)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], FlightService);
exports.FlightService = FlightService;


/***/ }),

/***/ "./apps/api/src/main.ts":
/*!******************************!*\
  !*** ./apps/api/src/main.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app/app.module */ "./apps/api/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            common_1.Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
        });
    });
}
bootstrap();


/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./apps/api/src/main.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Ivana.Vukovic\Downloads\flight-delays\apps\api\src\main.ts */"./apps/api/src/main.ts");


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map