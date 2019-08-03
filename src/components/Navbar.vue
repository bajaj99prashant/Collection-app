<template>
    <div class="navie">
        <nav class="navbar navbar-expand navbar-dark bg-dark justify-content-between d-flex px-4">
            <h1 class="navbar-brand text-light display-3">
                <router-link :to="{ name: 'Index'}">Collections</router-link>
            </h1>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link :to="{ name: 'AddSmoothies' }">
                        <a class="nav-link btn btn-success text-light px-3 py-0" type="button">
                                add
                        </a>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data () {
        return {

        }
    }
}
</script>

<style scoped>
a {
    color: white;
    text-decoration: none;
}
</style>
