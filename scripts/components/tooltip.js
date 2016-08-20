window.$app = window.$app || {};

(function ($app) {
  const components = $app.components = ($app.components || {});

  function positionByInput($element) {
    const positions = $element.position();
    const width = $element.width();

    return { x: positions.left + width, y: positions.top };
  }

  function open (e = {}, html = "") {
    const $element = $(
      `<div class="tooltip">
        <span class="tooltip__span">${html}</span>
      </div>`
    );

    if (e.html) {
      e = positionByInput(e, html);
    }

    $element.css('left', e.layerX || e.x);
    $element.css('top', e.layerY || e.y);

    $('body').append($element);
    return $element;
  }

  function remove() {
    $('.tooltip').remove();
  }

  components.tooltip = { open, remove };
}(window.$app));
