import { Button, Stack, VStack, HStack, Heading, Divider, SimpleGrid, Box, useDisclosure, Popover, PopoverTrigger, Input, PopoverContent, PopoverBody, Portal, Flex } from '@chakra-ui/react';
import { useDayzed } from 'dayzed';
import React, { Fragment, useMemo, useCallback, useState } from 'react';
import { format } from 'date-fns';
import FocusLock from 'react-focus-lock';

var Month_Names_Full = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var Month_Names_Short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var Weekday_Names_Short = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

// Based on: https://github.com/leon-good-life/arrow-keys-react
// re-implemented by @hexelon in https://github.com/hexelon/chakra-dayzed-datepicker/commit/4f44e565e3975f613b54304d1fdaeb97dd7dfa15
var ArrowKeysReact = /*#__PURE__*/function () {
  function ArrowKeysReact(config) {
    this.config = void 0;
    this.config = config;
  }
  var _proto = ArrowKeysReact.prototype;
  _proto.getEvents = function getEvents() {
    var _this = this;
    return {
      onKeyDown: function onKeyDown(e) {
        switch (e.key) {
          case 'ArrowDown':
            _this.config.down && _this.config.down();
            break;
          case 'ArrowLeft':
            _this.config.left && _this.config.left();
            break;
          case 'ArrowRight':
            _this.config.right && _this.config.right();
            break;
          case 'ArrowUp':
            _this.config.up && _this.config.up();
            break;
        }
      }
    };
  };
  return ArrowKeysReact;
}();

var DefaultBtnStyle = {
  variant: 'ghost',
  size: 'sm'
};
var DatepickerBackBtns = function DatepickerBackBtns(props) {
  var _props$propsConfigs;
  var calendars = props.calendars,
    getBackProps = props.getBackProps;
  var customBtnProps = (_props$propsConfigs = props.propsConfigs) == null ? void 0 : _props$propsConfigs.dateNavBtnProps;
  return React.createElement(Fragment, null, React.createElement(Button, _extends({}, getBackProps({
    calendars: calendars,
    offset: 12
  }), DefaultBtnStyle, customBtnProps), '<<'), React.createElement(Button, _extends({}, getBackProps({
    calendars: calendars
  }), DefaultBtnStyle, customBtnProps), '<'));
};
var DatepickerForwardBtns = function DatepickerForwardBtns(props) {
  var _props$propsConfigs2;
  var calendars = props.calendars,
    getForwardProps = props.getForwardProps;
  var customBtnProps = (_props$propsConfigs2 = props.propsConfigs) == null ? void 0 : _props$propsConfigs2.dateNavBtnProps;
  return React.createElement(Fragment, null, React.createElement(Button, _extends({}, getForwardProps({
    calendars: calendars
  }), DefaultBtnStyle, customBtnProps), '>'), React.createElement(Button, _extends({}, getForwardProps({
    calendars: calendars,
    offset: 12
  }), DefaultBtnStyle, customBtnProps), '>>'));
};

