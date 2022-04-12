<template>
  <div>
    <v-row> <h2>Tasks with date</h2></v-row>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right> mdi-menu-down </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'week'">
                  <v-list-item-title>Week</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
                <v-list-item @click="type = '4day'">
                  <v-list-item-title>4 days</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <div>
                  <span>Project: </span>
                  <span v-html="selectedEvent.projName"></span>
                </div>
                <div>
                  <span>Description: </span>
                  <span v-html="selectedEvent.desc"></span>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Calendar-page",
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange() {
      const events = [];
      const eventCount = this.getTasksWithDate.length;

      for (let i = 0; i < eventCount; i++) {
        events.push({
          name: this.getTasksWithDate[i].content,
          desc: this.getTasksWithDate[i].description,
          projName: this.getTaskProjectNameByProjectId(
            this.getTasksWithDate[i].projectId
          ),
          start: this.getTasksWithDate[i].due.date,
          end: this.getTasksWithDate[i].due.date,
          color: this.getTaskColorByProjectId(
            this.getTasksWithDate[i].projectId
          ),
        });
      }

      this.events = events;
    },
    getTaskColorByProjectId(projectId) {
      const colorId = this.getProjects.find(
        (item) => item.id === projectId
      ).color;
      return this.getColorById(colorId);
    },
    getTaskProjectNameByProjectId(projectId) {
      return this.getProjects.find((item) => item.id === projectId).name;
    },
    getColorById(colorId) {
      return this.getColors.find((item) => item.id === colorId).hex;
    },
  },
  computed: {
    getTasks() {
      return this.$store.getters.GET_TASKS;
    },
    getTasksWithDate() {
      return this.getTasks.filter((task) => {
        return task.due !== undefined && task.due.date !== undefined;
      });
    },
    getColors() {
      return this.$store.getters.GET_COLORS;
    },
    getProjects() {
      return this.$store.getters.GET_PROJECTS;
    },
  },
};
</script>
