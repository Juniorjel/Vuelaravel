<template>
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Users</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item">
                            <router-link to="/admin/dashboard"
                                >Home</router-link
                            >
                        </li>
                        <li class="breadcrumb-item active">Users</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <div class="card">
                <div class="card-header">
                    <!-- Button trigger modal -->
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-toggle="modal"
                        @click="addUser"
                        data-target="#exampleModalCenter"
                    >
                        Add User
                    </button>
                </div>
                <div class="card-body">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>S.N</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(user, index) in users" :key="index">
                                <td>{{ ++index }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.email }}</td>
                                <td>{{ user.created_at }}</td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-primary"
                                        data-toggle="modal"
                                        data-target="#exampleModalCenter"
                                        @click.prevent="editUser(user)"
                                    >
                                        <i class="fa fa-pen"></i>
                                    </button>

                                    <button class="btn btn-success">
                                        <i class="fa fa-eye"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                        <span v-if="editing">Edit User</span>
                        <span v-else>Add User</span>
                    </h5>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Form
                    @submit="handleSubmit"
                    :validation-schema="
                        editing ? editUserSchema : createUserSchema
                    "
                    v-slot="{ errors }"
                    ref="form"
                    :initial-values="formValues"
                >
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <Field
                                type="text"
                                class="form-control"
                                id="name"
                                name="name"
                                :class="{ 'is-invalid': errors.name }"
                                placeholder="Enter Name"
                            />
                            <span class="invalid-feedback" style="color: red">{{
                                errors.name
                            }}</span>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <Field
                                type="email"
                                class="form-control"
                                id="email"
                                name="email"
                                :class="{ 'is-invalid': errors.email }"
                                placeholder="Enter your email address"
                            />
                            <span class="invalid-feedback" style="color: red">{{
                                errors.email
                            }}</span>
                        </div>

                        <div>
                            <label for="inputPassword4">Password</label>
                            <div class="input-group">
                                <Field
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    name="password"
                                    :class="{ 'is-invalid': errors.password }"
                                    placeholder="Enter password"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                />
                                <span
                                    class="invalid-feedback"
                                    style="color: red"
                                    >{{ errors.password }}</span
                                >
                            </div>
                            <div class="form-check form-switch">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckChecked"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexSwitchCheckChecked"
                                    >show Password</label
                                >
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="submit" class="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { Field, Form } from "vee-validate";
import { ref, onMounted, reactive } from "vue";
import { Schema } from "yup";
import * as yup from "yup";

const users = ref([]);
const formValues = ref();
const editing = ref(false);
const form = ref(null);

const getUsers = () => {
    axios.get("/api/users").then((response) => {
        users.value = response.data;
    });
};

// const form = reactive({
//     name: "",
//     email: "",
//     password: "",
//     conform_password: "",
// });

// const createUser = () => {
//     axios.post("/api/users", form).then((response) => {
//         users.value.push(response.data);
//         form.name = "";
//         form.email = "";
//         form.password = "";
//         form.conform_password = "";
//         $("#exampleModalCenter").modal("hide");
//     });
// };

const createUserSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
});
const editUserSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().when((password, schema) => {
        return password ? schema.min(8) : schema;
    }),
});

const handleSubmit = (values) => {
    if (editing.value) {
        updateUser(values);
    } else {
        createUser(values);
    }
};

const createUser = (value, { resetForm }) => {
    axios.post("/api/users", value).then((response) => {
        users.value.unshift(response.data);
        $("#exampleModalCenter").modal("hide");
        resetForm();
    });
};

const updateUser = (value) => {
    axios
        .put("/api/users/", value)
        .then((response) => {
            const index = users.value.findIndex(
                (user) => user.id === response.data.id
            );
            users.value[index] = response.data;
            $("#exampleModalCenter").modal("hide");
        })
        .catch((errors) => {
            console.log(errors);
        })
        .finally(() => {
            form.value.resetForm();
        });
};

const editUser = (user) => {
    editing.value = true;
    // this.$refs.form.resetForm();   //vue 2 we use like this to reset the form

    form.value.resetForm();
    $("#exampleModalCenter").modal("show");
    formValues.value = {
        id: user.id,
        name: user.name,
        email: user.email,
    };
};
const addUser = () => {
    editing.value = false;
    $("#exampleModalCenter").modal("show");
};

onMounted(() => {
    getUsers();
});
</script>

<style>
button {
    margin-left: 5px;
}
</style>
