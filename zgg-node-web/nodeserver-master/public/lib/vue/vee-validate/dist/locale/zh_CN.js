var messages = {
  after: function after(field, _ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var target = _ref2[0];
    return ' ' + field + '必须在' + target + '之后';
  },
  alpha_dash: function alpha_dash(field) {
    return ' ' + field + '能够包含字母数字字符，包括破折号、下划线';
  },
  alpha_num: function alpha_num(field) {
    return field + ' 只能包含字母数字字符.';
  },
  alpha_spaces: function alpha_spaces(field) {
    return ' ' + field + ' 只能包含字母字符，包括空格.';
  },
  alpha: function alpha(field) {
    return ' ' + field + ' 只能包含字母字符.';
  },
  before: function before(field, _ref3) {
    var _ref32 = _slicedToArray(_ref3, 1);

    var target = _ref32[0];
    return ' ' + field + ' 必须在' + target + ' 之前.';
  },
  between: function between(field, _ref4) {
    var _ref42 = _slicedToArray(_ref4, 2);

    var min = _ref42[0];
    var max = _ref42[1];
    return ' ' + field + ' 必须在' + min + ' ' + max + '之间.';
  },
  confirmed: function confirmed(field, _ref5) {
    var _ref52 = _slicedToArray(_ref5, 1);

    var confirmedField = _ref52[0];
    return ' ' + field + ' 不能和' + confirmedField + '匹配.';
  },
  date_between: function date_between(field, _ref6) {
    var _ref62 = _slicedToArray(_ref6, 2);

    var min = _ref62[0];
    var max = _ref62[1];
    return ' ' + field + '必须在' + min + '和' + max + '之间.';
  },
  date_format: function date_format(field, _ref7) {
    var _ref72 = _slicedToArray(_ref7, 1);

    var format = _ref72[0];
    return ' ' + field + '必须在在' + format + '格式中.';
  },
  decimal: function decimal(field) {
    var _ref8 = arguments.length <= 1 || arguments[1] === undefined ? ['*'] : arguments[1];

    var _ref82 = _slicedToArray(_ref8, 1);

    var decimals = _ref82[0];
    return ' ' + field + ' 必须是数字的而且能够包含' + (decimals === '*' ? '' : decimals) + ' 小数点.';
  },
  digits: function digits(field, _ref9) {
    var _ref92 = _slicedToArray(_ref9, 1);

    var length = _ref92[0];
    return ' ' + field + ' 必须是数字，且精确到 ' + length + '数';
  },
  dimensions: function dimensions(field, _ref10) {
    var _ref102 = _slicedToArray(_ref10, 2);

    var width = _ref102[0];
    var height = _ref102[1];
    return ' ' + field + '必须是 ' + width + ' 像素到 ' + height + ' 像素.';
  },
  email: function email(field) {
    return ' ' + field + ' 必须是有效的邮箱.';
  },
  ext: function ext(field) {
    return ' ' + field + ' 必须是有效的文件.';
  },
  image: function image(field) {
    return ' ' + field + ' 必须是图片.';
  },
  'in': function _in(field) {
  return ' ' + field + ' 必须是一个有效值.';
},
  ip: function ip(field) {
    return ' ' + field + ' 必须是一个有效的地址.';
  },
  max: function max(field, _ref11) {
    var _ref112 = _slicedToArray(_ref11, 1);

    var length = _ref112[0];
    return ' ' + field + ' 不能大于' + length + '字符.';
  },
  mimes: function mimes(field) {
    return ' ' + field + ' 必须是有效的文件类型.';
  },
  min: function min(field, _ref12) {
    var _ref122 = _slicedToArray(_ref12, 1);

    var length = _ref122[0];
    return ' ' + field + ' 必须至少有 ' + length + ' 字符.';
  },
  not_in: function not_in(field) {
    return ' ' + field + '必须是一个有效值.';
  },
  numeric: function numeric(field) {
    return ' ' + field + ' 只能包含数字字符.';
  },
  regex: function regex(field) {
    return ' ' + field + ' 格式无效.';
  },
  required: function required(field) {
    return field + ' 是必填项.';
  },
  size: function size(field, _ref13) {
    var _ref132 = _slicedToArray(_ref13, 1);

    var _size = _ref132[0];
    return ' ' + field + ' 必须小于 ' + _size + ' KB.';
  },
  url: function url(field) {
    return ' ' + field + '不是有效的url.';
  }
};