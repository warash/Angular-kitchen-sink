System.register(["@angular/core", "../../../../src/Conts", "./WeatherService", "./SortableHeader", "@angular/forms", 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/switchMap', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/catch', 'rxjs/add/operator/do', "../../../services/CommBroker"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Conts_1, WeatherService_1, SortableHeader_1, forms_1, CommBroker_1;
    var Weather;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Conts_1_1) {
                Conts_1 = Conts_1_1;
            },
            function (WeatherService_1_1) {
                WeatherService_1 = WeatherService_1_1;
            },
            function (SortableHeader_1_1) {
                SortableHeader_1 = SortableHeader_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {},
            function (_5) {},
            function (CommBroker_1_1) {
                CommBroker_1 = CommBroker_1_1;
            }],
        execute: function() {
            Weather = (function () {
                function Weather(renderer, weatherService, commBroker) {
                    this.renderer = renderer;
                    this.weatherService = weatherService;
                    this.commBroker = commBroker;
                    this.zipControl = new forms_1.FormControl();
                    this.sort = { field: null, desc: false };
                    this.listenWeatherInput();
                    this.commBroker.getService(Conts_1.Consts.Services().Properties).setPropView('Weather');
                }
                Weather.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.zipControl.setValue('91301');
                    setTimeout(function () {
                        _this.renderer.invokeElementMethod(_this.myWeatherInput.nativeElement, 'focus', []);
                    }, 1000);
                };
                Weather.prototype.listenWeatherInput = function () {
                    var _this = this;
                    return this.weatherItems = this.zipControl.valueChanges
                        .debounceTime(400)
                        .distinctUntilChanged()
                        .filter(function (zip) {
                        return zip.length > 3;
                    }).switchMap(function (zip) {
                        console.log(zip);
                        return _this.weatherService.search(zip + "/1");
                    });
                };
                __decorate([
                    core_1.ViewChild('anotherWayToGetInput'), 
                    __metadata('design:type', core_1.ElementRef)
                ], Weather.prototype, "myWeatherInput", void 0);
                Weather = __decorate([
                    core_1.Component({
                        selector: 'Weather',
                        providers: [WeatherService_1.WeatherService, SortableHeader_1.SortableHeader],
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        styles: ["input {margin: 20px; width: 50%}"],
                        template: "\n    <small>I am a weather component</small>\n    <hr/>\n    <label style=\"padding-top: 5px; font-size: 1.4em\">Auto updated</label>\n    <SwitchComponent [label]=\"'My Switch'\"></SwitchComponent>\n    <input type=\"text\" #anotherWayToGetInput class=\"form-control\" placeholder=\"enter city or zip code\" [formControl]=\"zipControl\">\n    <table class=\"table\">\n      <thead>\n        <tr>\n          <th>day</th>\n          <th>icon</th>\n          <th sortableHeader=\"maxtempF\" [sort]=\"sort\">high</th>\n          <th sortableHeader=\"mintempF\" [sort]=\"sort\">low</th>\n        </tr>\n      </thead>\n      <tbody>\n      <!-- no need to subscribe to observable since async does this for us -->\n        <tr *ngFor=\"let item of weatherItems | async | OrderBy:sort.field:sort.desc\">\n          <td>{{ item.day }}</td>\n          <td><img src=\"{{ item.iconPath }}\" style=\"width: 40px; height: 40px\"/></td>\n          <td>{{ item.maxtempF }}</td>\n          <td>{{ item.mintempF }}</td>\n          <!-- <td [innerHtml]=\"item.day\"></td> -->\n        </tr>\n      </tbody>\n    </table>\n  ",
                    }), 
                    __metadata('design:paramtypes', [core_1.Renderer, WeatherService_1.WeatherService, CommBroker_1.CommBroker])
                ], Weather);
                return Weather;
            }());
            exports_1("Weather", Weather);
        }
    }
});
//# sourceMappingURL=Weather.js.map