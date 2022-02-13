import 'react-native';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
 
 import Home from '../src/screens/Home/Home';

 it('Latest Button Test', () => {
    const {getByText} = render(<Home />)
    const button = getByText('Latest')
  
    fireEvent.press(button)
  
  });