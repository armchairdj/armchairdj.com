/**
 * External dependencies.
 */

var _        = require('underscore');
var extend   = require('extend');
var mongoose = require('mongoose');

/**
 * Internal dependencies.
 */

var settings = require('../../lib/config/settings');

var render   = require('../../lib/util/render');

/**
 * Methods: Index.
 */

function homepage(req, res) {
  var criteria = {
    publishedAt: { $exists: true }
  };

  var options = {
    sort:  { 'publishedAt': -1 },
    limit: settings.pagination.perPage
  };

  renderIndex(req, res, criteria, options, {
    isHomepage:       true,
    headline:        'Latest Posts',
    pageDescription: 'A monologue about music, with occasional mixtapes.'
  });
}

function releases(req, res) {
  var criteria = {
    publishedAt: { $exists: true },
    release:     { $exists: true }
  };

  var options = {
    sort:  { 'publishedAt': -1 },
    limit: settings.pagination.perPage
  };

  renderIndex(req, res, criteria, options, {
    headline:        'Latest Reviews',
    pageDescription: 'Latest song, album and mix reviews.'
  });
}

function playlists(req, res) {
  var criteria = {
    publishedAt: { $exists: true },
    playlist:    { $exists: true }
  };

  var options  = {
    sort:  { 'publishedAt': -1 },
    limit: settings.pagination.perPage
  };

  renderIndex(req, res, criteria, options, {
    postType:        'Latest Playlists',
    pageDescription: 'Latest obsessively curated playlists.'
  });
}

function renderIndex(req, res, criteria, options, locals) {
  findPosts();

  function findPosts() {
    var Post = mongoose.model('Post');

    Post.find(
      criteria, null, options
    ).populate(
      'playlist release tags'
    ).exec(handleFind);
  }

  function handleFind(err, results) {
    if (err) {
      return render.serverError(req, res);
    }

    locals.posts = results;

    respond();
  }

  function respond() {
    render.page(req, res, 'page/post/index', locals);
  }
}

/**
 * Methods: Show.
 */

function show(req, res) {
  render.page(req, res, 'page/post/show', {
    post: req.post
  });
}

/**
 * Methods: Create.
 */

function newPage(req, res) {
  renderEditPage(req, res);
}

function renderNewPage(req, res) {
  render.page(req, res, 'page/post/new');
}

function create(req, res) {
  
}

/**
 * Methods: Update.
 */

function editPage(req, res) {
  renderEditPage(req, res);
}

function renderEditPage(req, res) {
  render.page(req, res, 'page/post/edit');
}

function update(req, res) {
  
}

/**
 * Methods: Remove.
 */

function deletePage(req, res) {
  render.page(req, res, 'page/post/delete');
}

function remove(req, res) {
  
}

/**
 * Exports.
 */

module.exports = {
  homepage:   homepage,
  playlists:  playlists,
  releases:   releases,

  show:       show,

  newPage:    newPage,
  create:     create,

  editPage:   editPage,
  update:     update,

  deletePage: deletePage,
  remove:     remove
};