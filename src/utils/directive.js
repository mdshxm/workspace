export default {
  install: Vue => {
    Vue.directive("test", {
      inserted: function (el, { value }) {
        if (value) {
          el.style.display = "block"
        } else {
          el.style.display = "none"
        }


      }
    })
  }
}