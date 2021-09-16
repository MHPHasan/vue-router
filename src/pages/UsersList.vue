<template>
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save Changes</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      changesSaved: false,
    }
  },
  inject: ['users'],
  methods: {
    confirmInput() {
      this.$router.push('/teams');
    },
    saveChanges() {
      this.changesSaved = true
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log("fired Before Route Enter");
  //   console.log(to, from);
  //   next();
  // },
  
  beforeRouteLeave(to, from, next) {
    console.log("Userlist Component BeforeRouteLeave");
    console.log(to, from);
    if (this.changesSaved) {
      next();
    } else {
      const userWantsToLeave = confirm("Are You Sure! You Got Unsaved Changes!");
      next(userWantsToLeave);
    }
  }

  // unmounted() {
  //   console.log("Unmounted");
  // }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>