 <template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
      
      <router-link to="/teams/t1">Go To Page 1</router-link>
      <router-link to="/teams/t2">Go To Page 2</router-link>
      <router-link to="/teams/t3">Go To Page 3</router-link>
    </ul>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['teams', 'users'],
  props: ['teamId'],
  components: {
    UserItem
  },
  data() {
    return {
      teamName: '',
      members: [],
    };
  },
  methods: {
    loadTeamMembers(teamId) {
      const selectedTeam = this.teams.find(team => team.id === teamId);
      const members = selectedTeam.members;
      const selectedMembers = [];

      for(const member of members) {
        const selectedUsers = this.users.find(user => user.id === member);
        selectedMembers.push(selectedUsers);
      }

      this.teamName = selectedTeam.name;
      this.members = selectedMembers;
    }
  },
  created() {
    this.loadTeamMembers(this.teamId);
    // console.log(this.$route.query);
  },
  beforeRouteUpdate(to, from, next) {
    console.log("Fired TeamMembers before Route Update");
    console.log(to, from);
    // this.loadTeamMembers(to.params.teamId);
    next();
  },
  watch: {
    teamId(newId) {
      this.loadTeamMembers(newId);
    }
  }
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>