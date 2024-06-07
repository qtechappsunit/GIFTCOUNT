import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import themes from '../assets/themes';

const CustomInput = ({
    value,
    setValue,
    placeholder,
    placeholderTextColor,
    width,
    leftText,
    keyboardType,
    rightText,
    multiline,
    numberOfLines,
    borderRadius,
}) => {
    const [focus, setFocus] = useState(false);

    return (
        <View
            style={[
                width ? { width: width } : { width: '100%' },
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: focus ? themes.red1 : 'transparent',
                    borderRadius: borderRadius ? borderRadius : 50,
                    backgroundColor: themes.navy_blue,
                    paddingHorizontal: 15,
                },
            ]}
        >
            {rightText ? (
                <Text style={{ color: themes.white }}>{rightText}</Text>
            ) : null}
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                onFocus={() => setFocus(!focus)}
                onBlur={() => setFocus(!focus)}
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                style={[
                    {
                        width: leftText || rightText ? '90%' : '100%',
                        color: themes.white,
                    },
                ]}
            />
            {leftText ? (
                <Text style={{ color: themes.white }}>{leftText}</Text>
            ) : null}
        </View>
    );
};

export default CustomInput;