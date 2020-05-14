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
          <section class="section section-shaped section-lg my-0">
            <div class="shape shape-style-1 shape-default shape-skew">
            </div>
            <div class="container shape-container d-flex">
              <div class="col px-0">
                <div class="row">
                  <div class="col-lg-12">
                    <h1 class="display-3 text-white">
                      rustjobs.cc - completely open-source project.
                      <span>All information provided "as-is", all trademarks are the property of their respective owners.</span>
                    </h1>
                    <p class="lead text-white">
                      Please <a class="text-bold text-white" href="mailto:kazanlug@gmail.com"><b>contact</b></a> author, if you have any questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
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
      currencies: ["USD", "CAD", "EUR", "RUB"],
      job_types: ["FULLTIME", "CONTRACT", "PARTTIME", "FREELANCE"],
      customToolbar: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
            ["link"]
          ]
        }
      }
    };
  },
  mounted() {
    this.editedItem.currency = this.currencies[0];
    this.editedItem.job_type = this.job_types[0];
  },
  methods: {
    async save() {
      try {
        const valid = await this.$validator.validateAll();
        if (valid) {
          axios.post("http://localhost:5000/jobs", {
            title: this.editedItem.title,
            description: this.editedItem.description,
            currency: this.editedItem.currency,
            salary: parseInt(this.editedItem.salary),
            job_type: this.editedItem.job_type,
            is_remote: this.editedItem.is_remote,
            company: this.editedItem.company,
            apply_url: this.editedItem.apply_url,
            job_city: this.editedItem.job_city,
            job_email: this.editedItem.job_email,
            company_website: this.editedItem.company_website,
            company_twitter: this.editedItem.company_twitter
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

