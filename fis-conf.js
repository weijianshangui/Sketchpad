fis.match('/less/(**.less)', {
  parser: fis.plugin('less'),
  rExt: '.css',
  release: '/css/$1'
});
