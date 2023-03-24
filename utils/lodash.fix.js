/**
 * 修复 微信小程序中lodash 的运行环境
 */

global.Object = Object;
global.Array = Array;
// global.Buffer = Buffer
global.DataView = DataView;
global.Date = Date;
global.Error = Error;
global.Float32Array = Float32Array;
global.Float64Array = Float64Array;
global.Function = Function;
global.Int8Array = Int8Array;
global.Int16Array = Int16Array;
global.Int32Array = Int32Array;
global.Map = Map;
global.Math = Math;
global.Promise = Promise;
global.RegExp = RegExp;
global.Set = Set;
global.String = String;
global.Symbol = Symbol;
global.TypeError = TypeError;
global.Uint8Array = Uint8Array;
global.Uint8ClampedArray = Uint8ClampedArray;
global.Uint16Array = Uint16Array;
global.Uint32Array = Uint32Array;
global.WeakMap = WeakMap;
global.clearTimeout = clearTimeout;
global.isFinite = isFinite;
global.parseInt = parseInt;
global.setTimeout = setTimeout;
