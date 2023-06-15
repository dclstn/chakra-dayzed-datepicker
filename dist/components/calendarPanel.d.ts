import { Props as DayzedHookProps } from 'dayzed';
import React from 'react';
import { CalendarConfigs, DatepickerProps } from '../utils/commonTypes';
export interface CalendarPanelProps extends DatepickerProps {
    dayzedHookProps: Omit<DayzedHookProps, 'children' | 'render'>;
    configs: CalendarConfigs;
    disabledDates?: Set<number>;
    isDateDisabled?: (date: Date) => boolean;
    onMouseEnterHighlight?: (date: Date) => void;
    isInRange?: (date: Date) => boolean | null;
}
export declare const CalendarPanel: React.FC<CalendarPanelProps>;
