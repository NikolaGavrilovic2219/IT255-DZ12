System.register(['angular2/core', 'angular2/common', 'angular2/http', 'rxjs/Rx', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, common_1, http_1, router_1;
    var HotelComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            HotelComponent = (function () {
                function HotelComponent(builder, http, router) {
                    this.select = 1;
                    this.http = http;
                    this.router = router;
                    this.hotelForm = builder.group({
                        naziv: ["", common_1.Validators.none],
                        adresa: ["", common_1.Validators.none],
                        broj_soba: ["", common_1.Validators.none],
                    });
                }
                HotelComponent.prototype.onAddHotel = function () {
                    var _this = this;
                    var data = "naziv=" + this.hotelForm.value.naziv +
                        "&adresa=" + this.hotelForm.value.adresa +
                        "&broj_soba=" + this.hotelForm.value.broj_soba;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    this.http.post('http://localhost/php/addhotel.php', data, { headers: headers })
                        .map(function (res) { return res; })
                        .subscribe(function (data) { return _this.postResponse = data; }, function (err) { return alert(JSON.stringify(err)); }, function () {
                        if (_this.postResponse._body.indexOf("error") === -1) {
                            alert("Dodali ste hotel!");
                            _this.router.parent.navigate(['./Home']);
                        }
                        else {
                            alert("Greska! Pokusajte ponovo!");
                        }
                    });
                };
                HotelComponent = __decorate([
                    core_1.Component({
                        selector: 'Hotel',
                        templateUrl: 'app/hotel/hotel.html',
                        directives: [common_1.FORM_DIRECTIVES],
                        viewBindings: [common_1.FORM_BINDINGS]
                    }), 
                    __metadata('design:paramtypes', [common_1.FormBuilder, http_1.Http, router_1.Router])
                ], HotelComponent);
                return HotelComponent;
            }());
            exports_1("HotelComponent", HotelComponent);
        }
    }
});
//# sourceMappingURL=hotel.component.js.map