var halfGap = 0.125; //default Chakra-gap-space-1 is 0.25rem
var DayOfMonth = function DayOfMonth(_ref) {
  var dateObj = _ref.dateObj,
    propsConfigs = _ref.propsConfigs,
    isInRange = _ref.isInRange,
    disabledDates = _ref.disabledDates,
    isDateDisabled = _ref.isDateDisabled,
    renderProps = _ref.renderProps,
    onMouseEnter = _ref.onMouseEnter;
  var date = dateObj.date,
    selected = dateObj.selected,
    selectable = dateObj.selectable,
    today = dateObj.today;
  var getDateProps = renderProps.getDateProps;
  var _ref2 = (propsConfigs == null ? void 0 : propsConfigs.dayOfMonthBtnProps) || {},
    defaultBtnProps = _ref2.defaultBtnProps,
    isInRangeBtnProps = _ref2.isInRangeBtnProps,
    selectedBtnProps = _ref2.selectedBtnProps,
    todayBtnProps = _ref2.todayBtnProps;
  var disabled = !selectable || (disabledDates == null ? void 0 : disabledDates.has(date.getTime())) || (isDateDisabled == null ? void 0 : isDateDisabled(date));
  var styleBtnProps = useMemo(function () {
    var _defaultBtnProps$_hov;
    return {
      defaultBtnProps: _extends({
        size: 'sm',
        variant: 'ghost'
      }, defaultBtnProps, {
        _after: _extends({
          content: "''",
          position: 'absolute',
          top: "-" + halfGap + "rem",
          left: "-" + halfGap + "rem",
          bottom: "-" + halfGap + "rem",
          right: "-" + halfGap + "rem",
          borderWidth: halfGap + "rem",
          borderColor: 'transparent'
        }, defaultBtnProps == null ? void 0 : defaultBtnProps._after),
        _hover: _extends({
          bg: 'purple.400'
        }, defaultBtnProps == null ? void 0 : defaultBtnProps._hover, {
          _disabled: _extends({
            bg: 'gray.100'
          }, defaultBtnProps == null ? void 0 : (_defaultBtnProps$_hov = defaultBtnProps._hover) == null ? void 0 : _defaultBtnProps$_hov._disabled)
        })
      }),
      isInRangeBtnProps: _extends({
        background: 'purple.200'
      }, isInRangeBtnProps),
      selectedBtnProps: _extends({
        background: 'purple.200'
      }, selectedBtnProps),
      todayBtnProps: _extends({
        borderColor: 'blue.400'
      }, todayBtnProps)
    };
  }, [defaultBtnProps, isInRangeBtnProps, selectedBtnProps, todayBtnProps]);
  return React.createElement(Button, _extends({}, getDateProps({
    dateObj: dateObj,
    disabled: disabled,
    onMouseEnter: onMouseEnter
  }), {
    isDisabled: disabled
  }, styleBtnProps.defaultBtnProps, isInRange && !disabled && styleBtnProps.isInRangeBtnProps, selected && !disabled && styleBtnProps.selectedBtnProps, today && styleBtnProps.todayBtnProps), date.getDate());
};

var CalendarPanel = function CalendarPanel(_ref) {
  var dayzedHookProps = _ref.dayzedHookProps,
    configs = _ref.configs,
    propsConfigs = _ref.propsConfigs,
    disabledDates = _ref.disabledDates,
    isDateDisabled = _ref.isDateDisabled,
    onMouseEnterHighlight = _ref.onMouseEnterHighlight,
    isInRange = _ref.isInRange;
  var renderProps = useDayzed(dayzedHookProps);
  var calendars = renderProps.calendars,
    getBackProps = renderProps.getBackProps,
    getForwardProps = renderProps.getForwardProps;
  var weekdayNames = useMemo(function () {
    var firstDayOfWeek = configs.firstDayOfWeek;
    var dayNames = configs.dayNames;
    if (firstDayOfWeek && firstDayOfWeek > 0) {
      return configs.dayNames.slice(firstDayOfWeek, dayNames.length).concat(dayNames.slice(0, firstDayOfWeek));
    }
    return dayNames;
  }, [configs.firstDayOfWeek, configs.dayNames]);
  // looking for a useRef() approach to replace it
  var getKeyOffset = useCallback(function (num) {
    var e = document.activeElement;
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function (el, i) {
      var newNodeKey = i + num;
      if (el === e) {
        if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
          buttons[newNodeKey].focus();
        } else {
          buttons[0].focus();
        }
      }
    });
  }, []);
  var arrowKeysReact = new ArrowKeysReact({
    left: function left() {
      getKeyOffset(-1);
    },
    right: function right() {
      getKeyOffset(1);
    },
    up: function up() {
      getKeyOffset(-7);
    },
    down: function down() {
      getKeyOffset(7);
    }
  });
  if (calendars.length <= 0) {
    return null;
  }
  return React.createElement(Stack, _extends({
    className: "datepicker-calendar",
    direction: ['column', 'column', 'row']
  }, arrowKeysReact.getEvents()), calendars.map(function (calendar, calendarIdx) {
    return React.createElement(VStack, {
      key: calendarIdx,
      height: "100%",
      borderWidth: "1px",
      padding: "0.5rem 0.75rem"
    }, React.createElement(HStack, null, React.createElement(DatepickerBackBtns, {
      calendars: calendars,
      getBackProps: getBackProps,
      propsConfigs: propsConfigs
    }), React.createElement(Heading, {
      size: "sm",
      minWidth: '5rem',
      textAlign: "center"
    }, configs.monthNames[calendar.month], " ", calendar.year), React.createElement(DatepickerForwardBtns, {
      calendars: calendars,
      getForwardProps: getForwardProps,
      propsConfigs: propsConfigs
    })), React.createElement(Divider, null), React.createElement(SimpleGrid, {
      columns: 7,
      spacing: 1,
      textAlign: "center"
    }, weekdayNames.map(function (day, dayIdx) {
      return React.createElement(Box, {
        fontSize: "sm",
        fontWeight: "semibold",
        key: dayIdx
      }, day);
    }), calendar.weeks.map(function (week, weekIdx) {
      return week.map(function (dateObj, index) {
        var key = calendar.month + "-" + calendar.year + "-" + weekIdx + "-" + index;
        if (!dateObj) return React.createElement(Box, {
          key: key
        });
        var date = dateObj.date;
        return React.createElement(DayOfMonth, {
          key: key,
          dateObj: dateObj,
          propsConfigs: propsConfigs,
          renderProps: renderProps,
          isInRange: isInRange && isInRange(date),
          disabledDates: disabledDates,
          isDateDisabled: isDateDisabled,
          onMouseEnter: function onMouseEnter() {
            if (onMouseEnterHighlight) onMouseEnterHighlight(date);
          }
        });
      });
    })));
  }));
};

