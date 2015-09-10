var expect = require('chai').expect;

describe('Bunneh.IO', function () {

	var Bunneh = require('./bunneh.io'),
		bunneh;

	beforeEach(function () {
		bunneh = new Bunneh();
	});

	describe('Always', function () {
		it('Creates an instance of Bunneh', function () {
			expect(bunneh).instanceOf(Bunneh);
		});
		it('Has a constructor named \'Trap\' as a property of the instance', function () {
			expect(bunneh.Trap).to.be.a('function');
		});
		it('Has a constructor named \'Stew\' as a property of the instance', function () {
			expect(bunneh.Stew).to.be.a('function');
		});
		describe('Trap', function () {
			it('Has a method named \'inherit\' as a property of the instance', function () {
				expect(bunneh.Trap.inherit).to.be.a('function');
			});
			describe('Invoking \'inherit\'', function () {
				it('Creates a constructor', function () {
					expect(bunneh.Trap.inherit()).to.be.a('function');
				});
				it('Creates a constructor which is not identical to \'Trap\'', function () {
					expect(bunneh.Trap.inherit()).not.equal(bunneh.Trap);
				});
				describe('Instantiating the constructor', function () {
					it('Creates an instance of \'Trap\'', function () {
						var Trap = bunneh.Trap.inherit(),
							trap = new Trap();
						expect(trap).instanceOf(bunneh.Trap);
					});
				});
			});
		});
		describe('Stew', function () {
			it('Has a method named \'inherit\' as a property of the instance', function () {
				expect(bunneh.Stew.inherit).to.be.a('function');
			});
			describe('Invoking \'inherit\'', function () {
				it('Creates a constructor', function () {
					expect(bunneh.Stew.inherit()).to.be.a('function');
				});
				it('Creates a constructor which is not identical to \'Stew\'', function () {
					expect(bunneh.Stew.inherit()).not.equal(bunneh.Stew);
				});
				describe('Instantiating the constructor', function () {
					it('Creates an instance of \'Stew\'', function () {
						var Stew = bunneh.Stew.inherit(),
							stew = new Stew();
						expect(stew).instanceOf(bunneh.Stew);
					});
				});
			});
		});
	});

	describe('Instantiating \'Trap\'', function () {

		var trap;

		beforeEach(function () {
			trap = new bunneh.Trap();
		});

		it('Assigns a method name \'capture\' to a property of the instance', function () {
			expect(trap.capture).to.be.a('function');
		});
		describe('Invoking \'capture\'', function () {
			it ('Returns a promise', function () {
				expect(trap.capture()).instanceOf(Promise);
			});
		});

	});

	describe('Instantiating \'Stew\'', function () {

		var stew;

		beforeEach(function () {
			stew = new bunneh.Stew();
		});

		it('Assigns a method name \'prepare\' to a property of the instance', function () {
			expect(stew.prepare).to.be.a('function');
		});
		describe('Invoking \'prepare\'', function () {
			it ('Returns a promise', function () {
				expect(stew.prepare()).instanceOf(Promise);
			});
		});

	});

});