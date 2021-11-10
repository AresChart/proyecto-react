import React, {Component} from 'react';
import { TextInput } from "react-native";
import {styles} from '../styles/styles';
import App from '../App';

const TextInputComponent = (props) =>{

    return (

        <TextInput
            style={props.style}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            onChangeText={props.onChangeText}
        />
        
    );

} 

export default TextInputComponent;