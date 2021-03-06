/******************************************************************************
Router for staticController.
******************************************************************************/

/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var authMiddleware   = require('../../lib/middleware/authMiddleware');

var staticController = require('../../lib/controller/staticController');

/**
 * Router.
 */

function router(app) {
  app.get('/about',
    staticController.about
  );
}

function router(app) {
  app.get('/resume',
    staticController.resume
  );
}

/**
 * Exports.
 */

module.exports = router;
