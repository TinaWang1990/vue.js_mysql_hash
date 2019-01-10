<template>
    <div class="hello">
        <div class="container" id="todolist">
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <h1 class="text-center">to do list</h1>
                    <form v-on:submit.prevent="addNewTask">
                        <label for="tasknameinput">task name</label>
                        <input type="text" id="tasknameinput" class="form-control" placeholder="add new task" v-model="taskname">
                        <button class="btn btn-success btn-block mt-3" v-if="this.isEdit == false" type="submit" >submit</button>
                        <button class="btn btn-success btn-block mt-3" v-on:click="updateTask" v-else type="button">update</button>
                    </form>

                    <table class="table">
                        <tr v-for="(todo) in todos"
                         v-bind:key="todo.id"
                         v-bind:title="todo.taskname"
                        >
                            <td class="text-left">{{todo.taskname}}</td>
                            <td class="text-right">
                                <button class="btn btn-info" @click="editTask(todo.taskname, todo.id)">Edit</button>
                                <button class="btn btn-danger" @click="deleteTask(todo.id)">delete</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      todos: [],
      id: '',
      taskname: '',
      isEdit: false
    }
  },
  mounted () {
    this.getTasks()
  },
  methods: {
    getTasks () {
      axios.get('/api/tasks').then(
        result => {
          console.log(result.data)
          this.todos = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewTask () {
      axios.post('/api/task', {taskname: this.taskname}).then((res) => {
        this.taskname = ''
        this.getTasks()
      }).catch((err) => {
        console.log(err)
      })
    },
    editTask (title, id) {
      this.id = id
      this.taskname = title
      this.isEdit = true
    },
    updateTask () {
      axios.put(`/api/task/${this.id}`, {taskname: this.taskname}).then((res) => {
        this.taskname = ''
        this.isEdit = false
        this.getTasks()
        console.log(res)
      })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteTask (id) {
      axios.delete(`/api/task/${id}`).then((res) => {
        this.taskname = ''
        this.getTasks()
        console.log(res)
      })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
