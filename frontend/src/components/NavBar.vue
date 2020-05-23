<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Internet Banking</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if="role === 'admin'" v-bind:href="urlCustomerDashboard">Dashboard</b-nav-item>
          <b-nav-item v-if="role === 'nhanvien'" v-bind:href="urlEmployeeDashboard">Dashboard</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <div v-show="username != null">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{username}}</em>
              </template>
              <b-dropdown-item v-bind:href="urlChangePassword">Change password</b-dropdown-item>
              <b-dropdown-item v-on:click="clickSignOut">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
    data () {
        return {
          role: localStorage.getItem("Role"),
          username: localStorage.getItem("username"),
          urlCustomerDashboard: "http://localhost:8080/#/customer/dashboard",
          urlEmployeeDashboard: "http://localhost:8080/#/employee/dashboard",
          urlChangePassword: "http://localhost:8080/#/changepassword"
        };
    },
    mounted() {
      this.fetchData();
    },
    watch: {
      $route() {
        this.fetchData();
      }
    },
    methods: {
      fetchData() {
        this.username = localStorage.getItem("username");
        this.role = localStorage.getItem("Role");
      },
      clickSignOut(evt) {
        evt.preventDefault()
        localStorage.clear();
        this.$router.push(`/login`);
        window.location.reload(true); 
      }
    }    
};
</script>