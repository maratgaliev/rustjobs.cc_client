import Vue from "vue";
import Router from "vue-router";
import Header from "./layout/main/Header";
import Footer from "./layout/main/Footer";
import Main from "./views/Main.vue";
import NewJob from "./views/NewJob.vue";
import Job from "./views/Job.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      components: {
        header: Header,
        default: Main,
        footer: Footer
      }
    },
    {
      path: "/jobs/:id",
      name: "Job",
      components: {
        header: Header,
        default: Job,
        footer: Footer
      }
    },
    {
      path: "/new",
      name: "NewJob",
      components: {
        header: Header,
        default: NewJob,
        footer: Footer
      }
    },
    {
      path: "/about",
      name: "About",
      components: {
        header: Header,
        default: About,
        footer: Footer
      }
    }
  ]
});
