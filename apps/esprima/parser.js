"use strict";
var assert_1 = require("./assert");
var messages_1 = require("./messages");
var error_handler_1 = require("./error_handler");
var token_1 = require("./token");
var scanner_1 = require("./scanner");
var syntax_1 = require("./syntax");
var Node = require("./Node");
var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
var Parser = (function () {
	function Parser(code, options, delegate) {
		if (options === void 0) {
			options = {};
		}
		this.config = {
			range: (typeof options.range === 'boolean') && options.range,
			loc: (typeof options.loc === 'boolean') && options.loc,
			source: null,
			tokens: (typeof options.tokens === 'boolean') && options.tokens,
			comment: (typeof options.comment === 'boolean') && options.comment,
			tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
		};
		if (this.config.loc && options.source && options.source !== null) {
			this.config.source = String(options.source);
		}
		this.delegate = delegate;
		this.errorHandler = new error_handler_1.ErrorHandler();
		this.errorHandler.tolerant = this.config.tolerant;
		this.scanner = new scanner_1.Scanner(code, this.errorHandler);
		this.scanner.trackComment = this.config.comment;
		this.operatorPrecedence = {
			')': 0,
			';': 0,
			',': 0,
			'=': 0,
			']': 0,
			'||': 1,
			'&&': 2,
			'|': 3,
			'^': 4,
			'&': 5,
			'==': 6,
			'!=': 6,
			'===': 6,
			'!==': 6,
			'<': 7,
			'>': 7,
			'<=': 7,
			'>=': 7,
			'<<': 8,
			'>>': 8,
			'>>>': 8,
			'+': 9,
			'-': 9,
			'*': 11,
			'/': 11,
			'%': 11
		};
		this.sourceType = (options && options.sourceType === 'module') ? 'module' : 'script';
		this.lookahead = null;
		this.hasLineTerminator = false;
		this.context = {
			allowIn: true,
			allowYield: true,
			firstCoverInitializedNameError: null,
			isAssignmentTarget: false,
			isBindingElement: false,
			inFunctionBody: false,
			inIteration: false,
			inSwitch: false,
			labelSet: {},
			strict: (this.sourceType === 'module')
		};
		this.tokens = [];
		this.startMarker = {
			index: 0,
			lineNumber: this.scanner.lineNumber,
			lineStart: 0
		};
		this.lastMarker = {
			index: 0,
			lineNumber: this.scanner.lineNumber,
			lineStart: 0
		};
		this.nextToken();
		this.lastMarker = {
			index: this.scanner.index,
			lineNumber: this.scanner.lineNumber,
			lineStart: this.scanner.lineStart
		};
	}
	Parser.prototype.throwError = function (messageFormat) {
		var values = [];
		for (var _i = 1; _i < arguments.length; _i++) {
			values[_i - 1] = arguments[_i];
		}
		var args = Array.prototype.slice.call(arguments, 1);
		var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
			assert_1.assert(idx < args.length, 'Message reference must be in range');
			return args[idx];
		});
		var index = this.lastMarker.index;
		var line = this.lastMarker.lineNumber;
		var column = this.lastMarker.index - this.lastMarker.lineStart + 1;
		throw this.errorHandler.createError(index, line, column, msg);
	};
	Parser.prototype.tolerateError = function (messageFormat) {
		var values = [];
		for (var _i = 1; _i < arguments.length; _i++) {
			values[_i - 1] = arguments[_i];
		}
		var args = Array.prototype.slice.call(arguments, 1);
		var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
			assert_1.assert(idx < args.length, 'Message reference must be in range');
			return args[idx];
		});
		var index = this.lastMarker.index;
		var line = this.scanner.lineNumber;
		var column = this.lastMarker.index - this.lastMarker.lineStart + 1;
		this.errorHandler.tolerateError(index, line, column, msg);
	};
	// Throw an exception because of the token.
	Parser.prototype.unexpectedTokenError = function (token, message) {
		var msg = message || messages_1.Messages.UnexpectedToken;
		var value;
		if (token) {
			if (!message) {
				msg = (token.type === token_1.Token.EOF) ? messages_1.Messages.UnexpectedEOS :
					(token.type === token_1.Token.Identifier) ? messages_1.Messages.UnexpectedIdentifier :
					(token.type === token_1.Token.NumericLiteral) ? messages_1.Messages.UnexpectedNumber :
					(token.type === token_1.Token.StringLiteral) ? messages_1.Messages.UnexpectedString :
					(token.type === token_1.Token.Template) ? messages_1.Messages.UnexpectedTemplate :
					messages_1.Messages.UnexpectedToken;
				if (token.type === token_1.Token.Keyword) {
					if (this.scanner.isFutureReservedWord(token.value)) {
						msg = messages_1.Messages.UnexpectedReserved;
					} else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
						msg = messages_1.Messages.StrictReservedWord;
					}
				}
			}
			value = (token.type === token_1.Token.Template) ? token.value.raw : token.value;
		} else {
			value = 'ILLEGAL';
		}
		msg = msg.replace('%0', value);
		if (token && typeof token.lineNumber === 'number') {
			var index = token.start;
			var line = token.lineNumber;
			var column = token.start - this.lastMarker.lineStart + 1;
			return this.errorHandler.createError(index, line, column, msg);
		} else {
			var index = this.lastMarker.index;
			var line = this.lastMarker.lineNumber;
			var column = index - this.lastMarker.lineStart + 1;
			return this.errorHandler.createError(index, line, column, msg);
		}
	};
	Parser.prototype.throwUnexpectedToken = function (token, message) {
		throw this.unexpectedTokenError(token, message);
	};
	Parser.prototype.tolerateUnexpectedToken = function (token, message) {
		this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
	};
	Parser.prototype.collectComments = function () {
		if (!this.config.comment) {
			this.scanner.scanComments();
		} else {
			var comments = this.scanner.scanComments();
			if (comments.length > 0 && this.delegate) {
				for (var i = 0; i < comments.length; ++i) {
					var e = comments[i];
					var node = void 0;
					node = {
						type: e.multiLine ? 'BlockComment' : 'LineComment',
						value: this.scanner.source.slice(e.slice[0], e.slice[1])
					};
					if (this.config.range) {
						node.range = e.range;
					}
					if (this.config.loc) {
						node.loc = e.loc;
					}
					var metadata = {
						start: {
							line: e.loc.start.line,
							column: e.loc.start.column,
							offset: e.range[0]
						},
						end: {
							line: e.loc.end.line,
							column: e.loc.end.column,
							offset: e.range[1]
						}
					};
					this.delegate(node, metadata);
				}
			}
		}
	};
	// From internal representation to an external structure
	Parser.prototype.getTokenRaw = function (token) {
		return this.scanner.source.slice(token.start, token.end);
	};
	Parser.prototype.convertToken = function (token) {
		var t;
		t = {
			type: token_1.TokenName[token.type],
			value: this.getTokenRaw(token)
		};
		if (this.config.range) {
			t.range = [token.start, token.end];
		}
		if (this.config.loc) {
			t.loc = {
				start: {
					line: this.startMarker.lineNumber,
					column: this.startMarker.index - this.startMarker.lineStart
				},
				end: {
					line: this.scanner.lineNumber,
					column: this.scanner.index - this.scanner.lineStart
				}
			};
		}
		if (token.regex) {
			t.regex = token.regex;
		}
		return t;
	};
	Parser.prototype.nextToken = function () {
		var token = this.lookahead;
		this.lastMarker.index = this.scanner.index;
		this.lastMarker.lineNumber = this.scanner.lineNumber;
		this.lastMarker.lineStart = this.scanner.lineStart;
		this.collectComments();
		this.startMarker.index = this.scanner.index;
		this.startMarker.lineNumber = this.scanner.lineNumber;
		this.startMarker.lineStart = this.scanner.lineStart;
		var next;
		next = this.scanner.lex();
		this.hasLineTerminator = (token && next) ? (token.lineNumber !== next.lineNumber) : false;
		if (next && this.context.strict && next.type === token_1.Token.Identifier) {
			if (this.scanner.isStrictModeReservedWord(next.value)) {
				next.type = token_1.Token.Keyword;
			}
		}
		this.lookahead = next;
		if (this.config.tokens && next.type !== token_1.Token.EOF) {
			this.tokens.push(this.convertToken(next));
		}
		return token;
	};
	Parser.prototype.nextRegexToken = function () {
		this.collectComments();
		var token = this.scanner.scanRegExp();
		if (this.config.tokens) {
			// Pop the previous token, '/' or '/='
			// This is added from the lookahead token.
			this.tokens.pop();
			this.tokens.push(this.convertToken(token));
		}
		// Prime the next lookahead.
		this.lookahead = token;
		this.nextToken();
		return token;
	};
	Parser.prototype.createNode = function () {
		return {
			index: this.startMarker.index,
			line: this.startMarker.lineNumber,
			column: this.startMarker.index - this.startMarker.lineStart
		};
	};
	Parser.prototype.startNode = function (token) {
		return {
			index: token.start,
			line: token.lineNumber,
			column: token.start - token.lineStart
		};
	};
	Parser.prototype.finalize = function (meta, node) {
		if (this.config.range) {
			node.range = [meta.index, this.lastMarker.index];
		}
		if (this.config.loc) {
			node.loc = {
				start: {
					line: meta.line,
					column: meta.column
				},
				end: {
					line: this.lastMarker.lineNumber,
					column: this.lastMarker.index - this.lastMarker.lineStart
				}
			};
			if (this.config.source) {
				node.loc.source = this.config.source;
			}
		}
		if (this.delegate) {
			var metadata = {
				start: {
					line: meta.line,
					column: meta.column,
					offset: meta.index
				},
				end: {
					line: this.lastMarker.lineNumber,
					column: this.lastMarker.index - this.lastMarker.lineStart,
					offset: this.lastMarker.index
				}
			};
			this.delegate(node, metadata);
		}
		return node;
	};
	// Expect the next token to match the specified punctuator.
	// If not, an exception will be thrown.
	Parser.prototype.expect = function (value) {
		var token = this.nextToken();
		if (token.type !== token_1.Token.Punctuator || token.value !== value) {
			this.throwUnexpectedToken(token);
		}
	};
	// Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
	Parser.prototype.expectCommaSeparator = function () {
		if (this.config.tolerant) {
			var token = this.lookahead;
			if (token.type === token_1.Token.Punctuator && token.value === ',') {
				this.nextToken();
			} else if (token.type === token_1.Token.Punctuator && token.value === ';') {
				this.nextToken();
				this.tolerateUnexpectedToken(token);
			} else {
				this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
			}
		} else {
			this.expect(',');
		}
	};
	// Expect the next token to match the specified keyword.
	// If not, an exception will be thrown.
	Parser.prototype.expectKeyword = function (keyword) {
		var token = this.nextToken();
		if (token.type !== token_1.Token.Keyword || token.value !== keyword) {
			this.throwUnexpectedToken(token);
		}
	};
	// Return true if the next token matches the specified punctuator.
	Parser.prototype.match = function (value) {
		return this.lookahead.type === token_1.Token.Punctuator && this.lookahead.value === value;
	};
	// Return true if the next token matches the specified keyword
	Parser.prototype.matchKeyword = function (keyword) {
		return this.lookahead.type === token_1.Token.Keyword && this.lookahead.value === keyword;
	};
	// Return true if the next token matches the specified contextual keyword
	// (where an identifier is sometimes a keyword depending on the context)
	Parser.prototype.matchContextualKeyword = function (keyword) {
		return this.lookahead.type === token_1.Token.Identifier && this.lookahead.value === keyword;
	};
	// Return true if the next token is an assignment operator
	Parser.prototype.matchAssign = function () {
		if (this.lookahead.type !== token_1.Token.Punctuator) {
			return false;
		}
		var op = this.lookahead.value;
		return op === '=' ||
			op === '*=' ||
			op === '**=' ||
			op === '/=' ||
			op === '%=' ||
			op === '+=' ||
			op === '-=' ||
			op === '<<=' ||
			op === '>>=' ||
			op === '>>>=' ||
			op === '&=' ||
			op === '^=' ||
			op === '|=';
	};
	// Cover grammar support.
	//
	// When an assignment expression position starts with an left parenthesis, the determination of the type
	// of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
	// or the first comma. This situation also defers the determination of all the expressions nested in the pair.
	//
	// There are three productions that can be parsed in a parentheses pair that needs to be determined
	// after the outermost pair is closed. They are:
	//
	//   1. AssignmentExpression
	//   2. BindingElements
	//   3. AssignmentTargets
	//
	// In order to avoid exponential backtracking, we use two flags to denote if the production can be
	// binding element or assignment target.
	//
	// The three productions have the relationship:
	//
	//   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
	//
	// with a single exception that CoverInitializedName when used directly in an Expression, generates
	// an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
	// first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
	//
	// isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
	// effect the current flags. This means the production the parser parses is only used as an expression. Therefore
	// the CoverInitializedName check is conducted.
	//
	// inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
	// the flags outside of the parser. This means the production the parser parses is used as a part of a potential
	// pattern. The CoverInitializedName check is deferred.
	Parser.prototype.isolateCoverGrammar = function (parseFunction) {
		var previousIsBindingElement = this.context.isBindingElement;
		var previousIsAssignmentTarget = this.context.isAssignmentTarget;
		var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
		this.context.isBindingElement = true;
		this.context.isAssignmentTarget = true;
		this.context.firstCoverInitializedNameError = null;
		var result = parseFunction.call(this);
		if (this.context.firstCoverInitializedNameError !== null) {
			this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
		}
		this.context.isBindingElement = previousIsBindingElement;
		this.context.isAssignmentTarget = previousIsAssignmentTarget;
		this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
		return result;
	};
	Parser.prototype.inheritCoverGrammar = function (parseFunction) {
		var previousIsBindingElement = this.context.isBindingElement;
		var previousIsAssignmentTarget = this.context.isAssignmentTarget;
		var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
		this.context.isBindingElement = true;
		this.context.isAssignmentTarget = true;
		this.context.firstCoverInitializedNameError = null;
		var result = parseFunction.call(this);
		this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
		this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
		this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
		return result;
	};
	Parser.prototype.consumeSemicolon = function () {
		if (this.match(';')) {
			this.nextToken();
		} else if (!this.hasLineTerminator) {
			if (this.lookahead.type !== token_1.Token.EOF && !this.match('}')) {
				this.throwUnexpectedToken(this.lookahead);
			}
			this.lastMarker.index = this.startMarker.index;
			this.lastMarker.lineNumber = this.startMarker.lineNumber;
			this.lastMarker.lineStart = this.startMarker.lineStart;
		}
	};
	// ECMA-262 12.2 Primary Expressions
	Parser.prototype.parsePrimaryExpression = function () {
		var node = this.createNode();
		var expr;
		var value, token, raw;
		switch (this.lookahead.type) {
			case token_1.Token.Identifier:
				if (this.sourceType === 'module' && this.lookahead.value === 'await') {
					this.tolerateUnexpectedToken(this.lookahead);
				}
				expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
				break;
			case token_1.Token.NumericLiteral:
			case token_1.Token.StringLiteral:
				if (this.context.strict && this.lookahead.octal) {
					this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
				}
				this.context.isAssignmentTarget = false;
				this.context.isBindingElement = false;
				token = this.nextToken();
				raw = this.getTokenRaw(token);
				expr = this.finalize(node, new Node.Literal(token.value, raw));
				break;
			case token_1.Token.BooleanLiteral:
				this.context.isAssignmentTarget = false;
				this.context.isBindingElement = false;
				token = this.nextToken();
				token.value = (token.value === 'true');
				raw = this.getTokenRaw(token);
				expr = this.finalize(node, new Node.Literal(token.value, raw));
				break;
			case token_1.Token.NullLiteral:
				this.context.isAssignmentTarget = false;
				this.context.isBindingElement = false;
				token = this.nextToken();
				token.value = null;
				raw = this.getTokenRaw(token);
				expr = this.finalize(node, new Node.Literal(token.value, raw));
				break;
			case token_1.Token.Template:
				expr = this.parseTemplateLiteral();
				break;
			case token_1.Token.Punctuator:
				value = this.lookahead.value;
				switch (value) {
					case '(':
						this.context.isBindingElement = false;
						expr = this.inheritCoverGrammar(this.parseGroupExpression);
						break;
					case '[':
						expr = this.inheritCoverGrammar(this.parseArrayInitializer);
						break;
					case '{':
						expr = this.inheritCoverGrammar(this.parseObjectInitializer);
						break;
					case '/':
					case '/=':
						this.context.isAssignmentTarget = false;
						this.context.isBindingElement = false;
						this.scanner.index = this.startMarker.index;
						token = this.nextRegexToken();
						raw = this.getTokenRaw(token);
						expr = this.finalize(node, new Node.RegexLiteral(token.value, raw, token.regex));
						break;
					default:
						this.throwUnexpectedToken(this.nextToken());
				}
				break;
			case token_1.Token.Keyword:
				if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
					expr = this.parseIdentifierName();
				} else if (!this.context.strict && this.matchKeyword('let')) {
					expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
				} else {
					this.context.isAssignmentTarget = false;
					this.context.isBindingElement = false;
					if (this.matchKeyword('function')) {
						expr = this.parseFunctionExpression();
					} else if (this.matchKeyword('this')) {
						this.nextToken();
						expr = this.finalize(node, new Node.ThisExpression());
					} else if (this.matchKeyword('class')) {
						expr = this.parseClassExpression();
					} else {
						this.throwUnexpectedToken(this.nextToken());
					}
				}
				break;
			default:
				this.throwUnexpectedToken(this.nextToken());
		}
		return expr;
	};
	// ECMA-262 12.2.5 Array Initializer
	Parser.prototype.parseSpreadElement = function () {
		var node = this.createNode();
		this.expect('...');
		var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
		return this.finalize(node, new Node.SpreadElement(arg));
	};
	Parser.prototype.parseArrayInitializer = function () {
		var node = this.createNode();
		var elements = [];
		this.expect('[');
		while (!this.match(']')) {
			if (this.match(',')) {
				this.nextToken();
				elements.push(null);
			} else if (this.match('...')) {
				var element = this.parseSpreadElement();
				if (!this.match(']')) {
					this.context.isAssignmentTarget = false;
					this.context.isBindingElement = false;
					this.expect(',');
				}
				elements.push(element);
			} else {
				elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
				if (!this.match(']')) {
					this.expect(',');
				}
			}
		}
		this.expect(']');
		return this.finalize(node, new Node.ArrayExpression(elements));
	};
	// ECMA-262 12.2.6 Object Initializer
	Parser.prototype.parsePropertyMethod = function (params) {
		this.context.isAssignmentTarget = false;
		this.context.isBindingElement = false;
		var previousStrict = this.context.strict;
		var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
		if (this.context.strict && params.firstRestricted) {
			this.tolerateUnexpectedToken(params.firstRestricted, params.message);
		}
		if (this.context.strict && params.stricted) {
			this.tolerateUnexpectedToken(params.stricted, params.message);
		}
		this.context.strict = previousStrict;
		return body;
	};
	Parser.prototype.parsePropertyMethodFunction = function () {
		var isGenerator = false;
		var node = this.createNode();
		var previousAllowYield = this.context.allowYield;
		this.context.allowYield = false;
		var params = this.parseFormalParameters();
		var method = this.parsePropertyMethod(params);
		this.context.allowYield = previousAllowYield;
		return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	};
	Parser.prototype.parseObjectPropertyKey = function () {
		var node = this.createNode();
		var token = this.nextToken();
		var key = null;
		switch (token.type) {
			case token_1.Token.StringLiteral:
			case token_1.Token.NumericLiteral:
				if (this.context.strict && token.octal) {
					this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
				}
				var raw = this.getTokenRaw(token);
				key = this.finalize(node, new Node.Literal(token.value, raw));
				break;
			case token_1.Token.Identifier:
			case token_1.Token.BooleanLiteral:
			case token_1.Token.NullLiteral:
			case token_1.Token.Keyword:
				key = this.finalize(node, new Node.Identifier(token.value));
				break;
			case token_1.Token.Punctuator:
				if (token.value === '[') {
					key = this.isolateCoverGrammar(this.parseAssignmentExpression);
					this.expect(']');
				} else {
					this.throwUnexpectedToken(token);
				}
				break;
			default:
				this.throwUnexpectedToken(token);
		}
		return key;
	};
	Parser.prototype.isPropertyKey = function (key, value) {
		return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
			(key.type === syntax_1.Syntax.Literal && key.value === value);
	};
	Parser.prototype.parseObjectProperty = function (hasProto) {
		var node = this.createNode();
		var token = this.lookahead;
		var kind;
		var key;
		var value;
		var computed = false;
		var method = false;
		var shorthand = false;
		if (token.type === token_1.Token.Identifier) {
			this.nextToken();
			key = this.finalize(node, new Node.Identifier(token.value));
		} else if (this.match('*')) {
			this.nextToken();
		} else {
			computed = this.match('[');
			key = this.parseObjectPropertyKey();
		}
		var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
		if (token.type === token_1.Token.Identifier && token.value === 'get' && lookaheadPropertyKey) {
			kind = 'get';
			computed = this.match('[');
			key = this.parseObjectPropertyKey();
			this.context.allowYield = false;
			value = this.parseGetterMethod();
		} else if (token.type === token_1.Token.Identifier && token.value === 'set' && lookaheadPropertyKey) {
			kind = 'set';
			computed = this.match('[');
			key = this.parseObjectPropertyKey();
			value = this.parseSetterMethod();
		} else if (token.type === token_1.Token.Punctuator && token.value === '*' && lookaheadPropertyKey) {
			kind = 'init';
			computed = this.match('[');
			key = this.parseObjectPropertyKey();
			value = this.parseGeneratorMethod();
			method = true;
		} else {
			if (!key) {
				this.throwUnexpectedToken(this.lookahead);
			}
			kind = 'init';
			if (this.match(':')) {
				if (!computed && this.isPropertyKey(key, '__proto__')) {
					if (hasProto.value) {
						this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
					}
					hasProto.value = true;
				}
				this.nextToken();
				value = this.inheritCoverGrammar(this.parseAssignmentExpression);
			} else if (this.match('(')) {
				value = this.parsePropertyMethodFunction();
				method = true;
			} else if (token.type === token_1.Token.Identifier) {
				var id = this.finalize(node, new Node.Identifier(token.value));
				if (this.match('=')) {
					this.context.firstCoverInitializedNameError = this.lookahead;
					this.nextToken();
					shorthand = true;
					var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
					value = this.finalize(node, new Node.AssignmentPattern(id, init));
				} else {
					shorthand = true;
					value = id;
				}
			} else {
				this.throwUnexpectedToken(this.nextToken());
			}
		}
		return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
	};
	Parser.prototype.parseObjectInitializer = function () {
		var node = this.createNode();
		this.expect('{');
		var properties = [];
		var hasProto = {
			value: false
		};
		while (!this.match('}')) {
			properties.push(this.parseObjectProperty(hasProto));
			if (!this.match('}')) {
				this.expectCommaSeparator();
			}
		}
		this.expect('}');
		return this.finalize(node, new Node.ObjectExpression(properties));
	};
	// ECMA-262 12.2.9 Template Literals
	Parser.prototype.parseTemplateHead = function () {
		assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
		var node = this.createNode();
		var token = this.nextToken();
		var value = {
			raw: token.value.raw,
			cooked: token.value.cooked
		};
		return this.finalize(node, new Node.TemplateElement(value, token.tail));
	};
	Parser.prototype.parseTemplateElement = function () {
		if (this.lookahead.type !== token_1.Token.Template) {
			this.throwUnexpectedToken();
		}
		var node = this.createNode();
		var token = this.nextToken();
		var value = {
			raw: token.value.raw,
			cooked: token.value.cooked
		};
		return this.finalize(node, new Node.TemplateElement(value, token.tail));
	};
	Parser.prototype.parseTemplateLiteral = function () {
		var node = this.createNode();
		var expressions = [];
		var quasis = [];
		var quasi = this.parseTemplateHead();
		quasis.push(quasi);
		while (!quasi.tail) {
			expressions.push(this.parseExpression());
			quasi = this.parseTemplateElement();
			quasis.push(quasi);
		}
		return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
	};
	// ECMA-262 12.2.10 The Grouping Operator
	Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
		switch (expr.type) {
			case syntax_1.Syntax.Identifier:
			case syntax_1.Syntax.MemberExpression:
			case syntax_1.Syntax.RestElement:
			case syntax_1.Syntax.AssignmentPattern:
				break;
			case syntax_1.Syntax.SpreadElement:
				expr.type = syntax_1.Syntax.RestElement;
				this.reinterpretExpressionAsPattern(expr.argument);
				break;
			case syntax_1.Syntax.ArrayExpression:
				expr.type = syntax_1.Syntax.ArrayPattern;
				for (var i = 0; i < expr.elements.length; i++) {
					if (expr.elements[i] !== null) {
						this.reinterpretExpressionAsPattern(expr.elements[i]);
					}
				}
				break;
			case syntax_1.Syntax.ObjectExpression:
				expr.type = syntax_1.Syntax.ObjectPattern;
				for (var i = 0; i < expr.properties.length; i++) {
					this.reinterpretExpressionAsPattern(expr.properties[i].value);
				}
				break;
			case syntax_1.Syntax.AssignmentExpression:
				expr.type = syntax_1.Syntax.AssignmentPattern;
				delete expr.operator;
				this.reinterpretExpressionAsPattern(expr.left);
				break;
			default:
				// Allow other node type for tolerant parsing.
				break;
		}
	};
	Parser.prototype.parseGroupExpression = function () {
		var expr;
		this.expect('(');
		if (this.match(')')) {
			this.nextToken();
			if (!this.match('=>')) {
				this.expect('=>');
			}
			expr = {
				type: ArrowParameterPlaceHolder,
				params: []
			};
		} else {
			var startToken = this.lookahead;
			var params = [];
			if (this.match('...')) {
				expr = this.parseRestElement(params);
				this.expect(')');
				if (!this.match('=>')) {
					this.expect('=>');
				}
				expr = {
					type: ArrowParameterPlaceHolder,
					params: [expr]
				};
			} else {
				var arrow = false;
				this.context.isBindingElement = true;
				expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
				if (this.match(',')) {
					var expressions = [];
					this.context.isAssignmentTarget = false;
					expressions.push(expr);
					while (this.startMarker.index < this.scanner.length) {
						if (!this.match(',')) {
							break;
						}
						this.nextToken();
						if (this.match('...')) {
							if (!this.context.isBindingElement) {
								this.throwUnexpectedToken(this.lookahead);
							}
							expressions.push(this.parseRestElement(params));
							this.expect(')');
							if (!this.match('=>')) {
								this.expect('=>');
							}
							this.context.isBindingElement = false;
							for (var i = 0; i < expressions.length; i++) {
								this.reinterpretExpressionAsPattern(expressions[i]);
							}
							arrow = true;
							expr = {
								type: ArrowParameterPlaceHolder,
								params: expressions
							};
						} else {
							expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
						}
						if (arrow) {
							break;
						}
					}
					if (!arrow) {
						expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
					}
				}
				if (!arrow) {
					this.expect(')');
					if (this.match('=>')) {
						if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
							arrow = true;
							expr = {
								type: ArrowParameterPlaceHolder,
								params: [expr]
							};
						}
						if (!arrow) {
							if (!this.context.isBindingElement) {
								this.throwUnexpectedToken(this.lookahead);
							}
							if (expr.type === syntax_1.Syntax.SequenceExpression) {
								for (var i = 0; i < expr.expressions.length; i++) {
									this.reinterpretExpressionAsPattern(expr.expressions[i]);
								}
							} else {
								this.reinterpretExpressionAsPattern(expr);
							}
							var params_1 = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
							expr = {
								type: ArrowParameterPlaceHolder,
								params: params_1
							};
						}
					}
					this.context.isBindingElement = false;
				}
			}
		}
		return expr;
	};
	// ECMA-262 12.3 Left-Hand-Side Expressions
	Parser.prototype.parseArguments = function () {
		this.expect('(');
		var args = [];
		if (!this.match(')')) {
			while (true) {
				var expr = this.match('...') ? this.parseSpreadElement() :
					this.isolateCoverGrammar(this.parseAssignmentExpression);
				args.push(expr);
				if (this.match(')')) {
					break;
				}
				this.expectCommaSeparator();
			}
		}
		this.expect(')');
		return args;
	};
	Parser.prototype.isIdentifierName = function (token) {
		return token.type === token_1.Token.Identifier ||
			token.type === token_1.Token.Keyword ||
			token.type === token_1.Token.BooleanLiteral ||
			token.type === token_1.Token.NullLiteral;
	};
	Parser.prototype.parseIdentifierName = function () {
		var node = this.createNode();
		var token = this.nextToken();
		if (!this.isIdentifierName(token)) {
			this.throwUnexpectedToken(token);
		}
		return this.finalize(node, new Node.Identifier(token.value));
	};
	Parser.prototype.parseNewExpression = function () {
		var node = this.createNode();
		var id = this.parseIdentifierName();
		assert_1.assert(id.name === 'new', 'New expression must start with `new`');
		var expr;
		if (this.match('.')) {
			this.nextToken();
			if (this.lookahead.type === token_1.Token.Identifier && this.context.inFunctionBody && this.lookahead.value === 'target') {
				var property = this.parseIdentifierName();
				expr = new Node.MetaProperty(id, property);
			} else {
				this.throwUnexpectedToken(this.lookahead);
			}
		} else {
			var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
			var args = this.match('(') ? this.parseArguments() : [];
			expr = new Node.NewExpression(callee, args);
			this.context.isAssignmentTarget = false;
			this.context.isBindingElement = false;
		}
		return this.finalize(node, expr);
	};
	Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
		var startToken = this.lookahead;
		var previousAllowIn = this.context.allowIn;
		this.context.allowIn = true;
		var expr;
		if (this.matchKeyword('super') && this.context.inFunctionBody) {
			expr = this.createNode();
			this.nextToken();
			expr = this.finalize(expr, new Node.Super());
			if (!this.match('(') && !this.match('.') && !this.match('[')) {
				this.throwUnexpectedToken(this.lookahead);
			}
		} else {
			expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
		}
		while (true) {
			if (this.match('.')) {
				this.context.isBindingElement = false;
				this.context.isAssignmentTarget = true;
				this.expect('.');
				var property = this.parseIdentifierName();
				expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
			} else if (this.match('(')) {
				this.context.isBindingElement = false;
				this.context.isAssignmentTarget = false;
				var args = this.parseArguments();
				expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
			} else if (this.match('[')) {
				this.context.isBindingElement = false;
				this.context.isAssignmentTarget = true;
				this.expect('[');
				var property = this.isolateCoverGrammar(this.parseExpression);
				this.expect(']');
				expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
			} else if (this.lookahead.type === token_1.Token.Template && this.lookahead.head) {
				var quasi = this.parseTemplateLiteral();
				expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
			} else {
				break;
			}
		}
		this.context.allowIn = previousAllowIn;
		return expr;
	};
	Parser.prototype.parseSuper = function () {
		var node = this.createNode();
		this.expectKeyword('super');
		if (!this.match('[') && !this.match('.')) {
			this.throwUnexpectedToken(this.lookahead);
		}
		return this.finalize(node, new Node.Super());
	};
	Parser.prototype.parseLeftHandSideExpression = function () {
		assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
		var node = this.startNode(this.lookahead);
		var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
			this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
		while (true) {
			if (this.match('[')) {
				this.context.isBindingElement = false;
				this.context.isAssignmentTarget = true;
				this.expect('[');
				var property = this.isolateCoverGrammar(this.parseExpression);
				this.expect(']');
				expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
			} else if (this.match('.')) {
				this.context.isBindingElement = false;
				this.context.isAssignmentTarget = true;
				this.expect('.');
				var property = this.parseIdentifierName();
				expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
			} else if (this.lookahead.type === token_1.Token.Template && this.lookahead.head) {
				var quasi = this.parseTemplateLiteral();
				expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
			} else {
				break;
			}
		}
		return expr;
	};
	// ECMA-262 12.4 Update Expressions
	Parser.prototype.parseUpdateExpression = function () {
		var expr;
		var startToken = this.lookahead;
		if (this.match('++') || this.match('--')) {
			var node = this.startNode(startToken);
			var token = this.nextToken();
			expr = this.inheritCoverGrammar(this.parseUnaryExpression);
			if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
				this.tolerateError(messages_1.Messages.StrictLHSPrefix);
			}
			if (!this.context.isAssignmentTarget) {
				this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
			}
			var prefix = true;
			expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
			this.context.isAssignmentTarget = false;
			this.context.isBindingElement = false;
		} else {
			expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
			if (!this.hasLineTerminator && this.lookahead.type === token_1.Token.Punctuator) {
				if (this.match('++') || this.match('--')) {
					if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
						this.tolerateError(messages_1.Messages.StrictLHSPostfix);
					}
					if (!this.context.isAssignmentTarget) {
						this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
					}
					this.context.isAssignmentTarget = false;
					this.context.isBindingElement = false;
					var operator = this.nextToken().value;
					var prefix = false;
					expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
				}
			}
		}
		return expr;
	};
	// ECMA-262 12.5 Unary Operators
	Parser.prototype.parseUnaryExpression = function () {
		var expr;
		if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
			this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
			var node = this.startNode(this.lookahead);
			var token = this.nextToken();
			expr = this.inheritCoverGrammar(this.parseUnaryExpression);
			expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
			if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
				this.tolerateError(messages_1.Messages.StrictDelete);
			}
			this.context.isAssignmentTarget = false;
			this.context.isBindingElement = false;
		} else {
			expr = this.parseUpdateExpression();
		}
		return expr;
	};
	Parser.prototype.parseExponentiationExpression = function () {
		var startToken = this.lookahead;
		var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
		if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
			this.nextToken();
			this.context.isAssignmentTarget = false;
			this.context.isBindingElement = false;
			var left = expr;
			var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
			expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
		}
		return expr;
	};
	// ECMA-262 12.6 Exponentiation Operators
	// ECMA-262 12.7 Multiplicative Operators
	// ECMA-262 12.8 Additive Operators
	// ECMA-262 12.9 Bitwise Shift Operators
	// ECMA-262 12.10 Relational Operators
	// ECMA-262 12.11 Equality Operators
	// ECMA-262 12.12 Binary Bitwise Operators
	// ECMA-262 12.13 Binary Logical Operators
	Parser.prototype.binaryPrecedence = function (token) {
		var op = token.value;
		var precedence;
		if (token.type === token_1.Token.Punctuator) {
			precedence = this.operatorPrecedence[op] || 0;
		} else if (token.type === token_1.Token.Keyword) {
			precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
		} else {
			precedence = 0;
		}
		return precedence;
	};
	Parser.prototype.parseBinaryExpression = function () {
		var startToken = this.lookahead;
		var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
		var token = this.lookahead;
		var prec = this.binaryPrecedence(token);
		if (prec > 0) {
			this.nextToken();
			token.prec = prec;
			this.context.isAssignmentTarget = false;
			this.context.isBindingElement = false;
			var markers = [startToken, this.lookahead];
			var left = expr;
			var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
			var stack = [left, token, right];
			while (true) {
				prec = this.binaryPrecedence(this.lookahead);
				if (prec <= 0) {
					break;
				}
				// Reduce: make a binary expression from the three topmost entries.
				while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
					right = stack.pop();
					var operator = stack.pop().value;
					left = stack.pop();
					markers.pop();
					var node = this.startNode(markers[markers.length - 1]);
					stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
				}
				// Shift.
				token = this.nextToken();
				token.prec = prec;
				stack.push(token);
				markers.push(this.lookahead);
				stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
			}
			// Final reduce to clean-up the stack.
			var i = stack.length - 1;
			expr = stack[i];
			markers.pop();
			while (i > 1) {
				var node = this.startNode(markers.pop());
				expr = this.finalize(node, new Node.BinaryExpression(stack[i - 1].value, stack[i - 2], expr));
				i -= 2;
			}
		}
		return expr;
	};
	// ECMA-262 12.14 Conditional Operator
	Parser.prototype.parseConditionalExpression = function () {
		var startToken = this.lookahead;
		var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
		if (this.match('?')) {
			this.nextToken();
			var previousAllowIn = this.context.allowIn;
			this.context.allowIn = true;
			var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
			this.context.allowIn = previousAllowIn;
			this.expect(':');
			var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
			expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
			this.context.isAssignmentTarget = false;
			this.context.isBindingElement = false;
		}
		return expr;
	};
	// ECMA-262 12.15 Assignment Operators
	Parser.prototype.checkPatternParam = function (options, param) {
		switch (param.type) {
			case syntax_1.Syntax.Identifier:
				this.validateParam(options, param, param.name);
				break;
			case syntax_1.Syntax.RestElement:
				this.checkPatternParam(options, param.argument);
				break;
			case syntax_1.Syntax.AssignmentPattern:
				this.checkPatternParam(options, param.left);
				break;
			case syntax_1.Syntax.ArrayPattern:
				for (var i = 0; i < param.elements.length; i++) {
					if (param.elements[i] !== null) {
						this.checkPatternParam(options, param.elements[i]);
					}
				}
				break;
			case syntax_1.Syntax.YieldExpression:
				break;
			default:
				assert_1.assert(param.type === syntax_1.Syntax.ObjectPattern, 'Invalid type');
				for (var i = 0; i < param.properties.length; i++) {
					this.checkPatternParam(options, param.properties[i].value);
				}
				break;
		}
	};
	Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
		var params = [expr];
		var options;
		switch (expr.type) {
			case syntax_1.Syntax.Identifier:
				break;
			case ArrowParameterPlaceHolder:
				params = expr.params;
				break;
			default:
				return null;
		}
		options = {
			paramSet: {}
		};
		for (var i = 0; i < params.length; ++i) {
			var param = params[i];
			if (param.type === syntax_1.Syntax.AssignmentPattern) {
				if (param.right.type === syntax_1.Syntax.YieldExpression) {
					if (param.right.argument) {
						this.throwUnexpectedToken(this.lookahead);
					}
					param.right.type = syntax_1.Syntax.Identifier;
					param.right.name = 'yield';
					delete param.right.argument;
					delete param.right.delegate;
				}
			}
			this.checkPatternParam(options, param);
			params[i] = param;
		}
		if (this.context.strict || !this.context.allowYield) {
			for (var i = 0; i < params.length; ++i) {
				var param = params[i];
				if (param.type === syntax_1.Syntax.YieldExpression) {
					this.throwUnexpectedToken(this.lookahead);
				}
			}
		}
		if (options.message === messages_1.Messages.StrictParamDupe) {
			var token = this.context.strict ? options.stricted : options.firstRestricted;
			this.throwUnexpectedToken(token, options.message);
		}
		return {
			params: params,
			stricted: options.stricted,
			firstRestricted: options.firstRestricted,
			message: options.message
		};
	};
	Parser.prototype.parseAssignmentExpression = function () {
		var expr;
		if (!this.context.allowYield && this.matchKeyword('yield')) {
			expr = this.parseYieldExpression();
		} else {
			var startToken = this.lookahead;
			var token = startToken;
			expr = this.parseConditionalExpression();
			if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
				// ECMA-262 14.2 Arrow Function Definitions
				this.context.isAssignmentTarget = false;
				this.context.isBindingElement = false;
				var list = this.reinterpretAsCoverFormalsList(expr);
				if (list) {
					if (this.hasLineTerminator) {
						this.tolerateUnexpectedToken(this.lookahead);
					}
					this.context.firstCoverInitializedNameError = null;
					var previousStrict = this.context.strict;
					var previousAllowYield = this.context.allowYield;
					this.context.allowYield = true;
					var node = this.startNode(startToken);
					this.expect('=>');
					var body = this.match('{') ? this.parseFunctionSourceElements() :
						this.isolateCoverGrammar(this.parseAssignmentExpression);
					var expression = body.type !== syntax_1.Syntax.BlockStatement;
					if (this.context.strict && list.firstRestricted) {
						this.throwUnexpectedToken(list.firstRestricted, list.message);
					}
					if (this.context.strict && list.stricted) {
						this.tolerateUnexpectedToken(list.stricted, list.message);
					}
					expr = this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
					this.context.strict = previousStrict;
					this.context.allowYield = previousAllowYield;
				}
			} else {
				if (this.matchAssign()) {
					if (!this.context.isAssignmentTarget) {
						this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
					}
					if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
						var id = (expr);
						if (this.scanner.isRestrictedWord(id.name)) {
							this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
						}
						if (this.scanner.isStrictModeReservedWord(id.name)) {
							this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
						}
					}
					if (!this.match('=')) {
						this.context.isAssignmentTarget = false;
						this.context.isBindingElement = false;
					} else {
						this.reinterpretExpressionAsPattern(expr);
					}
					token = this.nextToken();
					var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
					expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(token.value, expr, right));
					this.context.firstCoverInitializedNameError = null;
				}
			}
		}
		return expr;
	};
	// ECMA-262 12.16 Comma Operator
	Parser.prototype.parseExpression = function () {
		var startToken = this.lookahead;
		var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
		if (this.match(',')) {
			var expressions = [];
			expressions.push(expr);
			while (this.startMarker.index < this.scanner.length) {
				if (!this.match(',')) {
					break;
				}
				this.nextToken();
				expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
			}
			expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
		}
		return expr;
	};
	// ECMA-262 13.2 Block
	Parser.prototype.parseStatementListItem = function () {
		var statement = null;
		this.context.isAssignmentTarget = true;
		this.context.isBindingElement = true;
		if (this.lookahead.type === token_1.Token.Keyword) {
			switch (this.lookahead.value) {
				case 'export':
					if (this.sourceType !== 'module') {
						this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
					}
					statement = this.parseExportDeclaration();
					break;
				case 'import':
					if (this.sourceType !== 'module') {
						this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
					}
					statement = this.parseImportDeclaration();
					break;
				case 'const':
					statement = this.parseLexicalDeclaration({
						inFor: false
					});
					break;
				case 'function':
					statement = this.parseFunctionDeclaration();
					break;
				case 'class':
					statement = this.parseClassDeclaration();
					break;
				case 'let':
					statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({
						inFor: false
					}) : this.parseStatement();
					break;
				default:
					statement = this.parseStatement();
					break;
			}
		} else {
			statement = this.parseStatement();
		}
		return statement;
	};
	Parser.prototype.parseBlock = function () {
		var node = this.createNode();
		this.expect('{');
		var block = [];
		while (true) {
			if (this.match('}')) {
				break;
			}
			block.push(this.parseStatementListItem());
		}
		this.expect('}');
		return this.finalize(node, new Node.BlockStatement(block));
	};
	// ECMA-262 13.3.1 Let and Const Declarations
	Parser.prototype.parseLexicalBinding = function (kind, options) {
		var node = this.createNode();
		var params = [];
		var id = this.parsePattern(params, kind);
		// ECMA-262 12.2.1
		if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
			if (this.scanner.isRestrictedWord((id).name)) {
				this.tolerateError(messages_1.Messages.StrictVarName);
			}
		}
		var init = null;
		if (kind === 'const') {
			if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
				this.expect('=');
				init = this.isolateCoverGrammar(this.parseAssignmentExpression);
			}
		} else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
			this.expect('=');
			init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		}
		return this.finalize(node, new Node.VariableDeclarator(id, init));
	};
	Parser.prototype.parseBindingList = function (kind, options) {
		var list = [this.parseLexicalBinding(kind, options)];
		while (this.match(',')) {
			this.nextToken();
			list.push(this.parseLexicalBinding(kind, options));
		}
		return list;
	};
	Parser.prototype.isLexicalDeclaration = function () {
		var previousIndex = this.scanner.index;
		var previousLineNumber = this.scanner.lineNumber;
		var previousLineStart = this.scanner.lineStart;
		this.collectComments();
		var next = this.scanner.lex();
		this.scanner.index = previousIndex;
		this.scanner.lineNumber = previousLineNumber;
		this.scanner.lineStart = previousLineStart;
		return (next.type === token_1.Token.Identifier) ||
			(next.type === token_1.Token.Punctuator && next.value === '[') ||
			(next.type === token_1.Token.Punctuator && next.value === '{') ||
			(next.type === token_1.Token.Keyword && next.value === 'let') ||
			(next.type === token_1.Token.Keyword && next.value === 'yield');
	};
	Parser.prototype.parseLexicalDeclaration = function (options) {
		var node = this.createNode();
		var kind = this.nextToken().value;
		assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
		var declarations = this.parseBindingList(kind, options);
		this.consumeSemicolon();
		return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
	};
	// ECMA-262 13.3.3 Destructuring Binding Patterns
	Parser.prototype.parseBindingRestElement = function (params, kind) {
		var node = this.createNode();
		this.expect('...');
		var arg = this.parsePattern(params, kind);
		return this.finalize(node, new Node.RestElement(arg));
	};
	Parser.prototype.parseArrayPattern = function (params, kind) {
		var node = this.createNode();
		this.expect('[');
		var elements = [];
		while (!this.match(']')) {
			if (this.match(',')) {
				this.nextToken();
				elements.push(null);
			} else {
				if (this.match('...')) {
					elements.push(this.parseBindingRestElement(params, kind));
					break;
				} else {
					elements.push(this.parsePatternWithDefault(params, kind));
				}
				if (!this.match(']')) {
					this.expect(',');
				}
			}
		}
		this.expect(']');
		return this.finalize(node, new Node.ArrayPattern(elements));
	};
	Parser.prototype.parsePropertyPattern = function (params, kind) {
		var node = this.createNode();
		var computed = false;
		var shorthand = false;
		var method = false;
		var key;
		var value;
		if (this.lookahead.type === token_1.Token.Identifier) {
			var keyToken = this.lookahead;
			key = this.parseVariableIdentifier();
			var init = this.finalize(node, new Node.Identifier(keyToken.value));
			if (this.match('=')) {
				params.push(keyToken);
				shorthand = true;
				this.nextToken();
				var expr = this.parseAssignmentExpression();
				value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
			} else if (!this.match(':')) {
				params.push(keyToken);
				shorthand = true;
				value = init;
			} else {
				this.expect(':');
				value = this.parsePatternWithDefault(params, kind);
			}
		} else {
			computed = this.match('[');
			key = this.parseObjectPropertyKey();
			this.expect(':');
			value = this.parsePatternWithDefault(params, kind);
		}
		return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
	};
	Parser.prototype.parseObjectPattern = function (params, kind) {
		var node = this.createNode();
		var properties = [];
		this.expect('{');
		while (!this.match('}')) {
			properties.push(this.parsePropertyPattern(params, kind));
			if (!this.match('}')) {
				this.expect(',');
			}
		}
		this.expect('}');
		return this.finalize(node, new Node.ObjectPattern(properties));
	};
	Parser.prototype.parsePattern = function (params, kind) {
		var pattern;
		if (this.match('[')) {
			pattern = this.parseArrayPattern(params, kind);
		} else if (this.match('{')) {
			pattern = this.parseObjectPattern(params, kind);
		} else {
			if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
				this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.UnexpectedToken);
			}
			params.push(this.lookahead);
			pattern = this.parseVariableIdentifier(kind);
		}
		return pattern;
	};
	Parser.prototype.parsePatternWithDefault = function (params, kind) {
		var startToken = this.lookahead;
		var pattern = this.parsePattern(params, kind);
		if (this.match('=')) {
			this.nextToken();
			var previousAllowYield = this.context.allowYield;
			this.context.allowYield = true;
			var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
			this.context.allowYield = previousAllowYield;
			pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
		}
		return pattern;
	};
	// ECMA-262 13.3.2 Variable Statement
	Parser.prototype.parseVariableIdentifier = function (kind) {
		var node = this.createNode();
		var token = this.nextToken();
		if (token.type === token_1.Token.Keyword && token.value === 'yield') {
			if (this.context.strict) {
				this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
			}
			if (!this.context.allowYield) {
				this.throwUnexpectedToken(token);
			}
		} else if (token.type !== token_1.Token.Identifier) {
			if (this.context.strict && token.type === token_1.Token.Keyword && this.scanner.isStrictModeReservedWord(token.value)) {
				this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
			} else {
				if (this.context.strict || token.value !== 'let' || kind !== 'var') {
					this.throwUnexpectedToken(token);
				}
			}
		} else if (this.sourceType === 'module' && token.type === token_1.Token.Identifier && token.value === 'await') {
			this.tolerateUnexpectedToken(token);
		}
		return this.finalize(node, new Node.Identifier(token.value));
	};
	Parser.prototype.parseVariableDeclaration = function (options) {
		var node = this.createNode();
		var params = [];
		var id = this.parsePattern(params, 'var');
		// ECMA-262 12.2.1
		if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
			if (this.scanner.isRestrictedWord((id).name)) {
				this.tolerateError(messages_1.Messages.StrictVarName);
			}
		}
		var init = null;
		if (this.match('=')) {
			this.nextToken();
			init = this.isolateCoverGrammar(this.parseAssignmentExpression);
		} else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
			this.expect('=');
		}
		return this.finalize(node, new Node.VariableDeclarator(id, init));
	};
	Parser.prototype.parseVariableDeclarationList = function (options) {
		var opt = {
			inFor: options.inFor
		};
		var list = [];
		list.push(this.parseVariableDeclaration(opt));
		while (this.match(',')) {
			this.nextToken();
			list.push(this.parseVariableDeclaration(opt));
		}
		return list;
	};
	Parser.prototype.parseVariableStatement = function () {
		var node = this.createNode();
		this.expectKeyword('var');
		var declarations = this.parseVariableDeclarationList({
			inFor: false
		});
		this.consumeSemicolon();
		return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
	};
	// ECMA-262 13.4 Empty Statement
	Parser.prototype.parseEmptyStatement = function () {
		var node = this.createNode();
		this.expect(';');
		return this.finalize(node, new Node.EmptyStatement());
	};
	// ECMA-262 13.5 Expression Statement
	Parser.prototype.parseExpressionStatement = function () {
		var node = this.createNode();
		var expr = this.parseExpression();
		this.consumeSemicolon();
		return this.finalize(node, new Node.ExpressionStatement(expr));
	};
	// ECMA-262 13.6 If statement
	Parser.prototype.parseIfStatement = function () {
		var node = this.createNode();
		var consequent;
		var alternate = null;
		this.expectKeyword('if');
		this.expect('(');
		var test = this.parseExpression();
		if (!this.match(')') && this.config.tolerant) {
			this.tolerateUnexpectedToken(this.nextToken());
			consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
		} else {
			this.expect(')');
			consequent = this.parseStatement();
			if (this.matchKeyword('else')) {
				this.nextToken();
				alternate = this.parseStatement();
			}
		}
		return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
	};
	// ECMA-262 13.7.2 The do-while Statement
	Parser.prototype.parseDoWhileStatement = function () {
		var node = this.createNode();
		this.expectKeyword('do');
		var previousInIteration = this.context.inIteration;
		this.context.inIteration = true;
		var body = this.parseStatement();
		this.context.inIteration = previousInIteration;
		this.expectKeyword('while');
		this.expect('(');
		var test = this.parseExpression();
		this.expect(')');
		if (this.match(';')) {
			this.nextToken();
		}
		return this.finalize(node, new Node.DoWhileStatement(body, test));
	};
	// ECMA-262 13.7.3 The while Statement
	Parser.prototype.parseWhileStatement = function () {
		var node = this.createNode();
		var body;
		this.expectKeyword('while');
		this.expect('(');
		var test = this.parseExpression();
		if (!this.match(')') && this.config.tolerant) {
			this.tolerateUnexpectedToken(this.nextToken());
			body = this.finalize(this.createNode(), new Node.EmptyStatement());
		} else {
			this.expect(')');
			var previousInIteration = this.context.inIteration;
			this.context.inIteration = true;
			body = this.parseStatement();
			this.context.inIteration = previousInIteration;
		}
		return this.finalize(node, new Node.WhileStatement(test, body));
	};
	// ECMA-262 13.7.4 The for Statement
	// ECMA-262 13.7.5 The for-in and for-of Statements
	Parser.prototype.parseForStatement = function () {
		var init = null;
		var test = null;
		var update = null;
		var forIn = true;
		var left, right;
		var node = this.createNode();
		this.expectKeyword('for');
		this.expect('(');
		if (this.match(';')) {
			this.nextToken();
		} else {
			if (this.matchKeyword('var')) {
				init = this.createNode();
				this.nextToken();
				var previousAllowIn = this.context.allowIn;
				this.context.allowIn = false;
				var declarations = this.parseVariableDeclarationList({
					inFor: true
				});
				this.context.allowIn = previousAllowIn;
				if (declarations.length === 1 && this.matchKeyword('in')) {
					var decl = declarations[0];
					if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
						this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
					}
					init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
					this.nextToken();
					left = init;
					right = this.parseExpression();
					init = null;
				} else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
					init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
					this.nextToken();
					left = init;
					right = this.parseAssignmentExpression();
					init = null;
					forIn = false;
				} else {
					init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
					this.expect(';');
				}
			} else if (this.matchKeyword('const') || this.matchKeyword('let')) {
				init = this.createNode();
				var kind = this.nextToken().value;
				if (!this.context.strict && this.lookahead.value === 'in') {
					init = this.finalize(init, new Node.Identifier(kind));
					this.nextToken();
					left = init;
					right = this.parseExpression();
					init = null;
				} else {
					var previousAllowIn = this.context.allowIn;
					this.context.allowIn = false;
					var declarations = this.parseBindingList(kind, {
						inFor: true
					});
					this.context.allowIn = previousAllowIn;
					if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
						init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
						this.nextToken();
						left = init;
						right = this.parseExpression();
						init = null;
					} else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
						init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
						this.nextToken();
						left = init;
						right = this.parseAssignmentExpression();
						init = null;
						forIn = false;
					} else {
						this.consumeSemicolon();
						init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
					}
				}
			} else {
				var initStartToken = this.lookahead;
				var previousAllowIn = this.context.allowIn;
				this.context.allowIn = false;
				init = this.inheritCoverGrammar(this.parseAssignmentExpression);
				this.context.allowIn = previousAllowIn;
				if (this.matchKeyword('in')) {
					if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
						this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
					}
					this.nextToken();
					this.reinterpretExpressionAsPattern(init);
					left = init;
					right = this.parseExpression();
					init = null;
				} else if (this.matchContextualKeyword('of')) {
					if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
						this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
					}
					this.nextToken();
					this.reinterpretExpressionAsPattern(init);
					left = init;
					right = this.parseAssignmentExpression();
					init = null;
					forIn = false;
				} else {
					if (this.match(',')) {
						var initSeq = [init];
						while (this.match(',')) {
							this.nextToken();
							initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
						}
						init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
					}
					this.expect(';');
				}
			}
		}
		if (typeof left === 'undefined') {
			if (!this.match(';')) {
				test = this.parseExpression();
			}
			this.expect(';');
			if (!this.match(')')) {
				update = this.parseExpression();
			}
		}
		var body;
		if (!this.match(')') && this.config.tolerant) {
			this.tolerateUnexpectedToken(this.nextToken());
			body = this.finalize(this.createNode(), new Node.EmptyStatement());
		} else {
			this.expect(')');
			var previousInIteration = this.context.inIteration;
			this.context.inIteration = true;
			body = this.isolateCoverGrammar(this.parseStatement);
			this.context.inIteration = previousInIteration;
		}
		return (typeof left === 'undefined') ?
			this.finalize(node, new Node.ForStatement(init, test, update, body)) :
			forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
			this.finalize(node, new Node.ForOfStatement(left, right, body));
	};
	// ECMA-262 13.8 The continue statement
	Parser.prototype.parseContinueStatement = function () {
		var node = this.createNode();
		this.expectKeyword('continue');
		var label = null;
		if (this.lookahead.type === token_1.Token.Identifier && !this.hasLineTerminator) {
			label = this.parseVariableIdentifier();
			var key = '$' + label.name;
			if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
				this.throwError(messages_1.Messages.UnknownLabel, label.name);
			}
		}
		this.consumeSemicolon();
		if (label === null && !this.context.inIteration) {
			this.throwError(messages_1.Messages.IllegalContinue);
		}
		return this.finalize(node, new Node.ContinueStatement(label));
	};
	// ECMA-262 13.9 The break statement
	Parser.prototype.parseBreakStatement = function () {
		var node = this.createNode();
		this.expectKeyword('break');
		var label = null;
		if (this.lookahead.type === token_1.Token.Identifier && !this.hasLineTerminator) {
			label = this.parseVariableIdentifier();
			var key = '$' + label.name;
			if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
				this.throwError(messages_1.Messages.UnknownLabel, label.name);
			}
		}
		this.consumeSemicolon();
		if (label === null && !this.context.inIteration && !this.context.inSwitch) {
			this.throwError(messages_1.Messages.IllegalBreak);
		}
		return this.finalize(node, new Node.BreakStatement(label));
	};
	// ECMA-262 13.10 The return statement
	Parser.prototype.parseReturnStatement = function () {
		if (!this.context.inFunctionBody) {
			this.tolerateError(messages_1.Messages.IllegalReturn);
		}
		var node = this.createNode();
		this.expectKeyword('return');
		var hasArgument = !this.match(';') && !this.match('}') &&
			!this.hasLineTerminator && this.lookahead.type !== token_1.Token.EOF;
		var argument = hasArgument ? this.parseExpression() : null;
		this.consumeSemicolon();
		return this.finalize(node, new Node.ReturnStatement(argument));
	};
	// ECMA-262 13.11 The with statement
	Parser.prototype.parseWithStatement = function () {
		if (this.context.strict) {
			this.tolerateError(messages_1.Messages.StrictModeWith);
		}
		var node = this.createNode();
		this.expectKeyword('with');
		this.expect('(');
		var object = this.parseExpression();
		this.expect(')');
		var body = this.parseStatement();
		return this.finalize(node, new Node.WithStatement(object, body));
	};
	// ECMA-262 13.12 The switch statement
	Parser.prototype.parseSwitchCase = function () {
		var node = this.createNode();
		var test;
		if (this.matchKeyword('default')) {
			this.nextToken();
			test = null;
		} else {
			this.expectKeyword('case');
			test = this.parseExpression();
		}
		this.expect(':');
		var consequent = [];
		while (true) {
			if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
				break;
			}
			consequent.push(this.parseStatementListItem());
		}
		return this.finalize(node, new Node.SwitchCase(test, consequent));
	};
	Parser.prototype.parseSwitchStatement = function () {
		var node = this.createNode();
		this.expectKeyword('switch');
		this.expect('(');
		var discriminant = this.parseExpression();
		this.expect(')');
		var previousInSwitch = this.context.inSwitch;
		this.context.inSwitch = true;
		var cases = [];
		var defaultFound = false;
		this.expect('{');
		while (true) {
			if (this.match('}')) {
				break;
			}
			var clause = this.parseSwitchCase();
			if (clause.test === null) {
				if (defaultFound) {
					this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
				}
				defaultFound = true;
			}
			cases.push(clause);
		}
		this.expect('}');
		this.context.inSwitch = previousInSwitch;
		return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
	};
	// ECMA-262 13.13 Labelled Statements
	Parser.prototype.parseLabelledStatement = function () {
		var node = this.createNode();
		var expr = this.parseExpression();
		var statement;
		if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
			this.nextToken();
			var id = (expr);
			var key = '$' + id.name;
			if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
				this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
			}
			this.context.labelSet[key] = true;
			var labeledBody = this.parseStatement();
			delete this.context.labelSet[key];
			statement = new Node.LabeledStatement(id, labeledBody);
		} else {
			this.consumeSemicolon();
			statement = new Node.ExpressionStatement(expr);
		}
		return this.finalize(node, statement);
	};
	// ECMA-262 13.14 The throw statement
	Parser.prototype.parseThrowStatement = function () {
		var node = this.createNode();
		this.expectKeyword('throw');
		if (this.hasLineTerminator) {
			this.throwError(messages_1.Messages.NewlineAfterThrow);
		}
		var argument = this.parseExpression();
		this.consumeSemicolon();
		return this.finalize(node, new Node.ThrowStatement(argument));
	};
	// ECMA-262 13.15 The try statement
	Parser.prototype.parseCatchClause = function () {
		var node = this.createNode();
		this.expectKeyword('catch');
		this.expect('(');
		if (this.match(')')) {
			this.throwUnexpectedToken(this.lookahead);
		}
		var params = [];
		var param = this.parsePattern(params);
		var paramMap = {};
		for (var i = 0; i < params.length; i++) {
			var key = '$' + params[i].value;
			if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
				this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
			}
			paramMap[key] = true;
		}
		if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
			if (this.scanner.isRestrictedWord((param).name)) {
				this.tolerateError(messages_1.Messages.StrictCatchVariable);
			}
		}
		this.expect(')');
		var body = this.parseBlock();
		return this.finalize(node, new Node.CatchClause(param, body));
	};
	Parser.prototype.parseFinallyClause = function () {
		this.expectKeyword('finally');
		return this.parseBlock();
	};
	Parser.prototype.parseTryStatement = function () {
		var node = this.createNode();
		this.expectKeyword('try');
		var block = this.parseBlock();
		var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
		var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
		if (!handler && !finalizer) {
			this.throwError(messages_1.Messages.NoCatchOrFinally);
		}
		return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
	};
	// ECMA-262 13.16 The debugger statement
	Parser.prototype.parseDebuggerStatement = function () {
		var node = this.createNode();
		this.expectKeyword('debugger');
		this.consumeSemicolon();
		return this.finalize(node, new Node.DebuggerStatement());
	};
	// ECMA-262 13 Statements
	Parser.prototype.parseStatement = function () {
		var statement = null;
		switch (this.lookahead.type) {
			case token_1.Token.BooleanLiteral:
			case token_1.Token.NullLiteral:
			case token_1.Token.NumericLiteral:
			case token_1.Token.StringLiteral:
			case token_1.Token.Template:
			case token_1.Token.RegularExpression:
				statement = this.parseExpressionStatement();
				break;
			case token_1.Token.Punctuator:
				var value = this.lookahead.value;
				if (value === '{') {
					statement = this.parseBlock();
				} else if (value === '(') {
					statement = this.parseExpressionStatement();
				} else if (value === ';') {
					statement = this.parseEmptyStatement();
				} else {
					statement = this.parseExpressionStatement();
				}
				break;
			case token_1.Token.Identifier:
				statement = this.parseLabelledStatement();
				break;
			case token_1.Token.Keyword:
				switch (this.lookahead.value) {
					case 'break':
						statement = this.parseBreakStatement();
						break;
					case 'continue':
						statement = this.parseContinueStatement();
						break;
					case 'debugger':
						statement = this.parseDebuggerStatement();
						break;
					case 'do':
						statement = this.parseDoWhileStatement();
						break;
					case 'for':
						statement = this.parseForStatement();
						break;
					case 'function':
						statement = this.parseFunctionDeclaration();
						break;
					case 'if':
						statement = this.parseIfStatement();
						break;
					case 'return':
						statement = this.parseReturnStatement();
						break;
					case 'switch':
						statement = this.parseSwitchStatement();
						break;
					case 'throw':
						statement = this.parseThrowStatement();
						break;
					case 'try':
						statement = this.parseTryStatement();
						break;
					case 'var':
						statement = this.parseVariableStatement();
						break;
					case 'while':
						statement = this.parseWhileStatement();
						break;
					case 'with':
						statement = this.parseWithStatement();
						break;
					default:
						statement = this.parseExpressionStatement();
						break;
				}
				break;
			default:
				this.throwUnexpectedToken(this.lookahead);
		}
		return statement;
	};
	// ECMA-262 14.1 Function Definition
	Parser.prototype.parseFunctionSourceElements = function () {
		var node = this.createNode();
		this.expect('{');
		var body = this.parseDirectivePrologues();
		var previousLabelSet = this.context.labelSet;
		var previousInIteration = this.context.inIteration;
		var previousInSwitch = this.context.inSwitch;
		var previousInFunctionBody = this.context.inFunctionBody;
		this.context.labelSet = {};
		this.context.inIteration = false;
		this.context.inSwitch = false;
		this.context.inFunctionBody = true;
		while (this.startMarker.index < this.scanner.length) {
			if (this.match('}')) {
				break;
			}
			body.push(this.parseStatementListItem());
		}
		this.expect('}');
		this.context.labelSet = previousLabelSet;
		this.context.inIteration = previousInIteration;
		this.context.inSwitch = previousInSwitch;
		this.context.inFunctionBody = previousInFunctionBody;
		return this.finalize(node, new Node.BlockStatement(body));
	};
	Parser.prototype.validateParam = function (options, param, name) {
		var key = '$' + name;
		if (this.context.strict) {
			if (this.scanner.isRestrictedWord(name)) {
				options.stricted = param;
				options.message = messages_1.Messages.StrictParamName;
			}
			if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
				options.stricted = param;
				options.message = messages_1.Messages.StrictParamDupe;
			}
		} else if (!options.firstRestricted) {
			if (this.scanner.isRestrictedWord(name)) {
				options.firstRestricted = param;
				options.message = messages_1.Messages.StrictParamName;
			} else if (this.scanner.isStrictModeReservedWord(name)) {
				options.firstRestricted = param;
				options.message = messages_1.Messages.StrictReservedWord;
			} else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
				options.stricted = param;
				options.message = messages_1.Messages.StrictParamDupe;
			}
		}
		/* istanbul ignore next */
		if (typeof Object.defineProperty === 'function') {
			Object.defineProperty(options.paramSet, key, {
				value: true,
				enumerable: true,
				writable: true,
				configurable: true
			});
		} else {
			options.paramSet[key] = true;
		}
	};
	Parser.prototype.parseRestElement = function (params) {
		var node = this.createNode();
		this.expect('...');
		var arg = this.parsePattern(params);
		if (this.match('=')) {
			this.throwError(messages_1.Messages.DefaultRestParameter);
		}
		if (!this.match(')')) {
			this.throwError(messages_1.Messages.ParameterAfterRestParameter);
		}
		return this.finalize(node, new Node.RestElement(arg));
	};
	Parser.prototype.parseFormalParameter = function (options) {
		var params = [];
		var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
		for (var i = 0; i < params.length; i++) {
			this.validateParam(options, params[i], params[i].value);
		}
		options.params.push(param);
		return !this.match(')');
	};
	Parser.prototype.parseFormalParameters = function (firstRestricted) {
		var options;
		options = {
			params: [],
			firstRestricted: firstRestricted
		};
		this.expect('(');
		if (!this.match(')')) {
			options.paramSet = {};
			while (this.startMarker.index < this.scanner.length) {
				if (!this.parseFormalParameter(options)) {
					break;
				}
				this.expect(',');
			}
		}
		this.expect(')');
		return {
			params: options.params,
			stricted: options.stricted,
			firstRestricted: options.firstRestricted,
			message: options.message
		};
	};
	Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
		var node = this.createNode();
		this.expectKeyword('function');
		var isGenerator = this.match('*');
		if (isGenerator) {
			this.nextToken();
		}
		var message;
		var id = null;
		var firstRestricted = null;
		if (!identifierIsOptional || !this.match('(')) {
			var token = this.lookahead;
			id = this.parseVariableIdentifier();
			if (this.context.strict) {
				if (this.scanner.isRestrictedWord(token.value)) {
					this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
				}
			} else {
				if (this.scanner.isRestrictedWord(token.value)) {
					firstRestricted = token;
					message = messages_1.Messages.StrictFunctionName;
				} else if (this.scanner.isStrictModeReservedWord(token.value)) {
					firstRestricted = token;
					message = messages_1.Messages.StrictReservedWord;
				}
			}
		}
		var previousAllowYield = this.context.allowYield;
		this.context.allowYield = !isGenerator;
		var formalParameters = this.parseFormalParameters(firstRestricted);
		var params = formalParameters.params;
		var stricted = formalParameters.stricted;
		firstRestricted = formalParameters.firstRestricted;
		if (formalParameters.message) {
			message = formalParameters.message;
		}
		var previousStrict = this.context.strict;
		var body = this.parseFunctionSourceElements();
		if (this.context.strict && firstRestricted) {
			this.throwUnexpectedToken(firstRestricted, message);
		}
		if (this.context.strict && stricted) {
			this.tolerateUnexpectedToken(stricted, message);
		}
		this.context.strict = previousStrict;
		this.context.allowYield = previousAllowYield;
		return this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
	};
	Parser.prototype.parseFunctionExpression = function () {
		var node = this.createNode();
		this.expectKeyword('function');
		var isGenerator = this.match('*');
		if (isGenerator) {
			this.nextToken();
		}
		var message;
		var id = null;
		var firstRestricted;
		var previousAllowYield = this.context.allowYield;
		this.context.allowYield = !isGenerator;
		if (!this.match('(')) {
			var token = this.lookahead;
			id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
			if (this.context.strict) {
				if (this.scanner.isRestrictedWord(token.value)) {
					this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
				}
			} else {
				if (this.scanner.isRestrictedWord(token.value)) {
					firstRestricted = token;
					message = messages_1.Messages.StrictFunctionName;
				} else if (this.scanner.isStrictModeReservedWord(token.value)) {
					firstRestricted = token;
					message = messages_1.Messages.StrictReservedWord;
				}
			}
		}
		var formalParameters = this.parseFormalParameters(firstRestricted);
		var params = formalParameters.params;
		var stricted = formalParameters.stricted;
		firstRestricted = formalParameters.firstRestricted;
		if (formalParameters.message) {
			message = formalParameters.message;
		}
		var previousStrict = this.context.strict;
		var body = this.parseFunctionSourceElements();
		if (this.context.strict && firstRestricted) {
			this.throwUnexpectedToken(firstRestricted, message);
		}
		if (this.context.strict && stricted) {
			this.tolerateUnexpectedToken(stricted, message);
		}
		this.context.strict = previousStrict;
		this.context.allowYield = previousAllowYield;
		return this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
	};
	// ECMA-262 14.1.1 Directive Prologues
	Parser.prototype.parseDirective = function () {
		var token = this.lookahead;
		var directive = null;
		var node = this.createNode();
		var expr = this.parseExpression();
		if (expr.type === syntax_1.Syntax.Literal) {
			directive = this.getTokenRaw(token).slice(1, -1);
		}
		this.consumeSemicolon();
		return this.finalize(node, directive ? new Node.Directive(expr, directive) :
			new Node.ExpressionStatement(expr));
	};
	Parser.prototype.parseDirectivePrologues = function () {
		var firstRestricted = null;
		var body = [];
		while (true) {
			var token = this.lookahead;
			if (token.type !== token_1.Token.StringLiteral) {
				break;
			}
			var statement = this.parseDirective();
			body.push(statement);
			var directive = statement.directive;
			if (typeof directive !== 'string') {
				break;
			}
			if (directive === 'use strict') {
				this.context.strict = true;
				if (firstRestricted) {
					this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
				}
			} else {
				if (!firstRestricted && token.octal) {
					firstRestricted = token;
				}
			}
		}
		return body;
	};
	// ECMA-262 14.3 Method Definitions
	Parser.prototype.qualifiedPropertyName = function (token) {
		switch (token.type) {
			case token_1.Token.Identifier:
			case token_1.Token.StringLiteral:
			case token_1.Token.BooleanLiteral:
			case token_1.Token.NullLiteral:
			case token_1.Token.NumericLiteral:
			case token_1.Token.Keyword:
				return true;
			case token_1.Token.Punctuator:
				return token.value === '[';
		}
		return false;
	};
	Parser.prototype.parseGetterMethod = function () {
		var node = this.createNode();
		this.expect('(');
		this.expect(')');
		var isGenerator = false;
		var params = {
			params: [],
			stricted: null,
			firstRestricted: null,
			message: null
		};
		var previousAllowYield = this.context.allowYield;
		this.context.allowYield = false;
		var method = this.parsePropertyMethod(params);
		this.context.allowYield = previousAllowYield;
		return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	};
	Parser.prototype.parseSetterMethod = function () {
		var node = this.createNode();
		var options = {
			params: [],
			firstRestricted: null,
			paramSet: {}
		};
		var isGenerator = false;
		var previousAllowYield = this.context.allowYield;
		this.context.allowYield = false;
		this.expect('(');
		if (this.match(')')) {
			this.tolerateUnexpectedToken(this.lookahead);
		} else {
			this.parseFormalParameter(options);
		}
		this.expect(')');
		var method = this.parsePropertyMethod(options);
		this.context.allowYield = previousAllowYield;
		return this.finalize(node, new Node.FunctionExpression(null, options.params, method, isGenerator));
	};
	Parser.prototype.parseGeneratorMethod = function () {
		var node = this.createNode();
		var isGenerator = true;
		var previousAllowYield = this.context.allowYield;
		this.context.allowYield = true;
		var params = this.parseFormalParameters();
		this.context.allowYield = false;
		var method = this.parsePropertyMethod(params);
		this.context.allowYield = previousAllowYield;
		return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
	};
	// ECMA-262 14.4 Generator Function Definitions
	Parser.prototype.isStartOfExpression = function () {
		var start = true;
		var value = this.lookahead.value;
		switch (this.lookahead.type) {
			case token_1.Token.Punctuator:
				start = (value === '[') || (value === '(') || (value === '{') ||
					(value === '+') || (value === '-') ||
					(value === '!') || (value === '~') ||
					(value === '++') || (value === '--') ||
					(value === '/') || (value === '/='); // regular expression literal
				break;
			case token_1.Token.Keyword:
				start = (value === 'class') || (value === 'delete') ||
					(value === 'function') || (value === 'let') || (value === 'new') ||
					(value === 'super') || (value === 'this') || (value === 'typeof') ||
					(value === 'void') || (value === 'yield');
				break;
			default:
				break;
		}
		return start;
	};
	Parser.prototype.parseYieldExpression = function () {
		var node = this.createNode();
		this.expectKeyword('yield');
		var argument = null;
		var delegate = false;
		if (!this.hasLineTerminator) {
			var previousAllowYield = this.context.allowYield;
			this.context.allowYield = false;
			delegate = this.match('*');
			if (delegate) {
				this.nextToken();
				argument = this.parseAssignmentExpression();
			} else if (this.isStartOfExpression()) {
				argument = this.parseAssignmentExpression();
			}
			this.context.allowYield = previousAllowYield;
		}
		return this.finalize(node, new Node.YieldExpression(argument, delegate));
	};
	// ECMA-262 14.5 Class Definitions
	Parser.prototype.parseClassElement = function (hasConstructor) {
		var token = this.lookahead;
		var node = this.createNode();
		var kind;
		var key;
		var value;
		var computed = false;
		var method = false;
		var isStatic = false;
		if (this.match('*')) {
			this.nextToken();
		} else {
			computed = this.match('[');
			key = this.parseObjectPropertyKey();
			var id = key;
			if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
				token = this.lookahead;
				isStatic = true;
				computed = this.match('[');
				if (this.match('*')) {
					this.nextToken();
				} else {
					key = this.parseObjectPropertyKey();
				}
			}
		}
		var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
		if (token.type === token_1.Token.Identifier) {
			if (token.value === 'get' && lookaheadPropertyKey) {
				kind = 'get';
				computed = this.match('[');
				key = this.parseObjectPropertyKey();
				this.context.allowYield = false;
				value = this.parseGetterMethod();
			} else if (token.value === 'set' && lookaheadPropertyKey) {
				kind = 'set';
				computed = this.match('[');
				key = this.parseObjectPropertyKey();
				value = this.parseSetterMethod();
			}
		} else if (token.type === token_1.Token.Punctuator && token.value === '*' && lookaheadPropertyKey) {
			kind = 'init';
			computed = this.match('[');
			key = this.parseObjectPropertyKey();
			value = this.parseGeneratorMethod();
			method = true;
		}
		if (!kind && key && this.match('(')) {
			kind = 'init';
			value = this.parsePropertyMethodFunction();
			method = true;
		}
		if (!kind) {
			this.throwUnexpectedToken(this.lookahead);
		}
		if (kind === 'init') {
			kind = 'method';
		}
		if (!computed) {
			if (isStatic && this.isPropertyKey(key, 'prototype')) {
				this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
			}
			if (!isStatic && this.isPropertyKey(key, 'constructor')) {
				if (kind !== 'method' || !method || value.generator) {
					this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
				}
				if (hasConstructor.value) {
					this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
				} else {
					hasConstructor.value = true;
				}
				kind = 'constructor';
			}
		}
		return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
	};
	Parser.prototype.parseClassElementList = function () {
		var body = [];
		var hasConstructor = {
			value: false
		};
		this.expect('{');
		while (!this.match('}')) {
			if (this.match(';')) {
				this.nextToken();
			} else {
				body.push(this.parseClassElement(hasConstructor));
			}
		}
		this.expect('}');
		return body;
	};
	Parser.prototype.parseClassBody = function () {
		var node = this.createNode();
		var elementList = this.parseClassElementList();
		return this.finalize(node, new Node.ClassBody(elementList));
	};
	Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
		var node = this.createNode();
		var previousStrict = this.context.strict;
		this.context.strict = true;
		this.expectKeyword('class');
		var id = (identifierIsOptional && (this.lookahead.type !== token_1.Token.Identifier)) ? null : this.parseVariableIdentifier();
		var superClass = null;
		if (this.matchKeyword('extends')) {
			this.nextToken();
			superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
		}
		var classBody = this.parseClassBody();
		this.context.strict = previousStrict;
		return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
	};
	Parser.prototype.parseClassExpression = function () {
		var node = this.createNode();
		var previousStrict = this.context.strict;
		this.context.strict = true;
		this.expectKeyword('class');
		var id = (this.lookahead.type === token_1.Token.Identifier) ? this.parseVariableIdentifier() : null;
		var superClass = null;
		if (this.matchKeyword('extends')) {
			this.nextToken();
			superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
		}
		var classBody = this.parseClassBody();
		this.context.strict = previousStrict;
		return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
	};
	// ECMA-262 15.1 Scripts
	// ECMA-262 15.2 Modules
	Parser.prototype.parseProgram = function () {
		var node = this.createNode();
		var body = this.parseDirectivePrologues();
		while (this.startMarker.index < this.scanner.length) {
			body.push(this.parseStatementListItem());
		}
		return this.finalize(node, new Node.Program(body, this.sourceType));
	};
	// ECMA-262 15.2.2 Imports
	Parser.prototype.parseModuleSpecifier = function () {
		var node = this.createNode();
		if (this.lookahead.type !== token_1.Token.StringLiteral) {
			this.throwError(messages_1.Messages.InvalidModuleSpecifier);
		}
		var token = this.nextToken();
		var raw = this.getTokenRaw(token);
		return this.finalize(node, new Node.Literal(token.value, raw));
	};
	// import {<foo as bar>} ...;
	Parser.prototype.parseImportSpecifier = function () {
		var node = this.createNode();
		var imported;
		var local;
		if (this.lookahead.type === token_1.Token.Identifier) {
			imported = this.parseVariableIdentifier();
			local = imported;
			if (this.matchContextualKeyword('as')) {
				this.nextToken();
				local = this.parseVariableIdentifier();
			}
		} else {
			imported = this.parseIdentifierName();
			local = imported;
			if (this.matchContextualKeyword('as')) {
				this.nextToken();
				local = this.parseVariableIdentifier();
			} else {
				this.throwUnexpectedToken(this.nextToken());
			}
		}
		return this.finalize(node, new Node.ImportSpecifier(local, imported));
	};
	// {foo, bar as bas}
	Parser.prototype.parseNamedImports = function () {
		this.expect('{');
		var specifiers = [];
		while (!this.match('}')) {
			specifiers.push(this.parseImportSpecifier());
			if (!this.match('}')) {
				this.expect(',');
			}
		}
		this.expect('}');
		return specifiers;
	};
	// import <foo> ...;
	Parser.prototype.parseImportDefaultSpecifier = function () {
		var node = this.createNode();
		var local = this.parseIdentifierName();
		return this.finalize(node, new Node.ImportDefaultSpecifier(local));
	};
	// import <* as foo> ...;
	Parser.prototype.parseImportNamespaceSpecifier = function () {
		var node = this.createNode();
		this.expect('*');
		if (!this.matchContextualKeyword('as')) {
			this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
		}
		this.nextToken();
		var local = this.parseIdentifierName();
		return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
	};
	Parser.prototype.parseImportDeclaration = function () {
		if (this.context.inFunctionBody) {
			this.throwError(messages_1.Messages.IllegalImportDeclaration);
		}
		var node = this.createNode();
		this.expectKeyword('import');
		var src;
		var specifiers = [];
		if (this.lookahead.type === token_1.Token.StringLiteral) {
			// import 'foo';
			src = this.parseModuleSpecifier();
		} else {
			if (this.match('{')) {
				// import {bar}
				specifiers = specifiers.concat(this.parseNamedImports());
			} else if (this.match('*')) {
				// import * as foo
				specifiers.push(this.parseImportNamespaceSpecifier());
			} else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
				// import foo
				specifiers.push(this.parseImportDefaultSpecifier());
				if (this.match(',')) {
					this.nextToken();
					if (this.match('*')) {
						// import foo, * as foo
						specifiers.push(this.parseImportNamespaceSpecifier());
					} else if (this.match('{')) {
						// import foo, {bar}
						specifiers = specifiers.concat(this.parseNamedImports());
					} else {
						this.throwUnexpectedToken(this.lookahead);
					}
				}
			} else {
				this.throwUnexpectedToken(this.nextToken());
			}
			if (!this.matchContextualKeyword('from')) {
				var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
				this.throwError(message, this.lookahead.value);
			}
			this.nextToken();
			src = this.parseModuleSpecifier();
		}
		this.consumeSemicolon();
		return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
	};
	// ECMA-262 15.2.3 Exports
	Parser.prototype.parseExportSpecifier = function () {
		var node = this.createNode();
		var local = this.parseIdentifierName();
		var exported = local;
		if (this.matchContextualKeyword('as')) {
			this.nextToken();
			exported = this.parseIdentifierName();
		}
		return this.finalize(node, new Node.ExportSpecifier(local, exported));
	};
	Parser.prototype.parseExportDeclaration = function () {
		if (this.context.inFunctionBody) {
			this.throwError(messages_1.Messages.IllegalExportDeclaration);
		}
		var node = this.createNode();
		this.expectKeyword('export');
		var exportDeclaration;
		if (this.matchKeyword('default')) {
			// export default ...
			this.nextToken();
			if (this.matchKeyword('function')) {
				// export default function foo () {}
				// export default function () {}
				var declaration = this.parseFunctionDeclaration(true);
				exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
			} else if (this.matchKeyword('class')) {
				// export default class foo {}
				var declaration = this.parseClassDeclaration(true);
				exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
			} else {
				if (this.matchContextualKeyword('from')) {
					this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
				}
				// export default {};
				// export default [];
				// export default (1 + 2);
				var declaration = this.match('{') ? this.parseObjectInitializer() :
					this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
				this.consumeSemicolon();
				exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
			}
		} else if (this.match('*')) {
			// export * from 'foo';
			this.nextToken();
			if (!this.matchContextualKeyword('from')) {
				var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
				this.throwError(message, this.lookahead.value);
			}
			this.nextToken();
			var src = this.parseModuleSpecifier();
			this.consumeSemicolon();
			exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
		} else if (this.lookahead.type === token_1.Token.Keyword) {
			// export var f = 1;
			var declaration = void 0;
			switch (this.lookahead.value) {
				case 'let':
				case 'const':
					declaration = this.parseLexicalDeclaration({
						inFor: false
					});
					break;
				case 'var':
				case 'class':
				case 'function':
					declaration = this.parseStatementListItem();
					break;
				default:
					this.throwUnexpectedToken(this.lookahead);
			}
			exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
		} else {
			var specifiers = [];
			var source = null;
			var isExportFromIdentifier = false;
			this.expect('{');
			while (!this.match('}')) {
				isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
				specifiers.push(this.parseExportSpecifier());
				if (!this.match('}')) {
					this.expect(',');
				}
			}
			this.expect('}');
			if (this.matchContextualKeyword('from')) {
				// export {default} from 'foo';
				// export {foo} from 'foo';
				this.nextToken();
				source = this.parseModuleSpecifier();
				this.consumeSemicolon();
			} else if (isExportFromIdentifier) {
				// export {default}; // missing fromClause
				var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
				this.throwError(message, this.lookahead.value);
			} else {
				// export {foo};
				this.consumeSemicolon();
			}
			exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
		}
		return exportDeclaration;
	};
	return Parser;
}());
exports.Parser = Parser;