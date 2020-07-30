import React from 'react';
import { mount } from 'enzyme';
import ColumnIcon from './ColumnIcon';

describe('<ColumnIcon />', () => {
    test('Should render arrow up if direction is "asc"', () => {
        const wrapper = mount(<ColumnIcon direction="asc" />);
        expect(wrapper.find('.icon').hasClass('up')).toBe(true);
    });
    test('Should render arrow down if direction is "desc"', () => {
        const wrapper = mount(<ColumnIcon direction="desc" />);
        expect(wrapper.find('.icon').hasClass('down')).toBe(true);
    });
});
