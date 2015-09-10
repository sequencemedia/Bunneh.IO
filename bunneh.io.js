(function () {

	'use strict';

	var bunneh = require('./bunneh');

	function Trap(it, here) {
		var self = this;
		this.capture = function () {
			return new Promise(function (success, failure) {
				bunneh.trap(self).run(it, here, function then(it, here) { console.log('THEN');
					success(self);
				});
			});
		};
	};

	Trap.inherit = (function (Parent) {
		function trap() {
			Parent.call(this); //this.constructor.call(this);
		}
		function child(Parent) {
			var surrogate = new Parent;
			function Trap() {
				trap.call(this);
			}
			Trap.prototype = surrogate;
			Trap.inherit = (function (Parent, parentParameters) {
				return function (parameters) {
					return child.call(this, Parent, bunneh.mix(parentParameters, parameters));
				}
			}(Trap));
			return Trap;
		}
		return function (parameters) {
			return child.call(this, Parent, parameters);
		}
	}(Trap));

	function Stew(it, here) {
		var self = this;
		this.prepare = function () {
			return new Promise(function (success, failure) {
				bunneh.stew(self).eat(it, here, function then(it, here) {
					success(self);
				});
			});
		};
	};
	Stew.prototype.recipe = function (ingredients) {
		return ingredients;
	};
	Stew.inherit = (function (Parent) {
		function stew() {
			Parent.call(this); //this.constructor.call(this);
		}
		function child(Parent) {
			var surrogate = new Parent;
			function Stew() {
				stew.call(this);
			}
			Stew.prototype = surrogate;
			Stew.inherit = (function (Parent, parentParameters) {
				return function (parameters) {
					return child.call(this, Parent, bunneh.mix(parentParameters, parameters));
				}
			}(Stew));
			return Stew;
		}
		return function (parameters) {
			return child.call(this, Parent, parameters);
		}
	}(Stew));

	function Bunneh(rabbit) {
		bunneh.rabbit = bunneh.mix(bunneh.rabbit, rabbit);
	}
	Bunneh.prototype.Trap = Trap;
	Bunneh.prototype.Stew = Stew;

	module.exports = Bunneh;

}());