var _excluded$1 = ["configs", "propsConfigs", "usePortal", "disabledDates", "isDateDisabled", "defaultIsOpen", "closeOnSelect"];
var DefaultConfigs$1 = {
  dateFormat: 'yyyy-MM-dd',
  monthNames: Month_Names_Short,
  dayNames: Weekday_Names_Short,
  firstDayOfWeek: 0
};
var SingleDatepicker = function SingleDatepicker(_ref) {
  var _propsConfigs$popover, _propsConfigs$popover2;
  var configs = _ref.configs,
    propsConfigs = _ref.propsConfigs,
    usePortal = _ref.usePortal,
    disabledDates = _ref.disabledDates,
    isDateDisabled = _ref.isDateDisabled,
    _ref$defaultIsOpen = _ref.defaultIsOpen,
    defaultIsOpen = _ref$defaultIsOpen === void 0 ? false : _ref$defaultIsOpen,
    _ref$closeOnSelect = _ref.closeOnSelect,
    closeOnSelect = _ref$closeOnSelect === void 0 ? true : _ref$closeOnSelect,
    props = _objectWithoutPropertiesLoose(_ref, _excluded$1);
  var selectedDate = props.date,
    name = props.name,
    disabled = props.disabled,
    onDateChange = props.onDateChange,
    id = props.id,
    minDate = props.minDate,
    maxDate = props.maxDate;
  var _useState = useState(selectedDate),
    dateInView = _useState[0],
    setDateInView = _useState[1];
  var _useState2 = useState(0),
    offset = _useState2[0],
    setOffset = _useState2[1];
  var _useDisclosure = useDisclosure({
      defaultIsOpen: defaultIsOpen
    }),
    onOpen = _useDisclosure.onOpen,
    onClose = _useDisclosure.onClose,
    isOpen = _useDisclosure.isOpen;
  var calendarConfigs = _extends({}, DefaultConfigs$1, configs);
  var onPopoverClose = function onPopoverClose() {
    onClose();
    setDateInView(selectedDate);
    setOffset(0);
  };
  // dayzed utils
  var handleOnDateSelected = function handleOnDateSelected(_ref2) {
    var selectable = _ref2.selectable,
      date = _ref2.date;
    if (!selectable) return;
    if (date instanceof Date && !isNaN(date.getTime())) {
      onDateChange(date);
      if (closeOnSelect) onClose();
      return;
    }
  };
  var PopoverContentWrapper = usePortal ? Portal : React.Fragment;
  return React.createElement(Popover, {
    placement: "bottom-start",
    variant: "responsive",
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onPopoverClose,
    isLazy: true
  }, React.createElement(PopoverTrigger, null, React.createElement(Input, _extends({
    onKeyPress: function onKeyPress(e) {
      if (e.key === ' ' && !isOpen) {
        e.preventDefault();
        onOpen();
      }
    },
    id: id,
    autoComplete: "off",
    isDisabled: disabled,
    name: name,
    value: selectedDate ? format(selectedDate, calendarConfigs.dateFormat) : '',
    onChange: function onChange(e) {
      return e.target.value;
    }
  }, propsConfigs == null ? void 0 : propsConfigs.inputProps))), React.createElement(PopoverContentWrapper, null, React.createElement(PopoverContent, _extends({
    width: "100%"
  }, propsConfigs == null ? void 0 : (_propsConfigs$popover = propsConfigs.popoverCompProps) == null ? void 0 : _propsConfigs$popover.popoverContentProps), React.createElement(PopoverBody, _extends({}, propsConfigs == null ? void 0 : (_propsConfigs$popover2 = propsConfigs.popoverCompProps) == null ? void 0 : _propsConfigs$popover2.popoverBodyProps), React.createElement(FocusLock, null, React.createElement(CalendarPanel, {
    dayzedHookProps: {
      showOutsideDays: true,
      onDateSelected: handleOnDateSelected,
      selected: selectedDate,
      date: dateInView,
      minDate: minDate,
      maxDate: maxDate,
      offset: offset,
      onOffsetChanged: setOffset,
      firstDayOfWeek: calendarConfigs.firstDayOfWeek
    },
    configs: calendarConfigs,
    propsConfigs: propsConfigs,
    isDateDisabled: isDateDisabled,
    disabledDates: disabledDates
  }))))));
};

