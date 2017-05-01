"use strict";
var syntax_1 = require("./syntax");
var ArrayExpression = (function () {
    function ArrayExpression(elements) {
        this.type = syntax_1.Syntax.ArrayExpression;
        this.elements = elements;
    }
    return ArrayExpression;
}());
exports.ArrayExpression = ArrayExpression;
var ArrayPattern = (function () {
    function ArrayPattern(elements) {
        this.type = syntax_1.Syntax.ArrayPattern;
        this.elements = elements;
    }
    return ArrayPattern;
}());
exports.ArrayPattern = ArrayPattern;
var ArrowFunctionExpression = (function () {
    function ArrowFunctionExpression(params, body, expression) {
        this.type = syntax_1.Syntax.ArrowFunctionExpression;
        this.id = null;
        this.params = params;
        this.body = body;
        this.generator = false;
        this.expression = expression;
    }
    return ArrowFunctionExpression;
}());
exports.ArrowFunctionExpression = ArrowFunctionExpression;
var AssignmentExpression = (function () {
    function AssignmentExpression(operator, left, right) {
        this.type = syntax_1.Syntax.AssignmentExpression;
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
    return AssignmentExpression;
}());
exports.AssignmentExpression = AssignmentExpression;
var AssignmentPattern = (function () {
    function AssignmentPattern(left, right) {
        this.type = syntax_1.Syntax.AssignmentPattern;
        this.left = left;
        this.right = right;
    }
    return AssignmentPattern;
}());
exports.AssignmentPattern = AssignmentPattern;
var BinaryExpression = (function () {
    function BinaryExpression(operator, left, right) {
        var logical = (operator === '||' || operator === '&&');
        this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
    return BinaryExpression;
}());
exports.BinaryExpression = BinaryExpression;
var BlockStatement = (function () {
    function BlockStatement(body) {
        this.type = syntax_1.Syntax.BlockStatement;
        this.body = body;
    }
    return BlockStatement;
}());
exports.BlockStatement = BlockStatement;
var BreakStatement = (function () {
    function BreakStatement(label) {
        this.type = syntax_1.Syntax.BreakStatement;
        this.label = label;
    }
    return BreakStatement;
}());
exports.BreakStatement = BreakStatement;
var CallExpression = (function () {
    function CallExpression(callee, args) {
        this.type = syntax_1.Syntax.CallExpression;
        this.callee = callee;
        this.arguments = args;
    }
    return CallExpression;
}());
exports.CallExpression = CallExpression;
var CatchClause = (function () {
    function CatchClause(param, body) {
        this.type = syntax_1.Syntax.CatchClause;
        this.param = param;
        this.body = body;
    }
    return CatchClause;
}());
exports.CatchClause = CatchClause;
var ClassBody = (function () {
    function ClassBody(body) {
        this.type = syntax_1.Syntax.ClassBody;
        this.body = body;
    }
    return ClassBody;
}());
exports.ClassBody = ClassBody;
var ClassDeclaration = (function () {
    function ClassDeclaration(id, superClass, body) {
        this.type = syntax_1.Syntax.ClassDeclaration;
        this.id = id;
        this.superClass = superClass;
        this.body = body;
    }
    return ClassDeclaration;
}());
exports.ClassDeclaration = ClassDeclaration;
var ClassExpression = (function () {
    function ClassExpression(id, superClass, body) {
        this.type = syntax_1.Syntax.ClassExpression;
        this.id = id;
        this.superClass = superClass;
        this.body = body;
    }
    return ClassExpression;
}());
exports.ClassExpression = ClassExpression;
var ComputedMemberExpression = (function () {
    function ComputedMemberExpression(object, property) {
        this.type = syntax_1.Syntax.MemberExpression;
        this.computed = true;
        this.object = object;
        this.property = property;
    }
    return ComputedMemberExpression;
}());
exports.ComputedMemberExpression = ComputedMemberExpression;
var ConditionalExpression = (function () {
    function ConditionalExpression(test, consequent, alternate) {
        this.type = syntax_1.Syntax.ConditionalExpression;
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
    }
    return ConditionalExpression;
}());
exports.ConditionalExpression = ConditionalExpression;
var ContinueStatement = (function () {
    function ContinueStatement(label) {
        this.type = syntax_1.Syntax.ContinueStatement;
        this.label = label;
    }
    return ContinueStatement;
}());
exports.ContinueStatement = ContinueStatement;
var DebuggerStatement = (function () {
    function DebuggerStatement() {
        this.type = syntax_1.Syntax.DebuggerStatement;
    }
    return DebuggerStatement;
}());
exports.DebuggerStatement = DebuggerStatement;
var Directive = (function () {
    function Directive(expression, directive) {
        this.type = syntax_1.Syntax.ExpressionStatement;
        this.expression = expression;
        this.directive = directive;
    }
    return Directive;
}());
exports.Directive = Directive;
var DoWhileStatement = (function () {
    function DoWhileStatement(body, test) {
        this.type = syntax_1.Syntax.DoWhileStatement;
        this.body = body;
        this.test = test;
    }
    return DoWhileStatement;
}());
exports.DoWhileStatement = DoWhileStatement;
var EmptyStatement = (function () {
    function EmptyStatement() {
        this.type = syntax_1.Syntax.EmptyStatement;
    }
    return EmptyStatement;
}());
exports.EmptyStatement = EmptyStatement;
var ExportAllDeclaration = (function () {
    function ExportAllDeclaration(source) {
        this.type = syntax_1.Syntax.ExportAllDeclaration;
        this.source = source;
    }
    return ExportAllDeclaration;
}());
exports.ExportAllDeclaration = ExportAllDeclaration;
var ExportDefaultDeclaration = (function () {
    function ExportDefaultDeclaration(declaration) {
        this.type = syntax_1.Syntax.ExportDefaultDeclaration;
        this.declaration = declaration;
    }
    return ExportDefaultDeclaration;
}());
exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
var ExportNamedDeclaration = (function () {
    function ExportNamedDeclaration(declaration, specifiers, source) {
        this.type = syntax_1.Syntax.ExportNamedDeclaration;
        this.declaration = declaration;
        this.specifiers = specifiers;
        this.source = source;
    }
    return ExportNamedDeclaration;
}());
exports.ExportNamedDeclaration = ExportNamedDeclaration;
var ExportSpecifier = (function () {
    function ExportSpecifier(local, exported) {
        this.type = syntax_1.Syntax.ExportSpecifier;
        this.exported = exported;
        this.local = local;
    }
    return ExportSpecifier;
}());
exports.ExportSpecifier = ExportSpecifier;
var ExpressionStatement = (function () {
    function ExpressionStatement(expression) {
        this.type = syntax_1.Syntax.ExpressionStatement;
        this.expression = expression;
    }
    return ExpressionStatement;
}());
exports.ExpressionStatement = ExpressionStatement;
var ForInStatement = (function () {
    function ForInStatement(left, right, body) {
        this.type = syntax_1.Syntax.ForInStatement;
        this.left = left;
        this.right = right;
        this.body = body;
        this.each = false;
    }
    return ForInStatement;
}());
exports.ForInStatement = ForInStatement;
var ForOfStatement = (function () {
    function ForOfStatement(left, right, body) {
        this.type = syntax_1.Syntax.ForOfStatement;
        this.left = left;
        this.right = right;
        this.body = body;
    }
    return ForOfStatement;
}());
exports.ForOfStatement = ForOfStatement;
var ForStatement = (function () {
    function ForStatement(init, test, update, body) {
        this.type = syntax_1.Syntax.ForStatement;
        this.init = init;
        this.test = test;
        this.update = update;
        this.body = body;
    }
    return ForStatement;
}());
exports.ForStatement = ForStatement;
var FunctionDeclaration = (function () {
    function FunctionDeclaration(id, params, body, generator) {
        this.type = syntax_1.Syntax.FunctionDeclaration;
        this.id = id;
        this.params = params;
        this.body = body;
        this.generator = generator;
        this.expression = false;
    }
    return FunctionDeclaration;
}());
exports.FunctionDeclaration = FunctionDeclaration;
var FunctionExpression = (function () {
    function FunctionExpression(id, params, body, generator) {
        this.type = syntax_1.Syntax.FunctionExpression;
        this.id = id;
        this.params = params;
        this.body = body;
        this.generator = generator;
        this.expression = false;
    }
    return FunctionExpression;
}());
exports.FunctionExpression = FunctionExpression;
var Identifier = (function () {
    function Identifier(name) {
        this.type = syntax_1.Syntax.Identifier;
        this.name = name;
    }
    return Identifier;
}());
exports.Identifier = Identifier;
var IfStatement = (function () {
    function IfStatement(test, consequent, alternate) {
        this.type = syntax_1.Syntax.IfStatement;
        this.test = test;
        this.consequent = consequent;
        this.alternate = alternate;
    }
    return IfStatement;
}());
exports.IfStatement = IfStatement;
var ImportDeclaration = (function () {
    function ImportDeclaration(specifiers, source) {
        this.type = syntax_1.Syntax.ImportDeclaration;
        this.specifiers = specifiers;
        this.source = source;
    }
    return ImportDeclaration;
}());
exports.ImportDeclaration = ImportDeclaration;
var ImportDefaultSpecifier = (function () {
    function ImportDefaultSpecifier(local) {
        this.type = syntax_1.Syntax.ImportDefaultSpecifier;
        this.local = local;
    }
    return ImportDefaultSpecifier;
}());
exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
var ImportNamespaceSpecifier = (function () {
    function ImportNamespaceSpecifier(local) {
        this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
        this.local = local;
    }
    return ImportNamespaceSpecifier;
}());
exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
var ImportSpecifier = (function () {
    function ImportSpecifier(local, imported) {
        this.type = syntax_1.Syntax.ImportSpecifier;
        this.local = local;
        this.imported = imported;
    }
    return ImportSpecifier;
}());
exports.ImportSpecifier = ImportSpecifier;
var LabeledStatement = (function () {
    function LabeledStatement(label, body) {
        this.type = syntax_1.Syntax.LabeledStatement;
        this.label = label;
        this.body = body;
    }
    return LabeledStatement;
}());
exports.LabeledStatement = LabeledStatement;
var Literal = (function () {
    function Literal(value, raw) {
        this.type = syntax_1.Syntax.Literal;
        this.value = value;
        this.raw = raw;
    }
    return Literal;
}());
exports.Literal = Literal;
var MetaProperty = (function () {
    function MetaProperty(meta, property) {
        this.type = syntax_1.Syntax.MetaProperty;
        this.meta = meta;
        this.property = property;
    }
    return MetaProperty;
}());
exports.MetaProperty = MetaProperty;
var MethodDefinition = (function () {
    function MethodDefinition(key, computed, value, kind, isStatic) {
        this.type = syntax_1.Syntax.MethodDefinition;
        this.key = key;
        this.computed = computed;
        this.value = value;
        this.kind = kind;
        this.static = isStatic;
    }
    return MethodDefinition;
}());
exports.MethodDefinition = MethodDefinition;
var NewExpression = (function () {
    function NewExpression(callee, args) {
        this.type = syntax_1.Syntax.NewExpression;
        this.callee = callee;
        this.arguments = args;
    }
    return NewExpression;
}());
exports.NewExpression = NewExpression;
var ObjectExpression = (function () {
    function ObjectExpression(properties) {
        this.type = syntax_1.Syntax.ObjectExpression;
        this.properties = properties;
    }
    return ObjectExpression;
}());
exports.ObjectExpression = ObjectExpression;
var ObjectPattern = (function () {
    function ObjectPattern(properties) {
        this.type = syntax_1.Syntax.ObjectPattern;
        this.properties = properties;
    }
    return ObjectPattern;
}());
exports.ObjectPattern = ObjectPattern;
var Program = (function () {
    function Program(body, sourceType) {
        this.type = syntax_1.Syntax.Program;
        this.body = body;
        this.sourceType = sourceType;
    }
    return Program;
}());
exports.Program = Program;
var Property = (function () {
    function Property(kind, key, computed, value, method, shorthand) {
        this.type = syntax_1.Syntax.Property;
        this.key = key;
        this.computed = computed;
        this.value = value;
        this.kind = kind;
        this.method = method;
        this.shorthand = shorthand;
    }
    return Property;
}());
exports.Property = Property;
var RegexLiteral = (function () {
    function RegexLiteral(value, raw, regex) {
        this.type = syntax_1.Syntax.Literal;
        this.value = value;
        this.raw = raw;
        this.regex = regex;
    }
    return RegexLiteral;
}());
exports.RegexLiteral = RegexLiteral;
var RestElement = (function () {
    function RestElement(argument) {
        this.type = syntax_1.Syntax.RestElement;
        this.argument = argument;
    }
    return RestElement;
}());
exports.RestElement = RestElement;
var ReturnStatement = (function () {
    function ReturnStatement(argument) {
        this.type = syntax_1.Syntax.ReturnStatement;
        this.argument = argument;
    }
    return ReturnStatement;
}());
exports.ReturnStatement = ReturnStatement;
var SequenceExpression = (function () {
    function SequenceExpression(expressions) {
        this.type = syntax_1.Syntax.SequenceExpression;
        this.expressions = expressions;
    }
    return SequenceExpression;
}());
exports.SequenceExpression = SequenceExpression;
var SpreadElement = (function () {
    function SpreadElement(argument) {
        this.type = syntax_1.Syntax.SpreadElement;
        this.argument = argument;
    }
    return SpreadElement;
}());
exports.SpreadElement = SpreadElement;
var StaticMemberExpression = (function () {
    function StaticMemberExpression(object, property) {
        this.type = syntax_1.Syntax.MemberExpression;
        this.computed = false;
        this.object = object;
        this.property = property;
    }
    return StaticMemberExpression;
}());
exports.StaticMemberExpression = StaticMemberExpression;
var Super = (function () {
    function Super() {
        this.type = syntax_1.Syntax.Super;
    }
    return Super;
}());
exports.Super = Super;
var SwitchCase = (function () {
    function SwitchCase(test, consequent) {
        this.type = syntax_1.Syntax.SwitchCase;
        this.test = test;
        this.consequent = consequent;
    }
    return SwitchCase;
}());
exports.SwitchCase = SwitchCase;
var SwitchStatement = (function () {
    function SwitchStatement(discriminant, cases) {
        this.type = syntax_1.Syntax.SwitchStatement;
        this.discriminant = discriminant;
        this.cases = cases;
    }
    return SwitchStatement;
}());
exports.SwitchStatement = SwitchStatement;
var TaggedTemplateExpression = (function () {
    function TaggedTemplateExpression(tag, quasi) {
        this.type = syntax_1.Syntax.TaggedTemplateExpression;
        this.tag = tag;
        this.quasi = quasi;
    }
    return TaggedTemplateExpression;
}());
exports.TaggedTemplateExpression = TaggedTemplateExpression;
var TemplateElement = (function () {
    function TemplateElement(value, tail) {
        this.type = syntax_1.Syntax.TemplateElement;
        this.value = value;
        this.tail = tail;
    }
    return TemplateElement;
}());
exports.TemplateElement = TemplateElement;
var TemplateLiteral = (function () {
    function TemplateLiteral(quasis, expressions) {
        this.type = syntax_1.Syntax.TemplateLiteral;
        this.quasis = quasis;
        this.expressions = expressions;
    }
    return TemplateLiteral;
}());
exports.TemplateLiteral = TemplateLiteral;
var ThisExpression = (function () {
    function ThisExpression() {
        this.type = syntax_1.Syntax.ThisExpression;
    }
    return ThisExpression;
}());
exports.ThisExpression = ThisExpression;
var ThrowStatement = (function () {
    function ThrowStatement(argument) {
        this.type = syntax_1.Syntax.ThrowStatement;
        this.argument = argument;
    }
    return ThrowStatement;
}());
exports.ThrowStatement = ThrowStatement;
var TryStatement = (function () {
    function TryStatement(block, handler, finalizer) {
        this.type = syntax_1.Syntax.TryStatement;
        this.block = block;
        this.handler = handler;
        this.finalizer = finalizer;
    }
    return TryStatement;
}());
exports.TryStatement = TryStatement;
var UnaryExpression = (function () {
    function UnaryExpression(operator, argument) {
        this.type = syntax_1.Syntax.UnaryExpression;
        this.operator = operator;
        this.argument = argument;
        this.prefix = true;
    }
    return UnaryExpression;
}());
exports.UnaryExpression = UnaryExpression;
var UpdateExpression = (function () {
    function UpdateExpression(operator, argument, prefix) {
        this.type = syntax_1.Syntax.UpdateExpression;
        this.operator = operator;
        this.argument = argument;
        this.prefix = prefix;
    }
    return UpdateExpression;
}());
exports.UpdateExpression = UpdateExpression;
var VariableDeclaration = (function () {
    function VariableDeclaration(declarations, kind) {
        this.type = syntax_1.Syntax.VariableDeclaration;
        this.declarations = declarations;
        this.kind = kind;
    }
    return VariableDeclaration;
}());
exports.VariableDeclaration = VariableDeclaration;
var VariableDeclarator = (function () {
    function VariableDeclarator(id, init) {
        this.type = syntax_1.Syntax.VariableDeclarator;
        this.id = id;
        this.init = init;
    }
    return VariableDeclarator;
}());
exports.VariableDeclarator = VariableDeclarator;
var WhileStatement = (function () {
    function WhileStatement(test, body) {
        this.type = syntax_1.Syntax.WhileStatement;
        this.test = test;
        this.body = body;
    }
    return WhileStatement;
}());
exports.WhileStatement = WhileStatement;
var WithStatement = (function () {
    function WithStatement(object, body) {
        this.type = syntax_1.Syntax.WithStatement;
        this.object = object;
        this.body = body;
    }
    return WithStatement;
}());
exports.WithStatement = WithStatement;
var YieldExpression = (function () {
    function YieldExpression(argument, delegate) {
        this.type = syntax_1.Syntax.YieldExpression;
        this.argument = argument;
        this.delegate = delegate;
    }
    return YieldExpression;
}());
exports.YieldExpression = YieldExpression;