import React, {Component} from 'react';
import { Button} from "react-native";
import {styles} from '../styles/styles';
import funcion from '../domain/PartitionsFuntions';

const ButtonComponent = (props) =>{

    return (
        <Button
        title={props.title}
        style={styles.button}
        onPress={props.onPress}
        />
    );
} 

export default ButtonComponent;