<template>
  <div>
    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 shape-default shape-skew">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-12 text-center">
                <img src="/img/icons/apple-icon-120x120.png" />
              </div>
              <div class="col-lg-12 text-center pt-4">
                <span class="display-3 brand-name">
                  You +
                  <img height="50" src="https://rustacean.net/assets/cuddlyferris.png" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="section section-lg pt-lg-0 mt--200">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid">
              <div v-for="job in jobs" :key="job.id" class="col-lg-12 pb-4">
                <router-link :to="'/jobs/' + job.id">
                <card class="border-0" hover shadow body-classes="py-5">
                  <div class="text-center">
                    <div class="row justify-content-between">
                      <div class="col-md-6 text-left">
                        <h2 class="text-uppercase job-title">{{ job.title }}</h2>
                        <h4 class="d-block text-muted text-uppercase job-city">{{ job.company }}, {{ job.job_city }}</h4>
                      </div>
                      <div class="col-md-2 col-md-5 text-right">
                        <span class="d-block job-date">{{ formatDate(job.created_at) }}</span>
                        <badge type="primary text-uppercase custom-badge" rounded>{{ job.job_type }}</badge>
                        <badge type="primary text-uppercase custom-badge" rounded>{{ job.is_remote ? "REMOTE" : "OFFICE" }}</badge>
                      </div>
                    </div>
                  </div>
                </card>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { parseISO, format, formatDistance, formatRelative, subDays } from 'date-fns';

export default {
  data() {
    return {
      jobs: [],
      apiErrors: []
    };
  },
  created() {
    axios
      .get(`https://rustjobs.herokuapp.com/jobs`)
      .then(response => {
        this.jobs = response.data;
      })
      .catch(e => {
        this.apiErrors.push(e);
      });
  },
  methods: {
    formatDate(date) {
      return format(parseISO(date), 'dd.MM.yyyy');
    }
  }
};
</script>
