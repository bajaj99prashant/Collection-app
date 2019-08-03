<template>
    <div class="edit-smoothie container" v-if="smoothie">
        <h2 class="text-center text-dark head">Edit {{ smoothie.title }}</h2>
        <form class="container my-3" @submit.prevent="EditSmoothie">
            <div class="form-group">
                <label for="title">Collection Title</label>
                <input type="text" class="form-control" name="title" v-model="smoothie.title">
            </div>

            <div class="form-group d-flex flex-row justify-content-between" v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                <input type="text" class="form-control w-75" name="ingre" v-model="smoothie.ingredients[index]">
                <span class="btn btn-outline-danger" @click="deleteIng(ingredient)">delete</span>
            </div>

            <div class="form-group">
                <label for="add-ingredient">Add an ingredient</label>
                <input type="text" class="form-control" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>

            <div class="form-group text-center">
                <p v-if="feedback" class="text-dark">{{ feedback }}</p>
                <button type="submit" class="btn btn-success my-2">Update collection</button>
            </div> 
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoohtie',
    data(){
        return {
            smoothie: null,
            another: null,
            feedback: null
        }
    },
    created() {
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    },
    methods: {
        EditSmoothie(){
            if(this.smoothie.title){
                // creating a slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                // sending request to the database
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
                }).then(() => {
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    console.log(err)
                })
            }else{
                this.feedback = 'you must have title of your collection'
            }
        },
        addIng(){
            if(this.another){
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            }else{
                this.feedback = 'you must enter a element in your collection'
            }
        },
        deleteIng(Ing){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(val => {
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
