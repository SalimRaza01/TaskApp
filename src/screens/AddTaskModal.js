import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Image, Dimensions, Text, TextInput } from 'react-native';
import Colors from '../../Colors';
import tempData from '../../tempData';

const { width, height } = Dimensions.get('window');

export default class AddTaskModal extends React.Component {

    backgroundColors = ["#5CD859", "#24A6D9", "#8022D9", "#D159D8", "#D85963", "#D88559"];

    state = {
        name: "",
        color: this.backgroundColors[0]
    };

    createTodo = () => {
        const { name, color } = this.state;

        const list = { name, color };

        this.props.addList(list);


        this.setState({ name: "" });
        this.props.closeModal();

    };

    renderColors() {
        return this.backgroundColors.map(color => (
            <TouchableOpacity
                key={color}
                style={[styles.colorSelect, { backgroundColor: color }]}
                onPress={() => this.setState({ color })}
            />
        ));
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableOpacity style={styles.closeButton} onPress={this.props.closeModal}>
                    <Image style={styles.closeIcon} source={require('../assets/img/close.png')} />
                </TouchableOpacity>

                <View style={styles.content}>
                    <Text style={styles.title}>Create Project</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Project Name'
                        onChangeText={text => this.setState({ name: text })}
                    />

                    <View style={styles.colorSelectContainer}>{this.renderColors()}</View>

                    <TouchableOpacity style={[styles.create, { backgroundColor: this.state.color }]} onPress={this.createTodo}>
                        <Text style={styles.createText}>Create!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: height * 0.05,
        right: width * 0.05,
    },
    closeIcon: {
        height: width * 0.05,
        width: width * 0.05,
    },
    content: {
        alignSelf: "stretch",
        marginHorizontal: width * 0.12,
        marginTop: height * 0.7,
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: "800",
        color: colors.black,
        alignSelf: "center",
        marginTop: height * -0.05,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.blue,
        borderRadius: 6,
        height: height * 0.06,
        marginTop: height * 0.02,
        paddingHorizontal: width * 0.05,
        fontSize: width * 0.04,
    },
    create: {
        marginTop: height * 0.08,
        height: height * 0.06,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    createText: {
        color: colors.white,
        fontWeight: "600",
        fontSize: width * 0.04,
    },
    colorSelectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height * 0.02,
    },
    colorSelect: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width * 0.02,
        marginRight: width * 0.02,
    },
});
