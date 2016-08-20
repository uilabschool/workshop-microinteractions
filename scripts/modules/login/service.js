window.$app = window.$app || {};

(function ($app) {
  const services = $app.services = ($app.services || {});
  const resource = 'login';

  function login(body) {
    return $app.request({
      resource: resource,
      type: 'POST',
      data: body
    });
  }

  services.login = { login };
}(window.$app));
