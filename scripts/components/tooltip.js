window.$app = window.$app || {};

(function ($app) {
  const components = $app.components = ($app.components || {});

  function positionByInput($element, $current) {
    const positions = $element.position();
    const width = $element.width();
    const height = $element.height();
    const currentHeight = $current.height();

    return { x: positions.left + width, y: positions.top - Math.abs(height/2 - currentHeight/2) };
  }

  function open (e = {}, html = "") {
    const $element = $(
      `<div class="tooltip">
        ${html[0] !== '<' ? `<span class="tooltip__span">${html}</span>` : html}
      </div>`
    );

    $('body').append($element);
    if (e.html) {
      e = positionByInput(e, $element);
    }

    $element.css('left', e.layerX || e.x);
    $element.css('top', e.layerY || e.y);

    return $element;
  }

  function remove() {
    $('.tooltip').remove();
  }

  components.tooltip = { open, remove };
}(window.$app));
