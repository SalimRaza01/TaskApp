import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Modal } from "react-native";
import colors from "../../Colors";
import TaskModal from "./TaskModal";

const { width, height } = Dimensions.get("window");
const listItemWidth = width * 0.6;

export default class TaskList extends React.Component {

    state = {
        showListVisible: false
    }

    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible })
    }

    render() {

        const list = this.props.list;

        const completedCount = list.todos.filter((todo) => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;

        return (

            <View>

                <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>

                    <TaskModal list={list} closeModal={() => this.toggleListModal()} updateList={this.props.updateList}/>

                </Modal>
                < TouchableOpacity
                    style={[
                        styles.listContainer,
                        { backgroundColor: list.color, width: listItemWidth },
                    ]} onPress={() => this.toggleListModal()}
                >
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>

                    <View style={styles.countContainer}>
                        <View style={styles.countItem}>
                            <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.subtitle}>Remaining</Text>
                        </View>
                        <View style={styles.countItem}>
                            <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subtitle}>Completed</Text>
                        </View>
                    </View>
                </ TouchableOpacity>
            </View>
        );

    }

};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: height * 0.04,
        paddingHorizontal: width * 0.04,
        borderRadius: 6,
        alignItems: "center",
        margin: 10
    },
    listTitle: {
        fontSize: width * 0.06,
        fontWeight: "700",
        color: colors.white,
        marginBottom: height * 0.02,
    },
    countContainer: {
        flexDirection: "column",
        width: "100%",
    },
    countItem: {
        alignItems: "center",
    },
    count: {
        fontSize: width * 0.10,
        fontWeight: "200",
        color: colors.white,
    },
    subtitle: {
        fontSize: width * 0.04,
        fontWeight: "700",
        color: colors.white,
    },
});
