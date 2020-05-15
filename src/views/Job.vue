<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-default shape-skew">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--300" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="/">
                    <img v-lazy="'/img/icons/apple-icon-120x120.png'" />
                  </a>
                </div>
              </div>
              <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                <div class="card-profile-actions py-4 mt-lg-0">
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                </div>
              </div>
            </div>
            <div class="text-center mt-5 text-uppercase job-title-block">
              <h3 v-if="!job.salary">{{ job.title }}</h3>
              <h3 v-if="job.salary">{{ job.title }}<span class="font-weight-light">, {{ job.salary }} {{ job.currency }}</span></h3>
              <div v-if="job.company_website" class="h6 mt-4 text-uppercase">
                <i class="ni business_briefcase-24 mr-2"></i>
                <a class="job-title-link" :href="job.company_website">{{ job.company }}</a>
              </div>
              <div class="h6 mt-4 font-weight-300 text-uppercase job-city-title">
                <i class="ni location_pin mr-2"></i>
                {{ job.job_city }}
              </div>
              <div class="h6 mt-4 font-weight-600 text-uppercase">
                <badge type="primary text-uppercase custom-badge" rounded>{{ job.job_type }}</badge>
                <badge type="primary text-uppercase custom-badge" rounded>{{ job.is_remote ? 'remote' : 'office only' }}</badge>
              </div>
            </div>
            <div class="mt-5 py-5 border-top text-left">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <div v-html="job.description"></div>
                  <a :href="job.apply_url" target='_blank' class="mt-4 btn btn-neutral btn-icon add_btn custom-button-apply">
                    <span class="nav-link-inner--text">APPLY AT COMPANY SITE</span>
                  </a>
                  <hr />
                  <router-link to="/" class="btn btn-neutral btn-icon add_btn">
                    <span class="btn-inner--icon">
                      <i class="fa fa-arrow-left mr-2"></i>
                    </span>
                    <span class="nav-link-inner--text">BACK</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import {
  parseISO,
  format,
  formatDistance,
  formatRelative,
  subDays
} from "date-fns";

export default {
  data() {
    return {
      job: [],
      apiErrors: []
    };
  },
  created() {
    axios
      .get(`https://rustjobs.herokuapp.com/jobs/${this.$route.params.id}`)
      .then(response => {
        this.job = response.data;
      })
      .catch(e => {
        this.apiErrors.push(e);
      });
  },
  methods: {
    formatDate(date) {
      return format(parseISO(date), "MM/dd/yyyy");
    }
  }
};
</script>