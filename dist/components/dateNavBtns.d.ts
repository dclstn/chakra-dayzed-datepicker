import { Calendar, GetBackForwardPropsOptions } from 'dayzed';
import React from 'react';
import { DatepickerProps } from '../utils/commonTypes';
export interface DatepickerBackBtnsProps extends DatepickerProps {
    calendars: Calendar[];
    getBackProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
}
export declare const DatepickerBackBtns: React.FC<DatepickerBackBtnsProps>;
export interface DatepickerForwardBtnsProps extends DatepickerProps {
    calendars: Calendar[];
    getForwardProps: (data: GetBackForwardPropsOptions) => Record<string, any>;
}
export declare const DatepickerForwardBtns: React.FC<DatepickerForwardBtnsProps>;