var _excluded = ["configs", "propsConfigs", "id", "name", "usePortal", "defaultIsOpen", "closeOnSelect"];
var RangeCalendarPanel = function RangeCalendarPanel(_ref) {
  var dayzedHookProps = _ref.dayzedHookProps,
    configs = _ref.configs,
    propsConfigs = _ref.propsConfigs,
    selected = _ref.selected;
  var _useState = useState(null),
    hoveredDate = _useState[0],
    setHoveredDate = _useState[1];
  // Calendar level
  var onMouseLeave = function onMouseLeave() {
    setHoveredDate(null);
  };
  // Date level
  var onMouseEnterHighlight = function onMouseEnterHighlight(date) {
    if (!Array.isArray(selected) || !(selected != null && selected.length)) {
      return;
    }
    setHoveredDate(date);
  };
  var isInRange = function isInRange(date) {
    if (!Array.isArray(selected) || !(selected != null && selected.length)) {
      return false;
    }
    var firstSelected = selected[0];
    if (selected.length === 2) {
      var secondSelected = selected[1];
      return firstSelected < date && secondSelected > date;
    } else {
      return hoveredDate && (firstSelected < date && hoveredDate >= date || date < firstSelected && date >= hoveredDate);
    }
  };
  return React.createElement(Flex, {
    onMouseLeave: onMouseLeave
  }, React.createElement(CalendarPanel, {
    dayzedHookProps: dayzedHookProps,
    configs: configs,
    propsConfigs: propsConfigs,
    isInRange: isInRange,
    onMouseEnterHighlight: onMouseEnterHighlight
  }));
};
var DefaultConfigs = {
  dateFormat: 'MM/dd/yyyy',
  monthNames: Month_Names_Short,
  dayNames: Weekday_Names_Short,
  firstDayOfWeek: 0
};
var RangeDatepicker = function RangeDatepicker(_ref2) {
  var _propsConfigs$popover, _propsConfigs$popover2;
  var configs = _ref2.configs,
    _ref2$propsConfigs = _ref2.propsConfigs,
    propsConfigs = _ref2$propsConfigs === void 0 ? {} : _ref2$propsConfigs,
    id = _ref2.id,
    name = _ref2.name,
    usePortal = _ref2.usePortal,
    _ref2$defaultIsOpen = _ref2.defaultIsOpen,
    defaultIsOpen = _ref2$defaultIsOpen === void 0 ? false : _ref2$defaultIsOpen,
    _ref2$closeOnSelect = _ref2.closeOnSelect,
    closeOnSelect = _ref2$closeOnSelect === void 0 ? true : _ref2$closeOnSelect,
    props = _objectWithoutPropertiesLoose(_ref2, _excluded);
  var selectedDates = props.selectedDates,
    minDate = props.minDate,
    maxDate = props.maxDate,
    onDateChange = props.onDateChange,
    disabled = props.disabled;
  // chakra popover utils
  var _useState2 = useState(selectedDates[0] || new Date()),
    dateInView = _useState2[0],
    setDateInView = _useState2[1];
  var _useState3 = useState(0),
    offset = _useState3[0],
    setOffset = _useState3[1];
  var _useDisclosure = useDisclosure({
      defaultIsOpen: defaultIsOpen
    }),
    onOpen = _useDisclosure.onOpen,
    onClose = _useDisclosure.onClose,
    isOpen = _useDisclosure.isOpen;
  var calendarConfigs = _extends({}, DefaultConfigs, configs);
  var onPopoverClose = function onPopoverClose() {
    onClose();
    setDateInView(selectedDates[0] || new Date());
    setOffset(0);
  };
  var handleOnDateSelected = function handleOnDateSelected(_ref3) {
    var selectable = _ref3.selectable,
      date = _ref3.date;
    if (!selectable) {
      return;
    }
    var newDates = [].concat(selectedDates);
    if (selectedDates.length) {
      if (selectedDates.length === 1) {
        var firstTime = selectedDates[0];
        if (firstTime < date) {
          newDates.push(date);
        } else {
          newDates.unshift(date);
        }
        onDateChange(newDates);
        if (closeOnSelect) onClose();
        return;
      }
      if (newDates.length === 2) {
        onDateChange([date]);
        return;
      }
    } else {
      newDates.push(date);
      onDateChange(newDates);
    }
  };
  // eventually we want to allow user to freely type their own input and parse the input
  var intVal = selectedDates[0] ? "" + format(selectedDates[0], calendarConfigs.dateFormat) : '';
  intVal += selectedDates[1] ? " - " + format(selectedDates[1], calendarConfigs.dateFormat) : '';
  var PopoverContentWrapper = usePortal ? Portal : React.Fragment;
  return React.createElement(Popover, {
    placement: "bottom-start",
    variant: "responsive",
    isOpen: isOpen,
    onOpen: onOpen,
    onClose: onPopoverClose,
    isLazy: true
  }, React.createElement(PopoverTrigger, null, React.createElement(Input, _extends({
    onKeyPress: function onKeyPress(e) {
      if (e.key === ' ' && !isOpen) {
        e.preventDefault();
        onOpen();
      }
    },
    id: id,
    autoComplete: "off",
    isDisabled: disabled,
    name: name,
    value: intVal,
    onChange: function onChange(e) {
      return e.target.value;
    }
  }, propsConfigs.inputProps))), React.createElement(PopoverContentWrapper, null, React.createElement(PopoverContent, _extends({
    width: "100%"
  }, propsConfigs == null ? void 0 : (_propsConfigs$popover = propsConfigs.popoverCompProps) == null ? void 0 : _propsConfigs$popover.popoverContentProps), React.createElement(PopoverBody, _extends({}, (_propsConfigs$popover2 = propsConfigs.popoverCompProps) == null ? void 0 : _propsConfigs$popover2.popoverBodyProps), React.createElement(FocusLock, null, React.createElement(RangeCalendarPanel, {
    dayzedHookProps: {
      onDateSelected: handleOnDateSelected,
      selected: selectedDates,
      monthsToDisplay: 2,
      date: dateInView,
      minDate: minDate,
      maxDate: maxDate,
      offset: offset,
      onOffsetChanged: setOffset,
      firstDayOfWeek: calendarConfigs.firstDayOfWeek
    },
    configs: calendarConfigs,
    propsConfigs: propsConfigs,
    selected: selectedDates
  }))))));
};

export { CalendarPanel, Month_Names_Full, Month_Names_Short, RangeCalendarPanel, RangeDatepicker, SingleDatepicker, Weekday_Names_Short };
//# sourceMappingURL=chakra-dayzed-datepicker.esm.js.map
