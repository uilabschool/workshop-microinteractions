window.$app = window.$app || {};

(function ($app) {
  $app.api = "http://radiant-crag-70052.herokuapp.com/";

  $app.request = function (opitions) {
    return new Promise((resolve, reject) => {
      opitions.url = $app.api + opitions.resource;
      opitions.success = (d) => resolve(d);
      opitions.error = (e) => reject(e);

      if (!!~['POST','PUT','DELETE'].indexOf(opitions.type)) {
        opitions.headers = { 'Content-Type': 'application/json' };
        opitions.data = JSON.stringify(opitions.data);
      }

      $.ajax(opitions);
    });
  }
}(window.$app));
