import React from 'react';
import { mount } from 'enzyme';
import CsvImporter from './CsvImporter';

describe('<CsvImporter />', () => {
    test('clicking the button triggers a click on the input element', () => {
        const wrapper = mount(<CsvImporter model="people" />);
        const mockCallback = jest.fn();
        wrapper.find('input').getDOMNode().onclick = mockCallback;
        wrapper.find('button').simulate('click');
        expect(mockCallback.mock.calls.length).toEqual(1);
    });

    test('spinner displays when loading', () => {
        const wrapper = mount(<CsvImporter model="people" />);
        wrapper.setState({
            loading: true
        });
        expect(wrapper.find('.loading.icon').exists()).toBe(true);
    });
});
