(function () {

	'use strict';

	var bunneh = {

		rabbit: {
			host: 'amqp://localhost'
		},
		raise: function (exception) {
			throw exception;
		},
		fromBufferToJSON: function (parameters) {
			return JSON.parse((parameters.content || new Buffer('')).toString());
		},
		fromJSONToBuffer: function (parameters) {
			new Buffer(JSON.stringify(parameters));
		},
		trap: function (trap) {
			var amqp = require('amqplib/callback_api');
			return {
				run: function (it, here, then) {
					var rabbit;
					if ((it || false).constructor === Object) {
						rabbit = bunneh.mix(bunneh.rabbit, it.rabbit);
						amqp.connect(rabbit.host, function (e, connection) {
							if (e) return bunneh.raise(e);
							connection.createChannel(function (e, channel) {
								if (e) return bunneh.raise(e);
								var name = rabbit.exchange.name,
									type = rabbit.exchange.type;
								channel.assertExchange(name, type, { durable: true });
								trap.release = function () {
									return function (parameters, callback) {
										if (callback) {
											channel.assertQueue('', { durable: false, exclusive: true, autoDelete: true }, function (e, q) {
												if (e) return bunneh.raise(e);
												channel.consume(q.queue, function (message) {
													callback(bunneh.fromBufferToJSON(message));
												});
												channel.publish(name, (here || function () { return '*'; }).call(trap, it, parameters), bunneh.toBufferFromJSON(parameters), { replyTo: q.queue });
											});
										} else {
											channel.publish(name, (here || function () { return '*'; }).call(trap, it, parameters), bunneh.toBufferFromJSON(parameters));
										}
									}; //.bind(trap);
								};
								then.call(trap, it, here);
							});
						});
					}
				}
			}
		},
		stew: function (stew) {
			var amqp = require('amqplib/callback_api');
			return {
				eat: function (it, here) {
					var rabbit;
					if ((it || false).constructor === Object) {
						rabbit = bunneh.mix(bunneh.rabbit, it.rabbit);
						amqp.connect(rabbit.host, function (e, connection) {
							if (e) return bunneh.raise(e);
							connection.createChannel(function (e, channel) {
								if (e) return bunneh.raise(e);
								channel.assertQueue('', { exclusive: true }, function (e, q) {
									var name = rabbit.exchange.name,
										type = rabbit.exchange.type;
									channel.assertExchange(name, type, { durable: true });
									channel.bindQueue(q.queue, name, (here || function () { return '*'; }).call(stew, it));
									stew.consume = function (season) {
										channel.consume(q.queue, function (message) {
											var ingredients,
												meal;
											if (message) {
												try {
													ingredients = bunneh.fromBufferToJSON(message);
													if (meal = (((season || false).constructor = Function) ?
														season.call(stew, it, here, stew.recipe(ingredients)) : stew.recipe(ingredients))) {
														if (message.properties.replyTo) {
															channel.sendToQueue(message.properties.replyTo, bunneh.fromJSONToBuffer(meal));
														}
													}
													channel.ack(message); // acknowledge that the message was received
												} catch (e) {
													bunneh.raise(e);
												}
											}
										});
									};
								});
							});
						});
					}
				}
			}
		},
		has: (function () {
			var has = Object.prototype.hasOwnProperty;
			return function (object, key) {
				return has.call(object, key);
			}
		}()),
		mix: (function () {
			var has = Object.prototype.hasOwnProperty;
			function iso(value) {
				return (value || false)
					.constructor === Object;
			}
			function isa(value) {
				return (value || false)
					.constructor === Array;
			}
			function mia(alpha, omega) { //optimised for arrays
				var i = 0,
					j = alpha.length,
					a, o;
				for (i, j; i < j; i = i + 1) {
					switch (((a = alpha[i]) || false).constructor) {
						case Object:
							omega[i] = iso((o = omega[i])) ?
								mio(mio(a, {}), o) : mio(a, {});
							break;
						case Array:
							omega[i] = isa((o = omega[i])) ?
								mia(mia(a, []), o) : mia(a, []);
							break;
						default: //only merge keys if we don't have them (even in arrays)
							if (omega[i] === undefined) { //sparse (undefined -- null counts as a value)
								omega[i] = a;
							}
					}
				}
				return omega;
			};
			function mio(alpha, omega) { //optimised for objects
				var key, a, o;
				for (key in alpha) {
					if (has.call(alpha, key) === true) {
						switch (((a = alpha[key]) || false).constructor) {
							case Object:
								omega[key] = iso((o = omega[key])) ?
									mio(mix(a, {}), o) : mio(a, {});
								break;
							case Array:
								omega[key] = isa((o = omega[key])) ?
									mia(mia(a, []), o) : mia(a, []);
								break;
							default: //only merge keys if we don't have them
								if (has.call(omega, key) === false) {
									omega[key] = a;
								}
						}
					}
				}
				return omega;
			}
			return function (alpha, omega) {
				return mio(mio(iso(alpha) ? alpha : {}, {}), iso(omega) ? omega : {});
			};
		}())

	};

	module.exports = bunneh;

}());