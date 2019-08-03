<template>
  <div class="index container">
    <div class="row my-4">
      <div class="col-sm-6 col-md-4 p-2" v-for="smoothie in smoothies" :key="smoothie.id">
        <div class="card shadow-sm py-3">
          <div class="card-body">
            <h4 class="card-title text-dark mx-2">{{ smoothie.title }}</h4>
            <ul class="card-text">
              <li v-for="(ingre, index) in smoothie.ingredients" :key="index" class="badge badge-pill badge-secondary py-1 px-2">{{ ingre }}</li>
              <li class="badge badge-secondary py-2 px-4 text-light badge-pill"><router-link :to="{ name: 'EditSmoothie', params: {smoothie_slug: smoothie.slug} }">edit</router-link></li>
            </ul>
          </div>
          <button class="btn btn-danger btn-sm d-block mx-4" @click="deleteSmoothie(smoothie.id)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      smoothies: []
    }
  },
  methods: {
    deleteSmoothie(id) {
      // deleting doc from firestore
      db.collection('smoothies').doc(id).delete()
      .then(() => {
        this.smoothies = this.smoothies.filter(smth => {
          return smth.id != id
        })
      }) 
    }
  },
  created(){
    // fetch data from the firestore
    db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  list-style-type: none;
  display: inline-block;
  margin: 10px;
}
ul {
  margin: 0;
  padding: 0;
}
a {
  color: white;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.2em;
}
</style>
