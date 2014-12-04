'use strict';

require('should');
var fs = require('fs');
var join = require('path').join;
var vfs = require('vinyl-fs');
var utility = require('utility');
var fixtures = join(__dirname, 'fixtures');
var transport = require('../lib/transport');
var plugin = require('../lib/plugin');
var util = require('../lib/util');
var Package = require('father').SpmPackage;

describe('Transport', function() {

  it('transport all', function(done) {
    var cwd = join(fixtures, 'simple-transport');
    var opt = {
      cwd: cwd,
      moduleDir: 'sea-modules',
      include: 'all',
      ignore: ['b']
    };

    vfs.src('index.js', {cwd: cwd, cwdbase: true})
    .pipe(transport(opt))
    .on('data', function(file) {
      util.winPath(file.path).should.endWith('simple-transport/simple-transport/1.0.0/index.js');
      assert(file, 'transport-all.js');
      done();
    });
  });

  it('transport all using father', function(done) {
    var cwd = join(fixtures, 'simple-transport');
    var pkg = new Package(cwd, {
      moduleDir: 'sea-modules',
      ignore: ['b']
    });
    var opt = {
      pkg: pkg,
      include: 'all',
      ignore: 'b'
    };

    vfs.src('index.js', {cwd: cwd, cwdbase: true})
    .pipe(transport(opt))
    .on('data', function(file) {
      util.winPath(file.path).should.endWith('simple-transport/simple-transport/1.0.0/index.js');
      assert(file, 'transport-all.js');
      done();
    });
  });

  // https://github.com/popomore/gulp-transport/issues/5
  describe('include', function() {

    it('self', function(done) {
      var cwd = join(fixtures, 'js-require-js');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'self'
      };

      vfs.src('src/index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-self.js');
        done();
      });
    });

    it('self with ignore', function(done) {
      var cwd = join(fixtures, 'js-require-js');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'self',
        ignore: ['b']
      };

      vfs.src('src/index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-self-ignore.js');
        done();
      });
    });

    it('self with css', function(done) {
      var cwd = join(fixtures, 'js-require-css');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'self'
      };

      vfs.src('index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-self-css.js');
        done();
      });
    });

    it('relative', function(done) {
      var cwd = join(fixtures, 'js-require-js');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'relative'
      };

      vfs.src('src/index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-relative.js');
        done();
      });
    });


    it('relative with ignore', function(done) {
      var cwd = join(fixtures, 'js-require-js');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'relative',
        ignore: ['b']
      };

      vfs.src('src/index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-relative-ignore.js');
        done();
      });
    });

    it('relative with css', function(done) {
      var cwd = join(fixtures, 'js-require-css');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'relative'
      };

      vfs.src('index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-relative-css.js');
        done();
      });
    });

    it('relative with css ignore', function(done) {
      var cwd = join(fixtures, 'js-require-css');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'relative',
        ignore: ['import-style']
      };

      vfs.src('index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-relative-css-ignore.js');
        done();
      });
    });

    it('all', function(done) {
      var cwd = join(fixtures, 'js-require-js');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'all'
      };

      vfs.src('src/index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-all.js');
        done();
      });
    });

    it('all with ignore', function(done) {
      var cwd = join(fixtures, 'js-require-js');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'all',
        ignore: ['b']
      };

      vfs.src('src/index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-all-ignore.js');
        done();
      });
    });

    it('all with ignore2', function(done) {
      var cwd = join(fixtures, 'js-require-js');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'all',
        ignore: ['c']
      };

      vfs.src('src/index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-all-ignore2.js');
        done();
      });
    });

    it('all with ignore package', function(done) {
      var cwd = join(fixtures, 'ignore-package');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'all',
        ignore: ['jquery']
      };

      vfs.src('index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-all-ignore-package.js');
        done();
      });
    });

    it('all with css', function(done) {
      var cwd = join(fixtures, 'js-require-css');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'all'
      };

      vfs.src('index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-all-css.js');
        done();
      });
    });

    it('standalone', function(done) {
      var cwd = join(fixtures, 'js-require-js');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'standalone'
      };

      vfs.src('src/index.js', {cwd: cwd, cwdbase: true})
        .pipe(transport(opt))
        .on('data', function(file) {
          assert(file, 'transport-include-standalone.js');
          done();
        });
    });

    it('umd', function(done) {
      var cwd = join(fixtures, 'js-require-js');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        include: 'umd'
      };

      vfs.src('src/index.js', {cwd: cwd, cwdbase: true})
        .pipe(transport(opt))
        .on('data', function(file) {
          assert(file, 'transport-include-umd.js');
          done();
        });
    });

  });

  describe('rename', function() {

    it('rename with debug', function(done) {
      var cwd = join(fixtures, 'type-transport');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        rename: {suffix: '-debug'}
      };

      vfs.src('index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        util.winPath(file.history[0]).should.containEql('type-transport/index.js');
        util.winPath(file.path).should.containEql('type-transport/type-transport/1.0.0/index-debug.js');
        assert(file, 'transport-rename-debug.js');
        done();
      });
    });

    it('rename with hash', function(done) {
      var cwd = join(fixtures, 'transport-hash');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        rename: rename
      };

      function rename(file) {
        var hash = utility.sha1(fs.readFileSync(file.origin)).substring(0,8);
        file.basename += '-' + hash;
        return file;
      }

      vfs.src('index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        util.winPath(file.history[0]).should.containEql('transport-hash/index.js');
        util.winPath(file.path).should.containEql('transport-hash/a/1.0.0/index-e16dba71.js');
        assert(file, 'transport-rename-hash.js');
        done();
      });
    });

    it('rename with css', function(done) {
      var cwd = join(fixtures, 'css-import');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        rename: {suffix: '-debug'}
      };

      vfs.src('index.css', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        util.winPath(file.history[0]).should.containEql('css-import/index.css');
        util.winPath(file.path).should.containEql('css-import/a/1.0.0/index-debug.css');
        assert(file, 'transport-rename-css.css');
        done();
      });
    });

    xit('rename dependency with debug', function(done) {
      var cwd = join(fixtures, 'type-transport');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        rename: {suffix: '-debug'}
      };

      var ret = [], src = [
        'index.js',
        'sea-modules/handlebars-runtime/1.3.0/handlebars.js'
      ];
      vfs.src(src, {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .pipe(plugin.dest({base: cwd}))
      .on('data', function(file) {
        ret.push(file);
      })
      .on('end', function() {
        util.winPath(ret[0].path).should.containEql('type-transport/type-transport/1.0.0/index-debug.js');
        assert(ret[0], 'transport-rename-debug.js');

        util.winPath(ret[1].path).should.endWith('type-transport/handlebars-runtime/1.3.0/handlebars-debug.js');
        assert(ret[1], 'transport-rename-debug-handelbars.js');
        done();
      });
    });
  });

  xit('no handlebars deps', function(done) {
    var cwd = join(fixtures, 'no-handlebars');
    var opt = {
      cwd: cwd,
      moduleDir: 'sea-modules',
      include: 'self'
    };

    vfs.src('index.js', {cwd: cwd, cwdbase: true})
    .pipe(transport(opt))
    .once('error', function(e) {
      e.message.should.eql('handlebars-runtime not exist, but required .handlebars');

    })
    .on('end', done);
  });

  describe('other extension', function() {

    it('relative', function(done) {
      var cwd = join(fixtures, 'require-other-ext');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules'
      };

      vfs.src('index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-other-ext.js');
        done();
      });
    });

    it('debug', function(done) {
      var cwd = join(fixtures, 'require-other-ext');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        rename: {suffix: '-debug'}
      };

      vfs.src('index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-other-ext-debug.js');
        done();
      });
    });
  });

  describe('custom stream', function() {

    it('js stream', function(done) {
      var cwd = join(fixtures, 'js-require-js');
      var isCalled = false, args;
      var stream = {
        '.js': function(opt) {
          isCalled = true;
          args = opt;
          return plugin.js({
            cwd: cwd,
            pkg: opt.pkg
          });
        }
      };
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        idleading: '',
        stream: stream
      };

      vfs.src('src/index.js', {cwd: cwd, cwdbase: true})
      .pipe(transport(opt))
      .on('data', function(file) {
        assert(file, 'transport-include-relative.js');
        isCalled.should.be.true;
        args.ignore.should.eql([]);
        args.include.should.equal('relative');
        //args.pkg.should.equal(pkg);
        args.idleading.should.equal('');
        args.stream.should.equal(stream);
        done();
      });
    });

    xit('should throw when opt.stream is not function', function() {
      var cwd = join(fixtures, 'js-require-js');
      var opt = {
        cwd: cwd,
        moduleDir: 'sea-modules',
        stream: {
          '.js': plugin.js({base: cwd})
        }
      };
      (function() {
        transport(opt);
      }).should.throw('opt.stream\'s value should be function');
    });
  });

  it('require directory', function(done) {
    var cwd = join(fixtures, 'require-directory');
    var opt = {
      cwd: cwd,
      moduleDir: 'sea-modules',
      include: 'self'
    };

    vfs.src('index.js', {cwd: cwd, cwdbase: true})
    .pipe(transport(opt))
    .on('data', function(file) {
      assert(file, 'require-directory.js');
      done();
    });
  });

  xit('transport dependency', function(done) {
    var cwd = join(fixtures, 'js-require-js');
    var opt = {
      cwd: cwd,
      moduleDir: 'sea-modules',
      include: 'relative'
    };

    var ret = [], src = [
      'src/index.js',
      'sea-modules/b/1.0.0/index.js',
      'sea-modules/c/1.0.0/index.js'
    ];
    vfs.src(src, {cwd: cwd, cwdbase: true})
    .pipe(transport(opt))
    .pipe(plugin.dest({base: cwd}))
    .on('data', function(file) {
      ret.push(file);
    })
    .on('end', function() {
      util.winPath(ret[0].path).should.endWith('js-require-js/a/1.0.0/src/index.js');
      assert(ret[0], 'transport-include-relative.js');

      util.winPath(ret[1].path).should.endWith('js-require-js/b/1.0.0/index.js');
      assert(ret[1], 'transport-include-relative-b.js');

      util.winPath(ret[2].path).should.endWith('js-require-js/c/1.0.0/index.js');
      assert(ret[2], 'transport-include-relative-c.js');
      done();
    });
  });

  it('skip package', function(done) {
    var cwd = join(fixtures, 'ignore-package');
    var opt = {
      cwd: cwd,
      moduleDir: 'sea-modules',
      include: 'relative',
      skip: 'jquery'
    };

    vfs.src('index.js', {cwd: cwd, cwdbase: true})
    .pipe(transport(opt))
    .on('data', function(file) {
      assert(file, 'transport-skip.js');
      done();
    });
  });

  describe('exports', function() {
    var exports = require('..');

    it('transport', function() {
      exports.should.equal(transport);
    });

    it('plugin.js', function() {
      exports.plugin.js.should.equal(require('../lib/plugin/js'));
    });

    it('plugin.css', function() {
      exports.plugin.css.should.equal(require('../lib/plugin/css'));
    });

    it('plugin.css2js', function() {
      exports.plugin.css2js.should.equal(require('../lib/plugin/css2js'));
    });

    it('plugin.handlebars', function() {
      exports.plugin.handlebars.should.equal(require('../lib/plugin/handlebars'));
    });

    it('plugin.tpl', function() {
      exports.plugin.tpl.should.equal(require('../lib/plugin/tpl').tpl);
    });

    it('plugin.html', function() {
      exports.plugin.html.should.equal(require('../lib/plugin/tpl').html);
    });

    it('plugin.json', function() {
      exports.plugin.json.should.equal(require('../lib/plugin/json'));
    });

    it('plugin.include', function() {
      exports.plugin.include.should.equal(require('../lib/plugin/include'));
    });

    it('plugin.concat', function() {
      exports.plugin.concat.should.equal(require('../lib/plugin/concat'));
    });

    it('plugin.dest', function() {
      exports.plugin.dest.should.equal(require('../lib/plugin/dest'));
    });

    it('common', function() {
      exports.common.should.equal(require('../lib/common'));
    });

    it('util', function() {
      exports.util.should.equal(require('../lib/util'));
    });
  });

});

function assert(file, expectedFile) {
  var code = file.contents.toString();
  var expected = readFile(__dirname + '/expected/' + expectedFile);
  code.should.eql(expected);
}

function readFile(path) {
  return fs.readFileSync(path).toString().replace(/\r/g, '');
}
