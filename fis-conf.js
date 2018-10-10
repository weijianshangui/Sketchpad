fis.match('*',{
  useHash: true
})

fis.match('**.less',{
  parser: fis.plugin('less'),
  rExt: '.css'
})
