let on = false
self.addEventListener('message', (message) => {
  console.log('message event')
  const functionType = message.data
  console.log('functionType:' + functionType)
  if (functionType === 'exec') exec()
  if (functionType === 'cancel') cancle()
})

function exec() {
  console.log('exec() requiest')
  on = true
  for (let i = 0; i < 1000000000; i++) {
    if (!on) break
    if (i % 10000000 === 0) console.log('count:' + i)
  }
  on = false
  self.postMessage('test')
}

function cancle() {
  self.postMessage('cancle() request')
  on = false  
}
