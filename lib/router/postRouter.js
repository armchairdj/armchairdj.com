/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */

var authMiddleware = require('../../lib/middleware/authMiddleware');

var postController = require('../../lib/controller/postController');

/**
 * Router.
 */

function router(app) {
  app.get('/',
    postController.homepage
  );
  app.get('/playlists',
    postController.playlists
  );
  app.get('/releases',
    postController.releases
  );

  app.get('/post/:post_id',
    postController.show
  );

  app.get('/post/new',
    authMiddleware.requireLogin,
    postController.newPage
  )
  app.post('/post/create',
    authMiddleware.requireLogin,
    postController.create
  )

  app.get('/post/:post_id/edit',
    authMiddleware.requireLogin,
    postController.editPage
  )
  app.post('/post/:post_id/update',
    authMiddleware.requireLogin,
    postController.update
  )

  app.get('/post/:post_id/delete',
    authMiddleware.requireLogin,
    postController.deletePage
  )
  app.post('/post/:post_id/remove',
    authMiddleware.requireLogin,
    postController.remove
  )
}

/**
 * Exports.
 */

module.exports = router;