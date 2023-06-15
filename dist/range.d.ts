import React from 'react';
import { Props as DayzedHookProps } from 'dayzed';
import { CalendarConfigs, DatepickerConfigs, DatepickerProps, PropsConfigs } from './utils/commonTypes';
interface RangeCalendarPanelProps {
    dayzedHookProps: DayzedHookProps;
    configs: CalendarConfigs;
    propsConfigs?: PropsConfigs;
    selected?: Date | Date[];
}
export declare const RangeCalendarPanel: React.FC<RangeCalendarPanelProps>;
export interface RangeDatepickerProps extends DatepickerProps {
    selectedDates: Date[];
    configs?: DatepickerConfigs;
    disabled?: boolean;
    defaultIsOpen?: boolean;
    closeOnSelect?: boolean;
    onDateChange: (date: Date[]) => void;
    id?: string;
    name?: string;
    usePortal?: boolean;
}
export declare const RangeDatepicker: React.FC<RangeDatepickerProps>;
export {};
