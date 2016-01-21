(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'dev-title',
      template: '<h1>Task done with Angular 2</h1>'
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));