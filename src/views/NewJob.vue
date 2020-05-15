<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-center text-muted mb-4">
                <h1 class="form-title">NEW JOB REQUEST</h1>
              </div>
              <form role="form">
                <base-input
                  alternative
                  :error="errors.first('title')"
                  placeholder="Title"
                  id="title"
                  name="title"
                  v-model="editedItem.title"
                  v-validate="'required'"
                  autocomplete="off"
                ></base-input>
                <quill-editor
                  :options="customToolbar"
                  id="description"
                  name="description"
                  ref="myQuillEditor"
                  class='pb-3'
                  v-model="editedItem.description"
                  v-validate="'required'"
                />
                <v-select
                  placeholder='Salary currency'
                  id="currency"
                  name="currency"
                  class="pb-3 custom-dropdown"
                  v-validate="'required'"
                  v-model="editedItem.currency"
                  :options="currencies"
                >
                </v-select>
                <base-input
                  alternative
                  :error="errors.first('salary')"
                  class="mb-3"
                  placeholder="Salary"
                  id="salary"
                  type="number"
                  name="salary"
                  v-model="editedItem.salary"
                  autocomplete="off"
                ></base-input>
                <v-select
                  placeholder='Job Type'
                  id="job_type"
                  name="job_type"
                  class="pb-3"
                  v-validate="'required'"
                  v-model="editedItem.job_type"
                  label="label"
                  :options="job_types"
                >
                </v-select>
                <base-checkbox class="mb-3" v-model="editedItem.is_remote">
                  <span>
                    Remote position?
                  </span>
                </base-checkbox>
                <base-input
                  alternative
                  :error="errors.first('company')"
                  class="mb-3"
                  placeholder="Company"
                  id="company"
                  name="company"
                  v-model="editedItem.company"
                  v-validate="'required'"
                  autocomplete="off"
                ></base-input>
                <base-input
                  alternative
                  :error="errors.first('apply_url')"
                  class="mb-3"
                  placeholder="Apply URL"
                  id="apply_url"
                  name="apply_url"
                  v-model="editedItem.apply_url"
                  v-validate="'required|url'"
                  autocomplete="off"
                ></base-input>
                <base-input
                  alternative
                  :error="errors.first('job_city')"
                  class="mb-3"
                  placeholder="City"
                  id="job_city"
                  name="job_city"
                  v-model="editedItem.job_city"
                  v-validate="'required'"
                  autocomplete="off"
                ></base-input>
                <base-input
                  alternative
                  :error="errors.first('job_email')"
                  class="mb-3"
                  placeholder="Contact email"
                  id="job_email"
                  name="job_email"
                  v-model="editedItem.job_email"
                  v-validate="'required|email'"
                  autocomplete="off"
                ></base-input>
                <base-input
                  alternative
                  :error="errors.first('company_website')"
                  class="mb-3"
                  placeholder="Company website"
                  id="company_website"
                  name="company_website"
                  v-model="editedItem.company_website"
                  v-validate="'required|url'"
                  autocomplete="off"
                ></base-input>
                <hr/>
                <base-checkbox v-model="agree">
                  <span>
                    I agree with the
                    <a href="#">Privacy Policy</a>
                  </span>
                </base-checkbox>
                <div class="text-center">
                  <base-button :disabled="agree === false" @click="save()" class="my-4 add_btn">SUBMIT</base-button>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import { parseISO, format, formatDistance, formatRelative, subDays } from 'date-fns';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import Vue from "vue";
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      agree: false,
      editedItem: {},
      currencies: ['USD', 'CAD', 'EUR', 'RUB'],
      job_types: ['FULLTIME', 'CONTRACT', 'PARTTIME', 'FREELANCE'],
      customToolbar: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link']
          ]
        },
      }
    };
  },
  mounted() {
    this.editedItem.currency = this.currencies[0]
    this.editedItem.job_type = this.job_types[0]
  },
  methods: {
    async save() {
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
          axios
            .post('https://rustjobs.herokuapp.com/jobs', {
              title: this.editedItem.title,
              description: this.editedItem.description,
              currency: this.editedItem.currency,
              salary: this.editedItem.salary ? parseInt(this.editedItem.salary) : null,
              job_type: this.editedItem.job_type,
              is_remote: this.editedItem.is_remote,
              company: this.editedItem.company,
              apply_url: this.editedItem.apply_url,
              job_city: this.editedItem.job_city,
              job_email: this.editedItem.job_email,
              company_website: this.editedItem.company_website,
              company_twitter: this.editedItem.company_twitter,
            })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

