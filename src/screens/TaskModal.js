import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
    FlatList,
    KeyboardAvoidingView,
    TextInput,
    Keyboard
} from 'react-native';

const { width, height } = Dimensions.get('window');

const checkedImage = require('../assets/img/checkbox.png');
const uncheckedImage = require('../assets/img/uncheckbox.png');

export default class TaskModal extends React.Component {
    state = {
        newTask: '',
    };

    toggleTaskCompleted = (index) => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;
        this.props.updateList(list);
    };

    addTask = () => {
        
        let list = this.props.list;
        list.todos.push({ title: this.state.newTask, completed: false });

        this.props.updateList(list)
        this.setState({ newTask: "" });

        Keyboard.dismiss();
     
    }

    renderTask = (todo, index) => {
        return (
            <View style={styles.taskContainer}>
                <TouchableOpacity onPress={() => this.toggleTaskCompleted(index)}>
                    <Image
                        source={todo.completed ? uncheckedImage : checkedImage}
                        style={styles.checkbox}
                    />
                </TouchableOpacity>
                <Text
                    style={[
                        styles.todo,
                        {
                            textDecorationLine: todo.completed ? 'line-through' : 'none',
                            color: todo.completed ? 'grey' : 'black',
                        },
                    ]}
                >
                    {todo.title}
                </Text>
            </View>
        );
    };

    render() {
        const list = this.props.list;
        const taskCount = list.todos.length;
        const completedCount = list.todos.filter((todo) => todo.completed).length;
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity style={styles.closeButton} onPress={this.props.closeModal}>
                        <Image style={styles.closeIcon} source={require('../assets/img/close.png')} />
                    </TouchableOpacity>

                    <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.taskCount}>
                                {completedCount} of {taskCount} tasks
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.section, { flex: 3 }]}>
                        <FlatList
                            data={list.todos}
                            renderItem={({ item, index }) => this.renderTask(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={[styles.section, styles.footer]} behavior="padding">
                        <TextInput
                            style={[styles.input, { borderColor: list.color }]}
                            placeholder="Add a task"
                            value={this.state.newTask}
                            onChangeText={(text) => this.setState({ newTask: text })}
                        />
                        <TouchableOpacity style={[styles.addTask, { backgroundColor: list.color }]} onPress={() => this.addTask()}>
                            <Image style={styles.addicon} source={require('../assets/img/pluswhite.png')} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: width * 0.05
    },

    closeButton: {
        position: "absolute",
        top: width * 0.1,
        right: width * 0.05,
        zIndex: 10
    },

    closeIcon: {
        height: width * 0.06,
        width: width * 0.06,
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: width * 0.08,
        borderBottomWidth: 2
    },
    title: {
        fontSize: width * 0.1,
        fontWeight: "800",
        color: colors.black
    },
    taskCount: {
        marginTop: height * 0.01,
        marginBottom: height * 0.02,
        fontSize: width * 0.04,
        color: colors.grey,
    },
    footer: {
        paddingHorizontal: width * 0.1,
        flexDirection: "row",
        alignItems: "center",

    },
    input: {
        flex: 1,
        height: height * 0.05,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: height * 0.01,
        marginRight: width * 0.02,
        paddingHorizontal: width * 0.02,
    },
    addTask: {
        borderRadius: height * 0.01,
        padding: height * 0.02,
        alignItems: "center",
        justifyContent: "center"
    },
    addicon: {
        height: width * 0.03,
        width: width * 0.03,
    },
    taskContainer: {
        paddingVertical: height * 0.02,
        flexDirection: "row",
        alignItems: "center",


    },
    checkbox: {
        height: width * 0.05,
        width: width * 0.05,
    },
    todo: {
        color: colors.black,
        fontWeight: "500",
        fontSize: width * 0.04,
    }

});
