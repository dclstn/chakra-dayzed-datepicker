import React from 'react';
import { DatepickerConfigs, DatepickerProps } from './utils/commonTypes';
export interface SingleDatepickerProps extends DatepickerProps {
    date?: Date;
    onDateChange: (date: Date) => void;
    configs?: DatepickerConfigs;
    disabled?: boolean;
    /**
     * disabledDates: `Uses startOfDay as comparison`
     */
    disabledDates?: Set<number>;
    isDateDisabled?: (date: Date) => boolean;
    defaultIsOpen?: boolean;
    closeOnSelect?: boolean;
    id?: string;
    name?: string;
    usePortal?: boolean;
}
export declare const SingleDatepicker: React.FC<SingleDatepickerProps>;
