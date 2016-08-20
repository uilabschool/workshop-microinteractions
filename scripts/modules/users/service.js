window.$app = window.$app || {};

(function ($app) {
  const services = $app.services = ($app.services || {});
  const resource = 'users';

  function exists(email) {
    return $app.request({
      resource: `${resource}/exists`,
      type: 'GET',
      data: { email }
    });
  }

  function create(user) {
    return $app.request({
      resource: `${resource}`,
      type: 'POST',
      data: user
    });
  }

  function retrieve(id) {
    return $app.request({
      resource: `${resource}/${id}`,
      type: 'GET'
    });
  }

  function list() {
    return $app.request({
      resource: `${resource}`,
      type: 'GET'
    });
  }

  services.users = { list, create, retrieve, exists };
}(window.$app));
