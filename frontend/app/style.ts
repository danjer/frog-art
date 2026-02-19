'use strict';
import { StyleSheet } from 'react-native';

const theme = StyleSheet.create({
    button: {
        // These styles apply to the TouchableOpacity wrapper
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        height: 100,
        width: 100,
        margin: 10,
        justifyContent: 'center', // Centers children vertically within the TouchableOpacity
        alignItems: 'center',     // Centers children horizontally within the TouchableOpacity
    },
    buttonText: {
        // These styles apply to the Text component inside the button
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default theme;