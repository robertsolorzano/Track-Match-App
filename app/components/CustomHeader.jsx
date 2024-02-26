// CustomHeader.jsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ onOptionsPress }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            {/* Custom Back Button */}
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>

            {/* Options Button */}
            <TouchableOpacity style={styles.iconButton} onPress={onOptionsPress}>
                <Ionicons name="ellipsis-horizontal" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
    },
    iconButton: {
        padding: 10,
    },
});

export default CustomHeader;
