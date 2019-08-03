<template>
    <div class="add-smoothie container">
        <h2 class="text-center text-dark head">Update Library</h2>
        <form class="container my-3" @submit.prevent="AddSmoothie">
            <div class="form-group">
                <label for="title">Collection Title</label>
                <input type="text" class="form-control" name="title" v-model="title">
            </div>

            <div class="form-group d-flex flex-row justify-content-between" v-for="(ingredient, index) in ingredients" :key="index">
                <input type="text" class="form-control w-75" name="ingre" v-model="ingredients[index]">
                <span class="btn btn-outline-danger" @click="deleteIng(ingredient)">delete</span>
            </div>

            <div class="form-group">
                <label for="add-ingredient">Add an ingredient</label>
                <input type="text" class="form-control" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>

            <div class="form-group text-center">
                <p v-if="feedback" class="text-dark">{{ feedback }}</p>
                <button type="submit" class="btn btn-success my-2">Add collection</button>
            </div> 
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddSmoothies',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        AddSmoothie(){
            if(this.title){
                this.feedback = null
                // creating a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })

                // adding collection to database
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    console.log(err)
                })
            }else{
                this.feedback = 'you must enter a collection title'
            }
        },
        addIng(){
            if(this.another){
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }else{
                this.feedback = 'you must enter a element in your collection'
            }
        },
        deleteIng(Ing){
            this.ingredients = this.ingredients.filter(val => {
                return val != Ing
            })
        }
    }
}
</script>

<style scoped>
.head {
    margin: 8vh auto;
}
</style>
