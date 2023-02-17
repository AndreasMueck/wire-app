<template>
  <f7-page>
    <f7-navbar title="Sortable List">
      <f7-nav-right>
        <f7-link sortable-toggle=".sortable">Toggle</f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-list id="testsortable"
      sortable
      @sortable:sort="onSort($event)"
      @sortable:enable="onSortEnabled($event)"
      @sortable:disable="onSortDisabled($event)"
    >
      <f7-list-item swipeout title="Jenna Smith">
        <f7-swipeout-actions right>
        <f7-swipeout-button delete confirm-text="Are you sure you want to delete this item?">Delete</f7-swipeout-button>
      </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item swipeout title="John Doe">
        <f7-swipeout-actions right>
        <f7-swipeout-button delete confirm-text="Are you sure you want to delete this item?">Delete</f7-swipeout-button>
      </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item swipeout title="Max Mustermann">
        <f7-swipeout-actions right>
        <f7-swipeout-button delete confirm-text="Are you sure you want to delete this item?">Delete</f7-swipeout-button>
      </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<style>
.demo-list-icon,
.icon-f7 {
  background: #ccc;
  display: block;
  position: relative;
}
.ios .demo-list-icon,
.ios .icon-f7,
.ios .icon-vi {
  width: 29px;
  height: 29px;
  border-radius: 6px;
  box-sizing: border-box;
}
.md .demo-list-icon,
.md .icon-f7,
.md .icon-vi {
  width: 24px;
  height: 24px;
  border-radius: 4px;
}
.aurora .demo-list-icon,
.aurora .icon-f7,
.aurora .icon-vi {
  width: 18px;
  height: 18px;
  border-radius: 4px;
}
</style>
<script>
export default {
  methods: {
    onSort(event) {
      console.log("Element wurde neu platziert");
      console.log(event);
    },
    onSortEnabled(event) {
      console.log("Sort wurde aktiviert");
    },
    onSortDisabled(event) {
      console.log("Sort wurde deaktiviert");
      let nodeList = document.querySelector("div#testsortable ul");
      let children = nodeList.children;
      console.log(children);
    },
  },
};
</script>
