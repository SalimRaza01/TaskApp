import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Dimensions, Modal } from 'react-native';
import colors from './Colors';
import tempData from './tempData';
import TaskList from './src/screens/TaskList';
import AddTaskModal from './src/screens/AddTaskModal';
// import Fire from './Fire';


const { width, height } = Dimensions.get('window');

export default class App extends React.Component {

  state = {
    addTodoVisible: false,
    lists: tempData,
    user: {}
  };

  // componentDidMount() {

  //   firebase = new Fire((error, user) => {
  //     if (error) {
  //       return alert("Something went wrong");
  //     }

  //     this.setState({ user });
  //   });
  // }
toggleAddTodoModal = () => {
  this.setState({ addTodoVisible: !this.state.addTodoVisible });
}


  renderList = list => {
    return <TaskList list={list} updateList={this.updateList} />;
  }

  addList = list => {
    this.setState({ list: [...this.state.lists, { ...list, id: this.state.lists.length + 1, todos: [] }] })
  };

  updateList = list => {
    this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item;
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={this.state.addTodoVisible} onRequestClose={() => this.toggleAddTodoModal()}>
          <View>
          <AddTaskModal closeModal={this.toggleAddTodoModal} addList={this.addList} />

          </View>
        </Modal>
        <View>
          <Text>User: {this.state.user.uid}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Task <Text style={{ fontWeight: "300", color: colors.blue }}>App</Text>
          </Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.addTaskContainer}>
        <TouchableOpacity style={styles.addtask} onPress={() => this.toggleAddTodoModal()} addList={this.addList}>

            <Image style={styles.addtaskicon} source={require('./src/assets/img/addtaskblue.png')} />
          </TouchableOpacity>
          <Text style={styles.add}>Add Project</Text>
        </View>

        <View style={styles.flatListContainer}>
          <FlatList
            data={this.state.lists}
            keyExtractor={item => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  },
  divider: {
    marginTop: height * 0.04,
    backgroundColor: colors.lightblue,
    height: 1,
    flex: 1,
  },
  title: {

    fontSize: width * 0.1,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: width * 0.04,
  },
  addTaskContainer: {
    marginTop: height * 0.05,
    paddingHorizontal: width * 0.1,
    alignItems: 'center',
  },
  addtask: {
    borderWidth: 2,
    borderColor: colors.lightblue,
    borderRadius: 4,
    padding: width * 0.05,
    alignItems: "center",
    justifyContent: "center"
  },
  addtaskicon: {
    height: width * 0.05,
    width: width * 0.05
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: width * 0.05,
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
  },
  flatListContainer: {
    height: height * 0.4,
    paddingLeft: width * 0.1,

  },
});
